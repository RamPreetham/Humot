import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, role, requirement, budget } = body;

    if (!name || !email || !requirement) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await prisma.contactSubmission.create({
      data: {
        name,
        email,
        company: company || null,
        role: role || null,
        requirement,
        budget: budget || null
      }
    });

    if (
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.SMTP_FROM &&
      process.env.CONTACT_TO
    ) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: process.env.CONTACT_TO,
        subject: `New collaboration request from ${name}`,
        text: `
Name: ${name}
Email: ${email}
Company: ${company || "-"}
Role: ${role || "-"}

Requirement:
${requirement}

Budget / timeline:
${budget || "-"}
        `
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact API error", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
