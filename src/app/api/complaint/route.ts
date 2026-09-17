import { NextRequest, NextResponse } from "next/server";
import { resend, NOTIFY_EMAIL, FROM_EMAIL } from "@/lib/resend";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, orderRef, complaint } = body ?? {};

    // Basic validation
    if (!name || !email || !complaint) {
      return NextResponse.json(
        { success: false, error: "Name, email, and complaint details are required." },
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
        <h2 style="color:#b91c1c;">New Complaint Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
        ${orderRef ? `<p><strong>Order/Project Reference:</strong> ${escapeHtml(orderRef)}</p>` : ""}
        <p><strong>Complaint:</strong></p>
        <p>${escapeHtml(complaint).replace(/\n/g, "<br/>")}</p>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      replyTo: email,
      subject: `⚠️ New Complaint from ${name}`,
      html,
    });

    if (error) {
      console.error("Resend error (complaint):", error);
      return NextResponse.json(
        { success: false, error: "Failed to submit complaint. Please try again later." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Complaint API error:", err);
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