const apiKey = "6579c5bb01e790b040208979f622434a";
  // Get the user's location
  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // Call the getWeatherData function with the user's location
    getWeatherData(lat, lon);
  }, () => {
    // If the user doesn't give permission to access their location, use Delhi's coordinates
    const lat = 28.7041;
    const lon = 77.1025;

    // Call the getWeatherData function with Delhi's coordinates
    getWeatherData(lat, lon);
  });


async function getWeatherData(lat, lon) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
  const data = await response.json();
  console.log(data);

  const forecastList = document.querySelector(".weather-list");
  forecastList.innerHTML = "";

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
