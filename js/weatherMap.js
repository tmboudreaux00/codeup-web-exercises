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
            var hour;
            var timeConverter = function(currentUTC){
                var a = new Date(currentUTC * 1000);
                var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                var year = a.getFullYear();
                var month = months[a.getMonth()];
                var date = a.getDate();
                hour = a.getHours();
                var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
                var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min;
                return time;
            }

            //location converter
            let userLocation = "";


           // + '<div>' + '<span>Current Temperature For </span>' + "San Antonio"/**data.name*/ + '</div>'
            let currentDailyHigh;
            let currentDailyLow;
            let noExtremeTemp = function() {
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
            data.daily.forEach(function(days){

                $('#weatherdata').html("");
                $('#weatherdata').append('<div class="container-fluid">'

                + '<div class="row">'
                + '<div class="card" style="width: 18rem;">'
                + '<div>' + timeConverter(currentUTC) + '</div>'
                + '<div class="row">'

                + '<div class="col-9">' + '<span class="border border-warning rounded-circle">' + '<div class="col">'
                + '<div class="row">' + currentDailyHigh + '<span>&deg;</span>' + '<span class="divider">|</span>' + currentDailyLow + '<span>&deg;</span>' + '</div>'
                + '<div class="row">' + data.current.temp + '<span>&deg;F</span>' + '</div>'
                + '<div class="row">' + 'LIKE ' + data.current.feels_like + '<span>&deg;</span>' + '</div>'


                + '</div>'//col with temps
                + '</span>'//rounded-circle
                + '</div>'//col-9

                + '<div class="col-3">'
                    + '<div class="row">' + 'cloud icon' + '</div>' + 'cloudy' + '<div class="row">' + 'wind compass' + '<div class="row">' + 'Gusts 7 mph' +  '</div>' + '<div class="row">' + '</div>' + '</div>'
                + '</div>'//col-3

                + '<div class="col">' + "Tomorrow's temperature is forecast to be " + coolerWarmer() + " than today." + '</div>'
                + '</div>' //row below date/time
                + '</div>' //circle temp card

                + '<div class="card" style="width: 18rem;">'
                + '<div>' + '<span>' + '</span>' + '</div>'
                + '<div>' + '<span>' + '</span>' + '</div>'
                + '</div>' //map card
                + '</div>' //row containing card
                );
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