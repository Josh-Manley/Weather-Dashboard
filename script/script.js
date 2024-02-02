let fetchButton = document.getElementById('fetch-button');
let cityName = document.getElementById('search-city-input');
let mainCityCard = document.getElementById('main-city-info')
let forecastContainer = document.getElementById('forecast-container')

function getApi() {
  let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName.value}&cnt=5&appid=202ed1305c35eb4c1d3fc781601f9daf&units=imperial`;

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
    `;

    // Display 5-day forecast information
    forecastContainer.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
      forecastContainer.innerHTML += `
        <div class="forecast-day">
          <p>Date: ${data.list[i].dt_txt}</p>
          <p>Temperature: ${data.list[i].main.temp}&deg;F</p>
          <p>Humidity: ${data.list[i].main.humidity}%</p>
          <p>Wind Speed: ${data.list[i].wind.speed} mph</p>
          <!-- Add icon representation of weather conditions -->
        </div>
      `;
    }    
  })
}

fetchButton.addEventListener('click', getApi);