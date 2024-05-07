// Importar Express y crear una aplicación Express
const express = require("express");
const app = express();

// Importar body-parser para analizar cuerpos de solicitud HTTP y cors para manejar CORS
const bodyParser = require("body-parser");
const cors = require("cors");

// Importar el módulo path para trabajar con rutas de archivos y directorios
const path = require("path");

// Configurar Express para usar body-parser y cors
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Ruta para servir el archivo HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Ruta para sumar matrices
app.post("/sumar_matrices", (req, res) => {
  // Obtener las matrices de la solicitud
  const { matrix1, matrix2 } = req.body;

  // Verificar si las matrices están presentes en la solicitud
  if (!matrix1 || !matrix2) {
    res.status(400).send("Las matrices son requeridas");
    return;
  }

  // Inicializar una matriz para almacenar el resultado de la suma
  const resultMatrix = [];

  // Verificar que las matrices tengan las mismas dimensiones
  if (
    matrix1.length !== matrix2.length ||
    matrix1[0].length !== matrix2[0].length
  ) {
    res.status(400).send("Las matrices deben tener la misma dimensión");
    return;
  }

  // Sumar las matrices
  for (let i = 0; i < matrix1.length; i++) {
    resultMatrix[i] = [];
    for (let j = 0; j < matrix1[i].length; j++) {
      resultMatrix[i][j] = parseInt(matrix1[i][j]) + parseInt(matrix2[i][j]);
    }
  }

  // Enviar el resultado como JSON
  res.json(resultMatrix);
});

// Iniciar el servidor en el puerto 5000
app.listen(5000, () => {
  console.log("Servidor escuchando en http://localhost:5000");
});
