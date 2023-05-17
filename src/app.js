let apiKey = '8c878230da10ecee80473fe52a3e33b4'
let cityName = 'Kiev'
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
console.log(apiUrl)

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

function showTemperature(response) {
    cityNameElement = document.querySelector('#cityName')
    cityNameElement.innerHTML = response.data.name
    temperatureElement = document.querySelector('#temperature')
    temperatureElement.innerHTML = Math.round(response.data.main.temp)
    descriptionElement = document.querySelector('#description')
    descriptionElement.innerHTML = response.data.weather[0].description
    humidityElement = document.querySelector('#humidity')
    humidityElement.innerHTML = response.data.main.humidity
    windElement = document.querySelector('#wind')
    windElement.innerHTML = response.data.wind.speed
    dateElement = document.querySelector('#date')
    dateElement.innerHTML = formatDate(response.data.dt * 1000)
    console.log(response.data)
    console.log(formatDate(response.data.dt * 1000))
}

axios.get(apiUrl).then(showTemperature)
