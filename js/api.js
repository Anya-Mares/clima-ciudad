// ==============================
// DESCRIPCIÓN DEL CLIMA
// ==============================
const WEATHER_DESCRIPTIONS = {
  0: "Despejado",
  1: "Mayormente despejado",
  2: "Parcialmente nublado",
  3: "Nublado",
  45: "Niebla",
  48: "Niebla con escarcha",
  51: "Llovizna ligera",
  61: "Lluvia",
  71: "Nieve",
  80: "Chubascos",
  95: "Tormenta"
};

// ==============================
// VALIDACIONES
// ==============================
function isValidCity(city) {
  return typeof city === "string" && city.trim().length > 0;
}

// ==============================
// FETCH SEGURO
// ==============================
async function fetchJSON(url, errorMessage) {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(errorMessage);
    }

    return await res.json();
  } catch (error) {
    throw new Error(errorMessage || "Error de red");
  }
}

// ==============================
// GEOCODING (CIUDAD → COORDENADAS)
// ==============================
async function getCoordinates(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    city
  )}&count=1&language=es`;

  const data = await fetchJSON(url, "Error al obtener coordenadas");

  if (!data.results || data.results.length === 0) {
    throw new Error("Ciudad no encontrada");
  }

  const location = data.results[0];

  return {
    name: location.name,
    latitude: location.latitude,
    longitude: location.longitude
  };
}

// ==============================
// CLIMA (COORDENADAS → WEATHER)
// ==============================
async function getCurrentWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m,precipitation`;

  const data = await fetchJSON(url, "Error al obtener clima");

  if (!data.current) {
    throw new Error("Datos de clima no disponibles");
  }

  return data.current;
}

// ==============================
// FUNCIÓN PRINCIPAL
// ==============================
export async function getWeather(city) {
  try {
    // 1. Validar entrada
    if (!isValidCity(city)) {
      return {
        success: false,
        error: "Nombre de ciudad inválido"
      };
    }

    // 2. Obtener coordenadas
    const location = await getCoordinates(city);

    // 3. Obtener clima
    const weather = await getCurrentWeather(
      location.latitude,
      location.longitude
    );

    // 4. Resultado final
    return {
      success: true,
      data: {
        city: location.name,
        temperature: weather.temperature_2m,
        humidity: weather.relative_humidity_2m,
        windSpeed: weather.wind_speed_10m,
        precipitation: weather.precipitation,
        description: WEATHER_DESCRIPTIONS[weather.weather_code] || "Desconocido"
      }
    };

  } catch (error) {
    return {
      success: false,
      error: error.message || "Error inesperado"
    };
  }
}

// ==============================
// CONVERSIÓN (BONUS LIMPIO)
// ==============================
export function convertToFahrenheit(celsius) {
  if (typeof celsius !== "number" || isNaN(celsius)) {
    return {
      success: false,
      error: "Temperatura inválida"
    };
  }

  const fahrenheit = (celsius * 9) / 5 + 32;

  return {
    success: true,
    data: {
      celsius: Number(celsius.toFixed(2)),
      fahrenheit: Number(fahrenheit.toFixed(2))
    }
  };
}