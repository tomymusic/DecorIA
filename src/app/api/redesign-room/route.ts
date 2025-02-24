import type { NextApiRequest, NextApiResponse } from "next";
import { redesignRoom } from "../../lib/replicate";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { imageUrl, prompt } = req.body as { imageUrl: string; prompt: string };

  if (!imageUrl || !prompt) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  try {
    const result = await redesignRoom(imageUrl, prompt);
    return res.status(200).json(result);
  } catch (error: any) {
    console.error("❌ ERROR:", error.message);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}
