import dotenv from "dotenv";
dotenv.config();

const weatherApiKey = process.env.OPENWEATHER_KEY;
const cityValue = document.getElementById("city");
const countryValue = document.getElementById("country")
const tempValue = document.getElementById("degree");
const descValue = document.getElementById("description");
const iconValue = document.getElementById("icon");
const dateValue = document.getElementById("date");

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
} else {
    cityValue.innerText = "Location unavailable";
    countryValue.innerText = "unavailable";
    tempValue.innerText = "--";
    descValue.innerText = "";
    iconValue.src = "";
}

function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`;

    fetch(weatherApiUrl)
    .then((response) => response.json())
    .then((data) => {
        const city = data.name;
        const country = data.sys.country
        const temp = `${data.main.temp}°C`;
        const desc = data.weather[0].description;
        cityValue.innerText = city;
        countryValue.innerText = country;
        tempValue.innerText = temp;
        descValue.innerText = desc;

        const icon = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        iconValue.src = iconUrl;

        const today = new Date();
        const options = { 
            weekday: "long", 
            month: "short", 
            day: "numeric" 
        };
        dateValue.innerText = today.toLocaleDateString("en-GB", options);
    })
    .catch((error) => {
        console.log(error)
    });
}

function error() {
    cityValue.innerText = "Location unavailable";
    countryValue.innerText = "unavailable";
    tempValue.innerText = "";
    descValue.innerText = "Cannot get weather data";
    iconValue.src = "";
}
