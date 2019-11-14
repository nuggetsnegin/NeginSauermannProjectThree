$(function () {
    /*cat game object, has happy level which starts at 0 and will be incremented later
    has an array of the cat body which will be selected during randomizer method*/
    const catGame = {
        happiness: 0,
        catBody: ['head', 'back', 'tail', 'frontLegs', 'belly', 'backLegs'],
        correctPetCount: 0,
        favoriteBodyPart: null,
        timer: 0,
        countdown: function () {
            if (catGame.timer == 0) {
                /*when 0 change html to show out of time*/
                catGame.reset();
                catGame.timerDiv.innerHTML = `<h2> out of time! </h2>`;
                $('.losing-screen').toggle();
                $('.catBody').hide();
            } else {
                catGame.timerDiv.innerHTML = `<h2> ${catGame.timer} seconds remaining</h2>`;
                catGame.timer--; /*reduce countdown*/
            }
        },
        domGetter: function () {
            catGame.timerDiv = document.getElementById('timer'); /*find timer div to display timer*/
            catGame.happinessDiv = document.getElementById('happiness'); /*find timer div to display timer*/
            catGame.catBodyPart = $(".catBody").children(); /*get cadBody div and find all its children and set it to catBodyContainer*/
            catGame.button = document.getElementById('start');
        },
        setRandomBody: function () {
            let random = Math.floor((Math.random() * 6));
            catGame.favoriteBodyPart = catGame.catBody[random];
        },
        start: function () {
            $(catGame.button).click(function () {
                catGame.timerSpeed = setInterval(catGame.countdown, 1000); /*1 second countdown speed*/
                catGame.setRandomBody();
                catGame.timer = 30; /*set timer to 30*/
                catGame.happiness = 0; /*reset score*/
                catGame.happinessDiv.innerHTML = `<h2>Happiness: 0</h2>`;
                $(catGame.button).hide(); /*so user doesnt spam button*/
                $('.winning-screen').hide();
                $('.losing-screen').hide();
                $('.catBody').show();
            });
        },
        reset: function () {
            $(catGame.button).text('play again?');
            $(catGame.button).show(); /*show button again*/
            clearTimeout(catGame.timerSpeed); /*stop timer*/
            catGame.catBodyPart.off();
        },
        init: function () {
            catGame.domGetter();
            catGame.start();
            feelingFeline();
        }
    }
    const feelingFeline = () => {
        for (let i = 0; i < catGame.catBodyPart.length; i++) {
            $(catGame.catBodyPart[i]).on("click", function () {
                $(".catBody").removeClass("yes");
                $(".catBody").removeClass("no");
                let petting = $(catGame.catBodyPart[i]).data().part;

                if (petting === catGame.favoriteBodyPart) {
                    catGame.correctPetCount++; /*tracking correct pets*/
                    catGame.happiness++; /*adding to cat happiness level*/
                    catGame.happinessDiv.innerHTML = `<h2>Happiness: ${catGame.happiness}</h2>`;
                    checkHappiness();
                    changeFavoriteSpot();
                    $(".catBody").addClass("yes");
                }
                else{
                    $(".catBody").addClass("no");
                    
                }
            });
        }

        const checkHappiness = () => {

            if (catGame.happiness === 10) {
                /*you win!*/
                catGame.happinessDiv.innerHTML = `<h2>You win! </h2>`;
                catGame.timerDiv.innerHTML = `<h2> You finished with ${catGame.timer} seconds remaining!</h2>`
                $('.winning-screen').toggle();
                $('.catBody').toggle();
                catGame.reset();
            }
        }

        const changeFavoriteSpot = () => {
            if (catGame.correctPetCount == 1) {
                catGame.correctPetCount = 0; /*must set to 0 again or else it never randomizes again*/
                catGame.setRandomBody(); /*get random body part*/
            }

        }

    }
    catGame.init();



});