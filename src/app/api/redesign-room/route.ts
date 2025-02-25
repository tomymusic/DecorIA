import { NextResponse } from "next/server";
import { redesignRoom } from "@/lib/replicate";

// Asegurar que solo acepta métodos POST
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { imageUrl, prompt } = body;

    if (!imageUrl || !prompt) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const result = await redesignRoom(imageUrl, prompt);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("❌ ERROR:", error.message);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
