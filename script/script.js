let fetchButton = document.getElementById('fetch-button');
let cityName = document.getElementById('search-city-input');
let mainCityCard = document.getElementById('main-city-info')

function getApi() {
  let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName.value}&cnt=3&appid=202ed1305c35eb4c1d3fc781601f9daf&units=imperial`;

  fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data)
    mainCityCard.innerHTML = `
    <h2 id="city">${data.city.name}</h2>
    <p>${dayjs().format('M/DD/YYYY')}</p>
    <p>Tempature: ${data.list[0].main.temp}&#176;F</p>
    <p>Wind: ${data.list[0].wind.speed} MPH</p>
    <p>Humidity: ${data.list[0].main.humidity} %</p>
    `
  })
}

fetchButton.addEventListener('click', getApi);