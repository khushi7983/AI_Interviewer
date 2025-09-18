import { db } from "@/firebase/admin";

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();
    if (!userId) {
      return Response.json({ success: false, error: "Missing userId" }, { status: 400 });
    }

    const interview = {
      role: "Practice Session",
      type: "practice",
      level: "n/a",
      techstack: [],
      questions: [],
      userId,
      finalized: false,
      coverImage: null,
      createdAt: new Date().toISOString(),
    };

    const ref = await db.collection("interviews").add(interview);
    return Response.json({ success: true, interviewId: ref.id }, { status: 200 });
  } catch (error: any) {
    console.error("Error creating practice interview:", error);
    return Response.json(
      { success: false, error: error?.message ?? "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json({ success: true, message: "Practice interview API is up" }, { status: 200 });
}



