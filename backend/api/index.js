import express from "express";
import cors from "cors";
import shopifyAuth from "./shopify-auth.js"; // Autenticación Shopify
import { redesignRoom } from "../replicate.js"; // IA para remodelación

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Debug: Middleware para ver peticiones
app.use((req, res, next) => {
  console.log(`🔹 Petición recibida: ${req.method} ${req.url}`);
  next();
});

// ✅ Ruta principal de prueba
app.get("/api/", (req, res) => {
  try {
    res.status(200).json({ message: "🚀 DecorIA backend funcionando correctamente!" });
  } catch (error) {
    console.error("❌ Error en /api/:", error);
    res.status(500).json({ error: "Error interno en la API" });
  }
});

// ✅ Ruta para aplicar IA en rediseño
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
    console.error("❌ Error en /api/redesign-room:", error);
    res.status(500).json({ error: "Error procesando la imagen" });
  }
});

// ✅ Ruta de autenticación Shopify
app.use("/api", shopifyAuth);

// ✅ Debug: Manejo de rutas no encontradas
app.use((req, res) => {
  console.log(`❌ Ruta no encontrada: ${req.method} ${req.url}`);
  res.status(404).json({ error: "Ruta no encontrada" });
});

export default app;
