"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { User, LogOut, Settings, BarChart3, BookOpen, Home } from "lucide-react";

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/actions/auth.action";

interface HeaderProps {
  user: User | null;
}

const Header = ({ user }: HeaderProps) => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/sign-in");
  };

  return (
    <header className="bg-dark-200/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="ElevatePrep Logo" width={32} height={28} />
            <span className="text-2xl font-bold text-primary-100">ElevatePrep</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-light-100 hover:text-primary-200 transition-colors flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link 
              href="/dashboard" 
              className="text-light-100 hover:text-primary-200 transition-colors flex items-center gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </Link>
            <Link 
              href="/interview" 
              className="text-light-100 hover:text-primary-200 transition-colors flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4" />
              Practice
            </Link>
            <Link 
              href="/resources" 
              className="text-light-100 hover:text-primary-200 transition-colors flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4" />
              Resources
            </Link>
          </nav>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary-200 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-dark-100" />
                  </div>
                  <span className="text-light-100 hidden sm:block">{user.name}</span>
                </div>
                <Button
                  onClick={handleSignOut}
                  variant="ghost"
                  size="sm"
                  className="text-light-100 hover:text-primary-200 hover:bg-dark-300"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Button asChild variant="ghost" className="text-light-100 hover:text-primary-200">
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button asChild className="btn-primary">
                  <Link href="/sign-up">Get Started</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

