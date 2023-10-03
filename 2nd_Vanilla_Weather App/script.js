const apiKey = '&appid=';
const searchBox = document.querySelector('.search input')
const searchBtn = document.querySelector('.search button')
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`
const weatherIcon =  document.querySelector('.weather-icon');
const weatherDiv = document.querySelector('.weather');


searchBtn.addEventListener('click', () => {
    checkWeater(searchBox.value);
})

async function checkWeater(city) {
    
    const response = await fetch(apiUrl + city + apiKey);

    if (response.status == 404) {
        document.querySelector('.error').style.display = 'block';
    }

    var data = await response.json();

    console.log(data)
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = data.wind.speed + 'km/h';

    if (data.weather[0].main == 'Clear') {
        weatherIcon.src = 'img/clear.png';
    } else if (data.weather[0].main == 'Clouds') {
        weatherIcon.src = 'img/clouds.png';
    }  else if (data.weather[0].main == 'Mist') {
        weatherIcon.src = 'img/mist.png';
    } else if (data.weather[0].main == 'Rain') {
        weatherIcon.src = 'img/rain.png';
    } else if (data.weather[0].main == 'Snow') {
        weatherIcon.src = 'img/snow.png';
    } else if (data.weather[0].main == 'Drizzle') {
        weatherIcon.src = 'img/drizzle.png';
    }

    weatherDiv.style.display = 'block';
}