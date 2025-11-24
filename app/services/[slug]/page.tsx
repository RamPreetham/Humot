import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Props {
  params: { slug: string };
}

export default async function ServiceDetail({ params }: Props) {
  const service = await prisma.service.findUnique({
    where: { slug: params.slug }
  });

  if (!service) return notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 py-14 space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-primary-blue/80">
          {service.category ?? "Agentic Service"}
        </p>
        <h1 className="text-3xl font-semibold">{service.title}</h1>
        <p className="text-sm text-slate-300 max-w-2xl">{service.shortDesc}</p>
      </header>

      <div className="grid gap-8 md:grid-cols-[1.7fr,1.3fr] items-start">
        <article className="space-y-4 text-sm text-slate-200 leading-relaxed">
          <p>{service.longDesc}</p>
          <p className="text-slate-300">
            We design the full lifecycle of this agent: discovery, design,
            deployment, evaluation, and continuous improvement. Your team stays
            in the loop with clear dashboards and human-in-the-loop controls.
          </p>
          <ul className="text-[13px] text-slate-300 list-disc list-inside space-y-1">
            <li>Integration with your tools (CRMs, ticketing, data warehouses).</li>
            <li>Guardrails, monitoring, and analytics out of the box.</li>
            <li>Regular updates as models and capabilities improve.</li>
          </ul>
        </article>

        <aside className="space-y-4">
          <div className="h-48 rounded-3xl border border-slate-800 bg-slate-900/60 overflow-hidden">
            {service.imageUrl ? (
              <img
                src={service.imageUrl}
                alt={service.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-slate-800 to-slate-900" />
            )}
          </div>
          {service.videoUrl && (
            <div className="rounded-3xl border border-slate-800 overflow-hidden bg-black">
              <video src={service.videoUrl} controls className="w-full h-full" />
            </div>
          )}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-4 text-xs space-y-2">
            <p className="text-sm font-semibold">Ready to implement?</p>
            <p>
              Share your requirements and constraints and we&apos;ll tailor this
              service to your environment.
            </p>
            <Link
              href={`/contact?service=${encodeURIComponent(service.title)}`}
              className="inline-flex items-center justify-center rounded-full bg-primary-blue px-4 py-2 text-xs font-semibold text-slate-900 hover:brightness-110"
            >
              Talk to our team
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
