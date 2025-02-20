import express from "express";

const router = express.Router();

// Ruta temporal para evitar errores en Vercel
router.get("/", (req, res) => {
  res.status(200).json({ message: "Shopify Auth API en construcción" });
});

export default router;export default function handler(req, res) {
  res.status(200).json({ message: "Shopify Auth API en construcción" });
}
