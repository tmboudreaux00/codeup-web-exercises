(function () {
    "use strict";
    var ud = $('#userData');
    var userName = 'tmboudreaux00';//can be a prompt
    var getGithubUsernames = function (user) {
        user = userName;
        return fetch('https://api.github.com/users/' + user, {headers: {'Authorization': 'token ' + GITHUB_PAT}})
            .then(response => response.json())
            .then(users => {
                console.log(typeof users.updated_at);
                var returnData = 'User ' + userName + ' last updated on ' + users.updated_at;
                ud.html('');
                ud.append(returnData)
            });
    }
    getGithubUsernames();


    //IIFFE closing
})();
