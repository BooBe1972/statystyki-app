const express = require("express");
const router = express.Router();
const { Property, PriceChange } = require("../models");

// Pobierz wszystkie nieruchomości
router.get("/", async (req, res) => {
  const properties = await Property.findAll();
  res.json(properties);
});

// Dodaj nową nieruchomość
router.post("/", async (req, res) => {
  const property = await Property.create(req.body);
  res.json(property);
});

// Zaktualizuj cenę nieruchomości i zapisz zmianę ceny
router.put("/:id", async (req, res) => {
  const property = await Property.findByPk(req.params.id);
  const oldPrice = property.price;
  property.price = req.body.price;
  await property.save();

  await PriceChange.create({
    property_id: property.id,
    old_price: oldPrice,
    new_price: req.body.price,
  });

  res.json(property);

  // Pobierz zmiany cen dla nieruchomości
  router.get("/:id/price-changes", async (req, res) => {
    const priceChanges = await PriceChange.findAll({
      where: { property_id: req.params.id },
    });
    res.json(priceChanges);
  });
  
});

module.exports = router;

