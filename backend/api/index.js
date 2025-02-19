import express from "express";
import cors from "cors";
import { changeClothing } from "../replicate.js";

const app = express();
app.use(cors());
app.use(express.json()); // ✅ Enables JSON body parsing for req.body

// POST request to process clothing changes with AI
app.post("/api/decorate-room", async (req, res) => {
  try {
    const { imageUrl, prompt } = req.body;

    if (!imageUrl || !prompt) {
      return res.status(400).json({ error: "Missing parameters: imageUrl or prompt" });
    }

    const result = await changeClothing(imageUrl, prompt);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({ error: "Error processing the image" });
  }
});

// ✅ GET request to verify backend is running
app.get("/api/", (req, res) => {
  res.status(200).json({ message: "🚀 Backend for AI Clothing Change is running successfully!" });
});

export default app;
