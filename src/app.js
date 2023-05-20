function formatDate(timestamp) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let date = new Date(timestamp)
    let hours = date.getHours()

    if (hours < 10) {
        hours = `0${date.getHours()}`
    }

    let minutes = date.getMinutes()

    if (minutes < 10) {
        minutes = `0${date.getMinutes()}`
    }

    let day = date.getDay()

    return `${days[day]} ${hours}:${minutes}`
}

function showForecast(response) {
    let forecast = response.data.daily
    let forecastElement = document.querySelector('#forecast')
    let forecastHtml = ''
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    forecast.forEach(function (day, index) {
        if (index < 6) {
            let date = new Date(day.dt * 1000)
            let newDay = date.getDay()

            forecastHtml = forecastHtml + `<div class="col">
              <div class="weather-forecast-date">${days[newDay]}</div>
              <div class="weather-forecast-img">
                <img
                  src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"
                  alt="${day.weather[0].description}"
                />
              </div>
              <div class="weather-forecast-temp">
                <span class="weather-forecast-temp-max">${Math.round(day.temp.max)}</span>
                <span class="weather-forecast-temp-min">${Math.round(day.temp.min)}</span>
              </div>
            </div>`
        }
    })

    forecastElement.innerHTML = forecastHtml

}

function getForecastData(coordinates) {
    let apiKey = 'b95f179627c8dd37f41e1be6e3250e19'
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}`
    axios.get(apiUrl).then(showForecast)
}

function showTemperature(response) {
    cityNameElement = document.querySelector('#cityName')
    cityNameElement.innerHTML = response.data.name
    temperatureElement = document.querySelector('#temperature')
    celsiusTemperature = Math.round(response.data.main.temp)
    temperatureElement.innerHTML = celsiusTemperature
    descriptionElement = document.querySelector('#description')
    descriptionElement.innerHTML = response.data.weather[0].description
    humidityElement = document.querySelector('#humidity')
    humidityElement.innerHTML = response.data.main.humidity
    windElement = document.querySelector('#wind')
    windElement.innerHTML = response.data.wind.speed
    dateElement = document.querySelector('#date')
    dateElement.innerHTML = formatDate(response.data.dt * 1000)
    iconElement = document.querySelector('#icon')
    let urlIcon = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    iconElement.setAttribute('src', urlIcon)
    iconElement.setAttribute('alt', response.data.weather[0].description)

    getForecastData(response.data.coord)
}


function search(city) {
    let apiKey = '8c878230da10ecee80473fe52a3e33b4'
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    axios.get(apiUrl).then(showTemperature)
}

function handleSearch(event) {
    event.preventDefault()

    let cityNameSearchElement = document.querySelector('#cityNameSearch')
    let cityName = cityNameSearchElement.value

    search(cityName)
}

search('Kyiv')

let celsiusTemperature = null;

let form = document.querySelector('#search-form')
form.addEventListener('submit', handleSearch)


let fahrenheitLinkElement = document.querySelector('#fahrenheit-link')
fahrenheitLinkElement.addEventListener('click', showFahrenheit)

function showFahrenheit(event) {
    event.preventDefault()
    let temperatureElement = document.querySelector('#temperature')
    let fahrenheit = (celsiusTemperature * 9 / 5) + 32
    celsiusLinkElement.classList.remove('active')
    fahrenheitLinkElement.classList.add('active')

    temperatureElement.innerHTML = Math.round(fahrenheit)
}


let celsiusLinkElement = document.querySelector('#celsius-link')
celsiusLinkElement.addEventListener('click', showCelsius)

function showCelsius(event) {
    event.preventDefault()
    celsiusLinkElement.classList.add('active')
    fahrenheitLinkElement.classList.remove('active')

    let temperatureElement = document.querySelector('#temperature')
    temperatureElement.innerHTML = celsiusTemperature
}

