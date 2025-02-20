import express from "express";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const router = express.Router();

const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;
const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET;
const APP_URL = process.env.APP_URL; // URL de tu aplicación en Vercel

// 🚀 Ruta para iniciar la autenticación con Shopify
router.get("/", (req, res) => {
  const { shop } = req.query;
  if (!shop) {
    return res.status(400).json({ error: "Falta el parámetro 'shop'." });
  }

  const redirectUri = `${APP_URL}/api/shopify-auth/callback`;
  const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_API_KEY}&scope=read_products,write_orders&redirect_uri=${redirectUri}`;

  res.redirect(installUrl);
});

// 🚀 Ruta para recibir el token de acceso después de la autenticación
router.get("/callback", async (req, res) => {
  const { shop, code } = req.query;

  if (!shop || !code) {
    return res.status(400).json({ error: "Faltan parámetros en la URL." });
  }

  try {
    const response = await axios.post(`https://${shop}/admin/oauth/access_token`, {
      client_id: SHOPIFY_API_KEY,
      client_secret: SHOPIFY_API_SECRET,
      code,
    });

    const accessToken = response.data.access_token;
    console.log(`🔑 Token de acceso recibido: ${accessToken}`);

    // 🚀 Redirigir al usuario a la app
    res.redirect(`${APP_URL}?shop=${shop}`);
  } catch (error) {
    console.error("❌ Error en la autenticación:", error);
    res.status(500).json({ error: "Error en la autenticación de Shopify." });
  }
});

export default router;
