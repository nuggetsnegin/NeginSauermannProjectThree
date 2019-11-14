$(function () {

    /*[CAT GAME OBJECT]
        Initialize happiness level, cat body part array, 
        favoriteBody part, correctPetCount counter and timer.
    */
    const catGame = {
        happiness: 0,
        catBody: ['head', 'back', 'tail', 'frontLegs', 'belly', 'backLegs'],
        correctPetCount: 0,
        favoriteBodyPart: null,
        timer: 0,
        /*[COUNTDOWN FUNCTION]
            Checks if timer is 0 (user ran out of petting time :( ))
            if out of time, reset the game, tell user they're out of time
            show the losing screen and hide the cat game body to prevent
            more petting. If timer >0 reducing timer and displaying the timer.
        */
        countdown: function () {
            if (catGame.timer == 0) {
                catGame.reset();
                catGame.timerDiv.innerHTML = `<h2> out of time! </h2>`;
                $('.losing-screen').show();
                $('.catBody').hide();
            } else {
                catGame.timerDiv.innerHTML = `<h2> ${catGame.timer} seconds remaining</h2>`;
                catGame.timer--;
            }
        },
        /*[DOMGETTER FUNCTION]
            Grabbing needed HTML elements and assigning them to variables for later
            important methods and event functionality.
        */
        domGetter: function () {
            catGame.timerDiv = document.getElementById('timer');
            catGame.happinessDiv = document.getElementById('happiness');
            catGame.catBodyPart = $('.catBody').children();
            catGame.button = document.getElementById('start');
            catGame.butthole = $('.butthole').text();
        },
        /*[SETRANDOMBODY FUNCTION]
            Using math.random & floor and assigning to variable random.
            Random variable (number 0-5) is now the cat's preffered petting spot (array index).
            Set THAT to favoriteBodyPart from catGame object.
        */
        setRandomBody: function () {
            let random = Math.floor((Math.random() * 6));
            catGame.favoriteBodyPart = catGame.catBody[random];
        },
        /*[SETRANDOMBODY FUNCTION]
            Game start function which starts when user clicks 'start' button.
            Set timer to 30 seconds, set happiness to 0, set timerSpeed.
        */
        start: function () {
            $(catGame.button).click(function () {
                catGame.timerSpeed = setInterval(catGame.countdown, 1000); /*1 second countdown speed*/
                catGame.setRandomBody();
                catGame.timer = 10; /*set timer to 30*/
                catGame.happiness = 0; /*reset score*/
                catGame.happinessDiv.innerHTML = `<h2>Happiness: ${catGame.happiness}</h2>`;
                catGame.hide();
                $('.catBody').show();
            });
        },
        hide: function () {
            $('.instructions').hide();
            $('.winning-screen').hide();
            $('.losing-screen').hide();
            $(catGame.button).hide(); /*so user doesnt spam button*/

        },
        reset: function () {
            $(catGame.button).show().text('play again?');
            clearTimeout(catGame.timerSpeed); /*stop timer*/
            catGame.catBodyPart.off(); /*cannot click catBody*/
        },
        init: function () {
            $('.catBody').hide();
            catGame.domGetter();
            catGame.start();
            feelingFeline();
        }
    }
    const feelingFeline = () => {
        for (let i = 0; i < catGame.catBodyPart.length; i++) {
            $(catGame.catBodyPart[i]).on("click", function () {
                let petting = $(catGame.catBodyPart[i]).data().part;
                console.log(catGame.petting);
                console.log(catGame.happiness);

                if (petting === catGame.favoriteBodyPart) {
                    catGame.correctPetCount++; /*tracking correct pets*/
                    catGame.happiness++; /*adding to cat happiness level*/
                    catGame.happinessDiv.innerHTML = `<h2>Happiness: ${catGame.happiness}</h2>`;
                    checkHappiness();
                    changeFavoriteSpot();
                } else if (petting === catGame.butthole) {
                    /*touched the butt*/
                    catGame.happiness = -1000;
                    catGame.happinessDiv.innerHTML = `<h2>Happiness: ${catGame.happiness}</h2>`;
                    catGame.timerDiv.innerHTML = `<h2>YOU TOUCHED THE BUTTHOLE 😱!</h2>`;
                    console.log(catGame.happiness);
                    checkHappiness();
                } else
                    console.log("wrong body part");

            })
        };
    }

    const checkHappiness = () => {
        if (catGame.happiness === 3) {
            /*you win!*/
            catGame.happinessDiv.innerHTML = `<h2>You win! </h2>`;
            catGame.timerDiv.innerHTML = `<h2> You finished with ${catGame.timer} seconds remaining!</h2>`
            $('.winning-screen').show();
            $('.catBody').hide();
            catGame.reset();
        } else if (catGame.happiness < 0) {
            catGame.reset();
        }
    }

    const changeFavoriteSpot = () => {
        if (catGame.correctPetCount == 1) {
            catGame.correctPetCount = 0; /*must set to 0 again or else it never randomizes again*/
            catGame.setRandomBody(); /*get random body part*/
        }

    }

    catGame.init();
});