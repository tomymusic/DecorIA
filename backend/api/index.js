import express from "express"; 
import cors from "cors";
import shopifyAuth from "./shopify-auth.js";
console.log("📌 Contenido de shopifyAuth:", shopifyAuth);
import shopifyProducts from "./shopify-products.js";
import { redesignRoom } from "../replicate.js"; 

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`🔹 Petición recibida: ${req.method} ${req.url}`);
  next();
});

app.get("/api/", (req, res) => {
  console.log("✅ Petición recibida en /api/");
  res.status(200).json({ message: "🚀 DecorIA backend funcionando correctamente!" });
});


app.use("/api/shopify-auth", shopifyAuth);
app.use("/api/shopify-products", shopifyProducts);

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

app.use((req, res) => {
  console.log(`❌ Ruta no encontrada: ${req.method} ${req.url}`);
  res.status(404).json({ error: "Ruta no encontrada" });
});

export default app;
