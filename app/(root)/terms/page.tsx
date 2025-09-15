import { getCurrentUser } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";

async function Terms() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="card p-8">
        <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-light-100 mb-6">
            <strong>Last updated:</strong> {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
          <p className="text-light-100 mb-4">
            By accessing and using ElevatePrep, you accept and agree to be bound by the terms 
            and provision of this agreement.
          </p>

          <h2 className="text-2xl font-semibold text-white mb-4">2. Use License</h2>
          <p className="text-light-100 mb-4">
            Permission is granted to temporarily use ElevatePrep for personal, non-commercial 
            transitory viewing only. This is the grant of a license, not a transfer of title.
          </p>

          <h2 className="text-2xl font-semibold text-white mb-4">3. User Accounts</h2>
          <p className="text-light-100 mb-4">
            You are responsible for maintaining the confidentiality of your account and password 
            and for restricting access to your computer.
          </p>

          <h2 className="text-2xl font-semibold text-white mb-4">4. Prohibited Uses</h2>
          <p className="text-light-100 mb-4">
            You may not use our service for any unlawful purpose or to solicit others to perform 
            unlawful acts.
          </p>

          <h2 className="text-2xl font-semibold text-white mb-4">5. Disclaimer</h2>
          <p className="text-light-100 mb-4">
            The information on this website is provided on an "as is" basis. To the fullest extent 
            permitted by law, this Company excludes all representations, warranties, conditions 
            and terms.
          </p>

          <h2 className="text-2xl font-semibold text-white mb-4">6. Contact Information</h2>
          <p className="text-light-100 mb-4">
            If you have any questions about these Terms of Service, please contact us at 
            <a href="mailto:legal@elevateprep.com" className="text-primary-200 hover:text-primary-100">
              legal@elevateprep.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Terms;

