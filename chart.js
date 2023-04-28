const apiKey = "6579c5bb01e790b040208979f622434a";
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = document.getElementById("txtcity").value;
  alert(city);
    getWeatherData(city);
  
});
async function getWeatherData(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`);
  
    const data = await response.json();
    console.log(data);
  
    const labels = data.list.map(item => new Date(item.dt * 1000).toLocaleDateString());
    const temps = data.list.map(item => item.main.temp);
  
    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Temperature',
          data: temps,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }
      ]
    };
  
    const chartConfig = {
      type: 'line',
      data: chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };
  
    const chartElement = document.getElementById('temperature-chart');
    const temperatureChart = new Chart(chartElement, chartConfig);
  }
  