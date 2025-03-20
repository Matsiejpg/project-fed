import { useEffect, useState } from "react";
import { fetchWeather } from "./weatherService"; // Importeer de API-functie

function App() {
  const [temperature, setTemperature] = useState<number | null>(null);

  useEffect(() => {
    async function getWeather() {
      const temp = await fetchWeather();
      setTemperature(temp);
    }

    // Haal direct de temperatuur op bij het laden van de app
    getWeather();

    // Stel een interval in om elke 30 seconden de temperatuur bij te werken
    const intervalId = setInterval(() => {
      getWeather();
    }, 30000); // 30.000 ms = 30 seconden

    // Opruimen: stop de interval als de component wordt verwijderd
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>Huidige temperatuur</h1>
      {temperature !== null ? (
        <p>{temperature}°C</p>
      ) : (
        <p>Temperatuur laden...</p>
      )}
    </div>
  );
}

export default App;
