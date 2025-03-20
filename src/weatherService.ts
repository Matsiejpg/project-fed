import axios from "axios";

const API_URL = "https://api.open-meteo.com/v1/forecast";
const LATITUDE = 53.2409;
const LONGITUDE = 6.5317;

export async function fetchWeather() {
    try {
        const response = await axios.get(API_URL, {
            params: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                timezone: "auto",
                current: "temperature_2m",
            },
        });

        return response.data.current.temperature_2m; // Haalt de temperatuur op
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
}
