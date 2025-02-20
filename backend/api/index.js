import express from "express";
import cors from "cors";
import { redesignRoom } from "../replicate.js"; // Cambiamos la importación

const app = express();
app.use(cors());
app.use(express.json()); // ✅ Habilita JSON en las peticiones

// ✅ Debug: Log para ver si la API está recibiendo la petición
app.use((req, res, next) => {
  console.log(`🔹 Petición recibida: ${req.method} ${req.url}`);
  next();
});

// ✅ Ruta principal de prueba
app.get("/api/", (req, res) => {
  res.status(200).json({ message: "🚀 DecorIA backend funcionando correctamente!" });
});

// ✅ Ruta de remodelación de espacios
app.post("/api/redesign-room", async (req, res) => {
  console.log("📥 Petición recibida en /api/redesign-room");
  try {
    const { imageUrl, prompt } = req.body;
    
    if (!imageUrl || !prompt) {
      return res.status(400).json({ error: "Faltan parámetros" });
    }

    const result = await redesignRoom(imageUrl, prompt);
    res.status(200).json(result);
  } catch (error) {
    console.error("❌ Error procesando la imagen:", error);
    res.status(500).json({ error: "Error procesando la imagen" });
  }
});

// ✅ Debug: Manejo de rutas no encontradas
app.use((req, res) => {
  console.log(`❌ Ruta no encontrada: ${req.method} ${req.url}`);
  res.status(404).json({ error: "Ruta no encontrada" });
});

export default app;
