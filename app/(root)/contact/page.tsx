import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";

async function Contact() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us an email and we'll respond within 24 hours",
      value: "support@elevateprep.com",
      action: "mailto:support@elevateprep.com"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak with our support team (Mon-Fri, 9AM-6PM EST)",
      value: "+1 (555) 123-4567",
      action: "tel:+15551234567"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Our headquarters location",
      value: "123 Tech Street, San Francisco, CA 94105",
      action: "#"
    }
  ];

  const topics = [
    "Technical Support",
    "Account Issues",
    "Billing Questions",
    "Feature Requests",
    "Bug Reports",
    "General Feedback"
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
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
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-light-100 text-sm font-medium mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-dark-200 border border-border rounded-lg text-light-100 placeholder-light-100 focus:outline-none focus:ring-2 focus:ring-primary-200"
                  placeholder="Your first name"
                />
              </div>
              <div>
                <label className="block text-light-100 text-sm font-medium mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-dark-200 border border-border rounded-lg text-light-100 placeholder-light-100 focus:outline-none focus:ring-2 focus:ring-primary-200"
                  placeholder="Your last name"
                />
              </div>
            </div>

            <div>
              <label className="block text-light-100 text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-dark-200 border border-border rounded-lg text-light-100 placeholder-light-100 focus:outline-none focus:ring-2 focus:ring-primary-200"
                placeholder="your.email@example.com"
                defaultValue={user.email}
              />
            </div>

            <div>
              <label className="block text-light-100 text-sm font-medium mb-2">
                Subject
              </label>
              <select className="w-full px-4 py-3 bg-dark-200 border border-border rounded-lg text-light-100 focus:outline-none focus:ring-2 focus:ring-primary-200">
                <option value="">Select a topic</option>
                {topics.map((topic, index) => (
                  <option key={index} value={topic}>{topic}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-light-100 text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                rows={6}
                className="w-full px-4 py-3 bg-dark-200 border border-border rounded-lg text-light-100 placeholder-light-100 focus:outline-none focus:ring-2 focus:ring-primary-200 resize-none"
                placeholder="Tell us how we can help you..."
              ></textarea>
            </div>

            <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
              <Send className="h-5 w-5" />
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
          {/* Contact Methods */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">Get in Touch</h2>
            {contactInfo.map((info, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-dark-200 rounded-lg">
                <div className="p-3 bg-primary-200/10 rounded-lg">
                  <info.icon className="h-6 w-6 text-primary-200" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium mb-1">{info.title}</h3>
                  <p className="text-light-100 text-sm mb-2">{info.description}</p>
                  <a 
                    href={info.action}
                    className="text-primary-200 hover:text-primary-100 transition-colors"
                  >
                    {info.value}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Live Chat */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-400/10 rounded-lg">
                <MessageCircle className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">Live Chat</h3>
            </div>
            <p className="text-light-100 mb-4">
              Chat with our support team in real-time for immediate assistance.
            </p>
            <button className="btn-secondary w-full flex items-center justify-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Start Live Chat
            </button>
          </div>

          {/* Response Time */}
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Response Times</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-light-100">Live Chat</span>
                <span className="text-primary-200 font-medium">Immediate</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-light-100">Email</span>
                <span className="text-primary-200 font-medium">Within 24 hours</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-light-100">Phone</span>
                <span className="text-primary-200 font-medium">Mon-Fri, 9AM-6PM EST</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;

