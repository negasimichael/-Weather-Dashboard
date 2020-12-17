//api key
const apiKey = "e5920134e1d6747e542246af4b9e297f";

let date = new Date();
$("#search-value").on("click", function (e) {
   var city = $('#search-value').val();
   e.preventDefault();
   console.log(city)

})

$("#search-button").on("click", function (e) {
   e.preventDefault();
   // $('forcecastH5').addClass('show');
   //store the value
   var city = $("#search-value").val();

   $("#serch-value").on("click", "li", function () {
      currentWeather($(this).text());
   });

   function makeRow(name) {
      var li = $("<li>").addClass("list-group-item  list-group-item-action").text(name);
      li.attr('id', name);
      $(".currentWeather").prepend(li);
   }

   // url api
   const queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;


   $.ajax({
      url: queryUrl,
      method: "GET"

   }).then(function (result) {
      console.log(result)
      var city = (result.city.name)
      var country = (city + ', ' + country)
      var cityDate = (result.list[0].dt_txt)
      var image = (result.weather[0].icon)
      var tempF = (result.main.temp)
      // let tempF = result.main.temp-273.15*1.80+32;
      var humidity = (result.main.humidity)
      var wind = (result.main.wind)
      console.log(Math.floor(tempF))

      // currentConditions(result);
      // currentConditions(result);
      makeList(country);
      $('#curentWeather').empty();

      var card = $("<div>").addClass("card");
      var cardBody = $("<div>").addClass("card-body");
      var city = $("<h4>").addClass("card-title").text(result.city.name);
      var cityDate = $("<h4>").addClass("card-title").text(result.list[0].dt_txt.toLocaleDateString('en-US'));
      var tempF = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempF + " °F");
      var humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + result.main.humidity + "%");
      var wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + result.wind.speed + " MPH");
      var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + result.weather[0].icon + ".png")

      city.append(cityDate, image)
      cardBody.append(city, tempF, humidity, wind);
      card.append(cardBody);
      $("#currentWeather").append(card)

   })

});
function currentForcast(){ 
var city = (result.city.name)
const queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

$.ajax({
   url: queryUrl,
   method: "GET"
}).then(function (result) {

   console.log(result)
   console.log(result.dt)
   $('#forecast').empty();
   const list = $('div')
   for (let i = 0; i < result.list.length; i += 5) {
      console.log(result.list[i])
      const humidity = $('li')
      humidity.text(result.list[i].humidity)
   }
   var tempF = (result[i].main.temp - 273.15) * 1.80 + 32;
   var tempF = Math.floor(temp);
   var card = $("<div>").addClass("card col-md-2 ml-4 bg-primary text-white");
   var cardBody = $("<div>").addClass("card-body p-3 forecastBody")
   var cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
   var tempF = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + tempF + " °F");
   var humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + result[i].main.humidity + "%");

   var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + result[i].weather[0].icon + ".png")

   city.append(cityDate, image)
   cardBody.append(city, tempF, humidity, wind);
   card.append(cardBody);
   $("#currentWeather").append(card)

})
}
      // result.list.forEach(data => {
      //    console.log(data.main.humidity)
      // })

      // function makeList() {
      //    var  makeList = $("<li>").addClass(list-group-item).text(text)
      //    $(".list").appen(listItem)
      // }

      // const list = $('ul')
      // for (let i = 0; i < result.list.length; i+= 5) {
      //    console.log(result.list[i])
      //    const humidity = $('li')
      //    humidity.text(result.list[i].humidity)


   //       list.append(humidity)
   //    }
   //    $('#topic').append(list)




























