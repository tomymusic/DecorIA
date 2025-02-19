import express from "express";
import cors from "cors";
import { changeClothing } from "../replicate.js"; // Verifica que replicate.js existe

const app = express();
app.use(cors());
app.use(express.json()); // Habilita JSON para recibir datos correctamente

// **Ruta para cambiar la ropa en la imagen**
app.post("/api/change-clothing", async (req, res) => {
  try {
    const { imageUrl, prompt } = req.body;

    if (!imageUrl || !prompt) {
      return res.status(400).json({ error: "Faltan parámetros: imageUrl o prompt" });
    }

    console.log("📩 Recibida solicitud:", { imageUrl, prompt });

    const result = await changeClothing(imageUrl, prompt);
    res.status(200).json(result);
  } catch (error) {
    console.error("❌ ERROR PROCESANDO LA IMAGEN:", error);
    res.status(500).json({ error: "Error procesando la imagen" });
  }
});

// **Ruta de prueba para verificar que el backend está activo**
app.get("/api/", (req, res) => {
  res.status(200).json({ message: "🚀 Backend de Prueba IA - Funciona Correctamente!" });
});

export default app;
