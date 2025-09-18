import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, Star, Users, Zap, Target } from "lucide-react";

import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";

import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";

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
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
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
              <Button asChild className="btn-secondary text-lg px-8 py-4">
                <Link href="#features">Learn More</Link>
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
      <section id="features" className="py-20 bg-dark-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose ElevatePrep?
            </h2>
            <p className="text-xl text-light-100 max-w-2xl mx-auto">
              Our AI-powered platform provides everything you need to ace your next interview
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-dark-100" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">AI-Powered Practice</h3>
              <p className="text-light-100">
                Practice with intelligent AI interviewers that adapt to your skill level and provide realistic scenarios.
              </p>
            </div>
            
            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-dark-100" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Real-Time Feedback</h3>
              <p className="text-light-100">
                Get instant, detailed feedback on your responses, communication skills, and technical knowledge.
              </p>
            </div>
            
            <div className="card p-8 text-center">
              <div className="w-16 h-16 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-dark-100" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Personalized Coaching</h3>
              <p className="text-light-100">
                Receive tailored recommendations and improvement strategies based on your performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-primary-200 mb-2">10K+</div>
              <div className="text-xl text-light-100">Interviews Completed</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary-200 mb-2">95%</div>
              <div className="text-xl text-light-100">Success Rate</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary-200 mb-2">4.9</div>
              <div className="text-xl text-light-100 flex items-center justify-center gap-2">
                <Star className="h-6 w-6 fill-primary-200" />
                User Rating
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-200/20 to-primary-100/20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-xl text-light-100 mb-8">
            Join thousands of professionals who have elevated their interview skills with ElevatePrep
          </p>
          <Button asChild className="btn-primary text-lg px-8 py-4">
            <Link href="/interview">
              Get Started for Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* User's Interviews Section - Only show if user is logged in */}
      {user ? (
        <>
          <section className="flex flex-col gap-6 mt-8">
            <h2>Your Recent Interviews</h2>
            <div className="interviews-section">
              {hasPastInterviews ? (
                userInterviews?.slice(0, 3).map((interview) => (
                  <InterviewCard
                    key={interview.id}
                    userId={user.id}
                    interviewId={interview.id}
                    role={interview.role}
                    type={interview.type}
                    techstack={interview.techstack}
                    createdAt={interview.createdAt}
                  />
                ))
              ) : (
                <div className="card p-8 text-center w-full">
                  <p className="text-light-100 mb-4">You haven&apos;t taken any interviews yet</p>
                  <Button asChild className="btn-primary">
                    <Link href="/interview">Start Your First Interview</Link>
                  </Button>
                </div>
              )}
            </div>
          </section>

          <section className="flex flex-col gap-6 mt-8">
            <h2>Available Practice Interviews</h2>
            <div className="interviews-section">
              {hasUpcomingInterviews ? (
                allInterview?.slice(0, 3).map((interview) => (
                  <InterviewCard
                    key={interview.id}
                    userId={user.id}
                    interviewId={interview.id}
                    role={interview.role}
                    type={interview.type}
                    techstack={interview.techstack}
                    createdAt={interview.createdAt}
                  />
                ))
              ) : (
                <div className="card p-8 text-center w-full">
                  <p className="text-light-100">There are no interviews available</p>
                </div>
              )}
            </div>
          </section>
        </>
      ) : (
        /* Show sign up CTA for non-authenticated users */
        <section className="py-20 bg-gradient-to-r from-primary-200/20 to-primary-100/20">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Your Interview Journey?
            </h2>
            <p className="text-xl text-light-100 mb-8">
              Join thousands of professionals who have elevated their interview skills with ElevatePrep
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-primary text-lg px-8 py-4">
                <Link href="/sign-up">Get Started for Free</Link>
              </Button>
              <Button asChild className="btn-secondary text-lg px-8 py-4">
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Home;
