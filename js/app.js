import { getWeather } from "./api.js";

const form = document.getElementById("form");
const input = document.getElementById("cityInput");
const result = document.getElementById("result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const city = input.value.trim();

  if (!city) {
    result.innerHTML = `<p class="error">⚠️ Escribe una ciudad</p>`;
    return;
  }

  result.innerHTML = `<p>⏳ Buscando clima...</p>`;

  const response = await getWeather(city);

  if (!response.success) {
    result.innerHTML = `<p class="error">❌ ${response.error}</p>`;
    return;
  }

  const { city: name,temperature, humidity, windSpeed, precipitation, description } =
    response.data;

  result.innerHTML = `
    <div class="card">
      <h2>${name}</h2>

      <p class="temp">🌡️ ${temperature}°C</p>

      <p>💧 Humedad: ${humidity}%</p>
      <p>💨 Viento: ${windSpeed} km/h</p>
      <p>🌧️ Precipitación: ${precipitation} mm</p>

      <p class="desc">${description}</p>
    </div>
  `;
});