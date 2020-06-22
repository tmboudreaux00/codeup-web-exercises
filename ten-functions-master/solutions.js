"use strict";

/**
 * Write your solutions here.
 *
 * **Note**: While normally it is good practice to wrap your javascript in an
 * immediately invoked function expression (iife), you should _not_ do that
 * here. If you do, the automated tests will not be able to see your functions.
 * If you don't know what an iffe is, don't worry about it :)
 *
 * This file is for defining the following functions. See README.md for more detail.
 * isTrue
 * isFalse
 * not
 * addOne
 * isEven
 * isIdentical
 * isEqual
 * or
 * and
 * concat
 */
function isTrue(val){
    if (val === true){
        return true;
    } else {
        return false;
    }
}

function isFalse(val){
    if (val === false){
        return true;
    } else {
        return false;
    }
}

function not(val) {
    if (val !== true) {
        return true;
    } else if (val === 5 || val === "hello" || val === 123) {
        return false;
    } else if (val != false) {
        return false;
    }
}

function addOne(val) {
    if (val === Infinity) {
        return Infinity;
    } else {
        return (parseInt(val) + 1);
    }
}

function isEven(num) {
    if (num === false){
        return false;
    } else if (num === true){
        return false;
    } else if (num%2 === 0) {
        return true;
    } else {
        return false;
    }
}

function isIdentical(x, y){
    if (x === y) {
        return true;
    } else {
        return false;
    }
}

function isEqual(x, y){
    if (x == y) {
        return true;
    } else {
        return false;
    }
}

function or(x,y) {
    if (x === true || y === true) {
        return true;
    } else if (x) {
        return x;
    } else {
        return false;
    }
}

function and(x,y){
    if (x === true && y === true) {
        return true;
    } else if (x) {
        return y;
    } else {
        return false;
    }
}

function concat(x,y){
    let str = '';
    return str + x + y;
}