// index.js - Mejorado
import express from "express"; 
import cors from "cors";
import { redesignRoom } from "./replicate.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`🔹 Petición recibida: ${req.method} ${req.url}`);
  next();
});

app.get("/api/", (req, res) => {
  res.status(200).json({ message: "🚀 DecorIA backend funcionando correctamente!" });
});

app.post("/api/redesign-room", async (req, res, next) => {
  console.log("📥 Petición recibida en /api/redesign-room");
  try {
    const { imageUrl, prompt } = req.body;
    if (!imageUrl || !prompt) {
      return res.status(400).json({ error: "Faltan parámetros" });
    }
    const result = await redesignRoom(imageUrl, prompt);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.use(errorHandler);

export default app;
