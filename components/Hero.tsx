"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative hero-gradient overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 py-16 grid gap-10 md:grid-cols-2 items-center relative z-10">
        <div className="space-y-4">
          <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/60 px-4 py-1 text-xs text-slate-300">
            Next-Gen AI Solutions
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Transform Your{" "}
            <span className="text-primary-blue drop-shadow-[0_0_12px_rgba(56,189,248,0.8)]">
              Business
            </span>{" "}
            with AI Agents
          </h1>
          <p className="text-sm md:text-base text-slate-300 max-w-xl">
            Revolutionize your workflow with cutting-edge AI automation and
            agentic engineering. We build intelligent systems that work for you
            24/7 and integrate with the tools you already use.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/services"
              className="rounded-full bg-primary-blue px-6 py-3 text-sm font-semibold text-slate-900 shadow-glow-blue hover:brightness-110"
            >
              Explore Services
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-slate-700 bg-slate-950/60 px-6 py-3 text-sm font-semibold text-slate-100 hover:border-primary-blue hover:text-primary-blue"
            >
              Schedule a Call
            </Link>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="relative w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900/40 shadow-glow-blue overflow-hidden">
            <div className="aspect-[16/10] bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800">
              {/* Placeholder visual block for futuristic robot corridor */}
              <div className="h-full w-full flex items-center justify-center">
                <div className="h-40 w-40 rounded-full border border-primary-blue/60 bg-slate-900 shadow-glow-blue" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
