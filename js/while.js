//While loops
"use strict"

let twoPowerTwo = 2;
while (twoPowerTwo <= 65536) {
    console.log(twoPowerTwo);
    twoPowerTwo *= 2;
}

// This is how you get a random number between 50 and 100



// This expression will generate a random number between 1 and 5

var allCones = Math.floor(Math.random() * 50) + 50;
let conesSold = 0;
console.log("We have a total of " + allCones + " cones to sell today.");
do {
    conesSold = Math.floor(Math.random() * 5) + 1;
    allCones -= conesSold; //same as allCones = allCones - conesSold;
    if (conesSold <= allCones) {
        allCones = allCones - conesSold;
        console.log(conesSold + " cones sold");//if there are enough cones
    } else {
        console.log("Cannot sell you " + conesSold + " cones I only have " + allCones + "...");
    }
    // while (conesSold > allCones && allCones > 0) {
    //     console.log("Sorry, we are unable to sell " + conesSold + " because we have " + allCones + " remaining.");
    //     break;
    // }
    // if (conesSold < allCones && conesSold !== 1) {
    //
    //     console.log(conesSold + " cones sold! We have " + allCones + " remaining.");
    //
    // } else if (conesSold < allCones && conesSold === 1) {
    //     console.log(conesSold + " cone sold! We have " + allCones + " remaining."); // for proper grammar
    //
    // } else if (conesSold === allCones) {
    //     console.log("You bought the last " + conesSold + ", and we are out of cones to sell!");
    //
    // }
} while (allCones > 0);//(conesSold <= allCones);

 /**
5 cones sold...  // if there are enough cones
Cannot sell you 6 cones I only have 3...  // If there are not enough cones
    Yay! I sold them all! // If there are no more cones
*/

/**
let allCones = Math.floor(Math.random() * 50) + 50;
console.log("We have " + allCones + " cones to sell.")

let beingBought = 0;

do {
    beingBought = Math.floor(Math.random() * 5) + 1;
    allCones = allCones - beingBought;
    console.log(beingBought + " cones sold.");
    console.log(allCones + " cones are left.");

    if (beingBought > allCones) {
        console.log("I cannot sell you " + beingBought + " cones. I only have " + allCones + " cones left.");
    }

} while (allCones >= beingBought);
*/