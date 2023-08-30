document.addEventListener("DOMContentLoaded", function () {
    const locationInput = document.getElementById("locationInput");
    const getWeatherButton = document.getElementById("getWeather");
    const weatherInfo = document.getElementById("weatherInfo");
    const loading = document.getElementById("loading"); // Reference to the loading div


    getWeatherButton.addEventListener("click", function () {
        const location = locationInput.value;
        if (location.trim() === "") {
            alert("Please enter a location.");
            return;
        }

         // Display the loading animation
         loading.style.display = "block";

        // Replace 'YOUR_API_KEY' with your actual API key
        const apiKey = "58d5cee44e83b8e16d3f41263066a9a1"; // Replace with your API key
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                if (data.weather && data.weather.length > 0) {
                    const description = data.weather[0].description;
                    const temperature = data.main.temp;
                    weatherInfo.innerHTML = `Weather: ${description}<br>Temperature: ${temperature}°C`;
                } else {
                    throw new Error("Weather data not available for this location.");
                }
            })
            .catch((error) => {
                console.error("Error fetching weather data:", error);
                weatherInfo.innerHTML = "Unable to fetch weather data.";
            })
            .finally(() => {
                // Hide the loading animation when the request is complete
                loading.style.display = "none";
            });
    });
});
