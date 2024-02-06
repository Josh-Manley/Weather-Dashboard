let fetchButton = document.getElementById('fetch-button');
let searchForm = document.getElementById('search-form');
let cityName = document.getElementById('search-city-input');
let mainCityCard = document.querySelector('.main-city-info');
let forecastContainer = document.getElementById('forecast-container');
let searchHistoryContainer = document.getElementById('search-history');
let searchHistory = [];


function produceSearchHistory() {
  searchHistoryContainer.innerHTML = '';

  for (let i = searchHistory.length - 1; i >= 0; i--) {
    let searchHistoryButton = document.createElement('button');
    searchHistoryButton.setAttribute('type', 'button');
    searchHistoryButton.setAttribute('data-search', searchHistory[i]);
    searchHistoryButton.setAttribute('id', 'history-btn')
    searchHistoryButton.textContent = searchHistory[i];
    searchHistoryContainer.append(searchHistoryButton);
  }
}

function updateHistory(search) {
  if (searchHistory.indexOf(search) !== -1) {
    return;
  }
  searchHistory.push(search);

  localStorage.setItem('search-history', JSON.stringify(searchHistory));
  produceSearchHistory();
}

function getLocalStorage() {
  let storedStorage = localStorage.getItem('search-history');
    if (storedStorage) {
      searchHistory = JSON.parse(storedStorage);
    }
    produceSearchHistory();
}

function getApi(search) {
  let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=202ed1305c35eb4c1d3fc781601f9daf&units=imperial`;

  fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data)
    mainCityCard.innerHTML = `
    <div id="main-card-title">
      <h2 id="city">${data.city.name}</h2>
      <p id="main-card-date">(${dayjs().format('M/DD/YYYY')})</p>
      <img id="main-img" src="https://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png">
    </div>
    <p>Tempature: ${data.list[0].main.temp}&#176;F</p>
    <p>Wind: ${data.list[0].wind.speed} MPH</p>
    <p>Humidity: ${data.list[0].main.humidity} %</p>
    `;

    // Display 5-day forecast information
    forecastContainer.innerHTML = '';
    for (let i = 1; i <= 40; i += 8) {
      forecastContainer.innerHTML += `
        <div class="forecast-day">
          <p>Date: ${data.list[i].dt_txt}</p>
          <img id="card-img" src="https://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png">
          <p>Temperature: ${data.list[i].main.temp}&deg;F</p>
          <p>Humidity: ${data.list[i].main.humidity}%</p>
          <p>Wind Speed: ${data.list[i].wind.speed} mph</p>
          <!-- Add icon representation of weather conditions -->
        </div>
      `;
    }  
  })
}

function coords(search) {
  let Url = `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=202ed1305c35eb4c1d3fc781601f9daf`;

  fetch(Url)
  .then(function (response) {
    return response.json();
  })
  .then(function () {
    updateHistory(search);
    getApi(search)
  })
}

function submit(e) {
  e.preventDefault();

  let search = cityName.value.trim();
  coords(search);
  cityName.value = '';
}

function historyClick(e) {

  let searchHistoryButton = e.target;
  let search = searchHistoryButton.getAttribute('data-search');
  coords(search);
}

function displayMainCityInfo() {
  mainCityCard.classList.remove('hidden')
}

getLocalStorage();

fetchButton.addEventListener('click', displayMainCityInfo);
searchForm.addEventListener('submit', submit);
searchHistoryContainer.addEventListener('click',  historyClick);
searchHistoryContainer.addEventListener('click', displayMainCityInfo);