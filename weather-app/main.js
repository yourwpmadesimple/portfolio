// Open weather API

const api = {
  key: "082ff726cddf285ae3b74b8f9a32abda",
  base: "https://api.openweathermap.org/data/2.5/",
};

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

// Get user's location weather
function currentLocation() {
  fetch(
    `https://api.allorigins.win/get?url=${"https://geolocation-db.com/json"}`
  )
    .then((res) => res.json())
    .then((location) => {
      const content = location.contents;
      const json = JSON.parse(content);
      const city = json.city;
      const countryCode = json.country_code;
      document.querySelector(".city").innerHTML = `${city}, ${countryCode}`;
      fetch(`${api.base}weather?q=${json.city}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((weather) => {
          console.log(weather);
          const localWeather = `${Math.round(
            (weather.main.temp * 9) / 5 + 32
          )}°`;

          const highLow = `${Math.round(
            (weather.main.temp_max * 9) / 5 + 32
          )}° / <span class="low-temp">${Math.round(
            (weather.main.temp_min * 9) / 5 + 32
          )}°</span`;

          const condition = weather.weather[0].description;
          document.querySelector(".temp").innerHTML = localWeather;
          document.querySelector(".weather").innerHTML = condition;
          document.querySelector(".hi-low").innerHTML = highLow;
        })
        .then(() => {
          let now = new Date().toLocaleDateString("en-us", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          });
          document.querySelector(".date").innerHTML = now;
        });
    });
}
currentLocation();
function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => weather.json())
    .then(displayResults);
}

function displayResults(weather) {
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  // Insert temp result in .temp class
  temp.innerHTML = `${Math.round((weather.main.temp * 9) / 5 + 32)}°`; // Convert Celsius to Fahrenheit

  let weather_el = document.querySelector(".current .weather");
  weather_el.innerHTML = weather.weather[0].description;

  let hilow = document.querySelector(".hi-low");
  hilow.innerHTML = `${Math.round(
    (weather.main.temp_max * 9) / 5 + 32
  )}° / <span class="low-temp">${Math.round(
    (weather.main.temp_min * 9) / 5 + 32
  )}°</span`;
}

function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
