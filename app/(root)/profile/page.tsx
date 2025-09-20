import { User, Mail, Calendar, Award, Settings, Edit3 } from "lucide-react";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getInterviewsByUserId, getAllFeedbackByUserId } from "@/lib/actions/general.action";
import { redirect } from "next/navigation";


async function Profile() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const interviews = await getInterviewsByUserId(user.id);
  const allFeedback = await getAllFeedbackByUserId(user.id);
  
  // Calculate user statistics
  const totalInterviews = interviews?.length || 0;
  const completedInterviews = interviews?.filter(i => i.finalized).length || 0;
  const averageScore =
    allFeedback && allFeedback.length > 0
      ? Math.round(
          allFeedback.reduce((sum, f) => sum + (f.totalScore || 0), 0) / allFeedback.length
        )
      : 0;
  const joinDate = new Date().toLocaleDateString(); // This would come from user data

  const achievements = [
    {
      title: "First Interview",
      description: "Completed your first practice interview",
      icon: Award,
      unlocked: totalInterviews > 0,
    },
    {
      title: "Interview Veteran",
      description: "Completed 10+ practice interviews",
      icon: Award,
      unlocked: totalInterviews >= 10,
    },
    {
      title: "Consistent Learner",
      description: "Practiced for 7 consecutive days",
      icon: Award,
      unlocked: false, // This would be calculated based on activity
    },
    {
      title: "High Performer",
      description: "Achieved 90%+ average score",
      icon: Award,
      unlocked: averageScore >= 90,
    },
  ];

  const recentInterviews = interviews?.slice(0, 5) || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="card p-10 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-24 h-24 bg-primary-200 rounded-full flex items-center justify-center">
            <User className="h-12 w-12 text-dark-100" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
            <div className="flex items-center gap-4 text-light-100 mb-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Joined {joinDate}</span>
              </div>
            </div>
            {/* <button className="btn-secondary flex items-center gap-2">
              <Edit3 className="h-4 w-4" />
              Edit Profile
            </button> */}
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card p-6 text-center">
          <div className="w-12 h-12 bg-blue-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="h-6 w-6 text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{totalInterviews}</h3>
          <p className="text-light-100">Total Interviews</p>
        </div>
        <div className="card p-6 text-center">
          <div className="w-12 h-12 bg-green-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="h-6 w-6 text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{completedInterviews}</h3>
          <p className="text-light-100">Completed</p>
        </div>
        <div className="card p-6 text-center">
          <div className="w-12 h-12 bg-yellow-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="h-6 w-6 text-yellow-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{averageScore}%</h3>
          <p className="text-light-100">Average Score</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Interviews */}
        <div className="card p-6">
          <h2 className="text-2xl font-semibold text-white mb-6">Recent Interviews</h2>
          <div className="space-y-4">
            {recentInterviews.length > 0 ? (
              recentInterviews.map((interview) => (
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
              ))
            ) : (
              <p className="text-light-100 text-center py-8">
                No interviews yet. Start practicing to see your history here!
              </p>
            )}
          </div>
        </div>

        {/* Achievements */}
        <div className="card p-6">
          <h2 className="text-2xl font-semibold text-white mb-6">Achievements</h2>
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div 
                key={index} 
                className={`flex items-center gap-4 p-4 rounded-lg ${
                  achievement.unlocked 
                    ? 'bg-green-400/10 border border-green-400/20' 
                    : 'bg-dark-200'
                }`}
              >
                <div className={`p-2 rounded-lg ${
                  achievement.unlocked 
                    ? 'bg-green-400/20' 
                    : 'bg-gray-600/20'
                }`}>
                  <achievement.icon className={`h-5 w-5 ${
                    achievement.unlocked 
                      ? 'text-green-400' 
                      : 'text-gray-400'
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className={`font-medium ${
                    achievement.unlocked 
                      ? 'text-white' 
                      : 'text-gray-400'
                  }`}>
                    {achievement.title}
                  </h3>
                  <p className={`text-sm ${
                    achievement.unlocked 
                      ? 'text-light-100' 
                      : 'text-gray-500'
                  }`}>
                    {achievement.description}
                  </p>
                </div>
                {achievement.unlocked && (
                  <div className="text-green-400">
                    <Award className="h-5 w-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

export default Profile;

