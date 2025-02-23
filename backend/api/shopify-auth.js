const { shopifyApi, LATEST_API_VERSION } = require("@shopify/shopify-api");

const shopify = shopifyApi({
    apiKey: process.env.SHOPIFY_API_KEY,
    apiSecretKey: process.env.SHOPIFY_API_SECRET,
    scopes: process.env.SHOPIFY_SCOPES.split(","),
    hostName: process.env.SHOPIFY_REDIRECT_URI.replace("https://", ""),
    apiVersion: LATEST_API_VERSION
});
const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const router = express.Router();

// ✅ Agregar adaptador para Vercel
shopifyApi.adapters.nodeRuntime.import();

// ✅ Configuración correcta de Shopify API
const shopify = shopifyApi({
    apiKey: process.env.SHOPIFY_API_KEY,
    apiSecretKey: process.env.SHOPIFY_API_SECRET,
    scopes: process.env.SHOPIFY_SCOPES.split(","),
    hostName: process.env.SHOPIFY_REDIRECT_URI.replace("https://", ""),
    apiVersion: LATEST_API_VERSION,
    restResources,
});

// ✅ Ruta de prueba
router.get("/", (req, res) => {
    res.status(200).json({ message: "✅ Shopify Auth API funcionando correctamente!" });
});

// ✅ Ruta de autenticación
router.get("/auth", async (req, res) => {
    const { shop } = req.query;
    if (!shop) {
        return res.status(400).json({ error: "Falta el parámetro shop" });
    }

    try {
        const authRoute = await shopify.auth.begin({
            shop,
            callbackPath: "/api/shopify-auth/callback",
            isOnline: false,
        });

        return res.redirect(authRoute);
    } catch (error) {
        console.error("❌ Error en autenticación con Shopify:", error);
        res.status(500).json({ error: "Error en autenticación con Shopify" });
    }
});

// ✅ Ruta de callback
router.get("/auth/callback", async (req, res) => {
    try {
        const session = await shopify.auth.callback({
            rawRequest: req,
            rawResponse: res,
        });

        res.redirect(`https://${session.shop}/admin/apps`);
    } catch (error) {
        console.error("❌ Error en el callback de autenticación:", error);
        res.status(500).json({ error: "Error en autenticación" });
    }
});

module.exports = router;
