// app/complaint/page.tsx
"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function ComplaintPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    orderRef: "", // Service taken
    complaint: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/complaint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      let data: { success?: boolean; error?: string } = {};
      try {
        data = await res.json();
      } catch {
        // Response wasn't JSON (e.g. server returned an HTML error page)
      }

      if (!res.ok || !data.success) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", phone: "", orderRef: "", complaint: "" });
    } catch (err) {
      console.error(err);
      setErrorMsg("Network error. Please try again later.");
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen w-full bg-black text-white grid grid-cols-1 md:grid-cols-[5fr_3fr] pt-24">
      {/* Left: Video (70%) */}
      <div className="relative h-[45vh] md:h-screen w-full">
        <video
          src="/complaint.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      {/* Right: Form (30%) */}
      <div className="flex items-center justify-center px-6 py-12 md:py-0">
        <div className="w-full max-w-sm">
          {status === "success" ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-white/20">
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                  <path
                    d="M4 12.5L9.5 18L20 6"
                    stroke="white"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-light mb-2">Complaint Received</h2>
              <p className="text-sm text-white/50 leading-relaxed">
                Thank you for bringing this to our attention. Our team has
                logged your complaint and will follow up with you shortly.
              </p>
            </div>
          ) : (
            <>
              <p className="uppercase tracking-[0.3em] text-xs text-white/40 mb-3">
                Raise a Concern
              </p>
              <h1 className="text-3xl md:text-4xl font-light mb-2">
                File a Complaint
              </h1>
              <p className="text-sm text-white/40 mb-8">
                Tell us what went wrong — we&apos;ll make it right.
              </p>

              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8 space-y-5"
              >
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-white/35">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full bg-transparent border-b border-white/15 py-2 text-sm placeholder:text-white/25 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-white/35">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    className="w-full bg-transparent border-b border-white/15 py-2 text-sm placeholder:text-white/25 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-white/35">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone number"
                    className="w-full bg-transparent border-b border-white/15 py-2 text-sm placeholder:text-white/25 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-white/35">
                    Service
                  </label>
                  <input
                    type="text"
                    name="orderRef"
                    value={form.orderRef}
                    onChange={handleChange}
                    placeholder="Service taken"
                    className="w-full bg-transparent border-b border-white/15 py-2 text-sm placeholder:text-white/25 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider text-white/35">
                    Complaint
                  </label>
                  <textarea
                    name="complaint"
                    required
                    rows={3}
                    value={form.complaint}
                    onChange={handleChange}
                    placeholder="Describe your complaint"
                    className="w-full bg-transparent border-b border-white/15 py-2 text-sm placeholder:text-white/25 focus:outline-none focus:border-white transition-colors resize-none"
                  />
                </div>

                {status === "error" && (
                  <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full mt-2 bg-white text-black text-sm font-medium py-3 rounded-full hover:bg-white/85 disabled:opacity-50 transition-colors"
                >
                  {status === "loading" ? "Submitting..." : "Submit Complaint"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}