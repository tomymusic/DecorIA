import type { ReplicateResponse } from "@/types/replicate";
import fetch from "node-fetch";

const REPLICATE_API_TOKEN: string | undefined = process.env.REPLICATE_API_TOKEN;

if (!REPLICATE_API_TOKEN) {
  console.error("❌ ERROR: Missing Replicate API Token!");
  throw new Error("Missing Replicate API Key");
}

export async function redesignRoom(imageUrl: string, prompt: string): Promise<{ output?: string }> {
  try {
    console.log("🚀 Enviando solicitud a Replicate con:", { imageUrl, prompt });

    const startResponse = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Authorization": `Token ${REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        version: "854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b",
        input: { image: imageUrl, prompt }
      })
    });

    const startData = await startResponse.json() as ReplicateResponse;

    if (!startResponse.ok) {
      console.error("❌ API ERROR:", startData);
      throw new Error(`Replicate API Error: ${startData.detail || JSON.stringify(startData)}`);
    }

    console.log("✅ Procesamiento iniciado. ID:", startData.id);

    let status = startData.status;
    let output: string | undefined = undefined;
    let attempts = 0;
    const maxAttempts = 20;

    while ((status === "starting" || status === "processing") && attempts < maxAttempts) {
      console.log(`⏳ Intento ${attempts + 1}: Esperando a que la IA complete el procesamiento...`);
      await new Promise(resolve => setTimeout(resolve, 5000));

      const checkResponse = await fetch(`https://api.replicate.com/v1/predictions/${startData.id}`, {
        headers: { "Authorization": `Token ${REPLICATE_API_TOKEN}` }
      });

      const checkData: ReplicateResponse = await checkResponse.json();
      status = checkData.status;
      output = checkData.output;
      attempts++;

      if (status === "failed") {
        console.error("❌ La IA falló:", checkData);
        throw new Error(`La IA no pudo procesar la imagen. Error: ${JSON.stringify(checkData)}`);
      }
    }

    if (attempts >= maxAttempts) {
      throw new Error("Tiempo de espera agotado: la IA tardó demasiado en responder.");
    }

    console.log("✅ IA Procesamiento Completo:", output);
    return { output };
  } catch (error: any) {
    console.error("❌ ERROR PROCESANDO LA IMAGEN:", error.message);
    throw new Error(`Error procesando la imagen: ${error.message}`);
  }
}
