import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactPayload = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

function isValidPayload(payload: Partial<ContactPayload>) {
  return (
    typeof payload.name === "string" &&
    payload.name.trim().length > 0 &&
    typeof payload.phone === "string" &&
    payload.phone.trim().length > 0 &&
    typeof payload.email === "string" &&
    payload.email.includes("@") &&
    typeof payload.message === "string" &&
    payload.message.trim().length > 0
  );
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Partial<ContactPayload>;

    if (!isValidPayload(payload)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      CONTACT_TO,
      CONTACT_FROM,
    } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
      return NextResponse.json(
        { error: "Email configuration is missing" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const fromAddress = CONTACT_FROM || payload.email?.trim() || SMTP_USER;

    await transporter.sendMail({
      from: fromAddress,
      to: CONTACT_TO,
      replyTo: payload.email?.trim(),
      subject: `Portfolio contact: ${payload.name?.trim()}`,
      text: [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        `Phone: ${payload.phone}`,
        "",
        payload.message || "",
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to send message" },
      { status: 500 }
    );
  }
}
