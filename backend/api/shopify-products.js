import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const SHOPIFY_STORE_URL = process.env.SHOPIFY_STORE_URL; // Tu URL de la tienda
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN; // Token de acceso

// 🚀 Endpoint para obtener productos de Shopify
router.get("/shopify/products", async (req, res) => {
  try {
    const response = await axios.get(
      `${SHOPIFY_STORE_URL}/admin/api/2023-10/products.json`,
      {
        headers: {
          "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("❌ Error al obtener productos de Shopify:", error);
    res.status(500).json({ error: "Error al obtener productos de Shopify" });
  }
});

export default router;
