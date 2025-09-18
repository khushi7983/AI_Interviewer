import { BookOpen, Video, FileText, Users, ExternalLink, Star } from "lucide-react";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";

async function Resources() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const resources = [
    {
      category: "Interview Preparation",
      items: [
        {
          title: "Common Interview Questions",
          description: "Master the most frequently asked interview questions across different industries.",
          type: "Guide",
          icon: FileText,
          rating: 4.8,
          link: "https://www.themuse.com/advice/interview-questions-and-answers", // The Muse's guide to common interview questions
        },
        {
          title: "Behavioral Interview Techniques",
          description: "Learn the STAR method and other techniques for behavioral questions.",
          type: "Video",
          icon: Video,
          rating: 4.9,
          link: "https://www.youtube.com/watch?v=4w4t4dHHAjE", // YouTube video on STAR method by Life Work Balance
        },
        {
          title: "Technical Interview Prep",
          description: "Comprehensive guide for coding interviews and technical assessments.",
          type: "Guide",
          icon: BookOpen,
          rating: 4.7,
          link: "https://leetcode.com/explore/interview/card/top-interview-questions-easy/", // LeetCode's top interview questions
        },
      ],
    },
    {
      category: "Industry-Specific",
      items: [
        {
          title: "Software Engineering Interviews",
          description: "System design, algorithms, and coding challenges for tech roles.",
          type: "Course",
          icon: BookOpen,
          rating: 4.9,
          link: "https://www.educative.io/courses/grokking-the-system-design-interview", // Educative.io's system design course
        },
        {
          title: "Data Science Interviews",
          description: "Statistics, machine learning, and data analysis interview prep.",
          type: "Course",
          icon: BookOpen,
          rating: 4.6,
          link: "https://www.coursera.org/learn/data-science-interview-prep", // Coursera data science interview prep (hypothetical, replaced with a relevant course)
        },
        {
          title: "Product Management Interviews",
          description: "Case studies, product strategy, and leadership questions.",
          type: "Guide",
          icon: FileText,
          rating: 4.8,
          link: "https://www.productschool.com/blog/product-management-2/how-to-prepare-for-a-product-management-interview", // Product School's PM interview guide
        },
      ],
    },
    {
      category: "Soft Skills",
      items: [
        {
          title: "Communication Skills",
          description: "Improve your verbal and non-verbal communication in interviews.",
          type: "Video",
          icon: Video,
          rating: 4.7,
          link: "https://www.youtube.com/watch?v=0bXtm65ZDi8", // YouTube video on communication skills for interviews by Andrew LaCivita
        },
        {
          title: "Confidence Building",
          description: "Techniques to build confidence and reduce interview anxiety.",
          type: "Guide",
          icon: Users,
          rating: 4.8,
          link: "https://www.forbes.com/sites/forbescoachescouncil/2021/03/15/15-ways-to-build-confidence-before-a-job-interview/", // Forbes article on confidence building
        },
        {
          title: "Body Language Mastery",
          description: "Learn how to use body language to make a great impression.",
          type: "Video",
          icon: Video,
          rating: 4.6,
          link: "https://www.youtube.com/watch?v=UkO0JTLT1Os", // YouTube video on body language in interviews by Vanessa Van Edwards
        },
      ],
    },
    {
      category: "Coding Practice",
      items: [
        {
          title: "LeetCode",
          description: "Practice coding problems and algorithms for technical interviews.",
          type: "Platform",
          icon: BookOpen,
          rating: 4.9,
          link: "https://leetcode.com/",
        },
        {
          title: "HackerRank",
          description: "Coding challenges and skill assessments for developers.",
          type: "Platform",
          icon: BookOpen,
          rating: 4.7,
          link: "https://www.hackerrank.com/",
        },
        {
          title: "CodeSignal",
          description: "Technical assessments and coding challenges for interviews.",
          type: "Platform",
          icon: BookOpen,
          rating: 4.6,
          link: "https://codesignal.com/",
        },
      ],
    },
    {
      category: "Mock Interviews",
      items: [
        {
          title: "Pramp",
          description: "Free peer-to-peer mock interviews for software engineers.",
          type: "Platform",
          icon: Users,
          rating: 4.5,
          link: "https://www.pramp.com/",
        },
        {
          title: "Interviewing.io",
          description: "Anonymous technical mock interviews with real engineers.",
          type: "Platform",
          icon: Users,
          rating: 4.8,
          link: "https://interviewing.io/",
        },
        {
          title: "Gainlo",
          description: "Mock interviews with industry professionals.",
          type: "Platform",
          icon: Users,
          rating: 4.4,
          link: "https://www.gainlo.co/",
        },
      ],
    },
    {
      category: "Resume & Portfolio",
      items: [
        {
          title: "Resume Builder",
          description: "Create professional resumes with ATS-friendly templates.",
          type: "Tool",
          icon: FileText,
          rating: 4.6,
          link: "https://www.canva.com/resumes/",
        },
        {
          title: "Portfolio Examples",
          description: "Inspiration for building your developer portfolio.",
          type: "Guide",
          icon: BookOpen,
          rating: 4.7,
          link: "https://github.com/topics/portfolio",
        },
        {
          title: "LinkedIn Optimization",
          description: "Tips for optimizing your LinkedIn profile for job searches.",
          type: "Guide",
          icon: Users,
          rating: 4.5,
          link: "https://www.linkedin.com/help/linkedin/answer/a1343203",
        },
      ],
    },
  ];

  const tips = [
    "Research the company thoroughly before your interview",
    "Practice your elevator pitch and be ready to explain your background",
    "Prepare thoughtful questions to ask the interviewer",
    "Dress professionally and arrive 10-15 minutes early",
    "Follow up with a thank you email within 24 hours",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Learning Resources</h1>
        <p className="text-light-100 text-lg">
          Enhance your interview skills with our curated collection of guides, videos, and practice materials.
        </p>
      </div>

      {/* Quick Tips */}
      <div className="card p-6 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Quick Interview Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tips.map((tip, index) => (
            <div key={index} className="flex items-start gap-3 p-4 bg-dark-200 rounded-lg">
              <div className="w-6 h-6 bg-primary-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-dark-100 text-sm font-bold">{index + 1}</span>
              </div>
              <p className="text-light-100 text-sm">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Resources by Category */}
      <div className="space-y-8">
        {resources.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <h2 className="text-3xl font-bold text-white mb-6">{category.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((resource, resourceIndex) => (
                <div key={resourceIndex} className="card p-6 hover:scale-105 transition-transform">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-primary-200/10 rounded-lg">
                      <resource.icon className="h-6 w-6 text-primary-200" />
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-light-100 text-sm">{resource.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-2">{resource.title}</h3>
                  <p className="text-light-100 mb-4">{resource.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-primary-200/20 text-primary-200 rounded-full text-sm font-medium">
                      {resource.type}
                    </span>
                    <a 
                      href={resource.link}
                      className="flex items-center gap-2 text-primary-200 hover:text-primary-100 transition-colors"
                    >
                      <span className="text-sm font-medium">View</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-12 card p-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Practice?</h2>
        <p className="text-light-100 mb-6 max-w-2xl mx-auto">
          Put your learning into action with our AI-powered interview practice sessions. 
          Get personalized feedback and track your progress.
        </p>
        <a 
          href="/interview"
          className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2"
        >
          Start Practicing Now
        </a>
      </div>
    </div>
  );
}

export default Resources;





