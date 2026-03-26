import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API Key missing" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: `Generate a minimal logo for ${prompt}. Return only the image.` }] }],
      generationConfig: { 
        // @ts-ignore - Bypass potential strict SDK type mismatch
        responseModalities: ["TEXT", "IMAGE"] 
      },
    });

    const response = await result.response;
    const parts = response?.candidates?.[0]?.content?.parts;

    if (!parts) throw new Error("No response parts received");

    let logoData: string | null = null;

    for (const part of parts) {
      if (part.inlineData && part.inlineData.data) {
        // The 'as string' cast fixes the "No overload matches this call" error
        const base64Data = part.inlineData.data as string;
        const buffer = Buffer.from(base64Data, "base64");

        try {
          // Attempting to write to public/logo.png
          const publicDir = path.join(process.cwd(), "public");
          if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir, { recursive: true });
          }
          const filePath = path.join(publicDir, "logo.png");
          fs.writeFileSync(filePath, buffer);
          
          logoData = "/logo.png";
        } catch (fsError) {
          // Vercel production is read-only. If saving fails, we use the Base64 string directly.
          console.warn("File system is read-only, using Base64 fallback.");
          logoData = `data:image/png;base64,${base64Data}`;
        }
      }
    }

    if (!logoData) {
      return NextResponse.json({ error: "Image not found in response" }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      logo: logoData 
    });

  } catch (error: any) {
    console.error("Critical Error:", error);
    return NextResponse.json({ error: error.message || "Generation failed" }, { status: 500 });
  }
}
