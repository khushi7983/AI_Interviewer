import { BarChart3, TrendingUp, Clock, Target, Award, Users } from "lucide-react";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getInterviewsByUserId } from "@/lib/actions/general.action";
import { redirect } from "next/navigation";
import AnalyticsChart from "@/components/AnalyticsChart";

async function Dashboard() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const interviews = await getInterviewsByUserId(user.id);
  
  // Calculate statistics
  const totalInterviews = interviews?.length || 0;
  const completedInterviews = interviews?.filter(i => i.finalized).length || 0;
  const averageScore = 85; // This would be calculated from feedback scores
  const improvementRate = 12; // This would be calculated from historical data

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          <div key={index} className="card p-6">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnalyticsChart
            title="Skill Improvement Over Time"
            data={[
              { label: "Communication", value: 85, trend: 'up' },
              { label: "Technical Knowledge", value: 78, trend: 'up' },
              { label: "Problem Solving", value: 82, trend: 'stable' },
              { label: "Confidence", value: 90, trend: 'up' },
            ]}
          />
          <AnalyticsChart
            title="Interview Performance"
            data={[
              { label: "Last Week", value: 75, trend: 'up' },
              { label: "Last Month", value: 82, trend: 'up' },
              { label: "Overall Average", value: 85, trend: 'stable' },
              { label: "Best Score", value: 95, trend: 'up' },
            ]}
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Interviews */}
        <div className="card p-6">
          <h2 className="text-2xl font-semibold text-white mb-6">Recent Interviews</h2>
          <div className="space-y-4">
            {interviews?.slice(0, 5).map((interview) => (
              <div key={interview.id} className="flex items-center justify-between p-4 bg-dark-200 rounded-lg">
                <div>
                  <h3 className="text-white font-medium">{interview.role}</h3>
                  <p className="text-light-100 text-sm">
                    {interview.type} • {interview.level}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-light-100 text-sm">
                    {new Date(interview.createdAt).toLocaleDateString()}
                  </p>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    interview.finalized 
                      ? 'bg-green-400/20 text-green-400' 
                      : 'bg-yellow-400/20 text-yellow-400'
                  }`}>
                    {interview.finalized ? 'Completed' : 'In Progress'}
                  </span>
                </div>
              </div>
            ))}
            {interviews?.length === 0 && (
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
