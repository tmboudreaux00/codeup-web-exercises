(function() {
    "use strict";
    var coordinates = $('#coordinates');
    var lat = 21;
    var long = -80;
    mapboxgl.accessToken = MAPBOX_KEY;
        var map = new mapboxgl.Map({
            container: 'mapBox',
            style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
            center: [-98.58, 39.83], // starting position [lng, lat]
            zoom: 3 // starting zoom
        });
    var coordinatesGeocoder = function(query) {

// match anything which looks like a decimal degrees coordinate pair
        var matches = query.match(
            /^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i
        );
        if (!matches) {
            return null;
        }
        console.log(query);
        function coordinateFeature(lng, lat) {
            return {
                center: [lng, lat],
                geometry: {
                    type: 'Point',
                    coordinates: [lng, lat]
                },
                place_name: 'Lat: ' + lat + ' Lng: ' + lng,
                place_type: ['coordinate'],
                properties: {},
                type: 'Feature'
            };
        }

        var coord1 = Number(matches[1]);
        var coord2 = Number(matches[2]);
        var geocodes = [];

        if (coord1 < -90 || coord1 > 90) {
// must be lng, lat
            geocodes.push(coordinateFeature(coord1, coord2));
        }

        if (coord2 < -90 || coord2 > 90) {
// must be lat, lng
            geocodes.push(coordinateFeature(coord2, coord1));
        }

        if (geocodes.length === 0) {
// else could be either lng, lat or lat, lng
            geocodes.push(coordinateFeature(coord1, coord2));
            geocodes.push(coordinateFeature(coord2, coord1));
        }
        return geocodes;
    };
    var forwardCoord = function(query){
        console.log(query);
    }
    console.log(forwardCoord());
    var geoLoc = map.addControl(
            new MapboxGeocoder({
                accessToken: MAPBOX_KEY,
                localGeocoder: coordinatesGeocoder,
                zoom: 3,
                placeholder: 'Ex: "-40, 170 or Seattle, WA"',
                mapboxgl: mapboxgl
            }),
            'top-left'
        );
    /** DRAGGABLE MARKER
        var marker = new mapboxgl.Marker({
            draggable: true
        })
            .setLngLat([-98.49, 29.42])
            .addTo(map);
*/

    //get api data for weather report
    var ajaxRequest = function(lat, long) {
        $.get('http://api.openweathermap.org/data/2.5/onecall', {
            APPID: OPEN_WEATHER_APPID,
            lat: lat,
            lon: long,
            units: 'imperial',
            part: 'daily'
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

            $('#weatherdata').html("");
            $('#weatherdata').append(
                '<div class="container mt-5">'
                + '<div class="row justify-content-center mx-auto bg-dark text-light w-75">' + currentWeekday() + ' ' + timeConverter(currentUTC) + '</div>'
                + '<div class="row">'
                + '<div class="col border currentBG">'

                + '<div class="row align-items-center">'
                + '<div class="col-8 mt-3 d-flex justify-content-center text-center">'
                + '<div class="border border-danger rounded-circle my-3 px-5 aspectRatioLg">'
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

                + '<div class="col-4 forecastDarkBG border border-light">'
                + '<div class="row">'
                + '<div class="col text-center mt-1">' + '<img class="border forecastLightBG" src="http://openweathermap.org/img/w/' + data.current.weather[0].icon + '.png">' + '</div>'
                + '</div>'
                + '<div class="row mb-3 mt-1 justify-content-center windSize">' + data.current.weather[0].description + '</div>'
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
                + '<div class="col p-0" id="mapDiv">' + '</div>'
                + '</div>' //row containing card and map
                + '<div class="row flex-nowrap mt-3" id="forecastdata">' + '</div>'
            );

            $('#mapDiv').append($('#mapBox'));
            $('#mapBox').removeClass('initMapSize mx-auto d-none').addClass('mapSize');
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
                    $('#forecastdata').append('<div class="card forecastLightBG" style="width: 18rem;">'
                        + '<div class="col text-center border-bottom cardHead">' + forecastWeekday() + ' ' + forecastDate(forecastUTC) + '</div>'
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
                    $('#forecastdata').append('<div class="card forecastDarkBG" style="width: 18rem;">'
                        + '<div class="col text-center border-bottom cardHead">' + forecastWeekday() + ' ' + forecastDate(forecastUTC) + '</div>'
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
                lat: lat,
                lon: long,
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
            reverseGeocode(lat, long)
            console.log(data);
        });
        };

    ajaxRequest(lat,long)

    var forwardGeocode = function (lat, long) {
        $.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/$(long),$(lat).json`, {
            access_token: MAPBOX_KEY,
            lat: lat,
            lng: long,
            types: 'place'
        }).done(function(data){
            console.log(data);
        })
    }
    forwardGeocode();

    var reverseGeocode = function (lat, long) {
        $.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json`, {
            access_token: MAPBOX_KEY,
            types: 'place'
        }).done(function(data){
            $('#selectedlocation').html("");
            $('#selectedlocation').append(data.features[0].place_name)
            console.log(data);
        });
    }

    /**
    var onDragEnd = function() {
        var lngLat = marker.getLngLat();
        coordinates.style.display = 'block';
        coordinates.innerHTML =
            'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
        ajaxRequest(lngLat.lat, lngLat.lng)
    }
    marker.on('dragend', onDragEnd);
     */


})(); //IFFE closing