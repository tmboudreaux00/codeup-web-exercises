//FOR ARRAYS.HTML
/**
var animals = ['lions', 'tigers', 'bears', 3, ['scarecrow', 'tinman', 'cowardly-lion']];
console.log(animals);
console.log(animals.length);



var fruits = ['banana', 'orange', 'apple', 'mango'];

for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i] + " is at index " + i);
}

var americanLeagueWest = ['astros','athletics','rainjers','angels','mariners'];

americanLeagueWest.forEach(function(element, index, array) {
    console.log("The team at position "+ index + " is " + "the " + element + " in the " + array + " array.");
});
*/
/**
let weekdays = ['Monday','Tuesday','Wednesday','Thursday','Friday'];
console.log(weekdays.length);

let week = weekdays;
week.unshift('Sunday')
console.log(week);
week.push('Saturday');
console.log(week);
*/

let fiveElements = ['earth','wind','fire','water','Leeloo'];
console.log(fiveElements);
console.log(fiveElements.pop());
console.log(fiveElements.shift());
console.log(fiveElements);

let fruits = ['Banana','Orange','Apple','Mango'];
fruits.slice(1,2);
console.log(slice);
slice = fruits.slice(3);
console.log(slice);


