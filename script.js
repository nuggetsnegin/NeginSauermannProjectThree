

/*cat game object, has happy level which starts at 0 and will be incremented later
has an array of the cat body which will be selected during randomizer method*/
catGame = { 
    happiness: 0, 
    catBody: ['head','back','tail','frontLegs','belly','backLegs'],
    correctPetCount: 0 /*global scope so it doesnt reset*/
}

const userEvents = () => {

    /*get cadBody div and find all its children and set it to catBodyContainer*/
    const catBodyContainer = $(".catBody").children();
    console.log(catBodyContainer);

    /*iterating through the array catBodyContainer and finding all
    its children elements i.e. head, back, tail*/
    for(let i = 0; i < catBodyContainer.length; i++){
        $(catBodyContainer[i]).click(function(){
            console.log($(catBodyContainer[i]).data().part);
        });
    }

}

userEvents();

const getRandomBodyPart = (catBody) => {
    /*goes from 0 to 5 to correspond with array elements of catBody*/
    let random = Math.floor((Math.random() * 6)); 
    return catBody[random]; /*returning the randomized body part*/
}

/*this will call the bodyRandomize function with the parameter of catBody inside catGame.stats*/
getRandomBodyPart(catGame.catBody); 



const pet = (catBodyPart) => {
    let petting;

    if(petting === catBody){
        correctPettingCount++; /*tracking correct pets*/
        catGame.stats.happiness++; /*adding to cat happiness level*/
        if(catGame.stats.happiness === 10){ /*win condition*/
            console.log('You win!'); /*game win screen*/
        }

        if(correctPettingCount == 2){
            getRandomBodyPart(); /*randomize catBody part again*/
        }
    }

}
