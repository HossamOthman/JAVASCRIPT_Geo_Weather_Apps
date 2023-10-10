let appId = '';
let units = 'imperial';
let searchMethod;

function searchWeather(searchTerm) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=${appId}`)
}