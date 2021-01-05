$("#document").ready(function () {
    currentWeather()
})

function currentWeather() {
    let date = new Date();
    $("#search-button").on("click", function (e) {
        e.preventDefault();
        var city = $('#search-value').val().trim();
        $('#search-value').val('');
        searchWeather(city);
        abcdForcast(city);
        console.log(city);
    });

    $(".history").on("click", "li", function () {
        searchWeather($(this).text());
    });

    function makeList(name) {
        var li = $("<li>").addClass("list-group-item  list-group-item-action").text(name);
        li.attr('id', name);
        $("history").prepend(li);
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

            for (let i = 0; i < 40; i+=8) {
                // var myDate =  new Date(data.list[0].dt_txt;
                var humidity5 = data[0].main.humidity
                console.log(humidity5)
                // $("#myForcast").append(humidity5)
                var temp2 = data[0].main.temp_max
                console.log(temp2)
                var myDate = new Date(data[i].dt_txt)//.toLocaleDateString();
                console.log(myDate)
                var myImg = data[i].weather[0].icon
                console.log(myImg)
                // create div for weather forcast
                var col = $("<div>").addClass("xyz col-md-3");
                var card = $("<div>").addClass("card bg-primary text-white");
                var body = $("<div>").addClass("card-body p-3");
                //create tags todays date, image, temp and humidity
                var title = $("<h2>").addClass("card-title").text(new Date(data[i].dt_txt).toLocaleDateString());
                var iconImg = (data[i].weather[0].icon)
                var img = $("<img>").attr("src", "https://openweathermap.org/img/w/"+ iconImg + ".png")
                var p1 = $("<p>").addClass("card-text").text("Temp: " + data[i].main.temp_max + " °F");
                var p2 = $("<p>").addClass("card-text").text("Humidity: " + data[i].main.humidity + "%");
                //apend the tags to the title, img, p1 & p2 to body, boy to card, card to col and finally col to the forcast div
                $("#myForcast").append(col.append(card.append(body.append(title,img, p1, p2))));
            }
        })
    }
    var history = JSON.parse(window.localStorage.getItem("history")) || [];
    if (history.length > 0) {
        searchWeather(history[history.length - 1]);
    }
    for (var i = 0; i < history.length; i++) {
        makeList(history[i]);
    }
}

//clear local storage after confirmiton and if there is city saved else do nothing
$('#clear').on('click', function () {
    if (localStorage.length !== 0) {
        var clear = confirm('Press OK to clear history!');
        if (clear) {
            $('.history').empty();
            localStorage.clear();
        }
    }
});






























