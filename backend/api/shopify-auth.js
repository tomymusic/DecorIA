import pkg from "@shopify/shopify-api";
import express from "express";
import dotenv from "dotenv";

dotenv.config();
const { shopifyApi, LATEST_API_VERSION } = pkg;
const router = express.Router();

// Inicializar Shopify API correctamente
const shopify = shopifyApi({
    apiKey: process.env.SHOPIFY_API_KEY,
    apiSecretKey: process.env.SHOPIFY_API_SECRET,
    scopes: process.env.SHOPIFY_SCOPES.split(","),
    hostName: process.env.SHOPIFY_REDIRECT_URI.replace("https://", ""),
    apiVersion: LATEST_API_VERSION,
});

// Ruta de prueba
router.get("/", (req, res) => {
    res.status(200).json({ message: "✅ Shopify Auth API funcionando correctamente!" });
});

// Ruta de autenticación con Shopify
router.get("/auth", async (req, res) => {
    const { shop } = req.query;
    if (!shop) {
        return res.status(400).send("Falta el parámetro shop");
    }

    try {
        const authRoute = await shopify.auth.begin({
            shop,
            callbackPath: "/api/shopify-auth/callback",
            isOnline: false,
        });

        return res.redirect(authRoute);
    } catch (error) {
        console.error("❌ Error en la autenticación con Shopify:", error);
        res.status(500).json({ error: "Error en autenticación con Shopify" });
    }
});

// Ruta de callback para Shopify
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

export default router;
