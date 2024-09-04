const express = require("express");
const app = express();
const port = 3000;
const propertyRoutes = require('./routes/propertyRoutes'); // Zaimportuj plik z trasami

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/properties", propertyRoutes);
app.use(express.json()); // Middleware do obsługi JSON
app.use('/index', propertyRoutes); // Zarejestruj trasy

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

