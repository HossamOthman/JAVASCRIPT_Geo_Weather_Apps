let appId = '';
let units = 'metric';
let searchMethod;

function getSearchMethod(searchTerm) {
    if (searchTerm === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
         searchMethod = 'zip';
    else 
         searchMethod = 'q';
}


document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm) {
        searchWeather(searchTerm)
    }
})



function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&appid=${appId}&units=${units}`)
    .then(result => {
        return result.json()
    })
    .then(result => {
        init(result)
    })
}



function init(resultFromServer) {
    setPositionForWeatherInfo();
    console.log(resultFromServer)
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage  = 'url("img/clear.jpeg")'
            break;
        case 'Clouds':
            document.body.style.backgroundImage  = 'url("img/cloud.jpg")'
            break;
        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage  = 'url("img/rain.jpg")'
            break;
        case 'Storm':
        case 'Thunderstorm':
            document.body.style.backgroundImage  = 'url("img/storm.jpg")'
            break;
        case 'Snow':
            document.body.style.backgroundImage  = 'url("img/snow.jpg")'
            break;
        default:
            document.body.style.backgroundImage  = 'url("img/default.jpg")'
            break;
    }

    let cityHeader = document.getElementById('cityHeader');
    let temperature = document.getElementById('temperature');
    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let documentIconImg = document.getElementById('documentIconImg');
    let windSpeed = document.getElementById('windSpeed');
    let humidity = document.getElementById('humidity');

    documentIconImg.src = `https://openweathermap.org/img/wn/${resultFromServer.weather[0].icon}@2x.png`;
    
    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1)
    
    temperature.innerHTML = Math.floor(resultFromServer.main.temp) + '&deg;';
    windSpeed.innerHTML =  'Winds at ' + Math.floor(resultFromServer.wind.speed) + ' m/s';
    cityHeader.innerHTML = resultFromServer.name + ', ' + resultFromServer.sys.country;
    humidity.innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity + '%';
}

function setPositionForWeatherInfo() {
    let weatherContainer = document.getElementById('weatherContainer');
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.visibility = 'visible';
    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth / 2}px)`
    weatherContainer.style.top = `calc(50% - ${weatherContainerHeight / 1.1}px)`
}