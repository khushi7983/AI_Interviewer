import { db } from "@/firebase/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      interviewId,
      userId,
      messages,
      metadata,
    }: {
      interviewId: string;
      userId: string;
      messages: Array<{ role: "user" | "assistant" | "system"; content: string }>;
      metadata?: Record<string, unknown>;
    } = body;

    if (!interviewId || !userId || !Array.isArray(messages) || messages.length === 0) {
      return Response.json(
        { success: false, error: "Missing required fields: interviewId, userId, messages" },
        { status: 400 }
      );
    }

    const conversationDoc = {
      interviewId,
      userId,
      messages,
      metadata: metadata ?? {},
      createdAt: new Date().toISOString(),
    };

    const ref = await db.collection("conversations").add(conversationDoc);

    return Response.json({ success: true, conversationId: ref.id }, { status: 200 });
  } catch (error: any) {
    console.error("Error saving conversation:", error);
    return Response.json(
      { success: false, error: error?.message ?? "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json({ success: true, message: "Conversations API is up" }, { status: 200 });
}



