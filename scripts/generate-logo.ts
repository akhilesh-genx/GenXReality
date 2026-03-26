import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import path from 'path';

// 1. Get the key
const apiKey = process.env.GEMINI_API_KEY;

// 2. Immediate check: If no key, stop the build with a clear error
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not defined in environment variables");
}

// 3. Pass the string DIRECTLY (not as an object)
const ai = new GoogleGenerativeAI(apiKey);

async function generateLogo() {
  try {
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: "Generate a minimal logo. Return only the image." }] }],
      generationConfig: { 
        // @ts-ignore
        responseModalities: ["TEXT", "IMAGE"] 
      },
    });

    const response = await result.response;
    const parts = response?.candidates?.[0]?.content?.parts;

    if (!parts) return;

    for (const part of parts) {
      if (part.inlineData?.data) {
        const base64Data = part.inlineData.data as string;
        const buffer = Buffer.from(base64Data, 'base64');
        
        const publicDir = path.join(process.cwd(), 'public');
        if (!fs.existsSync(publicDir)) {
          fs.mkdirSync(publicDir, { recursive: true });
        }

        const filePath = path.join(publicDir, 'logo.png');
        fs.writeFileSync(filePath, buffer);
        console.log("Logo successfully saved!");
      }
    }
  } catch (error) {
    console.error("Generation failed:", error);
    process.exit(1); // Tell the build system something went wrong
  }
}

generateLogo();
