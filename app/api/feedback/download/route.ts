import { NextResponse } from "next/server";
import { getFeedbackByInterviewId } from "@/lib/actions/general.action";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const interviewId = searchParams.get("interviewId");
    const format = searchParams.get("format");

    if (!interviewId) {
      return new NextResponse("Interview ID is required", { status: 400 });
    }

    const feedback = await getFeedbackByInterviewId({ interviewId, userId: user.id });

    if (!feedback) {
      return new NextResponse("Feedback not found", { status: 404 });
    }

    if (format === "pdf") {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      
      let y = page.getHeight() - 50;
      const x = 50;
      const fontSize = 12;
      const lineHeight = 18;

      const drawText = (text: string, options: { x: number; y: number; font?: any; size?: number; color?: any; }) => {
        page.drawText(text, { ...options, font: options.font || font, size: options.size || fontSize });
        y -= options.size || fontSize;
      };

      drawText(`Interview Feedback for ${feedback.interviewId}`, { x, y, font: boldFont, size: 24 });
      y -= lineHeight * 2;

      drawText(`Total Score: ${feedback.totalScore}/100`, { x, y, font: boldFont });
      y -= lineHeight;
      drawText(`Final Assessment: ${feedback.finalAssessment}`, { x, y });
      y -= lineHeight * 2;

      drawText("Category Scores:", { x, y, font: boldFont });
      y -= lineHeight;
      feedback.categoryScores.forEach(category => {
        drawText(`  - ${category.name}: ${category.score}/100 - ${category.comment}`, { x, y });
        y -= lineHeight;
      });
      y -= lineHeight;

      drawText("Strengths:", { x, y, font: boldFont });
      y -= lineHeight;
      feedback.strengths.forEach(strength => {
        drawText(`  - ${strength}`, { x, y });
        y -= lineHeight;
      });
      y -= lineHeight;

      drawText("Areas for Improvement:", { x, y, font: boldFont });
      y -= lineHeight;
      feedback.areasForImprovement.forEach(area => {
        drawText(`  - ${area}`, { x, y });
        y -= lineHeight;
      });
      y -= lineHeight;

      const pdfBytes = await pdfDoc.save();

      const pdfFileName = `feedback-${interviewId}.pdf`;
      const pdfHeaders = {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${pdfFileName}"`,
      };

      return new NextResponse(Buffer.from(pdfBytes), { headers: pdfHeaders });

    } else {
      // Default to JSON download
      const fileName = `feedback-${interviewId}.json`;
      const headers = {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="${fileName}"`,
      };
      return new NextResponse(JSON.stringify(feedback, null, 2), { headers });
    }
  } catch (error) {
    console.error("[FEEDBACK_DOWNLOAD_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
