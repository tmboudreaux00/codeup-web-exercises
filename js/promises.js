(function() {
    "use strict";
    function getGithubUsernames() {
        return fetch('https://api.github.com/users/tmboudreaux00', {headers: {'Authorization': GITHUB_PAT}})
        .then(response => response.json())
    }

    getGithubUsernames().then( users => {
        console.log(users);
        console.log(users.login);
        //     users.forEach( userObj => {
    //         // do something with each username
    //         console.log(userObj.login);
        })
     .catch(error => console.error(error));
    //Create a function that accepts a GitHub username, and returns a promise that resolves returning just the date of the last commit that user made.

    const myPromise = new Promise((resolve, reject) => {
        if (Math.random() > 0.5) {
            resolve();
        } else {
            reject();
        }
    });
    myPromise.then(() => console.log('resolved!'));
    myPromise.catch(() => console.log('rejected!'));


    //IIFFE closing
})();
