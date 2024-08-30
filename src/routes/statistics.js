// src/routes/statistics.js

const express = require("express");
const router = express.Router();
const axios = require("axios");

// Endpoint do pobierania ogólnych statystyk
router.get("/statistics/general", async (req, res) => {
  try {
    // Zastąp poniższy URL rzeczywistym URL-em do zewnętrznego API
    const response = await axios.get("https://api.zamianeoo.pl/statistics");
    const data = response.data;

    // Przetwarzanie danych
    const totalExchanges = data.length;
    const avgValue =
      data.reduce((sum, exchange) => sum + exchange.value, 0) / totalExchanges;
    const popularLocations = {}; // Implementacja logiki popularnych lokalizacji

    res.json({
      totalExchanges,
      avgValue,
      popularLocations,
    });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({ error: "Błąd serwera" });
  }
});

// Endpoint do pobierania szczegółowych statystyk
router.get("/statistics/detailed", async (req, res) => {
  try {
    const { location, type, minPrice, maxPrice } = req.query;
    // Zastąp poniższy URL rzeczywistym URL-em do zewnętrznego API z parametrami
    const response = await axios.get(
      `https://api.zamianeoo.pl/statistics?location=${location}&type=${type}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    );
    const data = response.data;

    res.json(data);
  } catch (error) {
    console.error("Error fetching detailed statistics:", error);
    res.status(500).json({ error: "Błąd serwera" });
  }
});

module.exports = router;
