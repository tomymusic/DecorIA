const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 Backend de Prueba IA - Funciona Correctamente!");
});

// Puerto en desarrollo (Vercel lo ignora y usa el suyo)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Servidor corriendo en puerto ${PORT}`));

module.exports = app;
