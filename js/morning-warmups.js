// For morning-warmups.html
"use strict"



//INCOMPLETE - WALKTHROUGH DID NOT MAKE SENSE - EXAMPLE CODE DID NOT MAKE SENSE - TOO MUCH SIDEBAR
/**
let str1 = "SSttrriinngg", str2 = "HHeelllloo  WWoorrlldd", str3 = "11223344!!__  ";

let doubleChar = function(str) {
    let returnString = '';
    for (let i = 0; i < str.length; i++) {
                //first i = 0, returnString += str[0] + str[0] === returnString += 'a' + 'a'
                // second i = 1, returnString += str[1] + str[1] === returnString += 'b' + 'b'
                // third i = 2, returnString += str[2] + str[2] === returnString += 'c' + 'c'
                returnString += str[i] + str[i];
                console.log(returnString);
            }
            return returnString;
        }
        returnString += str[i] + str[i];
        console.log(returnString);
    }

    return returnString;
}
doubleChar(str);

*/

let lights = "on";
let lightSwitch = function () {
    if (lights === "on") {
        lights = "off";
    } else {
        lights = "on";
    }
}
console.log("lights are " + lights);
lightSwitch();
console.log("lights are " + lights);
lightSwitch();
console.log("lights are " + lights);
lightSwitch();
console.log("lights are " + lights);
lightSwitch();
console.log("lights are " + lights);

let numbers = [1, 2, 3, 4, 5, 6, 7, 8];
let randomNumber = numbers[Math.floor(Math.random() * numbers.length)];

let magic8Ball = function(randomInt){
    if (randomInt === 1) {
        return "As I see it, yes";
    } else if (randomInt === 2) {
        return "2";
    } else if (randomInt === 3) {
        return "3";
    } else if (randomInt === 4) {
        return "4";
    } else if (randomInt === 5) {
        return "5";
    } else if (randomInt === 6) {
        return "6";
    } else if (randomInt === 7) {
        return "7";
    } else if (randomInt === 8) {
        return "8";
    }
}
console.log(magic8Ball(randomNumber));

let countBy = function(x, y) {
    console.log(x);
    x += y;
    console.log(x);
    x += y;
    console.log(x);
    x += y;
    console.log(x);
    x += y;
    console.log(x);
}
countBy(10, 5);

function printEvens() {
    for (var i = 1; i < 21; i++) {
        if (i % 2 == 0) {
            console.log(i);
        }
    }
}
printEvens();


function isEven(num) {
    if (num%2 === 0)
        return true;
    else
        return false;
}
console.log(isEven(111));
console.log(isEven(202));

function returnTypeOf (input) {
    return typeof input;
}
console.log (returnTypeOf("hello"));
console.log (returnTypeOf(123));
console.log (returnTypeOf(12===12))


function returnArguments(arg) {
    return arg;
}
console.log (returnArguments("Return the argument"))


function squareRoot(num){
    return Math.sqrt(num);
}
console.log (squareRoot(100))



function diameterOfCircle(radius) {
    return radius * 2;
}
console.log (diameterOfCircle(125));



function numberInString(str){
    return stringLength(str);
}
console.log(stringLength("hello everybody"));



function stringLength(str) {
    return str.length;
}
console.log(stringLength("hello everybody"));

function returnNumberSeven () {
    return (7);
}
console.log(returnNumberSeven());




function countNextFive(num) {
    console.log(num);
    console.log(num +1);
    console.log(num +2);
    console.log(num +3);
    console.log(num +4);

}
countNextFive(105);




//var name = prompt ("Happy birthday! What is your name?");
//function happyBirthday () {
//    alert("Happy birthday to you.");
//    alert(" Happy birthday to you.");
//    alert("Happy birthday dear " + name + ",");
//    alert("Happy birthday to you.");
//}
//happyBirthday();