import { redesignRoom } from "./replicate.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { imageUrl, prompt } = req.body;
  if (!imageUrl || !prompt) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  try {
    const result = await redesignRoom(imageUrl, prompt);
    return res.status(200).json(result);
  } catch (error) {
    console.error("❌ ERROR en /api/redesign-room:", error);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}
