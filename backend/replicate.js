import fetch from "node-fetch";

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

export async function changeClothing(imageUrl, prompt) {
  if (!REPLICATE_API_TOKEN) {
    console.error("❌ ERROR: Missing Replicate API Token!");
    throw new Error("Missing Replicate API Key");
  }

  try {
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Authorization": `Token ${REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        version: "95b7223104132402a9ae91cc677285bc5eb997834bd2349fa486f53910fd68b3",
        input: { image: imageUrl, prompt }
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("❌ API ERROR:", data); // Log detailed API error
      throw new Error(`Replicate API Error: ${data.detail || "Unknown error"}`);
    }

    console.log("✅ API SUCCESS:", data); // Log successful response
    return data;
  } catch (error) {
    console.error("❌ ERROR PROCESSING IMAGE:", error.message);
    throw new Error("Error processing the image");
  }
}
