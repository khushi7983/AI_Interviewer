import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Zap,
  Target,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";

import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";
import FAQSection from "@/components/ui/FAQSection";

async function Home() {
  const user = await getCurrentUser();

  // Only fetch data if user is authenticated
  let userInterviews = null;
  let allInterview = null;
  let hasPastInterviews = false;
  let hasUpcomingInterviews = false;

  if (user?.id) {
    [userInterviews, allInterview] = await Promise.all([
      getInterviewsByUserId(user.id),
      getLatestInterviews({ userId: user.id }),
    ]);

    hasPastInterviews = (userInterviews?.length || 0) > 0;
    hasUpcomingInterviews = (allInterview?.length || 0) > 0;
  }

  console.log("User Interviews:", userInterviews);
  console.log("All Interviews:", allInterview);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
       <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Elevate Your
              <span className="bg-gradient-to-r from-primary-200 to-primary-100 bg-clip-text text-transparent">
                {" "}Interview Skills
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-light-100 mb-8 max-w-3xl mx-auto">
              Master your next interview with AI-powered practice sessions, 
              real-time feedback, and personalized coaching.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-primary text-lg px-8 py-4">
                <Link href="/interview">
                  Start Practicing Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-200/10 via-transparent to-primary-100/10"></div>
        </div>
      </section>

  {/* Features Section */}
<section id="features" className="py-20 lg:py-24 mt-10">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="text-center mb-16 ">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
        Why Choose ElevatePrep?
      </h2>
      <p className="text-lg sm:text-xl text-light-100 max-w-3xl mx-auto leading-relaxed">
        Our AI-powered platform provides everything you need to ace your
        next interview
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
      {[
        {
          icon: Zap,
          title: "AI-Powered Practice",
          description:
            "Practice with intelligent AI interviewers that adapt to your skill level and provide realistic scenarios.",
        },
        {
          icon: Target,
          title: "Real-Time Feedback",
          description:
            "Get instant, detailed feedback on your responses, communication skills, and technical knowledge.",
        },
        {
          icon: Users,
          title: "Actionable Insights",
          description:
            "Gain clear, actionable insights and recommendations to continuously improve your performance.",
        },
      ].map((feature, index) => (
        <div
          key={index}
          className="flex flex-col items-center p-8 card  text-left hover:scale-105 bg-dark-200 rounded-lg shadow-sm shadow-primary-200/30 transition-all duration-300"
        >
          <div className="w-20 h-20 bg-primary-200 rounded-full flex items-center justify-center shadow-lg mb-6">
            <feature.icon className="h-10 w-10 text-dark-100" />
          </div>
          <h3 className="text-2xl font-semibold text-white mb-4 text-center">
            {feature.title}
          </h3>
          <p className="text-light-100 text-center leading-relaxed max-w-sm">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
      {/* User's Interviews Section - Only show if user is logged in */}
      {user ? (
        <>
          <section className="py-20 lg:py-24 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12 ">
                 <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                  Your Recent Interviews
                </h2>
                <p className="text-lg text-light-100">
                  Track your progress and review past performances
                </p>
              </div>
              
              <div className="interviews-section">
                {hasPastInterviews ? (
                  <div className="grid gap-20 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {userInterviews
                      ?.slice(0, 3)
                      .map((interview) => (
                        <InterviewCard
                          key={interview.id}
                          userId={user.id}
                          interviewId={interview.id}
                          role={interview.role}
                          type={interview.type}
                          techstack={interview.techstack}
                          createdAt={interview.createdAt}
                        />
                      ))}
                  </div>
                ) : (
                  <div className="card p-12 text-center w-7xl">
                    <div className="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Zap className="h-8 w-8 text-dark-100" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-4">
                      Ready to Start Your First Interview?
                    </h3>
                    <p className="text-light-100 mb-8 max-w-md mx-auto">
                      You haven&apos;t taken any interviews yet. Take your first practice interview to get started!
                    </p>
                    <Button asChild className="btn-primary text-lg px-8 py-4">
                      <Link href="/interview">Start Your First Interview</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-20 lg:py-24 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                  What Our Users Say
                </h2>
                <p className="text-lg sm:text-xl text-light-100 max-w-3xl mx-auto">
                  Hear from professionals who transformed their interview skills
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    name: "Jane Doe",
                    role: "Software Engineer",
                    feedback: "ElevatePrep transformed my interview approach. The AI feedback was incredibly accurate and helped me pinpoint areas I never considered.",
                  },
                  {
                    name: "John Smith",
                    role: "Product Manager",
                    feedback: "The personalized coaching made all the difference. I felt much more confident and prepared for my technical interviews.",
                  },
                  {
                    name: "Emily White",
                    role: "Data Scientist",
                    feedback: "I highly recommend ElevatePrep to anyone serious about their career. It's an invaluable tool for interview preparation.",
                  },
                ].map((testimonial, index) => (
                  <div
                    key={index}
                    className="card p-8 text-left shadow-sm shadow-primary-200/30 transition-all duration-300 hover:scale-105 "
                  >
                    <div className="flex gap-1 mb-6">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className="h-5 w-5 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                    </div>
                    <p className="text-light-100 mb-6 leading-relaxed text-lg">
                      "{testimonial.feedback}"
                    </p>
                    <div className="border-t border-dark-200 pt-4">
                      <p className="text-white font-semibold text-lg">
                        {testimonial.name}
                      </p>
                      <p className="text-primary-200 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <FAQSection />

          {/* Final CTA Section */}
          <section className="py-20 lg:py-24 bg-gradient-to-br from-primary-200/10 via-transparent to-primary-100/10">
            <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Ace Your Next Interview?
              </h2>
              <p className="text-lg sm:text-xl text-light-100 mb-10 leading-relaxed">
                Join thousands of professionals who have elevated their interview skills with ElevatePrep
              </p>
              <Button asChild className="btn-primary text-lg px-10 py-4 min-w-[250px]">
                <Link href="/interview">
                  Get Started for Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
             {/* Background Pattern */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-200/10 via-transparent to-primary-100/10"></div>
        </div>
          </section>
        </>
      ) : (
        /* Show sign up CTA for non-authenticated users */
        <section className="py-20 lg:py-24 bg-gradient-to-r from-primary-200/20 to-primary-100/20">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Start Your Interview Journey?
            </h2>
            <p className="text-lg sm:text-xl text-light-100 mb-10 leading-relaxed">
              Join thousands of professionals who have elevated their interview skills with ElevatePrep
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild className="btn-primary text-lg px-8 py-4 min-w-[200px]">
                <Link href="/sign-up">Get Started for Free</Link>
              </Button>
              <Button asChild className="btn-secondary text-lg px-8 py-4 min-w-[200px]">
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default Home;