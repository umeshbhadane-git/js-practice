const form = document.querySelector("#weatherForm");
const input = document.querySelector("#cityInput");

const status = document.querySelector("#status");
const weatherCard = document.querySelector("#weatherCard");
const retryButton = document.querySelector("#retryButton");

const cityName = document.querySelector("#cityName");
const temperature = document.querySelector("#temperature");

let controller;
let lastCity;


// Fetch weather
async function getWeather(city) {

    // Cancel previous request
    if (controller) {
        controller.abort();
    }

    // Create new controller
    controller = new AbortController();

    status.textContent = "Loading...";
    weatherCard.classList.add("hidden");
    retryButton.classList.add("hidden");

    try {

        // 1. Find city coordinates
        const locationResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`,
            {
                signal: controller.signal
            }
        );

        if (!locationResponse.ok) {
            throw new Error("Failed to find city");
        }

        const locationData = await locationResponse.json();

        if (!locationData.results || locationData.results.length === 0) {
            throw new Error("City not found");
        }

        const location = locationData.results[0];


        // 2. Get temperature
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m`,
            {
                signal: controller.signal
            }
        );

        if (!weatherResponse.ok) {
            throw new Error("Failed to fetch weather");
        }

        const weatherData = await weatherResponse.json();


        // 3. Display temperature
        cityName.textContent = location.name;

        temperature.textContent =
            `${weatherData.current.temperature_2m}°C`;


        // Success state
        status.textContent = "";

        weatherCard.classList.remove("hidden");

    } catch (error) {

        // Ignore cancelled request
        if (error.name === "AbortError") {
            return;
        }

        // Error state
        status.textContent = error.message;

        retryButton.classList.remove("hidden");
    }
}


// Search
form.addEventListener("submit", function (event) {

    event.preventDefault();

    const city = input.value.trim();

    if (!city) {
        status.textContent = "Please enter a city";
        return;
    }

    lastCity = city;

    getWeather(city);
});


// Retry
retryButton.addEventListener("click", function () {

    getWeather(lastCity);

});