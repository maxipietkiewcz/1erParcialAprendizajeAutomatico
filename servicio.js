// servicio.js

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Ruta para servir el archivo HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/sumar_matrices", (req, res) => {
  const { matrix1, matrix2 } = req.body;

  if (!matrix1 || !matrix2) {
    res.status(400).send("Las matrices son requeridas");
    return;
  }

  const resultMatrix = [];

  // Verificar que las matrices tengan las mismas dimensiones
  if (
    matrix1.length !== matrix2.length ||
    matrix1[0].length !== matrix2[0].length
  ) {
    res.status(400).send("Las matrices deben tener la misma dimensión");
    return;
  }

  for (let i = 0; i < matrix1.length; i++) {
    resultMatrix[i] = [];
    for (let j = 0; j < matrix1[i].length; j++) {
      resultMatrix[i][j] = parseInt(matrix1[i][j]) + parseInt(matrix2[i][j]);
    }
  }

  res.json(resultMatrix);
});

app.listen(5000, () => {
  console.log("Servidor escuchando en http://localhost:5000");
});
