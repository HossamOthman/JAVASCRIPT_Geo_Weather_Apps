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
    console.log(resultFromServer)
}