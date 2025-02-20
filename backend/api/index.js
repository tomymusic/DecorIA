import express from "express";
import cors from "cors";
import axios from "axios";
import { redesignRoom } from "../replicate.js"; // ✅ Importamos la función de AI

const app = express();
app.use(cors());
app.use(express.json()); // ✅ Habilita JSON en las peticiones

// 🚀 **Debugging: Log para ver las peticiones**
app.use((req, res, next) => {
  console.log(`🔹 Petición recibida: ${req.method} ${req.url}`);
  next();
});

// 🚀 **Ruta principal de prueba**
app.get("/api/", (req, res) => {
  res.status(200).json({ message: "🚀 DecorIA backend funcionando correctamente!" });
});

// 🚀 **Ruta para remodelación de espacios con IA**
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

// 🚀 **Ruta para obtener productos del catálogo de Shopify**
app.get("/api/shopify/products", async (req, res) => {
  console.log("📦 Obteniendo productos desde Shopify...");
  
  const SHOPIFY_STORE_URL = process.env.SHOPIFY_STORE_URL; // ✅ URL de Shopify
  const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN; // ✅ Token de acceso
  
  if (!SHOPIFY_STORE_URL || !SHOPIFY_ACCESS_TOKEN) {
    return res.status(500).json({ error: "Faltan credenciales de Shopify en el servidor" });
  }

  try {
    const response = await axios.get(`${SHOPIFY_STORE_URL}/admin/api/2023-10/products.json`, {
      headers: {
        "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
        "Content-Type": "application/json",
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("❌ Error obteniendo productos de Shopify:", error.response?.data || error);
    res.status(500).json({ error: "Error obteniendo productos desde Shopify" });
  }
});

// 🚀 **Manejo de rutas no encontradas**
app.use((req, res) => {
  console.log(`❌ Ruta no encontrada: ${req.method} ${req.url}`);
  res.status(404).json({ error: "Ruta no encontrada" });
});

export default app;
