// components/FeedbackCard.jsx
"use client";

import { Download } from "lucide-react";

// Simulated PDF generation function (replace with actual implementation)
const generatePDF = async (feedback) => {
  console.log("Generating PDF for feedback:", feedback);
  return "/api/download-feedback"; // Replace with actual endpoint
};

const FeedbackCard = ({ interview, feedback }) => {
  return (
    <div className="card p-6 bg-dark-300 rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-medium text-white">{interview.type} Interview</h3>
        <span className="text-light-100 text-sm">{new Date(interview.createdAt).toLocaleDateString()}</span>
      </div>
      <p className="text-light-100 mb-4">{feedback?.comments || "No feedback available yet."}</p>
      <div className="flex gap-4">
        <a
          href="#"
          onClick={async (e) => {
            e.preventDefault();
            const pdfUrl = await generatePDF(feedback);
            window.location.href = pdfUrl;
          }}
          className="flex-1 bg-primary-200 text-dark-100 px-4 py-2 rounded-lg hover:bg-primary-300 transition-colors flex items-center justify-center gap-2"
        >
          <Download className="h-5 w-5" /> Download PDF
        </a>
        <a
          href={`/feedback/${interview.id}`}
          className="flex-1 bg-blue-400/10 text-light-100 px-4 py-2 rounded-lg hover:bg-blue-400/20 transition-colors flex items-center justify-center gap-2"
        >
          View Details
        </a>
      </div>
    </div>
  );
};

export default FeedbackCard;