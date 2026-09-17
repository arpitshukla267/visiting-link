import { NextRequest, NextResponse } from "next/server";
import { resend, NOTIFY_EMAIL, FROM_EMAIL } from "@/lib/resend";

// Matches the ProjectInquiry shape sent from ContactPage.tsx's formData:
// { name, email, company, service, budgetRange, timeframe, details }

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      company,
      service,
      budgetRange,
      timeframe,
      details,
    } = body ?? {};

    // Only name, email, details are `required` on the actual <input>/<textarea> in the form.
    // company, service, budgetRange, timeframe are optional / pre-filled, so don't hard-require them.
    if (!name || !email || !details) {
      return NextResponse.json(
        { success: false, error: "Name, email, and project details are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const html = `
      <div style="font-family: sans-serif; line-height: 1.6;">
        <h2>New Project Inquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ""}
        ${service ? `<p><strong>Service of interest:</strong> ${escapeHtml(service)}</p>` : ""}
        ${budgetRange ? `<p><strong>Budget:</strong> ${escapeHtml(budgetRange)}</p>` : ""}
        ${timeframe ? `<p><strong>Timeline:</strong> ${escapeHtml(timeframe)}</p>` : ""}
        <p><strong>Project details:</strong></p>
        <p>${escapeHtml(details).replace(/\n/g, "<br/>")}</p>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      replyTo: email,
      subject: `New Project Inquiry from ${name}${service ? ` — ${service}` : ""}`,
      html,
    });

    if (error) {
      console.error("Resend error (contact):", error);
      return NextResponse.json(
        { success: false, error: "Failed to send your inquiry. Please try again later." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again later." },
      { status: 500 }
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