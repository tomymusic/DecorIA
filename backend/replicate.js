import fetch from "node-fetch";

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

export async function redesignRoom(imageUrl, prompt) {
  if (!REPLICATE_API_TOKEN) {
    console.error("❌ ERROR: Missing Replicate API Token!");
    throw new Error("Missing Replicate API Key");
  }
  
  if (!imageUrl.startsWith("http")) {
    throw new Error("URL de imagen inválida");
  }

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

    const startData = await startResponse.json();

    if (!startResponse.ok) {
      console.error("❌ API ERROR:", startData);
      throw new Error(`Replicate API Error: ${startData.detail || JSON.stringify(startData)}`);
    }

    console.log("✅ Procesamiento iniciado. ID:", startData.id);

    let status = startData.status;
    let output = null;
    let attempts = 0;
    const maxAttempts = 20;

    while ((status === "starting" || status === "processing") && attempts < maxAttempts) {
      console.log(`⏳ Intento ${attempts + 1}: Esperando a que la IA complete el procesamiento...`);
      await new Promise(resolve => setTimeout(resolve, 5000));

      const checkResponse = await fetch(`https://api.replicate.com/v1/predictions/${startData.id}`, {
        headers: {
          "Authorization": `Token ${REPLICATE_API_TOKEN}`
        }
      });

      const checkData = await checkResponse.json();
      status = checkData.status;
      output = checkData.output;
      attempts++;

      if (status === "failed") {
        console.error("❌ La IA falló:", checkData);
        throw new Error("La IA no pudo procesar la imagen");
      }
    }

    if (!output) {
      throw new Error("No se recibió una imagen de salida de Replicate");
    }

    console.log("✅ IA Procesamiento Completo:", output);
    return { output };
  } catch (error) {
    console.error("❌ ERROR PROCESANDO LA IMAGEN:", error.message);
    throw new Error(`Error procesando la imagen: ${error.message}`);
  }
}
