"use strict";

/* ########################################################################## */

/**
 * TODO:
 * Create a function named `analyzeColor` that accepts a string that is a color
 * name as input. This function should return a message that related to that
 * color. Only worry about the colors defined below, if the color passed is not
 * one of the ones defined below, return a message that says so
 *
 * Example:
 *  > analyzeColor('blue') // returns "blue is the color of the sky"
 *  > analyzeColor('red') // returns "Strawberries are red"
 *  > analyzeColor('cyan') // returns "I don't know anything about cyan"
 *
 * You should use an if-else-if-else block to return different messages.
 *
 * Test your function by passing various string literals to it and
 * console.logging the function's return value
 */

let analyzeColor = function (color) {
    if (color === "blue") {
        return ("Blue is the color of the sky")
    } else if (color === "red") {
        return ("Strawberries are red")
    } else {
        return ("I don't know anything about the color " + color)
    }
}
//console.log(analyzeColor("cyan"));

// Don't change the next two lines!
// These lines create two variables for you:
// - `colors`: a list of the colors of the rainbow
// - `randomColor`: contains a single random color value from the list (this
//                  will contain a different color every time the page loads)
var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
var randomColor = colors[Math.floor(Math.random() * colors.length)];
/**
 * TODO:
 * Pass the `randomColor` variable to your function and console.log the results.
 * You should see a different message every time you refresh the page
 */
//Random Color Picker
/**
 let colorPicker = function(){
    return("Your random color is " + randomColor)
}
 console.log(colorPicker());
 */
/**
 * TODO:
 * Refactor your above function to use a switch-case statement
 */
var colorPicker = randomColor;

switch (colorPicker) {
    case randomColor:
        break;
}
//console.log(colorPicker);

/**
 * TODO:
 * Prompt the user for a color when the page loads, and pass the input from the
 * user to your `analyzeColor` function. Alert the return value from your
 * function to show it to the user.
 */

//var userColor = prompt("Please provide a color")
//alert(analyzeColor(userColor));

/* ########################################################################## */

/**
 * TODO:
 * Suppose there's a promotion in Walmart, each customer is given a randomly
 * generated "lucky number" between 0 and 5. If your lucky number is 0 you have
 * no discount, if your lucky number is 1 you'll get a 10% discount, if it's 2,
 * the discount is 25%, if it's 3, 35%, if it's 4, 50%, and if it's 5 you'll get
 * all for free!.
 *
 * Write a function named `calculateTotal` that accepts a lucky number and total
 * amount, and returns the discounted price.
 *
 * Example:
 * calculateTotal(0, 100) // returns 100
 * calculateTotal(4, 100) // returns 50
 * calculateTotal(5, 100) // returns 0
 *
 * Test your function by passing it various values and checking for the expected
 * return value.
 */

/**
let promoRandom = Math.floor(Math.random() * 6);
let calculateTotal = function (promoRandom, y) {
    if (promoRandom === 0) {
        alert("Sorry, you do not get a discount. Your total is $" + y)
    } else if (promoRandom === 1) {
        alert("Congratulations! You received a 10% discount! Your total is now $" + (y - (y * .10)))
    } else if (promoRandom === 2) {
        alert("Congratulations! You received 25% discount! Your total is now $" + (y - (y * .25)))
    } else if (promoRandom === 3) {
        alert("Congratulations! You received 35% discount! Your total is now $" + (y - (y * .35)))
    } else if (promoRandom === 4) {
        alert("Congratulations! You received 50% discount! Your total is now $" + (y - (y * .5)))
    } else {
        alert("Congratulations! You received 100% discount! Your total is now $" + (y - (y * 1)))
    }
}
*/
/**
 * TODO:
 * Uncomment the line below to generate a random number between 0 and 6.
 * Prompt the user for their total bill, then use your `calculateTotal` function
 * and alerts to display to the user what their lucky number was, what their
 * price before the discount was, and what their price after the discount is.
 */
//Generate a random number between 0 and 6

    /**
var luckyNumber = Math.floor(Math.random() * 6);

let calculateTotal = prompt("How much was your grocery bill?");
switch (luckyNumber) {
    case 0:
        alert("Sorry, no discount.")
        break;
    case 1:
        alert("Congratulations! You received a 10% discount! Your grocery bill is now $" + ((calculateTotal) - (calculateTotal * .10)));
        break;
    case 2:
        alert("Congratulations! You received a 25% discount! Your grocery bill is now $" + ((calculateTotal) - (calculateTotal * .25)));
        break;
    case 3:
        alert("Congratulations! You received a 35% discount! Your grocery bill is now $" + ((calculateTotal) - (calculateTotal * .35)));
        break;
    case 4:
        alert("Congratulations! You received a 50% discount! Your grocery bill is now $" + ((calculateTotal) - (calculateTotal * .50)));
        break;
    default:
        alert("Congratulations! You received a 100% discount! Your total is $0!")
        break;
}

*/


/**
 * TODO:
 * Write some JavaScript that uses a `confirm` dialog to ask the user if they
 * would like to enter a number. If they click 'Ok', prompt the user for a
 * number, then use 3 separate alerts to tell the user:
 *
 * - whether the number is even or odd
 * - what the number plus 100 is
 * - if the number is negative or positive
 *
 * if what the user enters is not a number, use an alert to tell them that, and
 * do *not* display any of the above information.
 *
 * Can you refactor your code to use functions?
 * HINT: The way we prompt for a value could be improved
 */


let pickNumberConfirm = confirm("Would you like to enter a number?");

if (pickNumberConfirm === true) {
    var pickNumber = prompt("Please enter a number.");
    //Confirms if entry is a number
    if (isNaN(pickNumber) === true) {
        alert("Please refresh the page and enter a valid number.")
    } else {
        //Confirms if number is 0
        if (parseInt(pickNumber) === 0) {
            alert("Your number is neither odd nor even because it holds no value.");
            alert("Your number is neither positive nor negative because it holds no value.")
        } else {

            //Confirms if number is odd/even
            if (pickNumber % 2 === 0) {
                alert("Your number is even!")
            } else {
                alert("Your number is odd!");
            }

            //Confirms if number is pos/neg
            if (pickNumber > 0) {
                alert("Your number is positive!")
            } else {
                alert("Your number is negative!")
            }
        }
            //Adds number with 100
            alert("Your number plus 100 equals " + (parseInt(pickNumber) + 100))
        }
    } else {
    alert("Please refresh the page and pick a number")
}