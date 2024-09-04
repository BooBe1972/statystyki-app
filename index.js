const express = require("express");
const app = express();
const port = 3000;

const propertyRoutes = require("./routes/propertyRoutes");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

app.use("/properties", propertyRoutes);
