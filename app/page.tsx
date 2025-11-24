import { prisma } from "@/lib/prisma";
import { CursorGlow } from "@/components/CursorGlow";
import { Hero } from "@/components/Hero";
import Link from "next/link";

export default async function HomePage() {
  const [services, updates] = await Promise.all([
    prisma.service.findMany({
      where: { isFeatured: true },
      orderBy: { createdAt: "desc" },
      take: 3
    }),
    prisma.update.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 3
    })
  ]);

  return (
    <div className="relative">
      <CursorGlow />
      <Hero />

      {/* Services preview */}
      <section className="relative max-w-6xl mx-auto px-4 py-14 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-semibold">
            Our <span className="text-primary-blue">Services</span>
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto">
            Comprehensive AI solutions tailored to revolutionize your business
            operations.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.id}
              className="rounded-3xl border border-slate-800 bg-slate-900/40 p-4 flex flex-col"
            >
              <div className="mb-3 h-36 w-full rounded-2xl bg-slate-800/60 overflow-hidden">
                {s.imageUrl ? (
                  <img
                    src={s.imageUrl}
                    alt={s.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-slate-800 to-slate-900" />
                )}
              </div>
              <h3 className="text-lg font-semibold mb-1">{s.title}</h3>
              <p className="text-xs text-slate-300 flex-1">{s.shortDesc}</p>
              <Link
                href={`/services/${s.slug}`}
                className="mt-4 inline-flex items-center justify-center rounded-full bg-primary-blue px-4 py-2 text-xs font-semibold text-slate-900 hover:brightness-110"
              >
                Learn More
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/services"
            className="text-xs text-primary-blue hover:underline"
          >
            View all services →
          </Link>
        </div>
      </section>

      {/* Updates */}
      <section className="relative max-w-6xl mx-auto px-4 pb-16 space-y-4">
        <h2 className="text-2xl font-semibold">Latest Updates</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {updates.map((u) => (
            <div
              key={u.id}
              className="rounded-3xl border border-slate-800 bg-slate-900/60 p-4"
            >
              <p className="text-xs text-slate-400 mb-1">
                {u.createdAt.toDateString()}
              </p>
              <p className="text-sm font-semibold mb-1">{u.title}</p>
              <p className="text-xs text-slate-300">{u.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
