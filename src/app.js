// src/app.js

const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Importowanie tras
const statisticsRouter = require("./routes/statistics");
app.use("/api", statisticsRouter);

// Uruchomienie serwera
app.listen(port, () => {
  console.log(`Serwer działa na http://localhost:${port}`);
});
