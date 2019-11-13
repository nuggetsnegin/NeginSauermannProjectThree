$(function () {
    /*check if dom is ready*/

    /*cat game object, has happy level which starts at 0 and will be incremented later
    has an array of the cat body which will be selected during randomizer method*/
    const catGame = {
        happiness: 0,
        catBody: ['head', 'back', 'tail', 'frontLegs', 'belly', 'backLegs'],
        correctPetCount: 0,
        favoriteBodyPart: null
    }

    let timer = 30; /*set timer maximum*/
    const timerSpeed = setInterval(countdown, 1000); /*how quickly it countsdown, 1 second*/
    const timerDiv = document.getElementById('timer'); /*find timer div to display timer*/

    function countdown() {
        if (timer == 0) {
            /*when 0 change html to show out of time*/
            clearTimeout(timerSpeed);
            timerDiv.innerHTML = `<h2> out of time! </h2>`;
            return 'noTime';
        } else {
            timerDiv.innerHTML = `<h2> ${timer} seconds remaining</h2>`;
            timer--; /*reduce countdown*/
            return 'gotTime';
        }
    }

    const getRandomBodyPart = (catBody) => {
        /*goes from 0 to 5 to correspond with array elements of catBody*/
        let random = Math.floor((Math.random() * 6));
        return catBody[random]; /*returning the randomized body part*/
    }

    /*setting favorite body part from cat obj to the randomBody part method return value*/
    catGame.favoriteBodyPart = getRandomBodyPart(catGame.catBody);

    const pet = () => {
        /*get cadBody div and find all its children and set it to catBodyContainer*/
        const catBodyContainer = $(".catBody").children();
        const happinessDiv = document.getElementById('happiness'); /*find timer div to display timer*/
        console.log(catBodyContainer);

        for (let i = 0; i < catBodyContainer.length; i++) {
            $(catBodyContainer[i]).click(function () {
                let petting = $(catBodyContainer[i]).data().part;
                console.log(petting);

                if (petting === catGame.favoriteBodyPart) {
                    catGame.correctPetCount++; /*tracking correct pets*/
                    // console.log(`CORRECT PET COUNT ${catGame.correctPetCount}`);
                    catGame.happiness++; /*adding to cat happiness level*/
                    happinessDiv.innerHTML = `<h2>Happiness: ${catGame.happiness}</h2>`;
                    if (catGame.happiness === 10) {
                        /*win condition*/
                        console.log('You win!'); /*game win screen*/
                    }

                    if (catGame.correctPetCount == 1) {
                        /*must set to 0 again or else it never randomizes again*/
                        catGame.correctPetCount = 0;
                        /*randomize catBody part again*/
                        catGame.favoriteBodyPart = getRandomBodyPart(catGame.catBody);
                    }
                }

            });
        }
    }
    pet();
    countdown();



});