import Link from "next/link";
import { Button } from "./ui/button";
import dayjs from "dayjs";
import { Interview, Feedback } from "@/types";

interface RecentInterviewItemProps {
  interview: Interview;
  feedback?: Feedback;
}

const RecentInterviewItem = ({
  interview,
  feedback,
}: RecentInterviewItemProps) => {
  const formattedDate = interview.createdAt 
    ? dayjs(interview.createdAt).format("MMM D, YYYY") 
    : "N/A";

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-dark-200 rounded-lg shadow-sm hover:bg-dark-100 transition-colors duration-200">
      <div className="mb-2 sm:mb-0">
        <h3 className="text-white font-medium text-lg capitalize">{interview.role} Interview ({interview.type})</h3>
        <p className="text-light-100 text-sm">Date: {formattedDate}</p>
      </div>
      <div className="flex flex-row gap-2">
        {feedback ? (
          <Link href={`/interview/${interview.id}/feedback`} passHref>
            <Button className="btn-primary">View Feedback</Button>
          </Link>
        ) : (
          <Link href={`/interview/${interview.id}`} passHref>
            <Button className="btn-secondary">Continue Interview</Button>
          </Link>
        )}
        {feedback && (
          <Link 
            href={`/api/feedback/download?interviewId=${interview.id}&format=pdf`}
            passHref
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="btn-tertiary">Download PDF</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default RecentInterviewItem;
