(function () {
    "use strict";
    var ud = $('#userData');
    var userName = 'tmboudreaux00';//can be a prompt
    var getGithubUsernames = function (user) {
        user = userName;
        return fetch('https://api.github.com/users/' + user + '/events/public', {headers: {'Authorization': 'token ' + GITHUB_PAT}})
            .then(response => response.json())
            .then(users => {
                console.log(typeof users[0].created_at);
                var returnData = 'User ' + userName + ' last updated on ' + users[0].created_at;
                ud.html('');
                ud.append(returnData)
            });
    }
    getGithubUsernames();

    let num;

    var wait = function(num) {
        num = 1000;
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.1) {
                    resolve("Resolved");
                }
                else
                    reject("Rejected");
            // wait(num).then(() => resolve(alert('RESOLVED!')));
            }, num);
        });
        wait.wait(num).then( console.log("in seconds"));
    }

//IIFFE closing
})();
