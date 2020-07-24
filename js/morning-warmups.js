// For morning-warmups.html
"use strict"

let fizzBuzz = function(num) {

    if (typeof num !== 'number') {
        return null;
    } else if (num % 15 === 0) {
        return "FIZZBUZZ";
    } else if (num % 3 === 0) {
        return "FIZZ";
    } else if (num % 5 === 0) {
        return "BUZZ";
    } else {
        return num;
    }
}
console.log(fizzBuzz(3));
console.log(fizzBuzz(5));
console.log(fizzBuzz(15));
console.log(fizzBuzz("hello"));
console.log(fizzBuzz(6));
console.log(fizzBuzz(13));
console.log(fizzBuzz(30));


let evenlyDivisible = function (num1, num2) {
    if (typeof num1 === "number" && typeof num2 === "number"){
        return num1 % num2 === 0;
    } else {
        return null;
    }

}
console.log(evenlyDivisible(4, 2));
console.log(evenlyDivisible(5, 2));
console.log(evenlyDivisible("hello", 3));
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
/**
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