//FOR ARRAYS.HTML

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

