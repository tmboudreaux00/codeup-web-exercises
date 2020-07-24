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
            

            lang: "de"
        }).done(function(data) {
            let unixUTC = data.TIMECHANGEME;
            let humanDate = new Date(unixUTC * 1000);

            $('#weatherdata').html("");
            $('#weatherdata').append('<div class="container-fluid">'
                + '<div class="row">'
                + '<div class="card" style="width: 18rem;">'
                + '<div>' + data.daily.dt + '</div>'
                + '<div>' + '<span>Current Temperature In: </span>' + data.name + '</div>'
                + '<div>' + data.current.temp + '<span>&deg;F</span>' + '</div>'
                + '<div>' + '<span>' + '</span>' + '</div>'
                + '<div>' + '<span>' + '</span>' + '</div>'
                + '<div>' + '<span>' + '</span>' + '</div>'
                + '<div>' + '<span>' + '</span>' + '</div>'
                + '<div>' + '<span>' + '</span>' + '</div>'
                + '<div>' + '<span>' + '</span>' + '</div>'
                + '</div>'
                + '</div>'
    );
            /**
            //date

            //hi degrees f/lo degrees f
            //forecast icon

            data.weather.//description: overcast clouds
            //humidity: 52

            //wind: 6.78 speed direction directionicon

            //pressure: 1012


            data.forEach(function(days){
                $('#weatherdata').append('<div class="container-fluid">'
                    + '<div class="row">'
                        + '<div class="card" style="width: 18rem;">'
                            + '<div>' + days.//date + '</div>'
                            + '<div>' + days.//hitemp + '</div>'
                            + '<div>' +  + '</div>'
                            + '<div>' +  + '</div>'
                            + '<div>' +  + '</div>'
                            + '<div>' +  + '</div>'
                            + '<div>' +  + '</div>'
                            + '<div>' +  + '</div>'
                            + '<div>' +  + '</div>'
                            + '<img src="" class="card-img-top" alt="">'
                            + '<div class="card-body">'
                                + '<h5 class="card-title">' + '' + '</h5>'
                                + '<p class="card-text">' + '' + '</p>'
                                + '<a href="#" class="btn btn-primary">' + '' + '</a>'
                            + '</div>'
                        + '</div>'
                    + '</div>'
                    + '</div>');
            }) */
            console.log(data);
        });
    });

    //get api data for map

//IFFE closing
})();