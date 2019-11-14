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
        /*[COUNTDOWN METHOD]
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
        /*[DOM GETTER METHOD]
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
        /*[SET RANDOM BODY METHOD]
            Using math.random & floor and assigning to variable random.
            Random variable (number 0-5) is now the cat's preffered petting spot (array index).
            Set THAT to favoriteBodyPart from catGame object.
        */
        setRandomBody: function () {
            let random = Math.floor((Math.random() * 6));
            catGame.favoriteBodyPart = catGame.catBody[random];
        },
        /*[START METHOD]
            Game start function which starts when user clicks 'start' button.
            Set timer to 30 seconds, set happiness to 0, set timerSpeed.
        */
        start: function () {
            $(catGame.button).on('click touchstart', function () {
                $('.catBody').show();
                catGame.catBodyPart.on();
                catGame.setRandomBody();
                catGame.timerSpeed = setInterval(catGame.countdown, 1000); /*1 second countdown speed*/
                catGame.timer = 10; 
                catGame.happiness = 0; /*what happens if I dont set it to 0?*/
                catGame.happinessDiv.innerHTML = `<h2>Happiness: ${catGame.happiness}</h2>`;
                catGame.hide();
            });
        },
        /*[HIDE METHOD]
            Elements to hide when using starting game.
        */
        hide: function () {
            $('.instructions').hide();
            $('.winning-screen').hide();
            $('.losing-screen').hide();
            $(catGame.button).hide(); /*so user doesnt spam button*/
        },
        /*[RESET METHOD]
            Stop timer and show button again and
            change button from 'start' to 'play again'.
        */
        reset: function () {
            clearTimeout(catGame.timerSpeed); /*stop timer*/
            $(catGame.button).show().text('play again?');
        },
        /*[INIT METHOD]
            When we load page, hide the cat body call
            DOM getter, start game and the game logic.
        */
        init: function () {
            $('.catBody').hide();
            catGame.domGetter();
            catGame.start();
            feelingFeline();
        }
    }

    /*[FEELING FELINE FUNCTION]
        Game logic. Checks user clicks, if it matches random
        body part add to the correct pet count, increase happiness
        and call bodypart randomizer.
        Also call happiness function to see if user has won or if user has
        lost and clicked the butthole.
    */
    const feelingFeline = () => {
        for (let i = 0; i < catGame.catBodyPart.length; i++) {
            $(catGame.catBodyPart[i]).on('click touchstart', function () {
                let petting = $(catGame.catBodyPart[i]).data().part;

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
                    checkHappiness();

                } else {
                    console.log(`wrong body part`);
                    checkHappiness();
                }

            })
        };
    }

    /*[CHECK HAPPINESS LEVEL FUNCTION]
        Check to see if happiness level is max -> game win screen
        Else check to see if happiness level is negative -> touched the butthole
        and end the game.
    */
    const checkHappiness = () => {
        if (catGame.happiness === 3) {
            catGame.happinessDiv.innerHTML = `<h2>You win! </h2>`;
            catGame.timerDiv.innerHTML = `<h2> You finished with ${catGame.timer} seconds remaining!</h2>`
            $('.catBody').hide();
            $('.winning-screen').show();
            catGame.catBodyPart.off(); /*cannot click catBody*/
            catGame.reset();
        } else if (catGame.happiness < 0) {
            catGame.catBodyPart.off(); /*cannot click catBody*/
            catGame.reset();
        }
    }

    /*[CHANGE FAVORITE SPOT FUNCTION]
        When user gets a correct pet, randomize the petting spot again
        and reset the correct pet count.
    */
    const changeFavoriteSpot = () => {
        if (catGame.correctPetCount == 1) {
            catGame.correctPetCount = 0; /*must set to 0 again or else it never randomizes again*/
            catGame.setRandomBody(); /*get random body part*/
        }

    }

    catGame.init();
});