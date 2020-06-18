//
"use strict";
/**
//Exercise 1

console.log("Hello from external Javascript!");
alert("Welcome to my Website!");


//Exercise 2

var colorPrompt = prompt("What is your favorite color?");
alert("No way!\n" + colorPrompt + " is my favorite color, too!")
*/




//Exercise 3
//Movie exercise

/**
You have rented some movies for your kids: The little mermaid (for 3 days), Brother Bear (for 5 days, they love it), and Hercules (1 day, you don't know yet if they're going to like it). If price for a movie per day is $3, how much will you have to pay?


let rentPrompt = "How many days are you renting ";
let movieCost = prompt("Without using a dollar sign, how much is the rental per movie?");
let movie1 = prompt("What is the name of the first movie?");
let movie1Days = prompt(rentPrompt + movie1);
let movie2 = prompt("What is the name of the second movie?");
let movie2Days = prompt(rentPrompt + movie2);
let movie3 = prompt("What is the name of the third movie?");
let movie3Days = prompt(rentPrompt + movie3);

alert("Your total cost for renting " + (movie1 + ", " + movie2 + " and " + movie3) + " is $" + ((movieCost * movie1Days) + (movieCost * movie2Days) + (movieCost * movie3Days)));
*/



//Wages exercise

/**
 Suppose you're working as a contractor for 3 companies: Google, Amazon and Facebook, they pay you a different rate per hour. Google pays $400, Amazon $380, and Facebook $350. How much will you receive in payment for this week? You worked 10 hours for Facebook, 6 hours for Google and 4 hours for Amazon.



let laborMessage = "How many hours did you work for ";
let wageMessage = "What is your hourly wage (numbers only) for ";

let company1 = prompt("What is the name of the first company?");
let company1Wage = prompt(wageMessage + company1 + " ?");
let company1Labor = prompt(laborMessage + company1);
let company1TotalWages = company1Wage * company1Labor;

let company2 = prompt("What is the name of the second company?");
let company2Wage = prompt(wageMessage + company2 + " ?");
let company2Labor = prompt(laborMessage + company2);
let company2TotalWages = company2Wage * company2Labor;

var company3 = prompt("What is the name of the third company?");
var company3Wage = prompt(wageMessage + company3 + " ?");
var company3Labor = prompt(laborMessage + company3);
var company3TotalWages = company3Wage * company3Labor;

var totalWages = company1TotalWages + company2TotalWages + company3TotalWages;
alert("You earned " + totalWages + " from " + company1 + ", " + company2 + " " + company3 +"!");
*/

/**
g 400 6
a 380 4
fb350 10
*/
//Schedule exercise

/**
 A student can be enrolled in a class only if the class is not full and the class schedule does not conflict with her current schedule.
 */
/**
let isClassFull = confirm("Is the class full?");
let isScheduleOpen = confirm("Does this class conflict with your schedule?");

if (isClassFull == true && isScheduleOpen == true) {
    alert("You may register")
}   else {
    alert("You may not register.")
}
*/


//Coupon exercise
//Code format courtesy of Jon P.
/**
 A product offer can be applied only if a person buys more than 2 items, and the offer has not expired. Premium members do not need to buy a specific amount of products.
*/

/**

 let numberItemsPurchased = parseInt(prompt("How many items did you purchase?"));
 let offerExpiration = confirm("Has the offer expired?");
 let premiumMember = confirm("Are you a premium member?");
 if (offerExpiration && (premiumMember || numberItemsPurchased >= 2)) {
    alert("The product offer applies.")
} else {
    alert("The product offer does not apply.")
}


 */