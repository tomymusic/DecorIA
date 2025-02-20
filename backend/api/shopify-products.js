import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const shopifyStoreUrl = process.env.SHOPIFY_STORE_URL;
    const shopifyToken = process.env.SHOPIFY_ACCESS_TOKEN;

    if (!shopifyStoreUrl || !shopifyToken) {
      return res.status(500).json({ error: "Faltan variables de entorno" });
    }

    const response = await axios.get(`${shopifyStoreUrl}/admin/api/2023-10/products.json`, {
      headers: {
        "X-Shopify-Access-Token": shopifyToken,
        "Content-Type": "application/json"
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error obteniendo productos de Shopify:", error);
    res.status(500).json({ error: "Error obteniendo productos" });
  }
});

export default router;
