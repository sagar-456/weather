
const apiKey = "6579c5bb01e790b040208979f622434a";
OnloadLocation();
// Get the form element and add an event listener for form submission
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  debugger
  event.preventDefault();
  const city = document.getElementById("txtcity").value;
   if(city!="" && city != undefined && city != null){
    const myValue = city; 
document.getElementById("city").textContent = myValue;
    getWeatherData(city);
   }
 else{
    OnloadLocation();
 }
});
function OnloadLocation(){
  debugger
navigator.geolocation.getCurrentPosition((position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  // Call the getWeatherData function with the user's location
  getWeather(lat, lon);

}, () => {
  // If the user doesn't give permission to access their location, use Delhi's coordinates
  const lat = 28.7041;
  const lon = 77.1025;
  const myValue = "Delhi"; 
  document.getElementById("city").textContent = myValue;
  // Call the getWeatherData function with Delhi's coordinates
  getWeather(lat, lon);
});
}
async function getWeatherData(city) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`);
  
  const data = await response.json();
  console.log(data);
 
  
  const forecastList = document.querySelector(".weather-list");
  forecastList.innerHTML = "";

  data.list.forEach((item) => {
    // Convert timestamp to date and time string
    const dateTime = new Date(item.dt* 1000).toLocaleString();

    // Create a div element for the weather data
    const weatherDiv = document.createElement("div");
    weatherDiv.classList.add("weather");

    // Create elements for the date, time, icon, and details
    const dateDiv = document.createElement("div");
    dateDiv.classList.add("date");
    dateDiv.textContent = dateTime.split(",")[0];

    const timeDiv = document.createElement("div");
    timeDiv.classList.add("time");
    timeDiv.textContent = dateTime.split(",")[1].trim();

    const iconDiv = document.createElement("div");
    iconDiv.classList.add("icon");
    const iconImg = document.createElement("img");
    iconImg.src = `https://openweathermap.org/img/w/${item.weather[0].icon}.png`;
    iconImg.alt = item.weather[0].description;
    iconDiv.appendChild(iconImg);

    const detailsDiv = document.createElement("div");
    detailsDiv.classList.add("details");
    const tempP = document.createElement("p");
    tempP.innerHTML = `<strong>Temperature:</strong> ${item.main.temp}&deg;C`;
    const humidityP = document.createElement("p");
    humidityP.innerHTML = `<strong>Humidity:</strong> ${item.main.humidity}%`;
    const windP = document.createElement("p");
    windP.innerHTML = `<strong>Wind:</strong> ${item.wind.speed} km/h`;
    const descriptionP = document.createElement("p");
    descriptionP.innerHTML = `<strong>Condition:</strong> ${item.weather[0].description}`;
    detailsDiv.appendChild(tempP);
    detailsDiv.appendChild(humidityP);
    detailsDiv.appendChild(windP);
    detailsDiv.appendChild(descriptionP);

    // Add the date, time, icon, and details to the weather div
    weatherDiv.appendChild(dateDiv);
    weatherDiv.appendChild(timeDiv);
    weatherDiv.appendChild(iconDiv);
    weatherDiv.appendChild(detailsDiv);

    // Add the weather div to the forecast list
    forecastList.appendChild(weatherDiv);
  });
}
async function getWeather(lat, lon) {
  debugger
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
  const data = await response.json();
  console.log(data);
  
  const forecastList = document.querySelector(".weather-list");
  forecastList.innerHTML = "";
  const myValue = data.city.name; 
  document.getElementById("city").textContent = myValue;
 
  
 
  data.list.forEach((item) => {
    // Convert timestamp to date and time string
    const dateTime = new Date(item.dt * 1000).toLocaleString();

    // Create a div element for the weather data
    const weatherDiv = document.createElement("div");
    weatherDiv.classList.add("weather");

    // Create elements for the date, time, icon, and details
    const dateDiv = document.createElement("div");
    dateDiv.classList.add("date");
    dateDiv.textContent = dateTime.split(",")[0];

    const timeDiv = document.createElement("div");
    timeDiv.classList.add("time");
    timeDiv.textContent = dateTime.split(",")[1].trim();
    // const myValue = document.createElement("h4"); 
    // myValue.textContent=item.city.name;
    // const container = document.getElementById("city");
    // city.appendChild(myValue);
    // ${item.city.name}
    const iconDiv = document.createElement("div");
    iconDiv.classList.add("icon");
    const iconImg = document.createElement("img");
    iconImg.src = `https://openweathermap.org/img/w/${item.weather[0].icon}.png`;
    iconImg.alt = item.weather[0].description;
    iconDiv.appendChild(iconImg);
    const detailsDiv = document.createElement("div");
    detailsDiv.classList.add("details");
    const tempP = document.createElement("p");
    tempP.innerHTML = `<strong>Temperature:</strong> ${item.main.temp}&deg;C`;
    const humidityP = document.createElement("p");
    humidityP.innerHTML = `<strong>Humidity:</strong> ${item.main.humidity}%`;
    const windP = document.createElement("p");
    windP.innerHTML = `<strong>Wind:</strong> ${item.wind.speed} km/h`;
    const descriptionP = document.createElement("p");
    descriptionP.innerHTML = `<strong>Condition:</strong> ${item.weather[0].description}`;
    
    detailsDiv.appendChild(tempP);
    detailsDiv.appendChild(humidityP);
    detailsDiv.appendChild(windP);
    detailsDiv.appendChild(descriptionP);

    // Add the date, time, icon, and details to the weather div
    weatherDiv.appendChild(dateDiv);
    weatherDiv.appendChild(timeDiv);
    weatherDiv.appendChild(iconDiv);
    weatherDiv.appendChild(detailsDiv);

    // Add the weather div to the forecast list
    forecastList.appendChild(weatherDiv);
  });
}
