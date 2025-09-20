"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, X } from "lucide-react";
import { db } from "@/firebase/client";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("success"); // 'success' or 'error'

  const topics = [
    "Technical Support",
    "Account Issues",
    "Billing Questions",
    "Feature Requests",
    "Bug Reports",
    "General Feedback",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "contacts"), {
        ...formData,
        createdAt: serverTimestamp(),
      });

      setPopupMessage("Message Sent Successfully\nThanks for reaching out! We'll get back to you shortly.");
      setPopupType("success");
      setIsPopupOpen(true);

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);

      setPopupMessage("Message Failed, Please Try Again\nSomething went wrong. Please try again later.");
      setPopupType("error");
      setIsPopupOpen(true);
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    // Optionally retry logic for error can be added here
    if (popupType === "error") {
      console.log("Retry logic can be implemented here");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
        <p className="text-xl text-light-100">
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="card p-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Your first name"
                className="w-full px-4 py-3 bg-dark-200 border border-border rounded-lg text-light-100"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Your last name"
                className="w-full px-4 py-3 bg-dark-200 border border-border rounded-lg text-light-100"
              />
            </div>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className="w-full px-4 py-3 bg-dark-200 border border-border rounded-lg text-light-100"
            />

            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-dark-200 border border-border rounded-lg text-light-100"
            >
              <option value="">Select a topic</option>
              {topics.map((topic, i) => (
                <option key={i} value={topic}>
                  {topic}
                </option>
              ))}
            </select>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              placeholder="Tell us how we can help you..."
              className="w-full px-4 py-3 bg-dark-200 border border-border rounded-lg text-light-100 resize-none"
            ></textarea>

            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Send className="h-5 w-5" />
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Get in Touch</h2>
          <div className="flex items-start gap-4 p-4 bg-dark-200 rounded-lg">
            <Mail className="h-6 w-6 text-primary-200" />
            <div>
              <h3 className="text-white font-medium">Email Us</h3>
              <a href="mailto:khushipanwargzb@gmail.com" className="text-primary-200">
                khushipanwargzb@gmail.com
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-dark-200 rounded-lg">
            <Phone className="h-6 w-6 text-primary-200" />
            <div>
              <h3 className="text-white font-medium">Call Us</h3>
              <a href="tel:+91 8595996585" className="text-primary-200">
                +91 8595996585
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 bg-dark-200 rounded-lg">
            <MapPin className="h-6 w-6 text-primary-200" />
            <div>
              <h3 className="text-white font-medium">Visit Us</h3>
              <p className="text-light-100 text-sm">
                Ghaziabad, Uttar Pradesh, India
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {isPopupOpen && (
        <dialog open className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-dark-300 to-dark-400 border-2 rounded-xl p-6 w-full max-w-md shadow-2xl animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">
                {popupType === "success" ? "Success!" : "Error!"}
              </h3>
              <button
                onClick={closePopup}
                className="text-light-100 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <p className="text-light-100 mb-6">{popupMessage.split("\n").map((line, i) => (
              <span key={i}>{line}<br /></span>
            ))}</p>
            {popupType === "error" && (
              <button
                onClick={closePopup}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                Retry
              </button>
            )}
          </div>
        </dialog>
      )}
    </div>
  );
}

// Animation CSS (add to your global stylesheet, e.g., globals.css)
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 0.3s ease-out;
  }
`;
// Ensure this is included in your CSS file or use a <style> tag if needed

export default Contact;