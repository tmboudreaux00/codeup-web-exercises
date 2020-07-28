(function() {
    "use strict";

    //get api data for weather report on button click
    $('#submit').click(function(e){
        e.preventDefault();
        $.get('http://api.openweathermap.org/data/2.5/onecall', {
            APPID: OPEN_WEATHER_APPID,
            //confirm coordinates at latlong.net
            lat: 29.42,
            lon: -98.49,
            units: 'imperial',
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
                hour = a.getHours();
                var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
                var time = month + ' ' + date + ' ' + year + ' ' + hour + ':' + min;
                return time;
            }
            timeConverter(currentUTC);

            //location converter
            let userLocation = "";


           // + '<div>' + '<span>Current Temperature For </span>' + "San Antonio"/**data.name*/ + '</div>'
            var currentDailyHi = data.daily[0].temp.max;
            var currentDailyLo = data.daily[0].temp.min;
            var tomorrowHi = data.daily[1].temp.max;

            let yesterdayCoolerWarmer = function () {
                if (yesterdayHi > currentDailyHi) {
                    return 'Yesterday was ' + '<span class="mx-1 tomorrowCooler"> cooler </span> ' + ' than today at this time.';
                } else if (yesterdayHi === currentDailyHi) {
                    return 'Yesterday was ' + '<span class="mx-1 tomorrowSame"> about the same </span> ' + ' as today at this time.';
                } else {
                    return 'Yesterday was ' + '<span class="mx-1 tomorrowWarmer">' + ' warmer ' +  '</span> ' + ' than today at this time.';
                }
            }
            let tomorrowCoolerWarmer = function () {
                if (tomorrowHi < currentDailyHi) {
                    return 'Tomorrow will be  ' + '<span class="mx-1 tomorrowCooler"> cooler </span> ' + ' than today at this time.';
                } else if (tomorrowHi === currentDailyHi) {
                    return 'Tomorrow will be  ' + '<span class="mx-1 tomorrowSame"> about the same </span> ' + ' as today at this time.';
                } else {
                    return 'Tomorrow will be  ' + '<span class="mx-1 tomorrowWarmer">' + ' warmer ' +  '</span> ' + ' than today at this time.';
                }
            }

            let directionArrow = '<div class="col text-center" id="arrowDiv"><i class="fas fa-location-arrow border rounded-circle aspectRatioSm arrow"></i></div>';
            let windDirection = data.current.wind_deg;
            const directionDeg = {
                    N: 0,
                    NNE: 22.5,
                    NE: 45,
                    ENE: 67.6,
                    E: 90,
                    ESE: 112.5,
                    SE: 135,
                    SSE: 157.5,
                    S:  180,
                    SSW: 202.5,
                    SW: 225,
                    WSW: 247.5,
                    W:  270,
                    WNW: 292.5,
                    NW: 315,
                    NNW: 337.5
                }
                let getWindDirection = function() {
                if (windDirection > directionDeg.NNW || windDirection < directionDeg.NNE) {
                    return "N";
                } else if (windDirection > directionDeg.N && windDirection < directionDeg.NE) {
                    return "NNE";
                } else if (windDirection > directionDeg.NNE && windDirection < directionDeg.ENE) {
                    return "NE";
                } else if (windDirection > directionDeg.NE && windDirection < directionDeg.E) {
                    return "ENE";
                } else if (windDirection > directionDeg.ENE && windDirection < directionDeg.ESE) {
                    return "E";
                } else if (windDirection > directionDeg.E && windDirection < directionDeg.SE) {
                    return "ESE";
                } else if (windDirection > directionDeg.ESE && windDirection < directionDeg.SSE) {
                    return "SE";
                } else if (windDirection > directionDeg.SE && windDirection < directionDeg.S) {
                    return "SSE";
                } else if (windDirection > directionDeg.SSE && windDirection < directionDeg.SSW) {
                    return "S";
                } else if (windDirection > directionDeg.S && windDirection < directionDeg.SW)  {
                    return "SSW";
                } else if (windDirection > directionDeg.SSW && windDirection < directionDeg.WSW) {
                    return "SW";
                } else if (windDirection > directionDeg.SW && windDirection < directionDeg.W) {
                    return "WSW";
                } else if (windDirection > directionDeg.WSW && windDirection < directionDeg.WNW) {
                    return "W";
                } else if (windDirection > directionDeg.W && windDirection < directionDeg.NW) {
                    return "WNW";
                } else if (windDirection > directionDeg.WNW && windDirection < directionDeg.NNW) {
                    return "NW";
                } else if (windDirection > directionDeg.NW && windDirection < directionDeg.N) {
                    return "NNW";
                } else {
                    return false;
                }
            }
            let directionKeys = Object.keys(directionDeg);
            let windDir = getWindDirection();
            let indicator;
            let arrowDirection = function(){
                directionKeys.forEach(function(){
                    if (windDir === 'N') {
                        .addClass('');
                    } else if (windDirection > directionDeg.N && windDirection < directionDeg.NE) {
                        return "NNE";
                    } else if (windDirection > directionDeg.NNE && windDirection < directionDeg.ENE) {
                        return "NE";
                    } else if (windDirection > directionDeg.NE && windDirection < directionDeg.E) {
                        return "ENE";
                    } else if (windDirection > directionDeg.ENE && windDirection < directionDeg.ESE) {
                        return "E";
                    } else if (windDirection > directionDeg.E && windDirection < directionDeg.SE) {
                        return "ESE";
                    } else if (windDirection > directionDeg.ESE && windDirection < directionDeg.SSE) {
                        return "SE";
                    } else if (windDirection > directionDeg.SE && windDirection < directionDeg.S) {
                        return "SSE";
                    } else if (windDirection > directionDeg.SSE && windDirection < directionDeg.SSW) {
                        return "S";
                    } else if (windDirection > directionDeg.S && windDirection < directionDeg.SW)  {
                        return "SSW";
                    } else if (windDirection > directionDeg.SSW && windDirection < directionDeg.WSW) {
                        return "SW";
                    } else if (windDirection > directionDeg.SW && windDirection < directionDeg.W) {
                        return "WSW";
                    } else if (windDirection > directionDeg.WSW && windDirection < directionDeg.WNW) {
                        return "W";
                    } else if (windDirection > directionDeg.W && windDirection < directionDeg.NW) {
                        return "WNW";
                    } else if (windDirection > directionDeg.WNW && windDirection < directionDeg.NNW) {
                        return "NW";
                    } else if (windDirection > directionDeg.NW && windDirection < directionDeg.N) {
                        return "NNW";
                    } else {
                        return false;
                    }
                });
                return indicator;
            }
            let arrowClassArr = ['arrowN','arrowNNE']
            let setArrowDir = function(){
                if (arrowDirection === )
                    arrowDiv
            }
            console.log(getWindDirection());
            console.log(arrowDirection());

            $('#weatherdata').html("");
                $('#weatherdata').append(
                    '<div class="container-fluid">'

                        + '<div class="row">'
                            + '<div class="col border">'
                                + '<div class="col mb-5 text-center">' + currentWeekday() + ' ' + timeConverter(currentUTC) + '</div>'
                                + '<div class="row">'
                                    + '<div class="col-8">'
                                        + '<div class="border border-danger rounded-circle text-center aspectRatioLg">'
                                        + '<div class="row">'
                                            + '<div class="col mt-5">' + currentDailyHi + '<span>&deg;</span>' + '<span class="divider"> | </span>' + currentDailyLo + '<span>&deg;</span>' + '</div>'
                                        + '</div>'
                                        + '<div class="row">'
                                            + '<div class="col currentTemp">' +  Math.max(Math.round(data.current.temp * 10) / 10, 2.8).toFixed(1) + '<span class="mb-3 normalSize">&deg;F</span>' + '</div>'
                                        + '</div>'
                                        + '<div class="row">'
                                            + '<div class="col mb-5">' + 'Feels Like ' + Math.max(Math.round(data.current.feels_like * 10) / 10, 2.8).toFixed(1) + '<span>&deg;</span>' + '</div>'
                                        + '</div>'
                                    + '</div>'
                                    + '</div>'//col-8 rounded circle

                                    + '<div class="col-4">'
                                        + '<div class="row">'
                                            + '<div class="col">' + '<img src="http://openweathermap.org/img/w/' + data.current.weather[0].icon + '.png">' + '</div>'
                                        + '</div>'

                                        + '<div class="row">' + directionArrow
                                        + '</div>'
                                        + '<div class="row">' + 'Wind blowing ' + getWindDirection() + ' at ' + Math.round(data.current.wind_speed) + ' mph.'
                                        + '</div>'
                                    + '</div>'//col-4
                + '</div>' //row below date/time
                    + '<div class="col mt-5 mb-1">'
                    + '<div class="row" id="tempCompare">' + yesterdayCoolerWarmer() + '</div>'
                + '<div class="row" id="tempCompare">' + tomorrowCoolerWarmer() + '</div>'
                    + '</div>' //comparison col
                + '</div>' //circle temp card

                + '<div class="col border">'
                + '<div>' + 'map' + '</div>'
                + '<div>' + '<span>' + '</span>' + '</div>'
                + '</div>' //map card
                + '</div>' //row containing card
                + '<div class="row flex-nowrap mt-3" id="forecastdata">' + '</div>'
                );

                data.daily.forEach(function(days, index){
                    //forecast date
                    let forecastUTC = days.dt;
                    let forecastDT = days;
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
                        + '<div class="col-4">' + '<img src="http://openweathermap.org/img/w/' + days.weather[0].icon + '.png">' + '</div>'
                        + '<div class="col-8">'
                        + '<div>' + 'Hi ' + Math.max(Math.round(days.temp.max * 10) / 10, 2.8).toFixed(1) + '</div>'
                        + '<div>' + 'Lo ' + Math.max(Math.round(days.temp.min * 10) / 10,2.8).toFixed(1) + '</div>'
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
                        + '<div class="col-4">' + '<img src="http://openweathermap.org/img/w/' + days.weather[0].icon + '.png">' + '</div>'
                        + '<div class="col-8">'
                        + '<div>' + 'Hi ' + Math.max(Math.round(days.temp.max * 10) / 10, 2.8).toFixed(1) + '</div>'
                        + '<div>' + 'Lo ' + Math.max(Math.round(days.temp.min * 10) / 10,2.8).toFixed(1) + '</div>'
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
                
            });

            var yesterday = parseInt(data.daily[0].dt) - (60*60*24);
            var yesterdayHi;
            $.get('https://api.openweathermap.org/data/2.5/onecall/timemachine', {
                APPID: OPEN_WEATHER_APPID,
                dt: yesterday,
                lat: 29.42,
                lon: -98.49,
                units: 'imperial',
            }).done(function(olddata) {
                var yesterdayHi = 0;
                var yesterdayLo = 0;
                olddata.hourly.forEach(function(ahora){
                    if (ahora.temp > yesterdayHi) {
                        yesterdayHi = ahora.temp;
                    }
                    console.log(yesterdayHi);
                    if (ahora.temp < yesterdayLo) {
                        yesterdayLo = ahora.temp;
                    }
                });
                console.log(olddata);
            });
            console.log(data);
        });

    });

    //get api data for map

//IFFE closing
})();