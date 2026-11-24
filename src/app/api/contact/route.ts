import { NextRequest, NextResponse } from "next/server";
import { resend, NOTIFY_EMAIL, FROM_EMAIL } from "@/lib/resend";

// Matches the payload sent from ContactPage.tsx:
// {
//   name, email, phone, company,
//   service,      // comma-separated string (kept for backward compatibility)
//   services,     // string[] (multi-select)
//   categories,   // string[]
//   budgetRange, timeframe, details
// }

const MAX_SERVICES = 30;

const toCleanList = (value: unknown): string[] =>
  Array.isArray(value)
    ? value
        .filter((v): v is string => typeof v === "string")
        .map((v) => v.trim())
        .filter(Boolean)
        .slice(0, MAX_SERVICES)
    : [];

const toStr = (value: unknown, max = 5000): string =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name = toStr(body?.name, 200);
    const email = toStr(body?.email, 320);
    const phone = toStr(body?.phone, 40);
    const company = toStr(body?.company, 200);
    const budgetRange = toStr(body?.budgetRange, 100);
    const timeframe = toStr(body?.timeframe, 100);
    const details = toStr(body?.details, 5000);

    // Multi-select services: prefer the array, fall back to the legacy string.
    let services = toCleanList(body?.services);
    if (services.length === 0) {
      const legacy = toStr(body?.service, 1000);
      if (legacy) {
        services = legacy
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
          .slice(0, MAX_SERVICES);
      }
    }
    const categories = toCleanList(body?.categories);

    // Required: name, email, details. Everything else is optional.
    if (!name || !email || !details) {
      return NextResponse.json(
        {
          success: false,
          error: "Name, email, and project details are required.",
        },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    if (phone && phone.replace(/\D/g, "").length < 8) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide a valid phone number or leave it empty.",
        },
        { status: 400 },
      );
    }

    const phoneHref = phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : "";

    const servicesHtml =
      services.length > 0
        ? `
        <p style="margin: 16px 0 6px;"><strong>Services of interest (${services.length}):</strong></p>
        <ul style="margin: 0; padding-left: 20px;">
          ${services.map((s) => `<li>${escapeHtml(s)}</li>`).join("")}
        </ul>`
        : "";

    const html = `
      <div style="font-family: sans-serif; line-height: 1.6; color: #111;">
        <h2 style="margin-bottom: 12px;">New Project Inquiry</h2>
        <p style="margin: 4px 0;"><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p style="margin: 4px 0;"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        ${
          phone
            ? `<p style="margin: 4px 0;"><strong>Phone / WhatsApp:</strong> <a href="${escapeHtml(phoneHref)}">${escapeHtml(phone)}</a></p>`
            : ""
        }
        ${company ? `<p style="margin: 4px 0;"><strong>Company:</strong> ${escapeHtml(company)}</p>` : ""}
        ${
          categories.length
            ? `<p style="margin: 4px 0;"><strong>Categories:</strong> ${escapeHtml(categories.join(", "))}</p>`
            : ""
        }
        ${servicesHtml}
        ${budgetRange ? `<p style="margin: 16px 0 4px;"><strong>Budget:</strong> ${escapeHtml(budgetRange)}</p>` : ""}
        ${timeframe ? `<p style="margin: 4px 0;"><strong>Timeline:</strong> ${escapeHtml(timeframe)}</p>` : ""}
        <p style="margin: 16px 0 6px;"><strong>Project details:</strong></p>
        <p style="margin: 0;">${escapeHtml(details).replace(/\n/g, "<br/>")}</p>
      </div>
    `;

    // Subject: first service, plus a count if there are more.
    const subjectService =
      services.length === 0
        ? ""
        : services.length === 1
          ? services[0]
          : `${services[0]} +${services.length - 1} more`;

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      replyTo: email,
      subject: `New Project Inquiry from ${name}${subjectService ? ` — ${subjectService}` : ""}`,
      html,
    });

    if (error) {
      console.error("Resend error (contact):", error);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to send your inquiry. Please try again later.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong. Please try again later.",
      },
      { status: 500 },
    );
  }
}

function escapeHtml(str: string) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
