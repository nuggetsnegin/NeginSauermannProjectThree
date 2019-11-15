$(function () {
    /*[CAT GAME OBJECT]
        Initialize happiness level, cat body part array, 
        favoriteBody part, correctPetCount counter and timer.
    */

    /*to do randomize array for cat images*/
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
                $('.losingScreen').show();
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
                randomCat();
                gameOver.pause();
                gameWin.pause();
                audio.play();
                $('.catBody').show();
                catGame.setRandomBody();
                catGame.timerSpeed = setInterval(catGame.countdown, 1000); /*1 second countdown speed*/
                catGame.timer = 30;
                catGame.happiness = 0; /*what happens if I dont set it to 0?*/
                $('.happiness').show();
                $('.happiness').append(`Happiness: `);
                catGame.hide();
            });
        },
        /*[HIDE METHOD]
            Elements to hide when user starts game.
        */
        hide: function () {
            $('.instructions').hide();
            $('.winningScreen').hide();
            $('.losingScreen').hide();
            $('footer').hide();
            $('.buttToucher').hide();
            $(catGame.button).hide(); /*so user doesnt spam button*/
        },
        /*[RESET METHOD]
            Stop timer and show button again and
            change button from 'start' to 'play again'.
        */
        reset: function () {
            clearTimeout(catGame.timerSpeed); /*stop timer*/
            $(catGame.button).show().text('play again?');
            $('.happiness').html(""); /*clear appended happiness so it does not stack*/
            audio.pause();
            $('.catBody').removeClass('youDidABadThing');
            $('.catBody').removeClass('yes');
            $('.catBody').removeClass('no');
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
        Lastly, remove animation on end outside of for loop so animations
        work on click and duplicate clicks.
    */
    const feelingFeline = () => {

        $('.catBody').on("animationend", function () {
            $(this).removeClass('no yes youDidABadThing');
        });

        for (let i = 0; i < catGame.catBodyPart.length; i++) {
            $(catGame.catBodyPart[i]).on('click touchstart', function () {

                let petting = $(catGame.catBodyPart[i]).data().part;
                console.log(petting);
                if (petting === catGame.favoriteBodyPart) {
                    $('.catBody').addClass('yes');
                    catGame.correctPetCount++;
                    catGame.happiness++;
                    $('.happiness').append(`<i class="fas fa-heart"></i>`);
                    checkHappiness();
                    changeFavoriteSpot();
                    meow.play();

                } else if (petting === catGame.butthole) {
                    /*touched the butt*/
                    catGame.happiness = -1000;
                    dead.play();
                    $('.catBody').addClass('youDidABadThing').fadeOut();
                    $('.buttToucher').show();
                    checkHappiness();

                } else if (petting !== catGame.favoriteBodyPart) {
                    console.log(`wrong body part`);
                    checkHappiness();
                    $('.catBody').addClass('no');
                    // $('.catBody').css('background-image', 'url(./assets/cat-2.png)');
                } else console.log('error');
            })
        };
    }

    /*[CHECK HAPPINESS LEVEL FUNCTION]
        Check to see if happiness level is max -> game win screen & call reset.
        Else check to see if happiness level is negative -> touched the butthole
        and end the game and call reset. 
    */
    const checkHappiness = () => {
        if (catGame.happiness === 5) {
            catGame.timerDiv.innerHTML = `<h2> You finished with ${catGame.timer} seconds remaining!</h2>`
            $('.happiness').hide();
            $('.catBody').hide();
            $('.winningScreen').show();
            gameWin.play();
            catGame.reset();
        } else if (catGame.happiness < 0) {
            gameOver.play();
            catGame.reset();
        }
    }

    /*[CHANGE FAVORITE SPOT FUNCTION]
        When user gets a correct pet, randomize the petting spot again
        and reset the correct pet count.
    */
    const changeFavoriteSpot = () => {
        if (catGame.correctPetCount == 1) {
            catGame.correctPetCount = 0;
            catGame.setRandomBody();
        }

    }

 /*[RANDOM CAT]
    Randomizing cat images using an array of
    cat images and using math.random + floor based and grabbing
    from the array! changing the css bg image! 
*/
    const randomCat = () =>{
        let catImage = ['cat-1.png', 'cat-3.png', 'cat-4.png', 'cat-5.png', 'cat-6.png', 'cat-7.png', 'cat-8.png', 'cat-9.png'];
        $('.catBody').css({'background-image': 'url(./assets/' + catImage[Math.floor(Math.random() * catImage.length)] + ')'});
    }


    /*[AUDIO AS GLOBAL VARIABLES]
        Audio from: Wario Land 3, Kirby SuperStar, Animal Crossing N64,
        and Cave Story.
    */
    let audio = document.createElement('audio');
    audio.setAttribute('src', './assets/wario.mp3');
    audio.loop=true;
    let dead = document.createElement('audio');
    dead.setAttribute('src', './assets/died.mp3');
    let meow = document.createElement('audio');
    meow.setAttribute('src', './assets/meow.wav');
    let gameOver = document.createElement('audio');
    gameOver.setAttribute('src', './assets/gameOver.mp3');
    let gameWin = document.createElement('audio');
    gameWin.setAttribute('src', './assets/kirby.mp3');

    catGame.init();
});