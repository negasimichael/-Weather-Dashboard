$("#document").ready(function () {
   currentWeather()
})

function currentWeather() {
   let date = new Date();
   $("#search-button").on("click", function (e) {
       e.preventDefault();
       var city = $('#search-value').val().trim();
       // $('#search-value').val('');
       searchWeather(city);
       abcdForcast(city)
       console.log(city)
   });

   function makeList(name) {
       var li = $("<li>").addClass("list-group-item  list-group-item-action").text(name);
       li.attr('id', name);
       $("histry").prepend(li);
   }
   const apiKey = "e5920134e1d6747e542246af4b9e297f";
   function searchWeather(city) {

       const queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

       $.ajax({
           url: queryUrl,
           method: "GET"

       }).then(function (result) {
           console.log(result)
           var cityName = (result.name)
           console.log(cityName)
           var countryName = (result.sys.country)
           console.log(countryName)
           var nation = (cityName + ' , ' + countryName)
           var temp = (result.main.temp)
           console.log(temp)
           var humidity = (result.main.humidity)
           // console.log(humidity)
           var image = (result.weather[0].icon)
           // console.log(image)
           var wind = (result.wind.speed)
           // console.log(wind)
           var lat = (result.coord.lat)
           // console.log(lat)
           var lon = (result.coord.lon)
           // console.log(lon)
           var today = $('#today').empty();
           console.log(nation)
           // today.append(nation)

           var card = $("<div>").addClass("card");
           var cardBody = $("<div>").addClass("card-body");
           var city = $("<h4>").addClass("card-title").text(nation);
           var cityDate = $("<h4>").addClass("card-title").text(new Date().toLocaleDateString());
           var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + image + ".png")
           var temp = $("<p>").addClass("card-text current-temp").text("Temperature: " + temp + " °F");
           var humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + humidity + "%");
           var wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + wind + " MPH");
           var lat = $("<p>").addClass("card-text current-lat").text("latitude:" + lat)
           var lon = $("<p>").addClass("card-text current-lon").text("longitude:" + lon)

           city.prepend(cityDate, image)
           cardBody.append(city, temp, humidity, wind, lat, lon);
           card.append(cardBody);
           today.append(card)

           makeList(nation);
           if (history.indexOf(city) === -1) {
               history.push(nation);
               window.localStorage.setItem("history", JSON.stringify(history));
               makeList(nation);
           }

       })
   }

   function abcdForcast(city) {

       $.ajax({
           url: `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=e5920134e1d6747e542246af4b9e297f`,
           method: "GET"

       }).then(function (result) {
           console.log(result)
           var data = result.list
           console.log(data)

           for (let i = 0; i < 5; i++) {
               // var myDate =  new Date(data.list[0].dt_txt;
               var humidity5 = data[0].main.humidity
               console.log(humidity5)
               // $("#myForcast").append(humidity5)
               var temp2 = data[0].main.temp_max
               console.log(temp2)
               var myDate = new Date(data[i].dt_txt).toLocaleDateString();
               console.log(myDate)
               var myImg = data[i].weather[0].icon
               console.log(myImg)
               // if (data[i].dt_txt.indexOf("15:00:00") !== -1) {
               // create div for weather forcast
               var col = $("<div>").addClass("xyz col-md-3");
               var card = $("<div>").addClass("card bg-primary text-white");
               var body = $("<div>").addClass("card-body p-3");
               //create tags todays date, image, temp and humidity
               var title = $("<h2>").addClass("card-title").text(new Date(data[i].dt_txt).toLocaleDateString());
               var img = $("<img>").attr("src", "https://openweathermap.org/img/w/02d.png");
               var p1 = $("<p>").addClass("card-text").text("Temp: " + data[i].main.temp_max + " °F");
               var p2 = $("<p>").addClass("card-text").text("Humidity: " + data[i].main.humidity + "%");
               //apend the tags to the title, img, p1 & p2 to body, boy to card, card to col and finally col to the forcast div
               $("#myForcast").append(col.append(card.append(body.append(title, p1, p2))));
               // }
           }
       })
   }
   var history = JSON.parse(window.localStorage.getItem("history")) || []; 
   if (history.length > 0) {
   searchWeather(history[history.length-1]);
   } 
   for (var i = 0; i < history.length; i++) {
       makeList(history[i]);
   }
} 

//clear local storage after confirmiton and if there is city saved else do nothing
$('#clear').on('click', function(){
   if (localStorage.length !== 0) {
       var clear = confirm('Press OK to clear history!');
       if(clear){
           $('.history').empty();
           localStorage.clear();
       }
   }
});








// //api key
// const apiKey = "e5920134e1d6747e542246af4b9e297f";

// let date = new Date();
// $("#search-value").on("click", function (e) {
//    var city = $('#search-value').val();
//    e.preventDefault();
//    console.log()

// });

// $("#search-button").on("click", function () {

//     $('forcecastH5').addClass('show');
//    //store the value
//     city = $("#search-value").val();

//    $("#serch-value").on("click", "li", function () {
//       currentWeather($(this).text());
//    });

//    function makeRow(name) {
//       var li = $("<li>").addClass("list-group-item  list-group-item-action").text(name);
//       li.attr('id', name);
//       $(".currentWeather").prepend(li);
//    }

//    // url api
//    const queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;


//    $.ajax({
//       url: queryUrl,
//       method: "GET"

//    }).then(function (result) {
//       console.log(result)
//       console.log(city.main)
//       console.log(result .city.main.temp)
//       console.log ( rcity.list[0].wind.speed)
//       console.log (city.list[0].dt_txt)
//       console.log  (city[0].weather.icon)
//       console.log  (city.main.temp)
//       let tempF = result.main.temp-273.15*1.80+32;
//       console.log  (result.main.humidity)
//       console.log(Math.floor(tempF))

   
//       makeList(city);
//       $('#curentCity').empty();

//       var card = $("<div>").addClass("card");
//       var cardBody = $("<div>").addClass("card-body");
//       var city = $("<h4>").addClass("card-title").text(result.city.name);
//       var cityDate = $("<h4>").addClass("card-title").text(result.list[0].dt_txt.toLocaleDateString('en-US'));
//       var tempF = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempF + " °F");
//       var humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + result.main.humidity + "%");
//       var wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + result.list[0].wind.speed + " MPH");
//       var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + result.list[0].weather.icon + ".png")

//       city.append(cityDate, image)
//       cardBody.append(city, tempF, humidity, wind);
//       card.append(cardBody);
//       $("#currenCity").append(card)

//    })

// });
// function currentForcast(){ 
// var city = (result.city.name)
// const queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

// $.ajax({
//    url: queryUrl,
//    method: "GET"
// }).then(function (result) {

//    console.log(result)
//    console.log(result.dt)
//    $('#forecast').empty();
//    const list = $('div')
//    for (let i = 0; i < result.list.length; i += 5) {
//       console.log(result.list[i])
//       const humidity = $('li')
//       humidity.text(result.list[i].humidity)
//    }
//    var tempF = (result[i].main.temp - 273.15) * 1.80 + 32;
//    var tempF = Math.floor(temp);
//    var card = $("<div>").addClass("card col-md-2 ml-4 bg-primary text-white");
//    var cardBody = $("<div>").addClass("card-body p-3 forecastBody")
//    var cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
//    var tempF = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + tempF + " °F");
//    var humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + result[i].main.humidity + "%");

//    var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + result[i].weather[0].icon + ".png")

//    city.append(cityDate, image)
//    cardBody.append(city, tempF, humidity, wind);
//    card.append(cardBody);
//    $("#forcast").append(card)

// })
// }




     




























