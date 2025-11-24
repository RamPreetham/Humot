const { PrismaClient } = require("@prisma/client");


const prisma = new PrismaClient();

async function main() {
  await prisma.service.deleteMany();
  await prisma.update.deleteMany();

  await prisma.service.createMany({
    data: [
      {
        title: "AI Automation",
        slug: "ai-automation",
        shortDesc: "Streamline processes with intelligent workflows that adapt to your business.",
        longDesc:
          "Our AI Automation service builds end-to-end pipelines that observe your data, make decisions, and trigger actions across your tools. We design safe guardrails, human-in-the-loop review, and deep integrations with your CRMs, ticketing systems, and internal platforms.",
        category: "Automation",
        imageUrl: "/images/ai-automation.jpg",
        isFeatured: true
      },
      {
        title: "Custom AI Agents",
        slug: "custom-ai-agents",
        shortDesc: "Bespoke agents engineered around your stack, data, and constraints.",
        longDesc:
          "We design and deploy custom AI agents that can understand context from your proprietary data, call internal APIs, and collaborate with your team in tools like Slack or email. From research copilots to operations assistants, each agent is tuned to your workflows.",
        category: "Agentic Engineering",
        imageUrl: "/images/custom-agents.jpg",
        isFeatured: true
      },
      {
        title: "Agentic Engineering",
        slug: "agentic-engineering",
        shortDesc: "Architecture, orchestration, and monitoring for sophisticated agent systems.",
        longDesc:
          "Beyond single agents, we architect multi-agent systems with orchestration, planning, evaluation, and observability. We handle deployment, scaling, and continuous improvement so your agents stay aligned with your objectives.",
        category: "Architecture",
        imageUrl: "/images/agentic-engineering.jpg",
        isFeatured: true
      }
    ]
  });

  await prisma.update.createMany({
    data: [
      {
        title: "Platform v1 Launch",
        body: "We launched the first version of our agentic platform with support for autonomous workflows, service catalog, and collaboration portal."
      },
      {
        title: "New Integration: HubSpot & Notion",
        body: "Agents can now sync notes, deals, and tasks across HubSpot and Notion workspaces, closing the loop between sales and operations."
      }
    ]
  });

  console.log("Database seeded.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
