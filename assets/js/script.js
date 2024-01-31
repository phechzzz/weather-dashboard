var searchForm = document.getElementById('user-city');
var searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', handleEvent);
const historyList = document.getElementById('history-list');


function renderWeather(data) {
  const container = document.getElementById('current-day');
  container.innerHTML = '';

  var tempContent = data.main.temp;
  var humidityContent = data.main.humidity;
  var windContent = data.wind.speed;
  var nameContent = data.name;

  var tempEl = document.createElement('div');
  var humidityEl = document.createElement('div');
  var windEl = document.createElement('div');
  var nameEl = document.createElement('h2');

  tempEl.textContent = 'The temperature is ' + tempContent + ' degrees';
  humidityEl.textContent = 'Humidity: ' + humidityContent;
  windEl.textContent = 'Wind speed: ' + windContent;
  nameEl.textContent = nameContent;

  // Bootstrap styling classes
  nameEl.className = 'display-1'; // Largest display size

  container.appendChild(nameEl);
  container.appendChild(tempEl);
  container.appendChild(humidityEl);
  container.appendChild(windEl);
}



function renderSearchHistory(cities) {
  historyList.innerHTML = ''; // Clear existing list items

  cities.forEach(city => {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';
    
    const button = document.createElement('button');
    button.className = 'btn btn-light';
    button.textContent = city;
    listItem.appendChild(button);

    // Attach click event to each history item
    button.addEventListener('click', function () {
      // Fetch weather for the clicked city
      fetchWeather(city);
    });

    historyList.appendChild(listItem);
  });
}

function fetchWeather(event) {
  event.preventDefault();
  const cityName = searchForm.value;
  console.log(cityName);
  var apiKey = '0c3eded19513c89b7aa35c3843cfa926';
  var weatherURL = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&q=' + cityName + '&appid=' + apiKey;
  fetch(weatherURL)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      renderWeather(data);

      // Save the searched city to localStorage
      saveSearchedCity(cityName);

      // Reload and display updated search history
      loadSearchHistory();
    })
    .catch(error => {
      console.error('Error fetching current weather data:', error);
      // Display an error message to the user
      displayError('City not found. Please try again.');
    });
}

function fetchCoords(event) {
  event.preventDefault();
  const cityName = searchForm.value;
  var apiKey = '0c3eded19513c89b7aa35c3843cfa926';
  var apiURl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&appid=' + apiKey;
  fetch(apiURl)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
  }

 

function handleEvent(event) {
  event.preventDefault();
  fetchWeather(event);
  fetchCoords(event);
}

function saveSearchedCity(city) {
  let searchedCities = JSON.parse(localStorage.getItem('searchedCities')) || [];
  searchedCities.unshift(city);
  localStorage.setItem('searchedCities', JSON.stringify(searchedCities));
}

function loadSearchHistory() {
  const searchedCities = JSON.parse(localStorage.getItem('searchedCities')) || [];
  renderSearchHistory(searchedCities);
}

// Call loadSearchHistory on page load
loadSearchHistory();



