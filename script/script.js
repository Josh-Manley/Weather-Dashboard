let fetchButton = document.getElementById('fetch-button');

function getApi() {
  let requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={202ed1305c35eb4c1d3fc781601f9daf}';

  fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data){
    console.log(data)
  })
}

fetchButton.addEventListener('click', getApi);