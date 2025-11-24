import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-14 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-semibold">
          Our <span className="text-primary-blue">Services</span>
        </h1>
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
            <ul className="mt-3 text-[11px] text-slate-400 space-y-1">
              <li>• Custom workflows & integrations</li>
              <li>• Secure deployment & monitoring</li>
              <li>• Ongoing optimization</li>
            </ul>
            <Link
              href={`/services/${s.slug}`}
              className="mt-4 inline-flex items-center justify-center rounded-full bg-primary-blue px-4 py-2 text-xs font-semibold text-slate-900 hover:brightness-110"
            >
              Learn More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
