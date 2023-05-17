let apiKey = '8c878230da10ecee80473fe52a3e33b4'
let cityName = 'Kiev'
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
console.log(apiUrl)

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
    console.log(response.data)
    console.log(response.data.wind.speed)
}

axios.get(apiUrl).then(showTemperature)
