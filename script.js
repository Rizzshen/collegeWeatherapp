const apiKey = "4424ae3b42b8bedc0499d6c18a35137d";
let city = "Lahan";
const weather_URL = "https://api.openweathermap.org/data/2.5/weather?q=";
const paragraph = document.querySelector("#paragraph");
const input = document.querySelector("#input")
const form = document.querySelector("#form")
form.addEventListener("submit",(event)=>{
    event.preventDefault()
    let city = input.value;
    fetchUsers(city); 
})
async function fetchUsers(city) {
  try {
    const response = await fetch(weather_URL + city + `&appid=${apiKey}`);
    const data = await response.json();
    console.log(data);
    displayweather(data);
  } catch (error) {
    console.error(error);
    alert("city not found")    
  }
}
fetchUsers(city);
function displayweather(arr) {
    let time = readable(arr.dt,arr.timezone);    
    const options = {
        year: 'numeric', 
        month: 'short', 
        day: 'numeric'
      };
    const optionsWeekday = {
        weekday: 'long'
    }
    let options2 = {
        timeZone: 'UTC',  
        hour: 'numeric',
        minute: 'numeric',
        hour12: true 
    };
    
    let formattedLocalTime = new Intl.DateTimeFormat('en-US', options2).format(time);     
    let date =  readable(arr.dt,arr.timezone).toLocaleDateString('en-GB',options);
    let day = time.toLocaleDateString('en-GB',optionsWeekday);
    let dirrection = getWindDirection(arr.wind.deg)
    let icon = arr.weather[0].icon
    const icon_URL = `https://openweathermap.org/img/wn/${icon}@2x.png`; 
    let celsius = convertKelvinToCelsius(arr.main.temp)
    document.querySelector("#time").innerHTML = `<p>${formattedLocalTime}</p>`      
    document.querySelector("#title").innerHTML = `<p> <h3><i class="fa fa-map-marker-alt"></i> ${arr.name},${arr.sys.country}<h3></p>`
    document.querySelector("#detail1").innerHTML = `<p><strong>${arr.weather[0].main}<strong></p>`
    document.querySelector("#detail2").innerHTML = `<span>${arr.weather[0].description}</span>`
    document.querySelector("#date").innerHTML = `<p>${date}</p>`
    document.querySelector("#day").innerHTML = `<p><h4>${day}<h4></p>`
    document.querySelector("#temp").innerHTML = `<h1>${celsius}°C<h1>`
    document.querySelector("#icon").innerHTML = `<img src="${icon_URL}"><img>`
    document.querySelector("#humidity").innerHTML = `<strong> ${arr.main.humidity}%</strong><br>`
    document.querySelector("#direction-value").innerHTML = `<strong>${dirrection}</strong>`
    document.querySelector("#pressure-value").innerHTML = `<strong> ${arr.main.pressure}</strong>hpa`
    document.querySelector("#wind").innerHTML = `<strong>${arr.wind.speed}</strong> m/s`
}
function readable(num1,num2){
    let date = new Date((num1)*1000);
    console.log(date);
    let localTime = new Date(date.getTime() + (num2 * 1000));
    
    return localTime;
}

function getWindDirection(degree) {
    // Determine wind direction based on the degree (0 to 360)
    if (degree >= 0 && degree < 45 || degree >= 315 && degree <= 360) {
        return "North";
    } else if (degree >= 45 && degree < 135) {
        return "East";
    } else if (degree >= 135 && degree < 225) {
        return "South";
    } else if (degree >= 225 && degree < 315) {
        return "West";
    } else {
        return "Unknown";  // Just in case
    }
}
function convertKelvinToCelsius(kelvin) {
    return (kelvin - 273.15).toFixed(0);  
  }
