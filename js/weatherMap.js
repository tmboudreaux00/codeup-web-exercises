(function() {
    "use strict";

    $(document).ready(function() {

        mapboxgl.accessToken = MAPBOX_KEY;
        var map = new mapboxgl.Map({
            container: 'mapBox',
            style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
            center: [-98.49, 29.42], // starting position [lng, lat]
            zoom: 9 // starting zoom
        });


    //get api data for weather report on button click
    $('#submit').click(function(e){
        e.preventDefault();
        var inputLocation = $('#inputData').val();

        console.log(inputLocation);

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
            var currentWeekday = function () {
                let currentWeekdayNum = (Math.floor(currentUTC / 86400) + 4) % 7;
                let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                let day = daysOfWeek[currentWeekdayNum];
                return (day);
            };
            var hour;
            let timeConverter = function (currentUTC) {
                var a = new Date(currentUTC * 1000);
                var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                var year = a.getFullYear();
                var month = months[a.getMonth()];
                var date = a.getDate();
                hour = a.getHours();
                var ampm = hour >= 12 ? 'PM' : 'AM';
                hour = hour % 12;
                hour = hour ? hour : 12;
                var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
                let time = month + ' ' + date + ', ' + year + ' ' + hour + ':' + min + ' ' + ampm;
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
                    return 'Yesterday was ' + '<span class="mx-1 tomorrowWarmer">' + ' warmer ' + '</span> ' + ' than today at this time.';
                }
            }
            let tomorrowCoolerWarmer = function () {
                if (tomorrowHi < currentDailyHi) {
                    return 'Tomorrow will be  ' + '<span class="mx-1 tomorrowCooler"> cooler </span> ' + ' than today at this time.';
                } else if (tomorrowHi === currentDailyHi) {
                    return 'Tomorrow will be  ' + '<span class="mx-1 tomorrowSame"> about the same </span> ' + ' as today at this time.';
                } else {
                    return 'Tomorrow will be  ' + '<span class="mx-1 tomorrowWarmer">' + ' warmer ' + '</span> ' + ' than today at this time.';
                }
            }


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
                S: 180,
                SSW: 202.5,
                SW: 225,
                WSW: 247.5,
                W: 270,
                WNW: 292.5,
                NW: 315,
                NNW: 337.5
            }
            let getWindDirection = function () {
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
                } else if (windDirection > directionDeg.S && windDirection < directionDeg.SW) {
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
            let arrowStart = '<div class="col text-center';
            let arrowEnd = '" id="arrowDiv"><i class="fas fa-location-arrow rounded-circle bg-light aspectRatioSm arrow"></i></div>';
            let directionKeys = Object.keys(directionDeg);
            let windDir = getWindDirection();
            let arrowDirection = function () {
                let dir;
                directionKeys.forEach(function () {
                    if (windDir === 'N') {
                        dir = arrowStart + ' arrowN' + arrowEnd;
                    } else if (windDir === 'NNE') {
                        dir = arrowStart + ' arrowNNE' + arrowEnd;
                    } else if (windDir === 'NE') {
                        dir = arrowStart + ' arrowNE' + arrowEnd;
                    } else if (windDir === 'ENE') {
                        dir = arrowStart + ' arrowENE' + arrowEnd;
                    } else if (windDir === 'E') {
                        dir = arrowStart + ' arrowE' + arrowEnd;
                    } else if (windDir === 'ESE') {
                        dir = arrowStart + ' arrowESE' + arrowEnd;
                    } else if (windDir === 'SE') {
                        dir = arrowStart + ' arrowSE' + arrowEnd;
                    } else if (windDir === 'SSE') {
                        dir = arrowStart + ' arrowSSE' + arrowEnd;
                    } else if (windDir === 'S') {
                        dir = arrowStart + ' arrowS' + arrowEnd;
                    } else if (windDir === 'SSW') {
                        dir = arrowStart + ' arrowSSW' + arrowEnd;
                    } else if (windDir === 'SW') {
                        dir = arrowStart + ' arrowSW' + arrowEnd;
                    } else if (windDir === 'WSW') {
                        dir = arrowStart + ' arrowWSW' + arrowEnd;
                    } else if (windDir === 'W') {
                        dir = arrowStart + ' arrowW' + arrowEnd;
                    } else if (windDir === 'WNW') {
                        dir = arrowStart + ' arrowWNW' + arrowEnd;
                    } else if (windDir === 'NW') {
                        dir = arrowStart + ' arrowNW' + arrowEnd;
                    } else if (windDir === 'NNW') {
                        dir = arrowStart + ' arrowNNW' + arrowEnd;
                    } else {
                        return false;
                    }
                });
                return dir;
            }

/** OPEN WEATHER MAP

            var openWeatherMap = $.get('https://tile.openweathermap.org/map/', {
                APPID: OPEN_WEATHER_APPID,
                layer: 'clouds_new',
                z: '10',
                x: 29.42,
                y: -98.49
                //lang: "de"
            }).done(function(map) {
                console.log("success!");
            });
        */
            $('#weatherdata').html("");
            $('#weatherdata').append(
                '<div class="container-fluid mt-3">'

                + '<div class="row">'
                + '<div class="col border currentBG">'
                + '<div class="col my-2 text-center">' + currentWeekday() + ' ' + timeConverter(currentUTC) + '</div>'
                + '<div class="row">'
                + '<div class="col-8 mt-3 d-flex justify-content-center text-center">'
                + '<div class="border border-danger rounded-circle my-3 aspectRatioLg">'
                + '<div class="row">'
                + '<div class="col mt-5">' + Math.max(Math.round(currentDailyHi * 10) / 10, 2.8).toFixed(1) + '<span>&deg;</span>' + '<span class="divider"> | </span>' + Math.max(Math.round(currentDailyLo * 10) / 10, 2.8).toFixed(1) + '<span>&deg;</span>' + '</div>'
                + '</div>'
                + '<div class="row">'
                + '<div class="col currentTemp">' + Math.max(Math.round(data.current.temp * 10) / 10, 2.8).toFixed(1) + '<span class="mb-3 normalSize">&deg;F</span>' + '</div>'
                + '</div>'
                + '<div class="row">'
                + '<div class="col mb-5">' + 'Feels Like ' + Math.max(Math.round(data.current.feels_like * 10) / 10, 2.8).toFixed(1) + '<span>&deg;</span>' + '</div>'
                + '</div>'
                + '</div>'
                + '</div>'//col-8 rounded circle

                + '<div class="col-4">'
                + '<div class="row">'
                + '<div class="col text-center">' + '<img class="border border-dark rounded-lg weatherIconBG" src="http://openweathermap.org/img/wn/' + data.current.weather[0].icon + '@2x.png">' + '</div>'
                + '</div>'
                + '<div class="row mb-3 justify-content-center windSize">' + data.current.weather[0].description + '</div>'
                + '<div class="row">' + arrowDirection()
                + '</div>'
                + '<div class="row mt-3 justify-content-center windSize">' + 'Wind blowing ' + getWindDirection() + ' at ' + Math.round(data.current.wind_speed) + ' mph.'
                + '</div>'
                + '</div>'//col-4
                + '</div>' //row below date/time
                + '<div class="col mt-3 mb-1">'
                + '<div class="row justify-content-center" id="tempCompare">' + yesterdayCoolerWarmer() + '</div>'
                + '<div class="row justify-content-center" id="tempCompare">' + tomorrowCoolerWarmer() + '</div>'
                + '</div>' //comparison col
                + '</div>' //circle temp card
    /** MAP */
                + '<div class="col" id="mapDiv">' + '</div>'
                + '</div>' //row containing card and map
                + '<div class="row flex-nowrap mt-3" id="forecastdata">' + '</div>'
            );

            $('#mapDiv').append($('#mapBox'));
            $('#mapBox').removeClass('initMapSize mx-auto').addClass('mapSize');
            $('#mainContent').addClass('d-none');
            map.resize();




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
                    $('#forecastdata').append('<div class="card mx-1 forecastLightBG" style="width: 18rem;">'
                        + '<div class="col text-center border-bottom border-dark cardHead">' + forecastWeekday() + ' ' + forecastDate(forecastUTC) + '</div>'
                        + '<div class="row">'
                        + '<div class="col-4">' + '<img src="http://openweathermap.org/img/w/' + days.weather[0].icon + '.png">' + '</div>'
                        + '<div class="col-8">'
                        + '<div class="ml-4">' + 'Hi ' + Math.max(Math.round(days.temp.max * 10) / 10, 2.8).toFixed(1) + '</div>'
                        + '<div class="ml-4">' + 'Lo ' + Math.max(Math.round(days.temp.min * 10) / 10,2.8).toFixed(1) + '</div>'
                        + '</div>' //temp hi/lo group
                        + '</div>' //temp and conditions
                        + '<div class="pl-1">' + 'Sunrise: ' + forecastSunrise() + '</div>'
                        + '<div class="pl-1">' + 'Sunset: ' + forecastSunset() + '</div>'
                        + '</div>' //forecast card


                        + '<div>' + '<span>' + '</span>' + '</div>'
                    );
                } else if (index > 0 && index % 2 !== 0) {
                    $('#forecastdata').append('<div class="card mx-1 forecastDarkBG" style="width: 18rem;">'
                        + '<div class="col text-center border-bottom border-dark  cardHead">' + forecastWeekday() + ' ' + forecastDate(forecastUTC) + '</div>'
                        + '<div class="row">'
                        + '<div class="col-4">' + '<img src="http://openweathermap.org/img/w/' + days.weather[0].icon + '.png">' + '</div>'
                        + '<div class="col-8">'
                        + '<div class="ml-4">' + 'Hi ' + Math.max(Math.round(days.temp.max * 10) / 10, 2.8).toFixed(1) + '</div>'
                        + '<div class="ml-4">' + 'Lo ' + Math.max(Math.round(days.temp.min * 10) / 10,2.8).toFixed(1) + '</div>'
                        + '</div>' //temp hi/lo group
                        + '</div>' //temp and conditions
                        + '<div class="pl-1">' + 'Sunrise: ' + forecastSunrise() + '</div>'
                        + '<div class="pl-1">' + 'Sunset: ' + forecastSunset() + '</div>'
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
                    if (ahora.temp < yesterdayLo) {
                        yesterdayLo = ahora.temp;
                    }
                });
                console.log(olddata);
            });
            console.log(data);
        });
        //map on results screen

        //<div id='map' style='width: 400px; height: 300px;'></div>

            // const center = "Webster, Texas 77598";
            // const restaurants = [
            //     {
            //         name: "Mogul Indian Restaurant",
            //         address: "1055 Bay Area Blvd, Houston, TX 77058",
            //         long: '29.5377',
            //         lat: '-95.1183',
            //         info: "Delicious. What else?"
            //     },
            //     {
            //         name: "Landry's Seafood House",
            //         address: "Boardwalk #1, Kemah, TX 77565",
            //         long: '29.5403',
            //         lat: '-95.0177',
            //         info: "Not really a favorite"
            //     },
            //     {
            //         name: "Blue Bell",
            //         address: "1101 S Blue Bell Rd, Brenham, TX ",
            //         long: '30.1636',
            //         lat: '-96.3777',
            //         info: "Best. Ice Cream. Ever."
            //     }
            // ];
            //
            //
            // restaurants.forEach(function (restaurant) {
            //     var popupAll = new mapboxgl.Popup()
            //         .setHTML('<h4>' + restaurant.name + '</h4>' + restaurant.info + "<br>" + restaurant.address);
            //     var marker2 = new mapboxgl.Marker()
            //         .setLngLat([restaurant.lat, restaurant.long])
            //         .setPopup(popupAll)
            //         .addTo(map);
            // });

    });

    }); //DOM Ready closing

})(); //IFFE closing