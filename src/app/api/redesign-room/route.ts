import { NextResponse } from "next/server";
import { redesignRoom } from "@/lib/replicate";

export async function POST(req: Request) {
  try {
    const { imageUrl, prompt } = await req.json();
    if (!imageUrl || !prompt) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const result = await redesignRoom(imageUrl, prompt);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
