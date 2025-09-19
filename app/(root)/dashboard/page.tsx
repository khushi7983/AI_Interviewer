import { BarChart3, TrendingUp, Clock, Target, Award, Users } from "lucide-react";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getInterviewsByUserId, getFeedbackByInterviewId, getAllFeedbackByUserId } from "@/lib/actions/general.action";
import { redirect } from "next/navigation";
import AnalyticsChart from "@/components/AnalyticsChart";
import InterviewCard from "@/components/InterviewCard";
import RecentInterviewItem from "@/components/RecentInterviewItem";

async function Dashboard() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const [interviews, allFeedback] = await Promise.all([
    getInterviewsByUserId(user.id),
    getAllFeedbackByUserId(user.id),
  ]);
  
  // Calculate statistics
  const totalInterviews = interviews?.length || 0;
  const completedInterviewsData = interviews?.filter(i => i.finalized) || [];
  const completedInterviews = completedInterviewsData.length;

  let averageScore = 0;
  if (completedInterviews > 0) {
    const feedbackPromises = completedInterviewsData.map(async (interview) => {
      const feedback = allFeedback?.find(f => f.interviewId === interview.id);
      return feedback?.totalScore || 0;
    });
    const scores = await Promise.all(feedbackPromises);
    const totalScoreSum = scores.reduce((sum, score) => sum + score, 0);
    averageScore = Math.round(totalScoreSum / completedInterviews);
  }
  
  // Calculate dynamic data for AnalyticsChart - Interview Performance
  const feedbackScores = allFeedback?.map(f => f.totalScore).filter((score): score is number => score !== null) || [];
  const overallAverageScore = feedbackScores.length > 0 ? Math.round(feedbackScores.reduce((sum, score) => sum + score, 0) / feedbackScores.length) : 0;
  const bestScore = feedbackScores.length > 0 ? Math.max(...feedbackScores) : 0;

  const now = new Date();
  const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));
  const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));

  const lastWeekFeedback = allFeedback?.filter(f => new Date(f.createdAt) >= oneWeekAgo) || [];
  const lastWeekScores = lastWeekFeedback.map(f => f.totalScore).filter((score): score is number => score !== null) || [];
  const lastWeekAverage = lastWeekScores.length > 0 ? Math.round(lastWeekScores.reduce((sum, score) => sum + score, 0) / lastWeekScores.length) : 0;

  const lastMonthFeedback = allFeedback?.filter(f => new Date(f.createdAt) >= oneMonthAgo) || [];
  const lastMonthScores = lastMonthFeedback.map(f => f.totalScore).filter((score): score is number => score !== null) || [];
  const lastMonthAverage = lastMonthScores.length > 0 ? Math.round(lastMonthScores.reduce((sum, score) => sum + score, 0) / lastMonthScores.length) : 0;

  const improvementRate = 12; // This would be calculated from historical data (keeping static for now)

  const stats = [
    {
      title: "Total Interviews",
      value: totalInterviews.toString(),
      icon: BarChart3,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
    {
      title: "Completed",
      value: completedInterviews.toString(),
      icon: Target,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
    },
    {
      title: "Average Score",
      value: `${averageScore}%`,
      icon: Award,
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
    },
    {
      title: "Improvement",
      value: `+${improvementRate}%`,
      icon: TrendingUp,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          Welcome back, {user.name}!
        </h1>
        <p className="text-light-100 text-lg">
          Track your progress and continue improving your interview skills.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="card p-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-light-100 text-sm font-medium">{stat.title}</p>
                <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-6">Performance Analytics</h2>
        <div className="grid grid-cols-1 gap-6">

          <AnalyticsChart
            title="Interview Performance"
            data={[
              { label: "Last Week", value: lastWeekAverage, trend: lastWeekAverage >= (overallAverageScore * 0.95) ? 'up' : 'down' }, // Simple trend logic
              { label: "Last Month", value: lastMonthAverage, trend: lastMonthAverage >= (overallAverageScore * 0.95) ? 'up' : 'down' },
              { label: "Overall Average", value: overallAverageScore, trend: 'stable' },
              { label: "Best Score", value: bestScore, trend: 'up' },
            ]}
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1  gap-8">
        {/* Recent Interviews */}
        <div className="card p-6">
          <h2 className="text-2xl font-semibold text-white mb-6">Your Interviews</h2>
          <div className="space-y-4">
            {(interviews || [])?.slice(0, 5).map((interview) => {
              const feedback = allFeedback?.find(f => f.interviewId === interview.id);
              return (
                <RecentInterviewItem
                  key={interview.id}
                  interview={interview}
                  feedback={feedback}
                />
              );
            })}
            {(interviews || [])?.length === 0 && (
              <p className="text-light-100 text-center py-8">
                No interviews yet. Start practicing to see your progress here!
              </p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card p-6">
          <h2 className="text-2xl font-semibold text-white mb-6">Quick Actions</h2>
          <div className="space-y-4">
            <a 
              href="/interview" 
              className="block p-4 bg-primary-200/10 border border-primary-200/20 rounded-lg hover:bg-primary-200/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-200 rounded-lg">
                  <Target className="h-5 w-5 text-dark-100" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Start New Interview</h3>
                  <p className="text-light-100 text-sm">Practice with AI interviewer</p>
                </div>
              </div>
            </a>
            
            <a 
              href="/resources" 
              className="block p-4 bg-blue-400/10 border border-blue-400/20 rounded-lg hover:bg-blue-400/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-400 rounded-lg">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Browse Resources</h3>
                  <p className="text-light-100 text-sm">Study materials and tips</p>
                </div>
              </div>
            </a>
            
            <a 
              href="/profile" 
              className="block p-4 bg-green-400/10 border border-green-400/20 rounded-lg hover:bg-green-400/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-400 rounded-lg">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-medium">View Profile</h3>
                  <p className="text-light-100 text-sm">Manage your account</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;