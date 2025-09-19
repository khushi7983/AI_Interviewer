"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What kind of interviews can I practice?",
    answer:
      "You can practice behavioral, technical, and mixed-style interviews tailored to various roles and industries. Our AI adapts to your chosen focus.",
  },
  {
    question: "How accurate is the AI feedback?",
    answer:
      "Our AI is powered by advanced models to provide highly accurate and detailed feedback on communication, problem-solving, technical knowledge, and more.",
  },
  {
    question: "Can I download my interview feedback?",
    answer:
      "Yes, you can easily download your comprehensive feedback reports as PDF documents for offline review and progress tracking.",
  },
  {
    question: "Is there a cost to use ElevatePrep?",
    answer:
      "You can get started with a free tier that offers essential practice features. Premium plans are available for more advanced features and unlimited sessions.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg sm:text-xl text-light-100">
            Everything you need to know about ElevatePrep
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl bg-dark-200 border border-border hover:border-primary-200/40 transition-all duration-300 shadow-lg"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-5 text-left"
              >
                <span className="text-lg font-medium text-white">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-6 h-6 text-primary-200" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-light-100" />
                )}
              </button>

              <div
                className={`px-6 pb-5 text-light-100 text-base leading-relaxed transition-all duration-300 ${
                  openIndex === index
                    ? "max-h-40 opacity-100"
                    : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
