import express, { Request, Response, NextFunction } from "express"; 
import cors from "cors";
import { redesignRoom } from "./replicate";

const app = express();
app.use(cors());
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`🔹 Petición recibida: ${req.method} ${req.url}`);
  next();
});

app.get("/api/", (req: Request, res: Response) => {
  res.status(200).json({ message: "🚀 DecorIA backend funcionando correctamente!" });
});

app.post("/api/redesign-room", async (req: Request, res: Response, next: NextFunction) => {
  console.log("📥 Petición recibida en /api/redesign-room");

  try {
    const { imageUrl, prompt } = req.body as { imageUrl: string; prompt: string };
    
    if (!imageUrl || !prompt) {
      return res.status(400).json({ error: "Faltan parámetros" });
    }

    const result = await redesignRoom(imageUrl, prompt);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

export default app;
