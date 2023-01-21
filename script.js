let loc = document.getElementById("location");
let tempIcon = document.getElementById("temp-icon");
let tempValue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let iconfile;
const cityName = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

window.addEventListener("load", ()=>{
    let long;
    let lat;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            // console.log(`longitude ${long} Latitude ${lat}`);
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=7fc8bcba01d1af80fc8508ad8866a95a`;
            
            fetch(api, {method: 'GET'})
                .then((response)=>{
                    return response.json();
                })
                .then(function(data) {     
                    loc.innerHTML = data.name;
                    tempValue.innerHTML = Math.round(data.main.temp - 273.15);
                    climate.innerHTML = data.weather[0].description;
                    if(data.weather[0].id == 800){
                        tempIcon.src = 'icons/clearsky.png';
                    }
                    else if(data.weather[0].id > 200 && data.weather[0].id < 300){
                        tempIcon.src = 'icons/thunderstorm.png';
                    }
                    else if(data.weather[0].id > 300 && data.weather[0].id < 400){
                        tempIcon.src = 'icons/drizzle.png';
                    }
                    else if(data.weather[0].id > 500 && data.weather[0].id < 600){
                        tempIcon.src = 'icons/rain.png';
                    }
                    else if(data.weather[0].id > 600 && data.weather[0].id < 700){
                        tempIcon.src = 'icons/snow.png';
                    }
                    else if(data.weather[0].id > 700 && data.weather[0].id < 800){
                        tempIcon.src = 'icons/atmosphere.png';
                    }
                    else if(data.weather[0].id > 800 && data.weather[0].id < 900){
                        tempIcon.src = 'icons/cloudy.png';
                    }
                })
        });
    }
    const getWeather = (city) => {
        cityName.innerHTML = city;
        const api2 =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7fc8bcba01d1af80fc8508ad8866a95a`;
    fetch(api2, {method: 'GET'})
        .then(response => {
            return response.json();
        })
        .then(function(data){
            loc.innerHTML = city;
            tempValue.innerHTML = Math.round(data.main.temp - 273.15);
            climate.innerHTML = data.weather[0].description;
            if(data.weather[0].id == 800){
                tempIcon.src = '/icons/clearsky.png';
            }
            else if(data.weather[0].id > 200 && data.weather[0].id < 300){
                tempIcon.src = '/icons/thunderstorm.png';
            }
            else if(data.weather[0].id > 300 && data.weather[0].id < 400){
                tempIcon.src = '/icons/drizzle.png';
            }
            else if(data.weather[0].id > 500 && data.weather[0].id < 600){
                tempIcon.src = '/icons/rain.png';
            }
            else if(data.weather[0].id > 600 && data.weather[0].id < 700){
                tempIcon.src = '/icons/snow.png';
            }
            else if(data.weather[0].id > 700 && data.weather[0].id < 800){
                tempIcon.src = '/icons/atmosphere.png';
            }
            else if(data.weather[0].id > 800 && data.weather[0].id < 900){
                tempIcon.src = '/icons/cloudy.png';
            }
        })
        .catch(err => console.error(err));
    }
    searchButton.addEventListener("click", (e) => {
        e.preventDefault();
        getWeather(cityName.value);
    });
    getWeather("Mumbai");
});
