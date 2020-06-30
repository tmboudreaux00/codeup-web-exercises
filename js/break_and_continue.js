//Break and continue for loops.html
"use strict"



let userInput = parseFloat(prompt("Enter an odd number between 1 and 50."));

while (isNaN(userInput) || userInput % 2 === 0 || userInput < 1 || userInput > 50) {
    alert("Please enter a valid number.");
    userInput = parseFloat(prompt("Enter an odd number between 1 and 50."));
    if (userInput % 2 !== 0 && userInput > 0 && userInput <= 50) {
        break;
    }
}
for (var i = 1; i < 50; i++) {
    if (i % 2 === 0) {
            continue;
    }
    if (i === userInput) {
            console.log("Yikes! Skipping number: " + userInput);
            continue;
    }
    console.log("Here is an odd number: " + i);
}