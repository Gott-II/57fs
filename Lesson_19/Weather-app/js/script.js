// Warte, bis die Seite geladen ist
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("weather-form");
  const result = document.getElementById("weather-result");
  const locationEl = document.getElementById("location");
  const temperatureEl = document.getElementById("temperature");
  const windEl = document.getElementById("wind");
  const descriptionEl = document.getElementById("description");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const city = document.getElementById("city").value;
    await fetchWeatherByCity(city);
  });

  // Wetterdaten über Standort abrufen
  async function fetchWeatherByLocation() {
    try {
      const { data } = await axios.get("https://api.bigdatacloud.net/data/reverse-geocode-client");
      const { city, latitude, longitude } = data;
      await fetchWeather(city, latitude, longitude);
    } catch (error) {
      result.textContent = "Standort konnte nicht ermittelt werden.";
      console.error(error);
    }
  }

  // Wetterdaten über Stadtname abrufen (via Open-Meteo Geocoding)
  async function fetchWeatherByCity(cityName) {
    try {
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`;
      const { data } = await axios.get(geoUrl);
      if (!data.results || data.results.length === 0) {
        result.textContent = "Stadt nicht gefunden.";
        return;
      }
      const { name, latitude, longitude } = data.results[0];
      await fetchWeather(name, latitude, longitude);
    } catch (error) {
      result.textContent = "Fehler bei der Stadtsuche.";
      console.error(error);
    }
  }

  // Hauptfunktion: Wetterdaten abrufen und anzeigen
  async function fetchWeather(city, lat, lon) {
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,weather_code`;

    try {
      const { data } = await axios.get(weatherUrl);
      const current = data.current;

      locationEl.textContent = `📍 ${city}`;
      temperatureEl.textContent = `🌡️ Temperatur: ${current.temperature_2m}°C`;
      windEl.textContent = `💨 Wind: ${current.wind_speed_10m} km/h`;
      descriptionEl.textContent = `⛅ Wettercode: ${decodeWeatherCode(current.weather_code)}`;

      result.textContent = ""; // Erfolgreiche Suche: vorherige Fehlermeldung entfernen
    } catch (error) {
      result.textContent = "Fehler beim Laden der Wetterdaten.";
      console.error(error);
    }
  }

  // Beim Laden der Seite: automatisch Standortwetter anzeigen
  fetchWeatherByLocation();
});

// 🧠 Wettercode entschlüsseln
function decodeWeatherCode(code) {
  const descriptions = {
    0: "Klarer Himmel",
    1: "Hauptsächlich klar",
    2: "Teilweise bewölkt",
    3: "Bewölkt",
    45: "Nebel",
    48: "Eisnebel",
    51: "Leichter Nieselregen",
    53: "Mäßiger Nieselregen",
    55: "Starker Nieselregen",
    61: "Leichter Regen",
    63: "Mäßiger Regen",
    65: "Starker Regen",
    66: "Gefrierender leichter Regen",
    67: "Gefrierender starker Regen",
    71: "Leichter Schneefall",
    73: "Mäßiger Schneefall",
    75: "Starker Schneefall",
    77: "Schneekörner",
    80: "Leichter Regenschauer",
    81: "Mäßiger Regenschauer",
    82: "Heftiger Regenschauer",
    85: "Leichter Schneeschauer",
    86: "Heftiger Schneeschauer",
    95: "Gewitter",
    96: "Gewitter mit leichtem Hagel",
    99: "Gewitter mit starkem Hagel"
  };
  return descriptions[code] || "Unbekannter Wetterzustand";
}

// 📡 API-Anfrage (Open-Meteo)
async function fetchWeather() {
  const latitude = 53.87;    // z. B. Cuxhaven
  const longitude = 8.70;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const code = data.current_weather.weathercode;
    const description = decodeWeatherCode(code);

    console.log(`🌤️ Aktuelles Wetter: ${description}`);
  } catch (error) {
    console.error("❌ Fehler beim Abrufen der Wetterdaten:", error.message);
  }
}

// ▶️ Funktion ausführen
fetchWeather();


