import express from "express";
import cors from "cors";
import { changeClothing } from "../replicate.js"; // Asegúrate de que esta importación existe

const app = express();
app.use(cors());
app.use(express.json()); // ✅ Activa el soporte para JSON

// **Ruta para cambiar la ropa en la imagen**
app.post("/api/change-clothing", async (req, res) => {
  try {
    const { imageUrl, prompt } = req.body;

    if (!imageUrl || !prompt) {
      return res.status(400).json({ error: "Faltan parámetros: imageUrl o prompt" });
    }

    const result = await changeClothing(imageUrl, prompt);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error procesando la imagen:", error);
    res.status(500).json({ error: "Error procesando la imagen" });
  }
});

// **Ruta para verificar que el backend está activo**
app.get("/api/", (req, res) => {
  res.status(200).json({ message: "🚀 Backend de Prueba IA - Funciona Correctamente!" });
});

export default app;
