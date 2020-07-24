"use strict";

$.get("http://api.openweathermap.org/data/2.5/weather", {
    APPID: OPEN_WEATHER_APPID,
    q: "San Antonio, US",
    units: "imperial"
}).done(function(data) {
    console.log(data);
});
