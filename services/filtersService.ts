import axios from "axios";

// Базовый URL для API
const apiUrl = "https://car-rental-api.goit.global/";

export async function fetchBrands() {
  try {
    const response = await axios.get(`${apiUrl}brands`);
    return response.data; // Возвращаем список брендов
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
}

export async function fetchPriceRanges() {
  try {
    const response = await axios.get(`${apiUrl}price-ranges`);
    return response.data;
  } catch (error) {
    console.error("Error fetching price ranges:", error);
    return [];
  }
}
