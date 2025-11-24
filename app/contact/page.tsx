"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const [servicePrefill, setServicePrefill] = useState<string>("");

  useEffect(() => {
    const s = searchParams.get("service");
    if (s) setServicePrefill(`Interested in: ${s}\n\n`);
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const formData = new FormData(e.currentTarget);
    const body = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      e.currentTarget.reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-14 space-y-10">
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-4 text-center text-sm">
          <div className="mb-2 text-2xl">✉️</div>
          <p className="font-semibold">Email Us</p>
          <p className="text-xs text-slate-300">contact@aiagentic.com</p>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-4 text-center text-sm">
          <div className="mb-2 text-2xl">📞</div>
          <p className="font-semibold">Call Us</p>
          <p className="text-xs text-slate-300">+1 (555) 123-4567</p>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-4 text-center text-sm">
          <div className="mb-2 text-2xl">📍</div>
          <p className="font-semibold">Visit Us</p>
          <p className="text-xs text-slate-300">San Francisco, CA</p>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold">Send Us Your Requirements</h1>
          <p className="text-xs text-slate-300 max-w-xl mx-auto">
            Tell us about your project and we&apos;ll get back to you with a tailored solution.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs text-slate-300">Your Name *</label>
              <input
                name="name"
                required
                className="w-full rounded-2xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm outline-none focus:border-primary-blue"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-300">Email Address *</label>
              <input
                name="email"
                type="email"
                required
                className="w-full rounded-2xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm outline-none focus:border-primary-blue"
                placeholder="john@company.com"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs text-slate-300">Company Name</label>
              <input
                name="company"
                className="w-full rounded-2xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm outline-none focus:border-primary-blue"
                placeholder="Your Company Inc."
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-300">Your Role</label>
              <input
                name="role"
                className="w-full rounded-2xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm outline-none focus:border-primary-blue"
                placeholder="Head of Operations"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-300">Project Requirements *</label>
            <textarea
              name="requirement"
              required
              rows={5}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm outline-none focus:border-primary-blue"
              defaultValue={servicePrefill}
              placeholder="Tell us about your project goals, timeline, and specific requirements..."
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-300">Budget / Timeline</label>
            <input
              name="budget"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm outline-none focus:border-primary-blue"
              placeholder="e.g., 3 months, $25k–$40k"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-primary-blue px-6 py-3 text-sm font-semibold text-slate-900 shadow-glow-blue hover:brightness-110 disabled:opacity-60"
          >
            {status === "loading" ? "Submitting..." : "Submit Inquiry"}
          </button>

          {status === "success" && (
            <p className="text-xs text-emerald-400 pt-2">
              Thanks! Your inquiry has been received.
            </p>
          )}
          {status === "error" && (
            <p className="text-xs text-red-400 pt-2">{error}</p>
          )}
        </form>
      </section>
    </div>
  );
}
