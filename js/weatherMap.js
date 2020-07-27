(function() {
    "use strict";

    //get api data for weather report on button click
    $('#submit').click(function(e){
        e.preventDefault();
        $.get("http://api.openweathermap.org/data/2.5/onecall", {
            APPID: OPEN_WEATHER_APPID,
            //confirm coordinates at latlong.net
            lat: 29.42,
            lon: -98.49,
            units: "imperial",
            //lang: "de"
        }).done(function(data) {
            //UNIX date/time stamps converter
            let currentUTC = data.current.dt;
            var currentWeekday = function(){
                let currentWeekdayNum = (Math.floor(currentUTC / 86400) + 4) % 7;
                let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                let day = daysOfWeek[currentWeekdayNum];
                return(day);
            };
            var hour;

            let timeConverter = function(currentUTC){
                var a = new Date(currentUTC * 1000);
                var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
                var year = a.getFullYear();
                var month = months[a.getMonth()];
                var date = a.getDate();
                let hour = a.getHours();
                var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
                var time = month + ' ' + date + ' ' + year + ' ' + hour + ':' + min;
                return time;
            }

            //location converter
            let userLocation = "";


           // + '<div>' + '<span>Current Temperature For </span>' + "San Antonio"/**data.name*/ + '</div>'
            var currentDailyHigh;
            var currentDailyLow;
            var noExtremeTemp = function() {
                if (hour < 18) {
                    currentDailyHigh = data.daily[0].temp.max;
                } else {
                    currentDailyHigh = "--";
                }

                if (hour != 6) {
                    currentDailyLow = data.daily[0].temp.min;
                } else {
                    currentDailyLow = "--"
                }
            }
            noExtremeTemp();
            let coolerWarmer = function () {
                return "UNFINISHED"
            }

            let cloudiness = function(){
                let cloudPercent = data.current.clouds;
                if (cloudPercent >= 88) {
                    return 'Overcast / Cloudy';
                } else if (cloudPercent >= 70 && cloudPercent <= 87) {
                    return 'Mostly Cloudy'
                } else if (cloudPercent >= 51 && cloudPercent <= 69) {
                    return 'Parly Sunny / Mostly Cloudy'
                } else if (cloudPercent >= 26 && cloudPercent <= 50) {
                    return 'Mostly Sunny / Partly Cloudy'
                } else if (cloudPercent >= 6 && cloudPercent <= 25) {
                    return 'Sunny / Mostly Clear'
                } else {
                    return 'Sunny / Clear'
                }
            }

                $('#weatherdata').html("");
                $('#weatherdata').append('<div class="container-fluid">'

                + '<div class="row">'
                + '<div class="card" style="width: 40%;">'
                + '<div>' + currentWeekday() + ' ' + timeConverter(currentUTC) + '</div>'
                + '<div class="row">'

                + '<div class="col-8 p-0 border border-warning rounded-circle text-center">'
                    + '<div class="col p-0">'
                    + '<div class="row mt-3">' + '<div class="col">' + currentDailyHigh + '<span>&deg;</span>' + '<span class="divider"> | </span>' + currentDailyLow + '<span>&deg;</span>' + '</div>' + '</div>'
                    + '<div class="row">' + '<div class="col currentTemp">' +  Math.max(Math.round(data.current.temp * 10) / 10, 2.8).toFixed(1) + '<span class="normalSize">&deg;F</span>' + '</div>' + '</div>'
                    + '<div class="row">' + 'BE FEELIN\' LIKE ' + Math.max(Math.round(data.current.feels_like * 10) / 10, 2.8).toFixed(1) + '<span>&deg;</span>' + '</div>'
                + '</div>'//col with temps rounded circle
                + '</div>'//col-8

                + '<div class="col-4">'
                    + '<div class="row">'
                    + '<div>' + '<img src="http://openweathermap.org/img/w/' + data.current.weather[0].icon + '.png">' + '</div>'
                    + '</div>' + cloudiness() + '<div class="row">' + 'wind compass' + '<div class="row">' + 'Gusts 7 mph' +  '</div>' + '<div class="row">' + '</div>' + '</div>'
                + '</div>'//col-3
                + '</div>' //row below date/time
                + '<div class="row">' + "Tomorrow's temperature is forecast to be " + coolerWarmer() + " than today." + '</div>'
                + '</div>' //circle temp card

                + '<div class="card" style="width: 18rem;">'
                + '<div>' + 'map' + '</div>'
                + '<div>' + '<span>' + '</span>' + '</div>'
                + '</div>' //map card
                + '</div>' //row containing card
                + '<div class="row flex-nowrap mt-3" id="forecastdata">' + '</div>'
                );

                data.daily.forEach(function(ahora, index){
                    //forecast date
                    let forecastUTC = data.daily[index].dt;
                    let forecastDT = data.daily[index];
                    var forecastWeekdayNum = (Math.floor(forecastUTC / 86400) + 4) % 7;
                    var forecastWeekday = function(){
                        let daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                        let day = daysOfWeek[forecastWeekdayNum];
                        return(day);
                    };

                    let forecastDate = function(){
                        var a = new Date(forecastUTC * 1000);
                        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                        var year = a.getFullYear();
                        var month = months[a.getMonth()];
                        var date = a.getDate();
                        var time = month + ' ' + date;
                        return time;
                    }

                    let forecastSunrise = function(){
                        let date = new Date(forecastDT.sunrise * 1000);
                        let options = {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true
                        };
                        let timeString = date.toLocaleString('en-US', options);
                        return timeString;
                    }

                    let forecastSunset = function() {
                        let date = new Date(forecastDT.sunset * 1000);
                        let options = {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true
                        };
                        let timeString = date.toLocaleString('en-US', options);
                        return timeString;
                    }

                    // 7 day forecast
                if (index > 0 && index % 2 === 0) {
                    $('#forecastdata').append('<div class="card mx-1 bg-secondary" style="width: 18rem;">'
                        + '<div>' + forecastWeekday() + ' ' + forecastDate(forecastUTC) + '</div>'
                        + '<div class="row">'
                        + '<div class="col-4">' + '<img src="http://openweathermap.org/img/w/' + data.daily[index].weather[0].icon + '.png">' + '</div>'
                        + '<div class="col-8">'
                        + '<div>' + 'Hi ' + Math.max(Math.round(data.daily[index].temp.max * 10) / 10, 2.8).toFixed(1) + '</div>'
                        + '<div>' + 'Lo ' + Math.max(Math.round(data.daily[index].temp.min * 10) / 10,2.8).toFixed(1) + '</div>'
                        + '</div>' //temp hi/lo group
                        + '</div>' //temp and conditions
                        + '<div>' + 'Sunrise: ' + forecastSunrise() + '</div>'
                        + '<div>' + 'Sunset: ' + forecastSunset() + '</div>'
                        + '</div>' //forecast card


                        + '<div>' + '<span>' + '</span>' + '</div>'
                    );
                } else if (index > 0 && index % 2 !== 0) {
                    $('#forecastdata').append('<div class="card mx-1 bg-light" style="width: 18rem;">'
                        + '<div>' + forecastWeekday() + ' ' + forecastDate(forecastUTC) + '</div>'
                        + '<div class="row">'
                        + '<div class="col-4">' + '<img src="http://openweathermap.org/img/w/' + data.daily[index].weather[0].icon + '.png">' + '</div>'
                        + '<div class="col-8">'
                        + '<div>' + 'Hi ' + Math.max(Math.round(data.daily[index].temp.max * 10) / 10, 2.8).toFixed(1) + '</div>'
                        + '<div>' + 'Lo ' + Math.max(Math.round(data.daily[index].temp.min * 10) / 10,2.8).toFixed(1) + '</div>'
                        + '</div>' //temp hi/lo group
                        + '</div>' //temp and conditions
                        + '<div>' + 'Sunrise: ' + forecastSunrise() + '</div>'
                        + '<div>' + 'Sunset: ' + forecastSunset() + '</div>'
                        + '</div>' //forecast card


                        + '<div>' + '<span>' + '</span>' + '</div>'
                    );
                };

                /** TEMPlATE
                + '<div class="row">'
                + '<div>' + '<span>' + '</span>' + '</div>'
                + '<div>' + '<span>' + '</span>' + '</div>'
                + '</div>'
                 */

                console.log(data.daily[index]);
            });
            console.log(data);

            /**
             //date

             //hi degrees f/lo degrees f
             //forecast icon

             data.weather.//description: overcast clouds
             //humidity: 52

             //wind: 6.78 speed direction directionicon

             //pressure: 1012 */

        });
    });

    //get api data for map

//IFFE closing
})();