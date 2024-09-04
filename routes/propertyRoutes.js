// routes/propertyRoutes.js
const express = require("express");
const router = express.Router();
const { Property } = require("../models"); // Zaimportuj model Property

// Tworzenie nowej nieruchomości
router.post("/properties", async (req, res) => {
  try {
    const { address, city, price, property_type } = req.body;
    const newProperty = await Property.create({
      address,
      city,
      price,
      property_type,
    });
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(500).json({ error: "Błąd podczas tworzenia nieruchomości" });
  }
});

// Pobieranie wszystkich nieruchomości
router.get("/properties", async (req, res) => {
  try {
    const properties = await Property.findAll();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ error: "Błąd podczas pobierania nieruchomości" });
  }
});

// Pobieranie jednej nieruchomości na podstawie ID
router.get("/properties/:id", async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) {
      return res.status(404).json({ error: "Nieruchomość nie znaleziona" });
    }
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ error: "Błąd podczas pobierania nieruchomości" });
  }
});

// Aktualizacja nieruchomości na podstawie ID
router.put("/properties/:id", async (req, res) => {
  try {
    const { address, city, price, property_type } = req.body;
    const property = await Property.findByPk(req.params.id);

    if (!property) {
      return res.status(404).json({ error: "Nieruchomość nie znaleziona" });
    }

    property.address = address || property.address;
    property.city = city || property.city;
    property.price = price || property.price;
    property.property_type = property_type || property.property_type;
    await property.save();

    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ error: "Błąd podczas aktualizacji nieruchomości" });
  }
});

// Usunięcie nieruchomości na podstawie ID
router.delete("/properties/:id", async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) {
      return res.status(404).json({ error: "Nieruchomość nie znaleziona" });
    }

    await property.destroy();
    res.status(204).json(); // 204 - No Content
  } catch (error) {
    res.status(500).json({ error: "Błąd podczas usuwania nieruchomości" });
  }
});

module.exports = router;