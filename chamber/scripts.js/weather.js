const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("#weather-description");
const currentTemp = document.querySelector(".current-temp");
const weatherToday = document.querySelector("#weather-today");
const weatherTomorrow = document.querySelector("#weather-tomorrow");
const weatherOverTomorrow = document.querySelector("#weather-overtomorrow");

const myKey = "9b5aebb088e7191e41091650d8df4b0f";
const myLat = 6.2512261217714356;
const myLong = -75.56717813713261;

const myURL = `//api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;

const forecastURL = `//api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;

async function apiCurrentFetch() {
    try {
        const response = await fetch(myURL);
        if (response.ok) {
            const data = await response.json();
            displayCurrentResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

async function apiForecastFetch() {
    try {
        const response = await fetch(forecastURL);
        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            displayForecastResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}


function displayCurrentResults(data) {
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    desc = desc.charAt(0).toUpperCase() + desc.slice(1);
    weatherIcon.setAttribute("src", iconsrc);
    weatherIcon.setAttribute("alt", desc);
    captionDesc.innerHTML = desc;
    currentTemp.innerHTML = `${Math.round(data.main.temp)}&#176;F`;
}

function displayForecastResults(data) {
    let todayDesc = data.list[0].weather[0].description;
    todayDesc = todayDesc.charAt(0).toUpperCase() + todayDesc.slice(1);

    let tomorrowDesc = data.list[1].weather[0].description;
    tomorrowDesc = tomorrowDesc.charAt(0).toUpperCase() + tomorrowDesc.slice(1);

    let overTomorrowDesc = data.list[2].weather[0].description;
    overTomorrowDesc = overTomorrowDesc.charAt(0).toUpperCase() + overTomorrowDesc.slice(1);


    weatherToday.innerHTML = ` H: ${Math.round(data.list[0].main.temp_max)}&#176;F, L: ${Math.round(data.list[0].main.temp_min)}&#176;F, ${todayDesc}`;
    weatherTomorrow.innerHTML = ` H: ${Math.round(data.list[1].main.temp_max)}&#176;F, L: ${Math.round(data.list[1].main.temp_min)}&#176;F, ${tomorrowDesc}`;
    weatherOverTomorrow.innerHTML = ` H: ${Math.round(data.list[2].main.temp_max)}&#176;F, L: ${Math.round(data.list[2].main.temp_min)}&#176;F, ${overTomorrowDesc}`;
}

apiCurrentFetch();
apiForecastFetch();