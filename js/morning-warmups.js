// For morning-warmups.html
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