import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function Footer({
  privacy,
  showAll,
}: {
  privacy: boolean;
  showAll: boolean;
}) {
  return (
    <footer className="py-3 px-8 glass border-t border-white/5 text-center">
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-2 opacity-60 mt-5">
          <CheckCircle2 className="w-5 h-5" />
          <span className=" font-heading font-semibold">TodoAI</span>
        </div>
        <p className="text-sm opacity-40">
          © 2026 TodoAI Inc. Crafted with passion for the modern web.
        </p>
        {showAll ? (
          <div className="flex items-center gap-6 opacity-40">
            <Link
              href="/terms"
              className="hover:opacity-100 transition-opacity"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="hover:opacity-100 transition-opacity"
            >
              Privacy
            </Link>
          </div>
        ) : privacy ? (
          <div className="flex items-center gap-6 opacity-40">
            <Link
              href="/terms"
              className="hover:opacity-100 transition-opacity"
            >
              Terms
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-6 opacity-40">
            <Link
              href="/privacy"
              className="hover:opacity-100 transition-opacity"
            >
              Privacy
            </Link>
          </div>
        )}
      </div>
    </footer>
  );
}
