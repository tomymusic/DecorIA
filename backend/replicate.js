import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
const REPLICATE_MODEL = "stability-ai/stable-diffusion";

export async function changeClothing(imageUrl, prompt) {
  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${REPLICATE_API_TOKEN}`,
    },
    body: JSON.stringify({
      version: REPLICATE_MODEL,
      input: {
        image: imageUrl,
        prompt: prompt,
      },
    }),
  });

  const result = await response.json();
  return result;
}
