# 🧩 Guía del Código – Aplicación de Clima

## 📌 Introducción

Este documento explica el funcionamiento interno del código de la aplicación de clima. Está dirigido a desarrolladores principiantes para facilitar la comprensión de cada parte del sistema.

---

## 🔄 Flujo general de la aplicación

El flujo principal es el siguiente:

1. El usuario ingresa una ciudad en el formulario
2. `app.js` captura el evento
3. Se llama a `getWeather(city)` en `api.js`
4. Se obtienen las coordenadas de la ciudad
5. Se consulta el clima con esas coordenadas
6. Se devuelve la información
7. `app.js` muestra los datos en pantalla

---

## 📁 Archivo: `js/app.js`

Este archivo controla la interacción con el usuario.

---

### 🔹 Importación

```js
import { getWeather } from "./api.js";

Se importa la función principal que obtiene los datos del clima.

🔹 Selección de elementos del DOM
const form = document.getElementById("form");
const input = document.getElementById("cityInput");
const result = document.getElementById("result");

Se obtienen referencias a los elementos HTML:

form: formulario de búsqueda
input: campo donde el usuario escribe la ciudad
result: contenedor donde se mostrarán los datos
🔹 Evento principal
form.addEventListener("submit", async (e) => {

Se escucha cuando el usuario envía el formulario.

🔹 Evitar recarga
e.preventDefault();

Evita que la página se recargue al enviar el formulario.

🔹 Obtener valor del input
const city = input.value.trim();

Se obtiene la ciudad ingresada y se eliminan espacios innecesarios.

🔹 Validación básica
if (!city) {
  result.innerHTML = `<p class="error">⚠️ Escribe una ciudad</p>`;
  return;
}

Si el campo está vacío, se muestra un mensaje de error.

🔹 Estado de carga
result.innerHTML = `<p>⏳ Buscando clima...</p>`;

Se informa al usuario que la aplicación está trabajando.

🔹 Llamada a la API
const response = await getWeather(city);

Se llama a la función que obtiene los datos del clima.

🔹 Manejo de errores
if (!response.success) {
  result.innerHTML = `<p class="error">❌ ${response.error}</p>`;
  return;
}

Si ocurre un error, se muestra el mensaje correspondiente.

🔹 Desestructuración de datos
const { city: name, temperature, humidity, windSpeed, precipitation, description } = response.data;

Se extraen los datos necesarios del resultado.

🔹 Renderizado en pantalla
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

Se construye dinámicamente el HTML para mostrar los datos del clima.

📁 Archivo: js/api.js

Este archivo contiene la lógica para obtener los datos desde la API.

🔹 Descripciones del clima
const WEATHER_DESCRIPTIONS = { ... }

Objeto que traduce códigos numéricos del clima a descripciones en texto.

🔹 Validación
function isValidCity(city)

Verifica que el valor ingresado sea un texto válido.

🔹 Función fetch reutilizable
async function fetchJSON(url, errorMessage)

Encapsula la lógica de fetch:

Realiza la petición HTTP
Verifica errores
Devuelve JSON
🔹 Obtener coordenadas
async function getCoordinates(city)

Convierte el nombre de la ciudad en:

latitud
longitud

Utiliza la API de geocodificación.

🔹 Obtener clima
async function getCurrentWeather(lat, lon)

Recibe coordenadas y consulta:

temperatura
humedad
viento
precipitación
código de clima
🔹 Función principal
export async function getWeather(city)

Es la función central del sistema.

Flujo interno:
Valida la ciudad
Obtiene coordenadas
Consulta el clima
Construye la respuesta
Retorno:
{
  success: true,
  data: {
    city,
    temperature,
    humidity,
    windSpeed,
    precipitation,
    description
  }
}
🔹 Manejo de errores

Si ocurre un problema:

{
  success: false,
  error: "mensaje"
}

Esto permite manejar errores fácilmente en app.js.

🔹 Conversión de temperatura
export function convertToFahrenheit(celsius)

Función adicional que:

valida el valor
convierte a Fahrenheit
devuelve resultados con dos decimales
🎯 Conceptos clave utilizados
async/await → manejo de asincronía
fetch → consumo de APIs
DOM manipulation → actualización de la interfaz
destructuring → extracción de datos
validación de datos
manejo de errores
🧠 Conclusión

El proyecto está dividido en dos partes principales:

app.js → interfaz y usuario
api.js → lógica y datos

Esta separación permite que el código sea:

más claro
más mantenible
más fácil de escalar