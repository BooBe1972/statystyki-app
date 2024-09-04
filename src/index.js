const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Simple route
app.get("/", (req, res) => {
  res.send("Witaj w aplikacji Nieruchomosci!");
});

// Start server
app.listen(port, () => {
  console.log(`Serwer działa na http://localhost:${port}`);
});
