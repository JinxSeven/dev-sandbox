const searchInp = document.getElementById('search-inp');
const searchBtn = document.getElementById('search-btn');
const nameOut = document.getElementById('name-out');
const tempOut = document.getElementById('temp-out');
const humidOut = document.getElementById('humid-out');
const weatherOut = document.getElementById('weather-out');

let humidity;
let temperature;
let cityName;

searchBtn.addEventListener('click', async function() {
    const cityError = document.getElementById('city-err');
    const city = searchInp.value;
    searchInp.value = '';
    if (city == '') {
        cityError.innerText = "City name can't be empty!";
        cityError.style.opacity = 1;
        return;
    }
    cityError.style.opacity = 0;

    const apiKey = 'e124fb640b814c031daa1aabde059d48';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const result = await fetch(apiUrl);
        const apiData = await result.json();

        console.log(apiData);
        if (!result.ok) {
            if (apiData.cod == 404) {
                cityError.innerText = 'Please check city name!';
                cityError.style.opacity = 1;
            }
            throw new Error(`${apiData.message}`);
        } else {
            humidity = apiData.main.humidity;
            temperature = ((apiData.main.temp) - 273.15).toFixed(2);
            cityName = apiData.name;
            iconSrc = `https://openweathermap.org/img/wn/${apiData.weather[0].icon}.png`
            weatherOut.setAttribute('src', iconSrc);
            nameOut.innerText = cityName;
            humidOut.innerText = humidity;
            tempOut.innerText = temperature;
        }
    } catch (error) {
        console.error(error.message);
    }
})
