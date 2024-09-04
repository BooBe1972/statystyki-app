// src/routes/statistics.js

const express = require("express");
const router = express.Router();

// Rozbudowane dane mockowe
const mockData = [
  { location: "Warszawa", type: "Dom", value: 1000000 },
  { location: "Kraków", type: "Mieszkanie", value: 500000 },
  { location: "Warszawa", type: "Mieszkanie", value: 700000 },
  { location: "Gdańsk", type: "Dom", value: 850000 },
  { location: "Wrocław", type: "Dom", value: 950000 },
  { location: "Poznań", type: "Mieszkanie", value: 600000 },
  { location: "Warszawa", type: "Dom", value: 1200000 },
  { location: "Kraków", type: "Dom", value: 1100000 },
  { location: "Gdańsk", type: "Mieszkanie", value: 450000 },
];

// Endpoint do pobierania ogólnych statystyk
router.get("/statistics/general", (req, res) => {
  const totalExchanges = mockData.length;
  const avgValue =
    mockData.reduce((sum, exchange) => sum + exchange.value, 0) /
    totalExchanges;

  const locationCount = mockData.reduce((acc, curr) => {
    acc[curr.location] = (acc[curr.location] || 0) + 1;
    return acc;
  }, {});

  res.json({
    totalExchanges,
    avgValue,
    popularLocations: locationCount,
  });
});

// Endpoint do pobierania szczegółowych statystyk na podstawie filtrów
router.get("/statistics/detailed", (req, res) => {
  const { location, type, minPrice, maxPrice } = req.query;

  let filteredData = mockData;

  if (location) {
    filteredData = filteredData.filter((item) => item.location === location);
  }

  if (type) {
    filteredData = filteredData.filter((item) => item.type === type);
  }

  if (minPrice) {
    filteredData = filteredData.filter(
      (item) => item.value >= Number(minPrice)
    );
  }

  if (maxPrice) {
    filteredData = filteredData.filter(
      (item) => item.value <= Number(maxPrice)
    );
  }

  res.json(filteredData);
});

module.exports = router;


// src/routes/statistics.js

router.get('/statistics/detailed', (req, res) => {
  const { location, type, minPrice, maxPrice } = req.query;

  // Walidacja danych wejściowych
  if (minPrice && isNaN(minPrice)) {
    return res.status(400).json({ error: 'minPrice musi być liczbą' });
  }

  if (maxPrice && isNaN(maxPrice)) {
    return res.status(400).json({ error: 'maxPrice musi być liczbą' });
  }

  let filteredData = mockData;

  if (location) {
    filteredData = filteredData.filter(item => item.location === location);
  }

  if (type) {
    filteredData = filteredData.filter(item => item.type === type);
  }

  if (minPrice) {
    filteredData = filteredData.filter(item => item.value >= Number(minPrice));
  }

  if (maxPrice) {
    filteredData = filteredData.filter(item => item.value <= Number(maxPrice));
  }

  res.json(filteredData);
});
