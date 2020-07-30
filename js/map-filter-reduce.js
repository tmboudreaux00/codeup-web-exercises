(function() {
    "use strict";
    const users = [
        {
            id: 1,
            name: 'ryan',
            email: 'ryan@codeup.com',
            languages: ['clojure', 'javascript'],
            yearsOfExperience: 5
        },
        {
            id: 2,
            name: 'luis',
            email: 'luis@codeup.com',
            languages: ['java', 'scala', 'php'],
            yearsOfExperience: 6
        },
        {
            id: 3,
            name: 'zach',
            email: 'zach@codeup.com',
            languages: ['javascript', 'bash'],
            yearsOfExperience: 7
        },
        {
            id: 4,
            name: 'fernando',
            email: 'fernando@codeup.com',
            languages: ['java', 'php', 'sql'],
            yearsOfExperience: 8
        },
        {
            id: 5,
            name: 'justin',
            email: 'justin@codeup.com',
            languages: ['html', 'css', 'javascript', 'php'],
            yearsOfExperience: 9
        }
    ];

    //     Use .filter to create an array of user objects where each user object has at least 3 languages in the languages array
    var languages = users.filter(lang => {
        if (lang.languages.length >= 3) {
            return `${languages}`;
        }
    });

    //     Use .map to create an array of strings where each element is a user's email address
    var emails = users.map(email => email.email);

    // Use .reduce to get the total years of experience from the list of users. Once you get the total of years you can use the result to calculate the average.
    var totalXP = users.reduce((xp, person) => {
        return xp + person.yearsOfExperience}, 0);

    var averageXP = (totalXP / users.length);

    //     Use .reduce to get the longest email from the list of users.
    var longestEmail = users.reduce((email, person) => {
        if (person.email.length > email.length)
            return person.email;
        else
            return email;
    }, "");

    //     Use .reduce to get the list of user's names in a single string. Example: Your instructors are: ryan, luis, zach, fernando, justin.

    var namesString = users.reduce((names, person, i) => {
            return  i === 0 ? person.name : names + ', ' + person.name;
    }, "")

// Use .reduce to get the unique list of languages from the list of users.

    var uniqueLang = users.reduce((lang, person) => {
        person.languages.forEach(idiom => {
            if (lang.indexOf(idiom) === -1){
                lang.push(idiom);
            }
        });
        return lang;
    }, []);

    console.log(uniqueLang);

})();