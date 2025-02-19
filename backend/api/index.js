import { changeClothing } from "../replicate.js";

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({ message: "🚀 Backend de Prueba IA - Funciona Correctamente!" });
  }

  if (req.method === "POST") {
    const { imageUrl, prompt } = req.body;

    if (!imageUrl || !prompt) {
      return res.status(400).json({ error: "Faltan parámetros" });
    }

    try {
      const result = await changeClothing(imageUrl, prompt);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: "Error procesando la imagen" });
    }
  }

  return res.status(405).json({ error: "Método no permitido" });
}
