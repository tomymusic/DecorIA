import pkg from "@shopify/shopify-api";
const { shopifyApi, LATEST_API_VERSION } = pkg;
import express from "express";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Configuración correcta de Shopify API
const shopify = shopifyApi({
    apiKey: process.env.SHOPIFY_API_KEY,
    apiSecretKey: process.env.SHOPIFY_API_SECRET,
    scopes: process.env.SHOPIFY_SCOPES.split(","),
    hostName: process.env.SHOPIFY_REDIRECT_URI.replace("https://", ""),
    apiVersion: LATEST_API_VERSION,
});

// Ruta para verificar que la API responde
router.get("/", (req, res) => {
    res.status(200).json({ message: "✅ Shopify Auth API funcionando!" });
});

// Ruta para iniciar autenticación con Shopify
router.get("/auth", async (req, res) => {
    const { shop } = req.query;
    if (!shop) {
        return res.status(400).send("Falta el parámetro shop");
    }

    const authRoute = await shopify.auth.begin({
        shop,
        callbackPath: "/api/shopify-auth/callback",
        isOnline: false,
    });

    return res.redirect(authRoute);
});

// Ruta de callback para manejar la respuesta de Shopify
router.get("/auth/callback", async (req, res) => {
    try {
        const session = await shopify.auth.callback({
            rawRequest: req,
            rawResponse: res,
        });

        res.redirect(`https://${session.shop}/admin/apps`);
    } catch (error) {
        console.error("Error en callback de autenticación:", error);
        res.status(500).send("Error en autenticación");
    }
});

export default router;
