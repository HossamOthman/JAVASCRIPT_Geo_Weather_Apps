import "./style.css"
import { getWeather } from "./weather"
import {ICON_MAP} from "./iconMap.js"


navigator.geolocation.getCurrentPosition(positionSuccess, positionError)
function positionSuccess({coords}){

  getWeather(coords.latitude, coords.longitude, Intl.DateTimeFormat().resolvedOptions().timeZone)
  .then(renderWeather)
  .catch( e => {
    console.error(e);
    alert('Error getting Weather')
  })
}
function positionError(){
  alert("there was an error getting your location. please let us know your location to deliver the weather forecast")
}



  function renderWeather({current, daily, hourly}){
  console.log({current, daily, hourly})

    renderCurrentWeather(current)
    renderDailyWeather(daily)
    renderHourlyWeather(hourly)

    document.body.classList.remove('blurred')
  }

  // Helper Function to fill the data in UI
  function setValue(selector, value, {parent = document} = {}){
    parent.querySelector(`[data-${selector}]`).textContent = value
  }

  const currentIcon = document.querySelector('[data-current-icon]');

  function getIconUrl(iconCode) {
    return `./public/icons/${ICON_MAP.get(iconCode)}.svg`
  }


  function renderCurrentWeather(current) {
    currentIcon.src = getIconUrl(current.iconCode)
    setValue('current-temp', current.currentTemp)
    setValue('current-high', current.hightTemp)
    setValue('current-low', current.lowTemp)
    setValue('current-fl-high', current.highFeelsLike)
    setValue('current-fl-low', current.lowFeelsLike)
    setValue('current-wind', current.windSpeed)
    setValue('current-precip', current.precip)
    
  }


  const DAY_FORMATTER = new Intl.DateTimeFormat(undefined, { weekday: 'long'})
  const dailySection = document.querySelector('[data-day-section]');
  const dayCardTemplate = document.getElementById('day-card-template');

  function renderDailyWeather(daily) {

    dailySection.innerHTML = '';
    daily.forEach(day => {
      const element = dayCardTemplate.content.cloneNode(true)
      setValue('temp', day.maxTemp, { parent: element})
      setValue('date', DAY_FORMATTER.format(day.timestamp), { parent: element})
      element.querySelector('[data-icon]').src = getIconUrl(day.iconCode)
      dailySection.append(element);
    });

  }



  const HOUR_FORMATTER = new Intl.DateTimeFormat(undefined, { hour: 'numeric'})
  const hourlySection = document.querySelector('[data-hour-section]');
  const hoursRowTemplate = document.getElementById('hour-row-template');

  function renderHourlyWeather(hourly) {

    hourlySection.innerHTML = '';
    hourly.forEach(hour => {
      const row = hoursRowTemplate.content.cloneNode(true)
      setValue('temp', hour.temp, { parent: row})
      setValue('fl-temp', hour.feelsLike, { parent: row})
      setValue('wind', hour.windSpeed, { parent: row})
      setValue('precip', hour.percip, { parent: row})
      setValue('day', DAY_FORMATTER.format(hour.timestamp), { parent: row})
      setValue('time', HOUR_FORMATTER.format(hour.timestamp), { parent: row})
      row.querySelector('[data-icon]').src = getIconUrl(hour.iconCode)
      hourlySection.append(row);
    });

  }