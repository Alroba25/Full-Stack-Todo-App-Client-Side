import Link from "next/link";
import {
  ArrowLeft,
  Scale,
  Gavel,
  AlertCircle,
  CheckSquare,
} from "lucide-react";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-x-hidden">
      {/* Mesh Gradient Background Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] -z-10" />

      {/* Header */}
      <header className="mt-5 h-20 px-8 flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2 group">
          <ArrowLeft className="w-5 h-5 opacity-60 group-hover:opacity-100 group-hover:-translate-x-1 transition-all" />
          <span className="font-heading font-bold text-xl tracking-tight">
            Back to Home
          </span>
        </Link>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
            <Scale className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Terms of Service
          </h1>
          <p className="text-lg opacity-60">Last updated: April 25, 2026</p>
        </div>

        <div className="space-y-12">
          {/* Section 1 */}
          <section className="glass-card p-8 rounded-3xl border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Gavel className="w-24 h-24" />
            </div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 text-sm">
                01
              </span>
              Acceptance of Terms
            </h2>
            <p className="opacity-70 leading-relaxed">
              By accessing or using TodoAI, you agree to be bound by these Terms
              of Service. If you do not agree to all of these terms, do not use
              our services. We reserve the right to modify these terms at any
              time, and your continued use of the service signifies acceptance
              of any changes.
            </p>
          </section>

          {/* Section 2 */}
          <section className="glass-card p-8 rounded-3xl border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <CheckSquare className="w-24 h-24" />
            </div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 text-sm">
                02
              </span>
              User Responsibilities
            </h2>
            <div className="space-y-4 opacity-70 leading-relaxed">
              <p>When using TodoAI, you are responsible for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Maintaining the confidentiality of your account credentials
                </li>
                <li>All activities that occur under your account</li>
                <li>
                  Ensuring your content does not violate any laws or rights
                </li>
                <li>
                  Using the service in a manner that doesn't disrupt other users
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="glass-card p-8 rounded-3xl border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <AlertCircle className="w-24 h-24" />
            </div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400 text-sm">
                03
              </span>
              Limitation of Liability
            </h2>
            <p className="opacity-70 leading-relaxed">
              TodoAI is provided "as is" without any warranties. In no event
              shall TodoAI be liable for any damages arising out of the use or
              inability to use our services, even if we have been notified of
              the possibility of such damage.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer privacy={false} showAll={false} />
    </div>
  );
}
