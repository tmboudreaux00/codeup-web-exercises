//LOOPS EXERCISES
'use strict'
console.log("Welcome to loops exercises");

//Exercises
let x;
/**
let showMultiplicationTable = function(x) {
    let y = 0;
    while (y <= 10) {
        console.log(x * y);
        y++;
    }
}
showMultiplicationTable(7);

for (let i = 1; i <= 10; i++) {
    x = Math.floor((Math.random()*180) + 21);
        if (x % 2 === 0) {
            console.log(x + " is even");
        } else {
            console.log(x + " is odd");
        }
    }
*/

for (let i = 1; i < 10; i++) {
  let str = "";
  for (let j = 1; j <= i; j++) {
      str += i;
  }
    console.log(str);
}

for (let i = 100; i >= 0; i-=5) {
    console.log(i);
}



//Lesson Material
/**
 let times = 0;

 while (times < 10) {
    times++;
    console.log("We have done this " + times + " times.");
}
 console.log("We are done");

 let bottles = 99;

 while (bottles > 0) {
    console.log(bottles + " bottles of beer on the wall");
    console.log(bottles + " bottles of beer");
    console.log("Take one down,");
    console.log("Pass it around");
    bottles--;
    console.log(bottles + " bottles of beer on the wall");
}


 // while loop
 let x = 1;
 while (x <= 10) {
    console.log(x);
    x++;
}

 // for loops
 for (let i = 1; i <= 10; i++) {
    console.log(i);
}

 console.log("We are done");


 let multiply = function(x, y) {
    let answer = 0;
    for (let i = 0; i < y; i++) {
        answer += x;
    }
    return answer;
}
 console.log(multiply(4, 5));
 console.log(multiply(10, 20));
 */

