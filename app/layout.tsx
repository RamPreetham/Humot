import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { CursorGlow } from "@/components/CursorGlow";
import ClientBackground from "./ClientBackground";



export const metadata: Metadata = {
  title: "AI Agentic Platorm",
  description: "Futuristic AI agentic automation and engineering studio."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-bg-deep text-slate-100">
        <ClientBackground/>
        <CursorGlow />
        <div className="min-h-screen flex flex-col">
          <header className="sticky top-0 z-40 border-b border-slate-800/60 bg-bg-deep/70 backdrop-blur">
            <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <span className="h-8 w-8 rounded-2xl bg-primary-blue shadow-glow-blue" />
                <span className="font-semibold tracking-wide text-lg">
                  HUMOT AI
                </span>
              </Link>
              <div className="flex items-center gap-6 text-sm text-slate-300">
                <Link href="/" className="hover:text-primary-blue">
                  Home
                </Link>
                <Link href="/services" className="hover:text-primary-blue">
                  Services
                </Link>
                <Link href="/about" className="hover:text-primary-blue">
                  About Us
                </Link>
                <Link href="/contact" className="hover:text-primary-blue">
                  Contact
                </Link>
                <Link
                  href="/contact"
                  className="ml-2 rounded-full bg-primary-blue px-4 py-2 text-sm font-semibold text-slate-900 shadow-glow-blue hover:brightness-110"
                >
                  Get Started
                </Link>
              </div>
            </nav>
          </header>

          <main className="flex-1">{children}</main>

          <footer className="border-t border-slate-800/60 py-6 text-xs text-slate-400">
            <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
              <span>© {new Date().getFullYear()} AI Agentic Platform</span>
              <span>Agentic automation, engineered for business.</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
