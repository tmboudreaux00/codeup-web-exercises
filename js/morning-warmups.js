// For morning-warmups.html
"use strict"

let lengthInch = function(num) {
    if (num < 12) {
        return ("Length is " + num + " inches")
    } else if (num === 12) {
        return ("Length is one foot");
    } else {
        return Math.floor(num/12) + "ft " + (num % 12) + "in";
    }
}
console.log(lengthInch(2));
console.log(lengthInch(12));
console.log(lengthInch(22));


let sortArray = function (arr) {
    for(let i = 0; i<arr.length; i++){
        if (typeof arr[i] !== 'string'){
            return null;
        }
    }
    return arr.sort().reverse();
};
console.log(sortArray(["able", "baker", "charlie", "dog", "easy"]));
console.log(sortArray(["zebra", "yoke", "x-ray", 3]));

let tensPosition = function (num) {
    return tensPosition = Math.floor((num / 100));
    return tensPosition/10;
}
console.log(tensPosition(345));


var fibonacci_series = function (n)
{
    if (n===1)
    {
        return [0, 1];
    }
    else
    {
        var s = fibonacci_series(n - 1);
        s.push(s[s.length - 1] + s[s.length - 2]);
        return s;
    }
};

console.log(fibonacci_series(8));

/**
let fibonacci = function () {
    let num = 1;
    let num2 = 0;
    for (let i = 0; i < 30; i++) {
        let fNum = num + num2;
        return fNum;
    } if (i <)
}
*/

let fizzBuzz = function() {
    for (let i = 1; i < 31; i++) {
        if (i % 15 === 0) {
            console.log("fizzbuzz");
        } else if (i % 3 === 0) {
            console.log("fizz");
        } else if (i % 5 === 0) {
            console.log("buzz");;
        } else {
            console.log(i);;
        }
    }
}
fizzBuzz();


//INCOMPLETE - WALKTHROUGH DID NOT MAKE SENSE
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