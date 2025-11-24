import Link from "next/link";

const founderSite = process.env.FOUNDER_SITE || "https://founder-website.example.com";

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-14 space-y-10">
      <section className="text-center space-y-3">
        <h1 className="text-4xl font-semibold">
          About <span className="text-primary-blue">Us</span>
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl mx-auto">
          Pioneering the future of AI automation and agentic engineering. We
          build intelligent systems that work alongside your team to unlock new
          levels of efficiency.
        </p>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p className="text-sm text-slate-300 max-w-3xl mx-auto">
            We&apos;re on a mission to democratize AI technology and empower
            businesses of all sizes to leverage intelligent automation. Our team
            blends deep technical expertise with real-world product experience
            to craft solutions that drive measurable outcomes.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 text-center text-sm text-slate-200">
          <div className="space-y-2">
            <div className="mx-auto h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center">
              🎯
            </div>
            <h3 className="font-semibold">Innovation First</h3>
            <p className="text-xs text-slate-300">
              We push the boundaries of what&apos;s possible with AI
              technologies and modern infrastructure.
            </p>
          </div>
          <div className="space-y-2">
            <div className="mx-auto h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center">
              🤝
            </div>
            <h3 className="font-semibold">Client Success</h3>
            <p className="text-xs text-slate-300">
              Your growth and success are at the heart of everything we build.
            </p>
          </div>
          <div className="space-y-2">
            <div className="mx-auto h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center">
              ⚡
            </div>
            <h3 className="font-semibold">Excellence</h3>
            <p className="text-xs text-slate-300">
              We deliver high-quality, maintainable systems with clear
              documentation and support.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-8 md:grid-cols-[1.4fr,1.3fr] items-start">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 space-y-3">
          <h2 className="text-xl font-semibold">Founder</h2>
          <p className="text-sm font-medium">[Founder Name]</p>
          <p className="text-xs text-slate-300">
            Founder &amp; Lead Agent Engineer, responsible for the overall
            architecture, safety and performance of the platform.
          </p>
          <Link
            href={founderSite}
            target="_blank"
            className="inline-flex items-center justify-center rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-900 hover:bg-white"
          >
            Visit Founder Website
          </Link>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 space-y-3 text-sm text-slate-200">
          <h2 className="text-xl font-semibold">Team</h2>
          <p className="text-xs text-slate-300">
            Our distributed team includes agent engineers, backend developers,
            ML engineers, and product designers. Together we prototype fast and
            then harden those prototypes into reliable, monitored systems.
          </p>
        </div>
      </section>
    </div>
  );
}
