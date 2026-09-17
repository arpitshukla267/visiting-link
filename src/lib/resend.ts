import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  console.warn(
    "⚠️  RESEND_API_KEY is not set — email sending will fail at runtime. " +
      "Add it to .env.local to fix this."
  );
}

export const resend = new Resend(process.env.RESEND_API_KEY ?? "");

// Central place to control where all form submissions land
export const NOTIFY_EMAIL = "info.visitinglink@gmail.com";

// Use Resend's default sender until you verify your own domain in Resend.
// Once visitinglink.com is verified in Resend, switch this to something like
// "VisitingLink <noreply@visitinglink.com>"
export const FROM_EMAIL = "VisitingLink <onboarding@resend.dev>";