import { getCurrentUser } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";

async function Privacy() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="card p-8">
        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-light-100 mb-6">
            <strong>Last updated:</strong> {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
          <p className="text-light-100 mb-4">
            We collect information you provide directly to us, such as when you create an account, 
            use our services, or contact us for support.
          </p>

          <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
          <p className="text-light-100 mb-4">
            We use the information we collect to provide, maintain, and improve our services, 
            process transactions, and communicate with you.
          </p>

          <h2 className="text-2xl font-semibold text-white mb-4">3. Information Sharing</h2>
          <p className="text-light-100 mb-4">
            We do not sell, trade, or otherwise transfer your personal information to third parties 
            without your consent, except as described in this policy.
          </p>

          <h2 className="text-2xl font-semibold text-white mb-4">4. Data Security</h2>
          <p className="text-light-100 mb-4">
            We implement appropriate security measures to protect your personal information against 
            unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2 className="text-2xl font-semibold text-white mb-4">5. Contact Us</h2>
          <p className="text-light-100 mb-4">
            If you have any questions about this Privacy Policy, please contact us at 
            <a href="mailto:privacy@elevateprep.com" className="text-primary-200 hover:text-primary-100">
              privacy@elevateprep.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Privacy;




