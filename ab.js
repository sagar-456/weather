// const txtcity = document.getElementById('txtcity');
// const weatherList = document.querySelector('.weather-list');

// // Define the Open Weather API endpoint and API key
// const apiEndpoint = 'https://api.openweathermap.org/data/2.5/forecast';
// const apiKey = '6579c5bb01e790b040208979f622434a';

// // Attach an event listener to the search form
// document.querySelector('form').addEventListener('submit', (e) => {
//   e.preventDefault(); // prevent the form from submitting normally
  
//   const city = txtcity.value.trim(); // get the entered city name
  
//   // make an HTTP request to the Open Weather API endpoint
//   fetch(`${apiEndpoint}?q=${city}&appid=${apiKey}&units=metric`)
//     .then(response => response.json()) // parse the response data as JSON
//     .then(data => {
//       // extract the relevant weather data from the API response
//       const forecasts = data.list.filter(forecast => forecast.dt_txt.includes('12:00:00'));
      
//       // clear the existing weather list items
//       weatherList.innerHTML = '';
      
//       // iterate over the forecast data and create HTML elements for each day's weather
//       forecasts.forEach(forecast => {
//         const date = new Date(forecast.dt_txt);
//         const day = date.toLocaleDateString('en-US', { weekday:'long' });
//         const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
//         const iconUrl = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
//         const description=forecast.weather[0].description;
//         const temp = Math.round(forecast.main.temp);
//         const humidity = forecast.main.humidity;
//         const windSpeed = forecast.wind.speed;
        
//         const weatherElement = document.createElement('div');
//         weatherElement.classList.add('weather');
//         weatherElement.innerHTML = `
//           <div class="day">${day}</div>
//           <div class="icon"><img src="${iconUrl}" alt="weather icon"></div>
//           <div class="details">
//             <p><strong>Temperature:</strong> ${temp}&deg;C</p>
//             <p><strong>Humidity:</strong> ${humidity}%</p>
//             <p><strong>Wind:</strong> ${windSpeed} km/h</p>
//             <p><strong>condition:</strong>${description}</p>

            
//           </div>
//         `;
        
//         // append the weather element to the weather list container
//         weatherList.appendChild(weatherElement);
//       });
//     })
//     .catch(error => console.error(error)); // log any errors to the console
// });

const txtcity = document.getElementById('txtcity');
const weatherList = document.querySelector('.weather-list');

// Define the Open Weather API endpoint and API key
const apiEndpoint = 'https://api.openweathermap.org/data/2.5/forecast';
const apiKey = '6579c5bb01e790b040208979f622434a';

// Attach an event listener to the search form
document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault(); // prevent the form from submitting normally
  
  const city = txtcity.value.trim(); // get the entered city name
  
  // make an HTTP request to the Open Weather API endpoint
  fetch(`${apiEndpoint}?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json()) // parse the response data as JSON
    .then(data => {
      // extract the relevant weather data from the API response
      const forecasts = data.list.filter(forecast => {
        const forecastDate = new Date(forecast.dt_txt);
        const currentDate = new Date();
        return forecastDate.getDate() >= currentDate.getDate() && forecast.dt_txt.includes('12:00:00');
      });
      
      // clear the existing weather list items
      weatherList.innerHTML = '';
      
      // iterate over the forecast data and create HTML elements for each day's weather
      forecasts.forEach(forecast => {
        const date = new Date(forecast.dt_txt);
        const day = date.toLocaleDateString('en-US', { weekday: 'long' });
        const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        const iconUrl = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
        const description = forecast.weather[0].description;
        const temp = Math.round(forecast.main.temp);
        const humidity = forecast.main.humidity;
        const windSpeed = forecast.wind.speed;
        
        const weatherElement = document.createElement('div');
        weatherElement.classList.add('weather');
        weatherElement.innerHTML = `
          <div class="day">${day}</div>
          <div class="icon"><img src="${iconUrl}" alt="weather icon"></div>
          <div class="details">
            <p><strong>Temperature:</strong> ${temp}&deg;C</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
            <p><strong>Wind:</strong> ${windSpeed} km/h</p>
            <p><strong>condition:</strong>${description}</p>
          </div>
        `;
        
        // append the weather element to the weather list container
        weatherList.appendChild(weatherElement);
      });
    })
    .catch(error => console.error(error)); // log any errors to the console
});
