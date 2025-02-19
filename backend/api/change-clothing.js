import { changeClothing } from "../replicate.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { imageUrl, prompt } = req.body;

  if (!imageUrl || !prompt) {
    return res.status(400).json({ error: "Faltan parámetros" });
  }

  try {
    const result = await changeClothing(imageUrl, prompt);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error procesando la imagen" });
  }
}
