// import { GoogleGenAI } from "@google/genai";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const { prompt } = await req.json();

//     if (!prompt) {
//       return NextResponse.json(
//         { error: "Prompt is required" },
//         { status: 400 }
//       );
//     }

//     // Initialize Gemini client with API key from environment variable
//     const ai = new GoogleGenAI({
//       apiKey: process.env.GEMINI_API_KEY,
//     });

//     // Generate content using Gemini 2.5 Flash model
//     const response = await ai.models.generateContent({
//       model: "gemini-2.5-pro",
//       contents: prompt,
//     });

//     return NextResponse.json({
//       success: true,
//       text: response.text,
//     });
//   } catch (error: any) {
//     console.error("Gemini API Error:", error);
//     return NextResponse.json(
//       { error: error.message || "Failed to generate content" },
//       { status: 500 }
//     );
//   }
// }

import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Convert uploaded PDF file to a base64 string
async function fileToBase64(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  return buffer.toString("base64");
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const resumeFile = formData.get("resume") as File;
    const jobDescription = formData.get("jd") as string;
    const tone = formData.get("tone") as string;

    if (!resumeFile || !jobDescription || !tone) {
      return NextResponse.json(
        { error: "Resume, JD and tone are required" },
        { status: 400 }
      );
    }

    // Convert PDF → Base64
    const resumeBase64 = await fileToBase64(resumeFile);

    // Gemini client
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

  
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                mimeType: resumeFile.type,
                data: resumeBase64,
              },
            },
            {
              text: `Job Description:\n${jobDescription}\n\nTone: ${tone}\n\nGenerate a highly personalized 30-word cover letter based on the resume + JD. Keep it concise but impactful. No generic lines.`
            }
          ],
        }
      ]
    });

    const text = response.text;

    return NextResponse.json({
      success: true,
      coverLetter: text,
    });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

