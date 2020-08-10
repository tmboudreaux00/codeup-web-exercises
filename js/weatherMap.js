(function () {
    "use strict";
    var coordinates = $('#coordinates');
    var lngLat;
    var lat = 0;
    var long = 0;
    mapboxgl.accessToken = MAPBOX_KEY;
    var map = new mapboxgl.Map({
        container: 'mapBox',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-98.58, 39.83],
        zoom: 3
    });
    const geocoder = new MapboxGeocoder({
        mapboxgl: mapboxgl,
        accessToken: MAPBOX_KEY,
        marker: false,
        zoom: 3,
        placeholder: 'City, ST or Zip Code"'
    })
    var marker = null;
    geocoder.on('result', e => {
        if (marker !== null) {
            marker.remove();
            marker = new mapboxgl.Marker({
                color: 'orange',
                draggable: true,
            })
                .setLngLat(e.result.center)
                .addTo(map);
        }
        else {
            marker = new mapboxgl.Marker({
                color: 'orange',
                draggable: true,
            })
                .setLngLat(e.result.center)
                .addTo(map);
        }

        marker.on('dragend', e => {
            lngLat = (e.target._lngLat);
            //sets coordinates and lat/lng box after dropping marker
            coordinates.addClass('d-block');
            coordinates.html("");
            coordinates.append('Longitude: ' + lngLat.lng + '<br>' + 'Latitude: ' + lngLat.lat);
            ajaxRequest(lngLat.lat, lngLat.lng)
        })
        //sets coordinates and lat/lng box after searching
        var searchMarker = marker._lngLat;
        coordinates.addClass('d-block');
        coordinates.html("");
        coordinates.append('Longitude: ' + searchMarker.lng + '<br>' + 'Latitude: ' + searchMarker.lat);
        ajaxRequest(searchMarker.lat, searchMarker.lng)
    });
    map.addControl(geocoder);

    var reverseGeocode = function (lat, long) {
        $.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json`, {
            access_token: MAPBOX_KEY,
            types: 'place'
        }).done(function (data) {
            var placeName;
            if (data.features.length !== 0) {
                placeName = data.features[0].place_name
                $('#selectedlocation').html("");
                $('#selectedlocation').append(placeName);
            } else
                $('#selectedlocation').html("");
        });
    }
    /**
     $('#mapDiv').append($('#mapBox'));
     $('#mapBox').removeClass('initMapSize mx-auto d-none').addClass('mapSize');
     $('#mainContent').addClass('d-none');
     map.resize();
     */

        //get api data for weather report
    var ajaxRequest = function (lat, long) {
            $.get('http://api.openweathermap.org/data/2.5/onecall', {
                APPID: OPEN_WEATHER_APPID,
                lat: lat,
                lon: long,
                units: 'imperial',
                part: 'daily'
                //lang: "de"
            }).done(function (data) {
                //UNIX date/time stamps converter
                const currentUTC = data.current.dt;
                var currentWeekday = function () {
                    let currentWeekdayNum = (Math.floor(currentUTC / 86400) + 4) % 7;
                    let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    let day = daysOfWeek[currentWeekdayNum];
                    return (day);
                };

                var hours;
                var timeConverter = function (currentUTC) {
                    var date = new Date(currentUTC * 1000);
                    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                    var year = date.getUTCFullYear();
                    var month = months[date.getUTCMonth()];
                    var day = date.getUTCDate();
                    var tzOffset = data.timezone_offset/3600;
                    hours = date.getUTCHours() + tzOffset;
                    if (hours >= 24) {
                        day++;
                        hours -= 24;
                    }
                    var ampm = hours >= 12 ? 'PM' : 'AM';
                    hours = hours % 12;
                    hours = hours ? hours : 12;
                    var min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
                    var time = month + ' ' + day + ', ' + year + ' ' + hours + ':' + min + ' ' + ampm;
                    return time;
                }
                timeConverter(currentUTC);

                var currentDailyHi = data.daily[0].temp.max;
                var currentDailyLo = data.daily[0].temp.min;
                var tomorrowHi = data.hourly[24].temp;
                (function () {
                    if (tomorrowHi < currentDailyHi) {
                        $('#tomorrowS').addClass('d-none');
                        $('#tomorrowW').addClass('d-none');
                        $('#tomorrowC').removeClass('d-none');
                    } else if (tomorrowHi == currentDailyHi) {
                        $('#tomorrowC').addClass('d-none');
                        $('#tomorrowW').addClass('d-none');
                        $('#tomorrowS').removeClass('d-none');
                    } else if (tomorrowHi > currentDailyHi) {
                        $('#tomorrowC').addClass('d-none');
                        $('#tomorrowS').addClass('d-none');
                        $('#tomorrowW').removeClass('d-none');
                    }
                })();

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
                };

                $('#currentDay').html("");
                $('#currentDay').append(
                    currentWeekday() + " "
                );
                $('#currentTime').html("");
                $('#currentTime').append(
                    timeConverter(currentUTC)
                );
                $('#dailyHi').html("");
                $('#dailyHi').append('Hi ' +
                    Math.max(Math.round(currentDailyHi * 10) / 10, 2.8).toFixed(1)
                );
                $('#dailyLo').html("");
                $('#dailyLo').append('Lo ' +
                    Math.max(Math.round(currentDailyLo * 10) / 10, 2.8).toFixed(1)
                );
                $('#currentTemperature').html("");
                $('#currentTemperature').append(
                    Math.max(Math.round(data.current.temp * 10) / 10, 2.8).toFixed(1)
                );
                $('#feelsLike').html("");
                $('#feelsLike').append('Feels Like ' +
                    Math.max(Math.round(data.current.feels_like * 10) / 10, 2.8).toFixed(1)
                );
                $('#currentIcon').html("");
                $('#currentIcon').append(
                    '<img class="forecastLightBG" src="http://openweathermap.org/img/w/' + data.current.weather[0].icon + '.png" />'
                );
                $('#currentDescription').html("");
                $('#currentDescription').append(
                    data.current.weather[0].description
                );
                $('#windArrow').html("");
                $('#windArrow').append(
                    arrowDirection()
                );
                $('#windDirection').html("");
                $('#windDirection').append(
                    getWindDirection()
                );
                $('#windSpeed').html("");
                $('#windSpeed').append(
                    Math.round(data.current.wind_speed)
                );



                $('#forecastdata').html("");

                data.daily.forEach(function (days, index) {
                    //forecast date
                    let forecastUTC = days.dt;
                    let forecastDT = days;
                    var forecastWeekdayNum = (Math.floor(forecastUTC / 86400) + 4) % 7;
                    var forecastWeekday = function () {
                        let daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                        let day = daysOfWeek[forecastWeekdayNum];
                        return (day);
                    };
                    let forecastDate = function () {
                        var a = new Date(forecastUTC * 1000);
                        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                        var month = months[a.getMonth()];
                        var date = a.getDate();
                        var time = month + ' ' + date;
                        return time;
                    }

                    let forecastSunrise = function () {
                        let date = new Date(forecastDT.sunrise * 1000);
                        let options = {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true
                        };
                        let timeString = date.toLocaleString('en-US', options);
                        return timeString;
                    }

                    let forecastSunset = function () {
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
                            + '<div class="ml-4">' + 'Lo ' + Math.max(Math.round(days.temp.min * 10) / 10, 2.8).toFixed(1) + '</div>'
                            + '</div>' //temp hi/lo group
                            + '</div>' //temp and conditions
                            + '<div class="pl-1">' + 'Sunrise: ' + forecastSunrise() + '</div>'
                            + '<div class="pl-1">' + 'Sunset: ' + forecastSunset() + '</div>'
                            + '</div>' //forecast card
                        );
                    } else if (index > 0 && index % 2 !== 0) {
                        $('#forecastdata').append('<div class="card forecastDarkBG" style="width: 18rem;">'
                            + '<div class="col text-center border-bottom cardHead">' + forecastWeekday() + ' ' + forecastDate(forecastUTC) + '</div>'
                            + '<div class="row">'
                            + '<div class="col-4">' + '<img src="http://openweathermap.org/img/w/' + days.weather[0].icon + '.png">' + '</div>'
                            + '<div class="col-8">'
                            + '<div class="ml-4">' + 'Hi ' + Math.max(Math.round(days.temp.max * 10) / 10, 2.8).toFixed(1) + '</div>'
                            + '<div class="ml-4">' + 'Lo ' + Math.max(Math.round(days.temp.min * 10) / 10, 2.8).toFixed(1) + '</div>'
                            + '</div>' //temp hi/lo group
                            + '</div>' //temp and conditions
                            + '<div class="pl-1">' + 'Sunrise: ' + forecastSunrise() + '</div>'
                            + '<div class="pl-1">' + 'Sunset: ' + forecastSunset() + '</div>'
                            + '</div>' //forecast card
                        );
                    }
                });
                //HOURLY FORECAST WITH BUTTON FUNCTION
                $('#hourlyForecastData').html("");
                $('#hiddenHourly').html("");

                data.hourly.forEach(function (hour, index){
                    if (index < 12) {
                        $('#hourlyForecastData').append(
                            `<div class="row border-bottom">` +
                            `<div class="col">` + timeConverter(hour.dt) + `</div>` +
                            `<div class="col d-flex"><div class="col">` + hour.weather[0].icon + `</div><div class="col">` + hour.weather[0].description + `</div></div>` +
                            `<div class="col">` + hour.temp + `</div>` +
                            `<div class="col">` + hour.feels_like + `</div>` +
                            `<div class="col">` + hour.humidity + `</div>` +
                            `<div class="col">` + hour.dew_point + `</div>` +
                            `<div class="col d-flex">` + `<div class="col">` + Math.round(hour.wind_speed) + ' MPH' + `</div>` + `<div class="col">` + hour.wind_deg + `</div></div>` +
                            `<div class="col">` + hour.pressure + `</div>` + index +
                            `</div>`
                        )
                    } else if (index >= 12 && index <= 24) {
                        $('#hiddenHourly').append(
                            `<div class="row">` +
                            `<div class="col">` + timeConverter(hour.dt) + `</div>` +
                            `<div class="col d-flex"><div class="col">` + hour.weather[0].icon + `</div><div class="col">` + hour.weather[0].description + `</div></div>` +
                            `<div class="col">` + hour.temp + `</div>` +
                            `<div class="col">` + hour.feels_like + `</div>` +
                            `<div class="col">` + hour.humidity + `</div>` +
                            `<div class="col">` + hour.dew_point + `</div>` +
                            `<div class="col d-flex">` + `<div class="col">` + Math.round(hour.wind_speed) + ' MPH' + `</div>` + `<div class="col">` + hour.wind_deg + `</div></div>` +
                            `<div class="col">` + hour.pressure + `</div>` + index +
                            `</div>`
                        );
                    }
                });
                //$('#arrowBtn').toggleClass('activeArrow');
                $('#hiddenHourly').hide();
                $('#arrowBtn').click(function (e){
                    e.preventDefault();
                    $('#hiddenHourly').removeClass('d-none');
                    $('#hiddenHourly').slideToggle('slow');
                    console.log("Hello!");
                });

                //HIDE & SHOW ELEMENTS WHEN TAB SELECTED
                $('#todayTab').click(function(){
                        $('#weatherdata').removeClass('col').addClass('col-8'); //when click on today tab
                        $('#conditionsCol').removeClass('d-none').addClass('');
                        $('#miniMap').removeClass('d-none').addClass('');
                        $('#forecastdata').removeClass('d-none').addClass('');
                    }
                );
                $('#hourlyTab').click(function(){
                        $('#weatherdata').removeClass('col-8').addClass('col'); //when click on hourly tab
                        $('#conditionsCol').addClass('d-none');
                        $('#miniMap').addClass('d-none');
                        $('#forecastdata').addClass('d-none');
                    }
                );
                $('#forecastTab').click(function(){
                        $('#weatherdata').removeClass('col-8').addClass('col'); //when click on 7 day tab
                        $('#conditionsCol').addClass('d-none');
                        $('#miniMap').addClass('d-none');
                        $('#forecastdata').removeClass('d-none').addClass('');
                        $('#forecastdata').appendTo($('#forecastDataHome'));
                    }
                );


                var yesterday = parseInt(data.current.dt) - (60 * 60 * 24);
                $.get('https://api.openweathermap.org/data/2.5/onecall/timemachine', {
                    APPID: OPEN_WEATHER_APPID,
                    dt: yesterday,
                    lat: lat,
                    lon: long,
                    units: 'imperial',
                }).done(function (olddata) {
                    var yesterdayHi = olddata.hourly[0].temp;
                    console.log(yesterdayHi);
                    (function () {
                        if (yesterdayHi < currentDailyHi) {
                            $('#yesterdayS').addClass('d-none');
                            $('#yesterdayW').addClass('d-none');
                            $('#yesterdayC').removeClass('d-none');
                        } else if (yesterdayHi === currentDailyHi) {
                            $('#yesterdayC').addClass('d-none');
                            $('#yesterdayW').addClass('d-none');
                            $('#yesterdayS').removeClass('d-none');
                        } else if (yesterdayHi > currentDailyHi) {
                            $('#yesterdayC').addClass('d-none');
                            $('#yesterdayS').addClass('d-none');
                            $('#yesterdayW').removeClass('d-none');
                        }
                    })();
                });
                reverseGeocode(lat, long)
            });
        };
    ajaxRequest(lat, long)
})(); //IFFE closing