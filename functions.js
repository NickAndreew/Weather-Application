var stats = {
    names: [

    ]
}

$("#fiveDaysForecastId").hide();
$("#userInputDivId").show();


$(document).ready(function () {
    $("#fiveDaysForecastId").hide();
    $("#userInputDivId").hide();
 
    

    function changeImage() {   
        var BackgroundImg = ["/gifs/1.gif",
            "/gifs/2.gif",
            "/gifs/3.gif",
            "/gifs/4.gif",
            "/gifs/5.gif",
            "/gifs/6.gif",
            "/gifs/7.gif",
            "/gifs/8.gif",
            "/gifs/9.gif"
        ];
        var i = Math.floor((Math.random() * 9));
        $(".container1").css("background", 'url("' + BackgroundImg[i] + '")');
        $(".container1").css("background-size", "cover");
    }

    window.setInterval(changeImage, 7000);
    
    
    $("#currentPlaceWeatherId").on("click", function(){
        
        $("#mainPageDivId").hide()
        $("#userInputDivId").show();
        $(".fiveDaysDiv").show();

        getLocation();

        function getLocation(){
            if (navigator.geolocation){
                navigator.geolocation.getCurrentPosition(showPosition, showError);
            } else {
                console.log("Geolocation is not supported by this browser.");
            }
        }

        function showPosition(position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            displayLocation(lat, lon);
        }

        function showError(error){
            switch(error.code){
                case error.PERMISSION_DENIED:
                    console.log("User denied the request for Geolocation.");
                break;
                case error.POSITION_UNAVAILABLE:
                    console.log("Location information is unavailable.");
                break;
                case error.TIMEOUT:
                    console.log("The request to get user location timed out.");
                break;
                case error.UNKNOWN_ERROR:
                    console.log("An unknown error occurred.");
                break;
            }
        }

        function displayLocation(latitude, longitude){
            var geocoder;
            geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(latitude, longitude);

            geocoder.geocode(
                {'latLng': latlng}, 
                function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            var add = results[0].formatted_address ;
                            var value = add.split(",");

                            count = value.length;
                            country = value[count-1];
                            state = value[count-2];
                            city = value[count-2].split(" ")[2];
                            console.log("city name is: " + city);
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
                    //                        $(".firstDiv").css("background", 'url("Cloudy-background.jpg")');
                    //                        document.getElementById("htmlCl").style.backgroundImage = "url("+"Cloudy-background.jpg"+")";
                                    } else if(json.list[dayNumber].weather[0].main == "Clear"){
                                        $("#thumb").attr("src", "Sunny-background.jpg");      
                    //                        $(".firstDiv").css("background", 'url("Sunny-background.jpg")');      
                    //                        document.getElementById("htmlCl").style.backgroundImage = "url("+"Sunny-background.jpg"+")";
                                    } else if(json.list[dayNumber].weather[0].main == "Rain"){
                                        $("#thumb").attr("src", "Rainy-background.jpg");
                    //                        $(".firstDiv").css("background", 'url("Rainy-background.jpg")');
                    //                        document.getElementById("htmlCl").style.backgroundImage = "url("+"Rainy-background.jpg"+")";
                                    } else if(json.list[dayNumber].weather[0].main == "Mist"){
                                        $("#thumb").attr("src", "Foggy-background.jpg");
                    //                        $(".firstDiv").css("background", 'url("Foggy-background.jpg")');
                    //                        document.getElementById("htmlCl").style.backgroundImage = "url("+"Foggy-background.jpg"+")";
                                    } else if(json.list[dayNumber].weather[0].main == "Fog"){
                                        $("#thumb").attr("src", "Foggy-background.jpg");
                    //                        $(".firstDiv").css("background", 'url("Foggy-background.jpg")');
                    //                        document.getElementById("htmlCl").style.backgroundImage = "url("+"Foggy-background.jpg"+")";
                                    } else if(json.list[dayNumber].weather[0].main == "Haze"){
                                        $("#thumb").attr("src", "Hazy-background.jpg");
                    //                        $(".firstDiv").css("background", 'url("Hazy-background.jpg")');
                    //                        document.getElementById("htmlCl").style.backgroundImage = "url("+"Hazy-background.jpg"+")";
                                    } else if(json.list[dayNumber].weather[0].main == "Drizzle"){
                                        $("#thumb").attr("src", "Drizzly-background.jpg");
                    //                        $(".firstDiv").css("background", 'url("Drizzly-background.jpg")');
                    //                        document.getElementById("htmlCl").style.backgroundImage = "url("+"Drizzly-background.jpg"+")";
                                    } else if(json.list[dayNumber].weather[0].main == "Snow"){
                                        $("#thumb").attr("src", "Snowy-background.jpg");
                    //                        $(".firstDiv").css("background", 'url("Snowy-background.jpg")');
                    //                        document.getElementById("htmlCl").style.backgroundImage = "url("+"Snowy-background.jpg"+")";            
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
                        } else {
                            console.log("address not found");
                        }
                    } else {
                        console.log("Geocoder failed due to: " + status);
                    }
                }
            );
        }
    
    });


    $("#weatherInfo").hide();
    $("#user-input").change(function (){
        
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
//                    $(".firstDiv").css("background", 'url("Cloudy-background.jpg")');
//                        document.getElementById("htmlCl").style.backgroundImage = "url("+"Cloudy-background.jpg"+")";
                } else if(json.list[dayNumber].weather[0].main == "Clear"){
                    $("#thumb").attr("src", "Sunny-background.jpg");      
//                    $(".firstDiv").css("background", 'url("Sunny-background.jpg")');      
//                        document.getElementById("htmlCl").style.backgroundImage = "url("+"Sunny-background.jpg"+")";
                } else if(json.list[dayNumber].weather[0].main == "Rain"){
                    $("#thumb").attr("src", "Rainy-background.jpg");
//                    $(".firstDiv").css("background", 'url("Rainy-background.jpg")');
//                        document.getElementById("htmlCl").style.backgroundImage = "url("+"Rainy-background.jpg"+")";
                } else if(json.list[dayNumber].weather[0].main == "Mist"){
                    $("#thumb").attr("src", "Foggy-background.jpg");
//                    $(".firstDiv").css("background", 'url("Foggy-background.jpg")');
//                        document.getElementById("htmlCl").style.backgroundImage = "url("+"Foggy-background.jpg"+")";
                } else if(json.list[dayNumber].weather[0].main == "Fog"){
                    $("#thumb").attr("src", "Foggy-background.jpg");
//                    $(".firstDiv").css("background", 'url("Foggy-background.jpg")');
//                        document.getElementById("htmlCl").style.backgroundImage = "url("+"Foggy-background.jpg"+")";
                } else if(json.list[dayNumber].weather[0].main == "Haze"){
                    $("#thumb").attr("src", "Hazy-background.jpg");
//                    $(".firstDiv").css("background", 'url("Hazy-background.jpg")');
//                        document.getElementById("htmlCl").style.backgroundImage = "url("+"Hazy-background.jpg"+")";
                } else if(json.list[dayNumber].weather[0].main == "Drizzle"){
                    $("#thumb").attr("src", "Drizzly-background.jpg");
//                    $(".firstDiv").css("background", 'url("Drizzly-background.jpg")');
//                        document.getElementById("htmlCl").style.backgroundImage = "url("+"Drizzly-background.jpg"+")";
                } else if(json.list[dayNumber].weather[0].main == "Snow"){
                    $("#thumb").attr("src", "Snowy-background.jpg");
//                    $(".firstDiv").css("background", 'url("Snowy-background.jpg")');
//                        document.getElementById("htmlCl").style.backgroundImage = "url("+"Snowy-background.jpg"+")";            
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
                $("#mainPageDivId").hide();
                $("#userInputDivId").show();
        })
        .fail(function(){
            console.log("Failure!");
        });
    });
  
    
});