import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

async function fileToBase64(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  return buffer.toString("base64");
}

export async function POST(req: NextRequest) {
  try {
    // Get authenticated user session
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Check if user has enough tokens
    if (user.tokens < 10) {
      return NextResponse.json(
        { error: "Insufficient tokens. Required: 10, Available: " + user.tokens },
        { status: 402 }
      );
    }

    const formData = await req.formData();
    const resumeFile = formData.get("resume") as File;
    const jobDescription = formData.get("jd") as string;
    const tone = formData.get("tone") as string;
    const title = formData.get("title") as string;
    const jobRole = formData.get("jobRole") as string;

    if (!resumeFile || !jobDescription || !tone) {
      return NextResponse.json(
        { error: "Resume, JD and tone are required" },
        { status: 400 }
      );
    }

    const resumeBase64 = await fileToBase64(resumeFile);
    const resumeText = resumeFile.name;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const response = await model.generateContent([
      {
        inlineData: {
          mimeType: resumeFile.type,
          data: resumeBase64,
        },
      },
      {
        text: `Using the resume (internal PDF data) and the job description provided below, generate a clean, highly personalized cover letter.

STRICT RULES:
- Output ONLY the final cover letter text.
- NO headings, NO disclaimers, NO notes, NO “Here is your cover letter”.
- Write around 250 words.
- Use 3–4 short paragraphs with proper spacing.
- Maintain the selected tone: ${tone}.
- Align the candidate’s experience, skills, and achievements directly with the job requirements.
- Make the letter strong, clear, concise, and professional.
- Do NOT include the words “Resume”, “Job Description”, or metadata in the response.

Job Description:
${jobDescription}
`
      }
    ]);

    const coverLetterText = response.response.text();

    // Deduct 10 tokens and save letter in database
    const [updatedUser, letter] = await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { tokens: user.tokens - 10 }
      }),
      prisma.letter.create({
        data: {
          userId: user.id,
          title: title || "Untitled",
          jobRole: jobRole || "Unknown",
          resumeText: resumeText,
          jobDescription: jobDescription,
          tone: tone,
          content: coverLetterText
        }
      })
    ]);

    return NextResponse.json({
      success: true,
      coverLetter: coverLetterText,
      tokensRemaining: updatedUser.tokens,
      letterId: letter.id
    }, { status: 200 });

  } catch (error: any) {
    console.error("Generator API Error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}