var stats = {
    names: [

    ]
}

$("#fiveDaysForecastId").hide();
$("#userInputDivId").show();

$(document).ready(function () {
    $("#fiveDaysForecastId").hide();
    $("#userInputDivId").hide();
 
    $('#mainPageDivId')
        .delay(800)
        .queue(function (next) { 
        $(this).show();
        next(); 
    });
    $("#currentPlaceWeatherId").on("click", function(){
        var city = "";
    //    getUsersCity();
        var locationURL;
        locationURL = "http://ip-api.com/json";
        
        $('#mainPageDivId')
            .delay(800)
            .queue(function (next) { 
            $("#mainPageDivId").hide()
            $("#userInputDivId").show();
            $(".fiveDaysDiv").show();
            next(); 
        });
        $.getJSON(locationURL, function(cityData){
            console.log(cityData.city);
            city = cityData.city;

            console.log(city);
            var url = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&APPID=5477437c8f28aed38631196e71c8c976";

            $.getJSON(url, function(json){
                $("#1st").text(json.list[0].dt_txt.split("-")[1]+" - "+json.list[0].dt_txt.split("-")[2].split(" ")[0]);
                $("#2nd").text(json.list[8].dt_txt.split("-")[1]+" - "+json.list[8].dt_txt.split("-")[2].split(" ")[0]);
                $("#3rd").text(json.list[16].dt_txt.split("-")[1]+" - "+json.list[16].dt_txt.split("-")[2].split(" ")[0]);
                $("#4th").text(json.list[24].dt_txt.split("-")[1]+" - "+json.list[24].dt_txt.split("-")[2].split(" ")[0]);
                $("#5th").text(json.list[32].dt_txt.split("-")[1]+" - "+json.list[32].dt_txt.split("-")[2].split(" ")[0]);
                
                // button handlers
                gettingJSON(0);
                $("#1st").on('click', function() {
                    gettingJSON(0);
                });

                $("#2nd").on('click', function() {
                    gettingJSON(8);
                });

                $("#3rd").on('click', function() {
                    gettingJSON(16);
                });

                $("#4th").on('click', function() {
                    gettingJSON(24);
                });

                $("#5th").on('click', function() {
                    gettingJSON(32);
                });

                $("#weatherInfo").css("display", "block");
                $("#fiveDaysForecastId").css("display", "block");

                function gettingJSON(dayNumber){

                    console.log(json.list[dayNumber].weather[0].main);
                    console.log(json.list[dayNumber].main.temp);

                    if(json.list[dayNumber].weather[0].main == "Clouds"){
                        $("#thumb").attr("src", "Cloudy-background.jpg");
                        document.getElementById("htmlCl").style.backgroundImage = "url("+"Cloudy-background.jpg"+")";
                    } else if(json.list[dayNumber].weather[0].main == "Clear"){
                        $("#thumb").attr("src", "Sunny-background.jpg");      
                        document.getElementById("htmlCl").style.backgroundImage = "url("+"Sunny-background.jpg"+")";
                    } else if(json.list[dayNumber].weather[0].main == "Rain"){
                        $("#thumb").attr("src", "Rainy-background.jpg");
                        document.getElementById("htmlCl").style.backgroundImage = "url("+"Rainy-background.jpg"+")";
                    } else if(json.list[dayNumber].weather[0].main == "Mist"){
                        $("#thumb").attr("src", "Foggy-background.jpg");
                        document.getElementById("htmlCl").style.backgroundImage = "url("+"Foggy-background.jpg"+")";
                    } else if(json.list[dayNumber].weather[0].main == "Fog"){
                        $("#thumb").attr("src", "Foggy-background.jpg");
                        document.getElementById("htmlCl").style.backgroundImage = "url("+"Foggy-background.jpg"+")";
                    } else if(json.list[dayNumber].weather[0].main == "Haze"){
                        $("#thumb").attr("src", "Hazy-background.jpg");
                        document.getElementById("htmlCl").style.backgroundImage = "url("+"Hazy-background.jpg"+")";
                    } else if(json.list[dayNumber].weather[0].main == "Drizzle"){
                        $("#thumb").attr("src", "Drizzly-background.jpg");
                        document.getElementById("htmlCl").style.backgroundImage = "url("+"Drizzly-background.jpg"+")";
                    } else if(json.list[dayNumber].weather[0].main == "Snow"){
                        $("#thumb").attr("src", "Snowy-background.jpg");
                        document.getElementById("htmlCl").style.backgroundImage = "url("+"Snowy-background.jpg"+")";            
                    } 
                    var temp = (json.list[dayNumber].main.temp-273.15).toFixed(2);
                    $("#tempId").html(temp+"°.");
                    $("#weathId").html(json.list[dayNumber].weather[0].main+".");
                    $("#windId").html("Wind : "+json.list[dayNumber].wind.speed + " m/s.");
                    $("#titleId").html(json.city.name);
                    
                }
            })
            .done(function(){
                console.log("Success!");
            })
            .fail(function(){
                console.log("Failure!");
            });
        });
    });


//    $("#weatherInfo").hide();
    $("#user-input").change(function (){

        $('#mainPageDivId')
            .delay(800)
            .queue(function (next) { 
            $("#mainPageDivId").hide();
            $("#userInputDivId").show();
            $(".fiveDaysDiv").show();
            next(); 
        });
        
        var cityInput = document.getElementById("user-input").value;
        var url = "https://api.openweathermap.org/data/2.5/forecast?q="+cityInput+"&APPID=5477437c8f28aed38631196e71c8c976";
        $.getJSON(url, function(json){
            $("#1st").text(json.list[0].dt_txt.split("-")[1]+" - "+json.list[0].dt_txt.split("-")[2].split(" ")[0]);
            $("#2nd").text(json.list[8].dt_txt.split("-")[1]+" - "+json.list[8].dt_txt.split("-")[2].split(" ")[0]);
            $("#3rd").text(json.list[16].dt_txt.split("-")[1]+" - "+json.list[16].dt_txt.split("-")[2].split(" ")[0]);
            $("#4th").text(json.list[24].dt_txt.split("-")[1]+" - "+json.list[24].dt_txt.split("-")[2].split(" ")[0]);
            $("#5th").text(json.list[32].dt_txt.split("-")[1]+" - "+json.list[32].dt_txt.split("-")[2].split(" ")[0]);
            
            // button handlers
            gettingJSON(0);
            $("#1st").on('click', function() {
                gettingJSON(0);
            });

            $("#2nd").on('click', function() {
                gettingJSON(8);
            });

            $("#3rd").on('click', function() {
                gettingJSON(16);
            });

            $("#4th").on('click', function() {
                gettingJSON(24);
            });

            $("#5th").on('click', function() {
                gettingJSON(32);
            });

            $("#weatherInfo").show();
            $("#fiveDaysForecastId").show();

            function gettingJSON(dayNumber){

                console.log(json.list[dayNumber].weather[0].main);
                console.log(json.list[dayNumber].main.temp);

                if(json.list[dayNumber].weather[0].main == "Clouds"){
                    $("#thumb").attr("src", "Cloudy-background.jpg");
                    document.getElementById("htmlCl").style.backgroundImage = "url("+"Cloudy-background.jpg"+")";
                } else if(json.list[dayNumber].weather[0].main == "Clear"){
                    $("#thumb").attr("src", "Sunny-background.jpg");      
                    document.getElementById("htmlCl").style.backgroundImage = "url("+"Sunny-background.jpg"+")";
                } else if(json.list[dayNumber].weather[0].main == "Rain"){
                    $("#thumb").attr("src", "Rainy-background.jpg");
                    document.getElementById("htmlCl").style.backgroundImage = "url("+"Rainy-background.jpg"+")";
                } else if(json.list[dayNumber].weather[0].main == "Mist"){
                    $("#thumb").attr("src", "Foggy-background.jpg");
                    document.getElementById("htmlCl").style.backgroundImage = "url("+"Foggy-background.jpg"+")";
                } else if(json.list[dayNumber].weather[0].main == "Fog"){
                    $("#thumb").attr("src", "Foggy-background.jpg");
                    document.getElementById("htmlCl").style.backgroundImage = "url("+"Foggy-background.jpg"+")";
                } else if(json.list[dayNumber].weather[0].main == "Haze"){
                    $("#thumb").attr("src", "Hazy-background.jpg");
                    document.getElementById("htmlCl").style.backgroundImage = "url("+"Hazy-background.jpg"+")";
                } else if(json.list[dayNumber].weather[0].main == "Drizzle"){
                    $("#thumb").attr("src", "Drizzly-background.jpg");
                    document.getElementById("htmlCl").style.backgroundImage = "url("+"Drizzly-background.jpg"+")";
                } else if(json.list[dayNumber].weather[0].main == "Snow"){
                    $("#thumb").attr("src", "Snowy-background.jpg");
                    document.getElementById("htmlCl").style.backgroundImage = "url("+"Snowy-background.jpg"+")";            
                } 
                var temp = (json.list[dayNumber].main.temp-273.15).toFixed(2);
                $("#tempId").html(temp+"°.");
                $("#weathId").html(json.list[dayNumber].weather[0].main+".");
                $("#windId").html("Wind : "+json.list[dayNumber].wind.speed + " m/s.");
                $("#titleId").html(json.city.name);
            }
        })
        .done(function(){
            console.log("Success!");
        })
        .fail(function(){
            console.log("Failure!");
        });
    });
    
    
    $("#weatherInfo").hide();
    $("#user-input1").change(function (){
        
        
        var cityInput = document.getElementById("user-input1").value;
        var url = "https://api.openweathermap.org/data/2.5/forecast?q="+cityInput+"&APPID=5477437c8f28aed38631196e71c8c976";
        $.getJSON(url, function(json){
            
            $("#1st").text(json.list[0].dt_txt.split("-")[1]+" - "+json.list[0].dt_txt.split("-")[2].split(" ")[0]);
            $("#2nd").text(json.list[8].dt_txt.split("-")[1]+" - "+json.list[8].dt_txt.split("-")[2].split(" ")[0]);
            $("#3rd").text(json.list[16].dt_txt.split("-")[1]+" - "+json.list[16].dt_txt.split("-")[2].split(" ")[0]);
            $("#4th").text(json.list[24].dt_txt.split("-")[1]+" - "+json.list[24].dt_txt.split("-")[2].split(" ")[0]);
            $("#5th").text(json.list[32].dt_txt.split("-")[1]+" - "+json.list[32].dt_txt.split("-")[2].split(" ")[0]);
            
            // button handlers
            gettingJSON(0);
            $("#1st").on('click', function() {
                gettingJSON(0);
            });

            $("#2nd").on('click', function() {
                gettingJSON(8);
            });

            $("#3rd").on('click', function() {
                gettingJSON(16);
            });

            $("#4th").on('click', function() {
                gettingJSON(24);
            });

            $("#5th").on('click', function() {
                gettingJSON(32);
            });

            $("#weatherInfo").show();
            $("#fiveDaysForecastId").show();

            function gettingJSON(dayNumber){

                console.log(json.list[dayNumber].weather[0].main);
                console.log(json.list[dayNumber].main.temp);

                if(json.list[dayNumber].weather[0].main == "Clouds"){
                    $("#thumb").attr("src", "Cloudy-background.jpg");
                    document.getElementById("htmlCl").style.backgroundImage = "url("+"Cloudy-background.jpg"+")";
                } else if(json.list[dayNumber].weather[0].main == "Clear"){
                    $("#thumb").attr("src", "Sunny-background.jpg");      
                    document.getElementById("htmlCl").style.backgroundImage = "url("+"Sunny-background.jpg"+")";
                } else if(json.list[dayNumber].weather[0].main == "Rain"){
                    $("#thumb").attr("src", "Rainy-background.jpg");
                    document.getElementById("htmlCl").style.backgroundImage = "url("+"Rainy-background.jpg"+")";
                } else if(json.list[dayNumber].weather[0].main == "Mist"){
                    $("#thumb").attr("src", "Foggy-background.jpg");
                    document.getElementById("htmlCl").style.backgroundImage = "url("+"Foggy-background.jpg"+")";
                } else if(json.list[dayNumber].weather[0].main == "Fog"){
                    $("#thumb").attr("src", "Foggy-background.jpg");
                    document.getElementById("htmlCl").style.backgroundImage = "url("+"Foggy-background.jpg"+")";
                } else if(json.list[dayNumber].weather[0].main == "Haze"){
                    $("#thumb").attr("src", "Hazy-background.jpg");
                    document.getElementById("htmlCl").style.backgroundImage = "url("+"Hazy-background.jpg"+")";
                } else if(json.list[dayNumber].weather[0].main == "Drizzle"){
                    $("#thumb").attr("src", "Drizzly-background.jpg");
                    document.getElementById("htmlCl").style.backgroundImage = "url("+"Drizzly-background.jpg"+")";
                } else if(json.list[dayNumber].weather[0].main == "Snow"){
                    $("#thumb").attr("src", "Snowy-background.jpg");
                    document.getElementById("htmlCl").style.backgroundImage = "url("+"Snowy-background.jpg"+")";            
                } 
                var temp = (json.list[dayNumber].main.temp-273.15).toFixed(2);
                $("#tempId").html(temp+"°.");
                $("#weathId").html(json.list[dayNumber].weather[0].main+".");
                $("#windId").html("Wind : "+json.list[dayNumber].wind.speed + " m/s.");
                $("#titleId").html(json.city.name);
            }
        })
        .done(function(){
            console.log("Success!");
            $('#mainPageDivId')
                .delay(800)
                .queue(function (next) { 
                $("#mainPageDivId").hide();
                $("#userInputDivId").show();
                next(); 
            });
        })
        .fail(function(){
            console.log("Failure!");
        });
    });
        
    
    var x = document.getElementById("demo");

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else { 
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function showPosition(position) {
        x.innerHTML = "Latitude: " + position.coords.latitude + 
        "<br>Longitude: " + position.coords.longitude;
    }

    function homePage() {
        document.getElementById("htmlCl").style.backgroundImage = url("autumn-background.jpg");
        $("#tempId").html(style, "display:none");
        $("#weathId").html(style, "display:none");
        $("#windId").html(style, "display:none");
        var x = document.getElementById("citySelector").options[0];
        $("# citySelector").select(x);
    }

    function createSelector() {
        var blank = document.createElement("option");
        blank.value = "";
        blank.setAttribute("style", "display:none");
        for (var i = 0; i < stats.names.length; i++) {

            var x = document.getElementById("citySelector");
            var option = document.createElement("option");
            option.text = (stats.names[i].city);
            option.setAttribute("value", stats.names[i].city);
            if (i == 0) {
                x.add(blank);
            }
            x.add(option, x[i]);
        }
    }

    function getStats(statistics) {
        for (var i = 0; i < statistics.length; i++) {
            var forecast = {};
            forecast.city = statistics[i].name;
            forecast.temperature = statistics[i].main.temp;
            forecast.weather = statistics[i].weather[0].main;
            forecast.wind = statistics[i].wind.speed;

            var iconSrc = "";
            var backPic = "";

            if (statistics[i].weather[0].main == "Sun") {
                iconSrc = "Sunny.png";
                backPic = "Sunny-background.jpg";
            } else if (statistics[i].weather[0].main == "Sunny") {
                iconSrc = "Sunny.png";
                backPic = "http://imgstocks.com/wp-content/uploads/2013/09/Download-cloudy-sky-hd-wallpaper-free-wallpaper.jpg";
            } else if (statistics[i].weather[0].main == "Rain") {
                iconSrc = "Rain.png";
                backPic = "Rainy-background.jpg";
            } else if (statistics[i].weather[0].main == "Clouds") {
                iconSrc = "Clouds.png";
                backPic = "Cloudy-background.jpg";
            }
            forecast.icon = iconSrc;
            forecast.background = backPic;
            stats.names.push(forecast);
        }
    }
});