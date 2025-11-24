import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const services = await prisma.service.findMany({
    orderBy: { createdAt: "desc" }
  });
  return NextResponse.json(services);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title, slug, shortDesc, longDesc, imageUrl, videoUrl, category, isFeatured } =
    body;

  if (!title || !slug || !shortDesc || !longDesc) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const service = await prisma.service.create({
    data: {
      title,
      slug,
      shortDesc,
      longDesc,
      imageUrl: imageUrl || null,
      videoUrl: videoUrl || null,
      category: category || null,
      isFeatured: Boolean(isFeatured)
    }
  });

  return NextResponse.json(service, { status: 201 });
}
