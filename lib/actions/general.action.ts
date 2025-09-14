"use server";

import { generateText } from "ai";
import { google } from "@ai-sdk/google";

import { db } from "@/firebase/admin";
import { feedbackSchema } from "@/constants";

export async function createFeedback(params: CreateFeedbackParams) {
  const { interviewId, userId, transcript, feedbackId } = params;

  try {
    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `- ${sentence.role}: ${sentence.content}\n`
      )
      .join("");

    const { text } = await generateText({
      model: google("gemini-2.0-flash-001") as any,
      prompt: `
        You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        Transcript:
        ${formattedTranscript}

        Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
        - **Communication Skills**: Clarity, articulation, structured responses.
        - **Technical Knowledge**: Understanding of key concepts for the role.
        - **Problem-Solving**: Ability to analyze problems and propose solutions.
        - **Cultural & Role Fit**: Alignment with company values and job role.
        - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.

        Return the response as a valid JSON object with the following structure:
        {
          "totalScore": number,
          "categoryScores": [
            {
              "name": "Communication Skills",
              "score": number,
              "comment": "string"
            },
            {
              "name": "Technical Knowledge", 
              "score": number,
              "comment": "string"
            },
            {
              "name": "Problem-Solving",
              "score": number,
              "comment": "string"
            },
            {
              "name": "Cultural & Role Fit",
              "score": number,
              "comment": "string"
            },
            {
              "name": "Confidence & Clarity",
              "score": number,
              "comment": "string"
            }
          ],
          "strengths": ["string"],
          "areasForImprovement": ["string"],
          "finalAssessment": "string"
        }
        `,
      system:
        "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
    });

    const object = JSON.parse(text);

    const feedback = {
      interviewId: interviewId,
      userId: userId,
      totalScore: object.totalScore,
      categoryScores: object.categoryScores,
      strengths: object.strengths,
      areasForImprovement: object.areasForImprovement,
      finalAssessment: object.finalAssessment,
      createdAt: new Date().toISOString(),
    };

    let feedbackRef;

    if (feedbackId) {
      feedbackRef = db.collection("feedback").doc(feedbackId);
    } else {
      feedbackRef = db.collection("feedback").doc();
    }

    await feedbackRef.set(feedback);

    return { success: true, feedbackId: feedbackRef.id };
  } catch (error) {
    console.error("Error saving feedback:", error);
    return { success: false };
  }
}

export async function getInterviewById(id: string): Promise<Interview | null> {
  const interview = await db.collection("interviews").doc(id).get();

  return interview.data() as Interview | null;
}

export async function getFeedbackByInterviewId(
  params: GetFeedbackByInterviewIdParams
): Promise<Feedback | null> {
  const { interviewId, userId } = params;

  const querySnapshot = await db
    .collection("feedback")
    .where("interviewId", "==", interviewId)
    .where("userId", "==", userId)
    .limit(1)
    .get();

  if (querySnapshot.empty) return null;

  const feedbackDoc = querySnapshot.docs[0];
  return { id: feedbackDoc.id, ...feedbackDoc.data() } as Feedback;
}

export async function getLatestInterviews(
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
  const { userId, limit = 20 } = params;

  // Get all finalized interviews without complex ordering to avoid index requirements
  const interviews = await db
    .collection("interviews")
    .where("finalized", "==", true)
    .limit(limit * 3) // Get more to account for filtering
    .get();

  // Filter out user's own interviews, sort by creation date, and limit results
  const filteredInterviews = interviews.docs
    .filter((doc) => doc.data().userId !== userId)
    .sort((a, b) => {
      const dateA = new Date(a.data().createdAt).getTime();
      const dateB = new Date(b.data().createdAt).getTime();
      return dateB - dateA; // Sort by newest first
    })
    .slice(0, limit);

  return filteredInterviews.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

export async function getInterviewsByUserId(
  userId: string
): Promise<Interview[] | null> {
  // edited now
  if (!userId) {
    return [];
  }
  const interviews = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .get();

  // Sort by createdAt in descending order (newest first) in memory
  const sortedInterviews = interviews.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .sort((a, b) => {
      const dateA = new Date((a as any).createdAt).getTime();
      const dateB = new Date((b as any).createdAt).getTime();
      return dateB - dateA; // Sort by newest first
    });

  return sortedInterviews as Interview[];
}
