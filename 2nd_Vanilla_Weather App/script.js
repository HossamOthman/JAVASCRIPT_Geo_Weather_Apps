const apiKey = '&appid=';
const searchBox = document.querySelector('.search input')
const searchBtn = document.querySelector('.search button')
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`
const city = 'hamburg'

checkWeater(city);

searchBtn.addEventListener('click', () => {
    checkWeater(searchBox.value);
})

async function checkWeater(city) {
    const response = await fetch(apiUrl + city + apiKey);
    var data = await response.json();

    console.log(data)
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = data.wind.speed + 'km/h';
}