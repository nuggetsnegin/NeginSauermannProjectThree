$(function () {/*check if dom is ready*/

    /*cat game object, has happy level which starts at 0 and will be incremented later
    has an array of the cat body which will be selected during randomizer method*/
    const catGame = {
        happiness: 0,
        catBody: ['head', 'back', 'tail', 'frontLegs', 'belly', 'backLegs'],
        correctPetCount: 0,
        favoriteBodyPart: null
    }

    let timer = 30;
    const timerId = setInterval(countdown, 1000);
    const elem = document.getElementById('timer');

    function countdown() {
        if (timer == 0) {
            clearTimeout(timerId);
            elem.innerHTML = 'Out of time!';
        } else {
            elem.innerHTML = timer + ' seconds remaining';
            timer--;
        }
    }
    countdown();


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
        console.log(catBodyContainer);

        /*iterating through the array catBodyContainer and finding all
        its children elements i.e. head, back, tail*/
        for (let i = 0; i < catBodyContainer.length; i++) {
            $(catBodyContainer[i]).click(function () {
                let petting = $(catBodyContainer[i]).data().part;
                console.log(petting);

                if (petting === catGame.favoriteBodyPart) {
                    catGame.correctPetCount++; /*tracking correct pets*/
                    console.log(`CORRECT PET COUNT ${catGame.correctPetCount}`);
                    catGame.happiness++; /*adding to cat happiness level*/
                    console.log(`HAPPINESS: ${catGame.happiness}`);
                    if (catGame.happiness === 10) {
                        /*win condition*/
                        console.log('You win!'); /*game win screen*/
                    }

                    if (catGame.correctPetCount == 1) {
                        catGame.correctPetCount = 0; /*must set to 0 again or else it never randomizes again*/
                        catGame.favoriteBodyPart = getRandomBodyPart(catGame.catBody); /*randomize catBody part again*/
                    }
                }

            });
        }
    }
    pet();



});