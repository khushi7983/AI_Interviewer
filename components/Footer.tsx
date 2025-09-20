"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Linkedin, Mail, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark-200 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Image src="/logo.svg" alt="ElevatePrep Logo" width={32} height={28} />
              <span className="text-2xl font-bold text-primary-100">ElevatePrep</span>
            </div>
            <p className="text-light-100 mb-6 max-w-md">
              Elevate your interview skills with AI-powered practice sessions, 
              real-time feedback, and actionable insights. Master your next interview.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/khushi7983" 
                className="text-light-100 hover:text-primary-200 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://x.com/khushii__panwar" 
                className="text-light-100 hover:text-primary-200 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/khushi-panwar-139323256/" 
                className="text-light-100 hover:text-primary-200 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="mailto:khushipanwargzb@gmail.com" 
                className="text-light-100 hover:text-primary-200 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-light-100 hover:text-primary-200 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-light-100 hover:text-primary-200 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/interview" className="text-light-100 hover:text-primary-200 transition-colors">
                  Practice Interview
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-light-100 hover:text-primary-200 transition-colors">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-light-100 hover:text-primary-200 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-light-100 hover:text-primary-200 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-light-100 hover:text-primary-200 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-light-100 text-sm">
            © 2025 ElevatePrep. All rights reserved. Made with ❤️ by Khushi Panwar.
          </p>
          <button
            onClick={scrollToTop}
            className="mt-4 sm:mt-0 flex items-center gap-2 text-light-100 hover:text-primary-200 transition-colors"
          >
            <ArrowUp className="h-4 w-4" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
