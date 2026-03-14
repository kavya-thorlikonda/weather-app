const weatherFrom = document.querySelector(".weatherFrom");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

const apiKey = "9800c0b24ccf9ee193143bc3acb12182";

weatherFrom.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value.trim();

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError("Could not fetch weather data");
        }
    }
    else{
        displayError("Please enter a city");
    }
});

async function getWeatherData(city){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("Weather data not found");
    }

    return await response.json();
}

function displayWeatherInfo(data){

    const {name: city, main: {temp, humidity}, weather} = data;
    const {description, id} = weather[0];

    card.textContent = "";
    card.style.display = "flex";
    card.style.flexDirection = "column";
    card.style.alignItems = "center";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${temp}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(weatherEmoji);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
}

function getWeatherEmoji(weatherId){

    if(weatherId >= 200 && weatherId < 300){
        return "⛈️";
    }
    else if(weatherId >= 300 && weatherId < 400){
        return "🌧️";
    }
    else if(weatherId >= 500 && weatherId < 600){
        return "🌦️";
    }
    else if(weatherId >= 600 && weatherId < 700){
        return "❄️";
    }
    else if(weatherId >= 700 && weatherId < 800){
        return "🌫️";
    }
    else if(weatherId === 800){
        return "☀️";
    }
    else if(weatherId >= 801 && weatherId < 810){
        return "☁️";
    }
    else{
        return "🌍";
    }
}

function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent ="";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}