import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const updates = await prisma.update.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" }
  });
  return NextResponse.json(updates);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title, body: content, published } = body;

  if (!title || !content) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const update = await prisma.update.create({
    data: {
      title,
      body: content,
      published: published ?? true
    }
  });

  return NextResponse.json(update, { status: 201 });
}
