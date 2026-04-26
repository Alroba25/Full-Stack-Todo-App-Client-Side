import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, Eye, FileText } from "lucide-react";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-x-hidden">
      {/* Mesh Gradient Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[120px] -z-10" />

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
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg opacity-60">Last updated: April 25, 2026</p>
        </div>

        <div className="space-y-12">
          {/* Section 1 */}
          <section className="glass-card p-8 rounded-3xl border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Lock className="w-24 h-24" />
            </div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 text-sm">
                01
              </span>
              Information We Collect
            </h2>
            <div className="space-y-4 opacity-70 leading-relaxed">
              <p>
                We collect information you provide directly to us when you
                create an account, create a task, or communicate with us. This
                may include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name and email address</li>
                <li>Account credentials</li>
                <li>Content you create (tasks, descriptions, notes)</li>
                <li>Communication preferences</li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section className="glass-card p-8 rounded-3xl border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Eye className="w-24 h-24" />
            </div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 text-sm">
                02
              </span>
              How We Use Information
            </h2>
            <div className="space-y-4 opacity-70 leading-relaxed">
              <p>
                We use the information we collect to provide, maintain, and
                improve our services, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Processing your registration and managing your account</li>
                <li>Syncing your tasks across devices</li>
                <li>Sending technical notices and security alerts</li>
                <li>Personalizing your experience with AI features</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="glass-card p-8 rounded-3xl border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <FileText className="w-24 h-24" />
            </div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm">
                03
              </span>
              Data Security
            </h2>
            <p className="opacity-70 leading-relaxed">
              We take reasonable measures to help protect information about you
              from loss, theft, misuse and unauthorized access, disclosure,
              alteration and destruction. Your data is encrypted in transit and
              at rest using industry-standard protocols.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer privacy={true} showAll={false} />
    </div>
  );
}
