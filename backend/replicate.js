import fetch from "node-fetch";

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

export async function changeClothing(imageUrl, prompt) {
  if (!REPLICATE_API_TOKEN) {
    console.error("❌ ERROR: Missing Replicate API Token!");
    throw new Error("Missing Replicate API Key");
  }

  try {
    console.log("🚀 Sending request to Replicate with:", { imageUrl, prompt });

    // Step 1: Start the request
    const startResponse = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Authorization": `Token ${REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        version: "8ebda4c70b3ea2a2bf86e44595afb562a2cdf85525c620f1671a78113c9f325b",
        input: { image: imageUrl, prompt }
      })
    });

    const startData = await startResponse.json();

    if (!startResponse.ok) {
      console.error("❌ API ERROR:", startData);
      throw new Error(`Replicate API Error: ${startData.detail || "Unknown error"}`);
    }

    console.log("✅ Processing started. ID:", startData.id);

    // Step 2: Polling (Wait for completion)
    let status = startData.status;
    let output = null;

    while (status === "starting" || status === "processing") {
      console.log("⏳ Waiting for AI to complete processing...");
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds before checking again

      const checkResponse = await fetch(`https://api.replicate.com/v1/predictions/${startData.id}`, {
        headers: {
          "Authorization": `Token ${REPLICATE_API_TOKEN}`
        }
      });

      const checkData = await checkResponse.json();
      status = checkData.status;
      output = checkData.output;

      if (status === "failed") {
        console.error("❌ AI Processing Failed:", checkData);
        throw new Error("AI failed to process the image.");
      }
    }

    console.log("✅ AI Processing Complete:", output);
    return { output };
  } catch (error) {
    console.error("❌ ERROR PROCESSING IMAGE:", error.message);
    throw new Error("Error processing the image");
  }
}
