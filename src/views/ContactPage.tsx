"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Loader2,
  Mail,
  ShieldCheck,
  X,
  Zap,
} from "lucide-react";
import { ServiceItem } from "../types";
import { SERVICES_DATA } from "../data/content";

/* -------------------------------------------------------------------------- */
/*  Shared exports (other files import these, keep them as-is)                 */
/* -------------------------------------------------------------------------- */

export const ONLINE_STORE_CATEGORY: ServiceItem = {
  id: "online-store",
  number: "05",
  title: "Get Your Online Store",
  tagline: "Own Your eCommerce Store & Admin Panel",
  description:
    "Launch your ready-to-sell eCommerce store on your own server with no monthly platform fees and zero commission on sales.",
  detailedScope: [
    "Self-hosted online store with complete source code handover",
    "Custom admin panel to manage products, inventory, orders, and coupons",
    "Fast checkout with UPI, Cards, NetBanking and COD support",
    "Automated customer alerts with SMS and WhatsApp business notifications",
  ],
  deliverables: [
    "Online Store Launch Package",
    "Online Store - Starter",
    "Online Store - Growth",
    "Online Store - Enterprise",
    "Online Store Planning",
    "Custom Store Development",
  ],
  focusAreas: [
    "Self-Hosted eCommerce",
    "Admin Dashboard",
    "Payment Gateway",
    "Order Management",
  ],
};

export const ALL_CATEGORIES: ServiceItem[] = SERVICES_DATA.some(
  (s) => s.id === "online-store",
)
  ? SERVICES_DATA
  : [...SERVICES_DATA, ONLINE_STORE_CATEGORY];

export const isOnlineStoreText = (text?: string | null): boolean => {
  if (!text) return false;
  const t = text
    .toLowerCase()
    .replace(/[\s\-_]+/g, " ")
    .trim();
  return (
    t === "get your online store" ||
    t === "online store" ||
    t === "store" ||
    t === "online-store" ||
    t.includes("online store") ||
    t.includes("store launch") ||
    t.includes("store planning")
  );
};

/* -------------------------------------------------------------------------- */
/*  Constants                                                                  */
/* -------------------------------------------------------------------------- */

interface ContactPageProps {
  onNavigateHome: () => void;
  initialService?: string;
  initialCategory?: string;
}

const CONTACT_EMAIL = "info.visitinglink@gmail.com";
const CONTACT_PHONE_DISPLAY = "+91 92365 53585";
const CONTACT_PHONE_E164 = "919236553585";
const WHATSAPP_URL = `https://wa.me/${CONTACT_PHONE_E164}`;
const CONTACT_API_ROUTE = "/api/contact";

const BUDGET_OPTIONS = [
  "₹25,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000 – ₹3,00,000",
  "₹3,00,000+",
  "Not sure yet",
];

const TIMEFRAME_OPTIONS = [
  "Immediate (< 1 mo)",
  "1 – 2 Months",
  "2 – 4 Months",
  "Flexible",
];

const STEPS = [
  { title: "Services", hint: "What do you need?" },
  { title: "Project", hint: "Tell us the details" },
  { title: "Contact", hint: "How can we reach you?" },
];

const MIN_DETAILS = 20;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const keyOf = (catId: string, svc: string) => `${catId}::${svc}`;
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Small UI pieces                                                            */
/* -------------------------------------------------------------------------- */

const inputBase =
  "w-full rounded-xl border bg-white px-4 py-3.5 text-[15px] text-[#111111] placeholder:text-[#A3A3A3] transition focus:outline-none focus:ring-4";
const inputOk =
  "border-[#E2E2E2] hover:border-[#BDBDBD] focus:border-[#111111] focus:ring-black/5";
const inputErr = "border-red-400 focus:border-red-500 focus:ring-red-500/10";

function Field({
  label,
  htmlFor,
  required,
  optional,
  error,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={htmlFor} className="text-sm font-medium text-[#222222]">
          {label}
          {required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
        {optional && <span className="text-xs text-[#9A9A9A]">Optional</span>}
      </div>
      {children}
      {error ? (
        <p role="alert" className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-[#8A8A8A]">{hint}</p>
      ) : null}
    </div>
  );
}

function CheckBox({ checked }: { checked: boolean }) {
  return (
    <span
      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
        checked
          ? "border-white bg-white"
          : "border-[#C9C9C9] bg-white group-hover:border-[#111111]"
      }`}
    >
      <AnimatePresence initial={false}>
        {checked && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex"
          >
            <Check className="h-3.5 w-3.5 text-[#111111]" strokeWidth={3} />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

function Radio({ checked }: { checked: boolean }) {
  return (
    <span
      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
        checked
          ? "border-white"
          : "border-[#C9C9C9] group-hover:border-[#111111]"
      }`}
    >
      {checked && <span className="h-2 w-2 rounded-full bg-white" />}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Helpers to resolve incoming props -> category + preselected services       */
/* -------------------------------------------------------------------------- */

function resolveInitial(initialService?: string, initialCategory?: string) {
  const storeCat =
    ALL_CATEGORIES.find((c) => c.id === "online-store") ??
    ONLINE_STORE_CATEGORY;
  const storeRequested =
    isOnlineStoreText(initialCategory) || isOnlineStoreText(initialService);

  let cat: ServiceItem | undefined;
  if (storeRequested) {
    cat = storeCat;
  } else if (initialCategory) {
    cat = ALL_CATEGORIES.find(
      (c) =>
        c.title.toLowerCase() === initialCategory.toLowerCase() ||
        c.id.toLowerCase() === initialCategory.toLowerCase(),
    );
  }

  const keys: string[] = [];
  if (initialService) {
    const owner = ALL_CATEGORIES.find((c) =>
      c.deliverables.some(
        (d) => d.toLowerCase() === initialService.toLowerCase(),
      ),
    );
    if (owner) {
      const svc = owner.deliverables.find(
        (d) => d.toLowerCase() === initialService.toLowerCase(),
      )!;
      keys.push(keyOf(owner.id, svc));
      cat = cat ?? owner;
    } else if (storeRequested) {
      keys.push(keyOf(storeCat.id, storeCat.deliverables[0]));
    }
  } else if (storeRequested) {
    keys.push(keyOf(storeCat.id, storeCat.deliverables[0]));
  }

  return { cat: cat ?? ALL_CATEGORIES[0], keys };
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigateHome,
  initialService,
  initialCategory,
}) => {
  const initial = useMemo(
    () => resolveInitial(initialService, initialCategory),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const [step, setStep] = useState(0);
  const [activeCatId, setActiveCatId] = useState(initial.cat.id);
  const [selected, setSelected] = useState<string[]>(initial.keys);

  const [budgetRange, setBudgetRange] = useState("");
  const [timeframe, setTimeframe] = useState("1 – 2 Months");
  const [details, setDetails] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [consent, setConsent] = useState(true);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);

  /* Re-apply when the parent passes new initial props (client-side nav) */
  useEffect(() => {
    if (!initialService && !initialCategory) return;
    const next = resolveInitial(initialService, initialCategory);
    setActiveCatId(next.cat.id);
    if (next.keys.length) {
      setSelected((prev) => Array.from(new Set([...prev, ...next.keys])));
    }
  }, [initialService, initialCategory]);

  /* Opened from the Online Store page: preselect the store category */
  useEffect(() => {
    try {
      const fromStore =
        sessionStorage.getItem("last_source_page") === "online-store" ||
        document.referrer.toLowerCase().includes("online-store");
      if (fromStore) {
        sessionStorage.removeItem("last_source_page");
        if (!initialService || isOnlineStoreText(initialService)) {
          const storeCat =
            ALL_CATEGORIES.find((c) => c.id === "online-store") ??
            ONLINE_STORE_CATEGORY;
          setActiveCatId(storeCat.id);
          setSelected((prev) =>
            prev.length ? prev : [keyOf(storeCat.id, storeCat.deliverables[0])],
          );
        }
      }
    } catch {}
  }, [initialService]);

  const activeCat =
    ALL_CATEGORIES.find((c) => c.id === activeCatId) ?? ALL_CATEGORIES[0];

  const selectedItems = useMemo(
    () =>
      selected
        .map((k) => {
          const [catId, ...rest] = k.split("::");
          const svc = rest.join("::");
          const cat = ALL_CATEGORIES.find((c) => c.id === catId);
          return cat ? { key: k, catId, catTitle: cat.title, svc } : null;
        })
        .filter(Boolean) as {
        key: string;
        catId: string;
        catTitle: string;
        svc: string;
      }[],
    [selected],
  );

  const countFor = (catId: string) =>
    selected.filter((k) => k.startsWith(`${catId}::`)).length;

  const toggle = (key: string) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
    setErrors((e) => ({ ...e, services: "" }));
  };

  const allInActiveSelected =
    activeCat.deliverables.length > 0 &&
    activeCat.deliverables.every((d) =>
      selected.includes(keyOf(activeCat.id, d)),
    );

  const toggleAllInActive = () => {
    const keys = activeCat.deliverables.map((d) => keyOf(activeCat.id, d));
    setSelected((prev) =>
      allInActiveSelected
        ? prev.filter((k) => !keys.includes(k))
        : Array.from(new Set([...prev, ...keys])),
    );
    setErrors((e) => ({ ...e, services: "" }));
  };

  /* ------------------------------ validation ------------------------------ */

  const validate = (s: number) => {
    const next: Record<string, string> = {};
    if (s === 0 && selected.length === 0) {
      next.services = "Select at least one service to continue.";
    }
    if (s === 1 && details.trim().length < MIN_DETAILS) {
      next.details = `Add a few more details (at least ${MIN_DETAILS} characters) so we can prepare a useful reply.`;
    }
    if (s === 2) {
      if (!name.trim()) next.name = "Enter your name.";
      if (!email.trim()) next.email = "Enter your email address.";
      else if (!isEmail(email)) next.email = "Enter a valid email address.";
      if (phone.trim() && phone.replace(/\D/g, "").length < 8)
        next.phone = "Enter a valid phone number or leave it empty.";
      if (!consent)
        next.consent = "Please allow us to contact you about this inquiry.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const scrollToCard = () => {
    if (!cardRef.current) return;
    const top =
      cardRef.current.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const goNext = () => {
    if (!validate(step)) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    scrollToCard();
  };

  const goBack = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
    scrollToCard();
  };

  const goToStep = (target: number) => {
    if (target === step) return;
    if (target < step) {
      setErrors({});
      setStep(target);
      return;
    }
    // moving forward: validate each step on the way
    for (let i = step; i < target; i++) {
      if (!validate(i)) {
        setStep(i);
        return;
      }
    }
    setStep(target);
  };

  /* ------------------------------- submit --------------------------------- */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < STEPS.length - 1) {
      goNext();
      return;
    }
    if (!validate(0)) return setStep(0);
    if (!validate(1)) return setStep(1);
    if (!validate(2)) return;

    setErrorMsg(null);
    setIsSubmitting(true);

    const services = selectedItems.map((i) => i.svc);
    const categories = Array.from(
      new Set(selectedItems.map((i) => i.catTitle)),
    );

    try {
      const res = await fetch(CONTACT_API_ROUTE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          company: company.trim(),
          // `service` stays a string so the existing API route keeps working
          service: services.join(", "),
          services,
          categories,
          budgetRange,
          timeframe,
          details: details.trim(),
        }),
      });

      let payload: { success?: boolean; error?: string; id?: string } = {};
      try {
        payload = await res.json();
      } catch {
        /* non-JSON body, handled below */
      }

      if (!res.ok || !payload.success) {
        throw new Error(
          payload.error || "Something went wrong. Please try again.",
        );
      }

      setReference(payload.id ?? null);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Network error. Check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setStep(0);
    setErrors({});
    setErrorMsg(null);
    setReference(null);
    setSelected(initial.keys);
    setActiveCatId(initial.cat.id);
    setBudgetRange("");
    setTimeframe("1 – 2 Months");
    setDetails("");
    setName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setConsent(true);
  };

  /* -------------------------------- render -------------------------------- */

  return (
    <div className="min-h-screen w-full bg-[#F7F7F5] text-[#111111]">
      {/* Hero band */}
      <section className="relative overflow-hidden bg-[#0A0A0C] pb-24 pt-28 text-white md:pb-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse at 70% 0%, black 0%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 70% 0%, black 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-5 md:px-12">
          <button
            type="button"
            onClick={onNavigateHome}
            className="mb-10 inline-flex cursor-pointer items-center gap-2 text-sm text-white/55 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
              {submitted
                ? "Inquiry received"
                : "Tell us what you want to build"}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-400 md:text-lg">
              {submitted
                ? `We will reply to ${email} within one business day.`
                : "Pick the services you need, share a few details and we will come back with a clear plan, scope and timeline."}
            </p>

            {!submitted && (
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-neutral-300">
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-neutral-500" />
                  Reply within 24 hours
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-neutral-500" />
                  Your details stay confidential
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-neutral-500" />
                  No obligation, no spam
                </li>
              </ul>
            )}
          </motion.div>
        </div>
      </section>

      {submitted ? (
        /* ------------------------------ success ------------------------------ */
        <section className="relative z-10 -mt-12 pb-24 md:-mt-16">
          <div className="mx-auto max-w-2xl px-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="rounded-3xl border border-[#E8E8E4] bg-white p-8 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)] md:p-12"
            >
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#111111]"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                  <motion.path
                    d="M4 12.5L9.5 18L20 6"
                    stroke="#fff"
                    strokeWidth={2.2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                  />
                </svg>
              </motion.div>

              <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
                Thanks, {name.trim().split(" ")[0]}. We have your inquiry.
              </h2>
              <p className="mt-3 leading-relaxed text-[#666666]">
                Our team will review it and reply to{" "}
                <span className="font-medium text-[#111111]">{email}</span>{" "}
                within 24 hours.
                {reference && (
                  <>
                    {" "}
                    Your reference is{" "}
                    <span className="font-medium text-[#111111]">
                      {reference}
                    </span>
                    .
                  </>
                )}
              </p>

              <div className="mt-8 rounded-2xl bg-[#F7F7F5] p-5">
                <p className="mb-3 text-sm font-medium">What you asked for</p>
                <div className="flex flex-wrap gap-2">
                  {selectedItems.map((i) => (
                    <span
                      key={i.key}
                      className="rounded-full border border-[#E2E2E2] bg-white px-3 py-1 text-xs text-[#333333]"
                    >
                      {i.svc}
                    </span>
                  ))}
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-[#8A8A8A]">Budget</dt>
                    <dd className="mt-0.5 font-medium">
                      {budgetRange || "Not specified"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[#8A8A8A]">Timeline</dt>
                    <dd className="mt-0.5 font-medium">{timeframe}</dd>
                  </div>
                </dl>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="cursor-pointer rounded-xl bg-[#111111] px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#2A2A2A]"
                >
                  Back to home
                </button>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E2E2E2] px-7 py-3.5 text-sm font-medium transition-colors hover:border-[#111111]"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
                <button
                  type="button"
                  onClick={resetForm}
                  className="cursor-pointer rounded-xl px-4 py-3.5 text-sm font-medium text-[#666666] transition-colors hover:text-[#111111]"
                >
                  Send another inquiry
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      ) : (
        /* ------------------------------- form -------------------------------- */
        <section className="relative z-10 -mt-12 pb-24 md:-mt-16">
          <div className="mx-auto max-w-7xl px-4 md:px-12">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10">
              {/* Main card */}
              <motion.div
                ref={cardRef}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
                className="rounded-3xl border border-[#E8E8E4] bg-white shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)]"
              >
                {/* Stepper */}
                <nav
                  aria-label="Inquiry steps"
                  className="border-b border-[#EFEFEA] px-5 py-5 md:px-10 md:py-6"
                >
                  <ol className="flex items-center">
                    {STEPS.map((s, i) => {
                      const done = i < step;
                      const current = i === step;
                      return (
                        <React.Fragment key={s.title}>
                          <li>
                            <button
                              type="button"
                              onClick={() => goToStep(i)}
                              aria-current={current ? "step" : undefined}
                              className="group flex cursor-pointer items-center gap-3 text-left"
                            >
                              <span
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-medium transition-all ${
                                  done
                                    ? "border-[#111111] bg-[#111111] text-white"
                                    : current
                                      ? "border-[#111111] bg-white text-[#111111] ring-4 ring-black/5"
                                      : "border-[#DADAD6] bg-white text-[#9A9A9A] group-hover:border-[#111111]"
                                }`}
                              >
                                {done ? (
                                  <Check className="h-4 w-4" strokeWidth={3} />
                                ) : (
                                  i + 1
                                )}
                              </span>
                              <span className="hidden sm:block">
                                <span
                                  className={`block text-sm font-medium ${
                                    current || done
                                      ? "text-[#111111]"
                                      : "text-[#8A8A8A]"
                                  }`}
                                >
                                  {s.title}
                                </span>
                                <span className="block text-xs text-[#9A9A9A]">
                                  {s.hint}
                                </span>
                              </span>
                            </button>
                          </li>
                          {i < STEPS.length - 1 && (
                            <li
                              aria-hidden
                              className="mx-3 h-px flex-1 bg-[#E5E5E0] sm:mx-5"
                            >
                              <motion.div
                                className="h-px bg-[#111111]"
                                initial={false}
                                animate={{ width: i < step ? "100%" : "0%" }}
                                transition={{ duration: 0.4, ease: EASE }}
                              />
                            </li>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </ol>
                </nav>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="px-5 py-8 md:px-10 md:py-10">
                    <AnimatePresence mode="wait" initial={false}>
                      {/* ------------------------- Step 1 ------------------------- */}
                      {step === 0 && (
                        <motion.div
                          key="step-0"
                          initial={{ opacity: 0, x: 24 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -24 }}
                          transition={{ duration: 0.3, ease: EASE }}
                        >
                          <h2 className="text-2xl font-medium tracking-tight">
                            Which services do you need?
                          </h2>
                          <p className="mt-1.5 text-sm text-[#777777]">
                            You can pick more than one, across categories.
                          </p>

                          {/* Category picker: choose which category's services to show */}
                          <div
                            role="tablist"
                            aria-label="Service categories"
                            className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3"
                          >
                            {ALL_CATEGORIES.map((cat) => {
                              const count = countFor(cat.id);
                              const active = cat.id === activeCat.id;
                              return (
                                <button
                                  type="button"
                                  role="tab"
                                  aria-selected={active}
                                  key={cat.id}
                                  onClick={() => setActiveCatId(cat.id)}
                                  className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black/10 ${
                                    active
                                      ? "border-[#111111] bg-[#111111] text-white shadow-[0_10px_24px_-12px_rgba(0,0,0,0.55)]"
                                      : "border-[#E2E2E2] bg-white text-[#222222] hover:border-[#111111]"
                                  }`}
                                >
                                  <span className="leading-snug">
                                    {cat.title}
                                  </span>
                                  {count > 0 && (
                                    <span
                                      className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-semibold ${
                                        active
                                          ? "bg-white text-[#111111]"
                                          : "bg-[#111111] text-white"
                                      }`}
                                    >
                                      {count}
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {/* Category blurb + select all */}
                          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                            <p className="max-w-xl text-sm leading-relaxed text-[#666666]">
                              {activeCat.description}
                            </p>
                            <button
                              type="button"
                              onClick={toggleAllInActive}
                              className="shrink-0 cursor-pointer text-sm font-medium text-[#111111] underline decoration-[#BDBDBD] underline-offset-4 transition-colors hover:decoration-[#111111]"
                            >
                              {allInActiveSelected ? "Clear all" : "Select all"}
                            </button>
                          </div>

                          {/* Service checkboxes */}
                          <div
                            role="group"
                            aria-label={`${activeCat.title} services`}
                            className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2"
                          >
                            {activeCat.deliverables.map((svc) => {
                              const k = keyOf(activeCat.id, svc);
                              const checked = selected.includes(k);
                              return (
                                <button
                                  type="button"
                                  role="checkbox"
                                  aria-checked={checked}
                                  key={k}
                                  onClick={() => toggle(k)}
                                  className={`group flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-left text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black/10 ${
                                    checked
                                      ? "border-[#111111] bg-[#111111] text-white shadow-[0_10px_24px_-12px_rgba(0,0,0,0.55)]"
                                      : "border-[#E2E2E2] bg-white text-[#222222] hover:border-[#111111]"
                                  }`}
                                >
                                  <CheckBox checked={checked} />
                                  <span className="leading-snug">{svc}</span>
                                </button>
                              );
                            })}
                          </div>

                          {errors.services && (
                            <p
                              role="alert"
                              className="mt-4 text-sm text-red-600"
                            >
                              {errors.services}
                            </p>
                          )}

                          {/* Selected chips */}
                          <div className="mt-8 rounded-2xl bg-[#F7F7F5] p-4 md:p-5">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">
                                Selected ({selectedItems.length})
                              </p>
                              {selectedItems.length > 0 && (
                                <button
                                  type="button"
                                  onClick={() => setSelected([])}
                                  className="cursor-pointer text-xs text-[#777777] transition-colors hover:text-[#111111]"
                                >
                                  Clear all
                                </button>
                              )}
                            </div>
                            {selectedItems.length === 0 ? (
                              <p className="mt-2 text-sm text-[#8A8A8A]">
                                Nothing selected yet. Choose services above.
                              </p>
                            ) : (
                              <div className="mt-3 flex flex-wrap gap-2">
                                <AnimatePresence initial={false}>
                                  {selectedItems.map((i) => (
                                    <motion.span
                                      layout
                                      key={i.key}
                                      initial={{ opacity: 0, scale: 0.85 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      exit={{ opacity: 0, scale: 0.85 }}
                                      transition={{ duration: 0.18 }}
                                      className="inline-flex items-center gap-1.5 rounded-full border border-[#E2E2E2] bg-white py-1 pl-3 pr-1.5 text-xs text-[#333333]"
                                    >
                                      {i.svc}
                                      <button
                                        type="button"
                                        aria-label={`Remove ${i.svc}`}
                                        onClick={() => toggle(i.key)}
                                        className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full text-[#888888] transition-colors hover:bg-[#111111] hover:text-white"
                                      >
                                        <X className="h-3 w-3" />
                                      </button>
                                    </motion.span>
                                  ))}
                                </AnimatePresence>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}

                      {/* ------------------------- Step 2 ------------------------- */}
                      {step === 1 && (
                        <motion.div
                          key="step-1"
                          initial={{ opacity: 0, x: 24 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -24 }}
                          transition={{ duration: 0.3, ease: EASE }}
                          className="space-y-9"
                        >
                          <div>
                            <h2 className="text-2xl font-medium tracking-tight">
                              Tell us about the project
                            </h2>
                            <p className="mt-1.5 text-sm text-[#777777]">
                              Rough answers are fine. We will refine them with
                              you.
                            </p>
                          </div>

                          <fieldset>
                            <legend className="mb-3 text-sm font-medium text-[#222222]">
                              Budget{" "}
                              <span className="ml-1 text-xs font-normal text-[#9A9A9A]">
                                Optional
                              </span>
                            </legend>
                            <div
                              role="radiogroup"
                              aria-label="Budget"
                              className="grid grid-cols-1 gap-3 sm:grid-cols-2"
                            >
                              {BUDGET_OPTIONS.map((opt) => {
                                const checked = budgetRange === opt;
                                return (
                                  <button
                                    type="button"
                                    role="radio"
                                    aria-checked={checked}
                                    key={opt}
                                    onClick={() =>
                                      setBudgetRange(checked ? "" : opt)
                                    }
                                    className={`group flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black/10 ${
                                      checked
                                        ? "border-[#111111] bg-[#111111] text-white"
                                        : "border-[#E2E2E2] text-[#333333] hover:border-[#111111]"
                                    }`}
                                  >
                                    <Radio checked={checked} />
                                    {opt}
                                  </button>
                                );
                              })}
                            </div>
                          </fieldset>

                          <fieldset>
                            <legend className="mb-3 text-sm font-medium text-[#222222]">
                              When do you want to start?
                            </legend>
                            <div
                              role="radiogroup"
                              aria-label="Timeline"
                              className="flex flex-wrap gap-2"
                            >
                              {TIMEFRAME_OPTIONS.map((opt) => {
                                const checked = timeframe === opt;
                                return (
                                  <button
                                    type="button"
                                    role="radio"
                                    aria-checked={checked}
                                    key={opt}
                                    onClick={() => setTimeframe(opt)}
                                    className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black/10 ${
                                      checked
                                        ? "border-[#111111] bg-[#111111] text-white"
                                        : "border-[#E2E2E2] text-[#444444] hover:border-[#111111]"
                                    }`}
                                  >
                                    {opt}
                                  </button>
                                );
                              })}
                            </div>
                          </fieldset>

                          <Field
                            label="Project details"
                            htmlFor="details"
                            required
                            error={errors.details}
                            hint="Goals, what you have today, and what a good result looks like."
                          >
                            <textarea
                              id="details"
                              rows={6}
                              value={details}
                              onChange={(e) => {
                                setDetails(e.target.value);
                                if (errors.details)
                                  setErrors((er) => ({ ...er, details: "" }));
                              }}
                              placeholder="Example: We sell handmade rugs offline and want an online store with UPI checkout and an admin panel to manage orders."
                              className={`${inputBase} resize-none leading-relaxed ${
                                errors.details ? inputErr : inputOk
                              }`}
                            />
                            <div className="mt-1.5 text-right text-xs text-[#9A9A9A]">
                              {details.trim().length} characters
                            </div>
                          </Field>
                        </motion.div>
                      )}

                      {/* ------------------------- Step 3 ------------------------- */}
                      {step === 2 && (
                        <motion.div
                          key="step-2"
                          initial={{ opacity: 0, x: 24 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -24 }}
                          transition={{ duration: 0.3, ease: EASE }}
                          className="space-y-7"
                        >
                          <div>
                            <h2 className="text-2xl font-medium tracking-tight">
                              How can we reach you?
                            </h2>
                            <p className="mt-1.5 text-sm text-[#777777]">
                              We only use these details to reply to this
                              inquiry.
                            </p>
                          </div>

                          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <Field
                              label="Full name"
                              htmlFor="name"
                              required
                              error={errors.name}
                            >
                              <input
                                id="name"
                                type="text"
                                autoComplete="name"
                                value={name}
                                onChange={(e) => {
                                  setName(e.target.value);
                                  if (errors.name)
                                    setErrors((er) => ({ ...er, name: "" }));
                                }}
                                placeholder="Your name"
                                className={`${inputBase} ${
                                  errors.name ? inputErr : inputOk
                                }`}
                              />
                            </Field>

                            <Field
                              label="Email address"
                              htmlFor="email"
                              required
                              error={errors.email}
                            >
                              <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => {
                                  setEmail(e.target.value);
                                  if (errors.email)
                                    setErrors((er) => ({ ...er, email: "" }));
                                }}
                                placeholder="you@company.com"
                                className={`${inputBase} ${
                                  errors.email ? inputErr : inputOk
                                }`}
                              />
                            </Field>

                            <Field
                              label="Phone or WhatsApp"
                              htmlFor="phone"
                              optional
                              error={errors.phone}
                            >
                              <input
                                id="phone"
                                type="tel"
                                autoComplete="tel"
                                value={phone}
                                onChange={(e) => {
                                  setPhone(e.target.value);
                                  if (errors.phone)
                                    setErrors((er) => ({ ...er, phone: "" }));
                                }}
                                placeholder="+91 98765 43210"
                                className={`${inputBase} ${
                                  errors.phone ? inputErr : inputOk
                                }`}
                              />
                            </Field>

                            <Field label="Company" htmlFor="company" optional>
                              <input
                                id="company"
                                type="text"
                                autoComplete="organization"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                placeholder="Company or brand name"
                                className={`${inputBase} ${inputOk}`}
                              />
                            </Field>
                          </div>

                          {/* Review */}
                          <div className="rounded-2xl bg-[#F7F7F5] p-5">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">
                                Review your request
                              </p>
                              <button
                                type="button"
                                onClick={() => goToStep(0)}
                                className="cursor-pointer text-xs text-[#777777] underline underline-offset-4 transition-colors hover:text-[#111111]"
                              >
                                Edit
                              </button>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {selectedItems.map((i) => (
                                <span
                                  key={i.key}
                                  className="rounded-full border border-[#E2E2E2] bg-white px-3 py-1 text-xs text-[#333333]"
                                >
                                  {i.svc}
                                </span>
                              ))}
                            </div>
                            <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <dt className="text-[#8A8A8A]">Budget</dt>
                                <dd className="mt-0.5 font-medium">
                                  {budgetRange || "Not specified"}
                                </dd>
                              </div>
                              <div>
                                <dt className="text-[#8A8A8A]">Timeline</dt>
                                <dd className="mt-0.5 font-medium">
                                  {timeframe}
                                </dd>
                              </div>
                            </dl>
                          </div>

                          <div>
                            <button
                              type="button"
                              role="checkbox"
                              aria-checked={consent}
                              onClick={() => {
                                setConsent((c) => !c);
                                setErrors((er) => ({ ...er, consent: "" }));
                              }}
                              className="group flex cursor-pointer items-start gap-3 text-left"
                            >
                              <span
                                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                                  consent
                                    ? "border-[#111111] bg-[#111111]"
                                    : "border-[#C9C9C9] bg-white group-hover:border-[#111111]"
                                }`}
                              >
                                {consent && (
                                  <Check
                                    className="h-3.5 w-3.5 text-white"
                                    strokeWidth={3}
                                  />
                                )}
                              </span>
                              <span className="text-sm leading-relaxed text-[#555555]">
                                I agree to be contacted about this inquiry by
                                email, phone or WhatsApp.
                              </span>
                            </button>
                            {errors.consent && (
                              <p
                                role="alert"
                                className="mt-1.5 text-xs text-red-600"
                              >
                                {errors.consent}
                              </p>
                            )}
                          </div>

                          {errorMsg && (
                            <div
                              role="alert"
                              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                            >
                              {errorMsg}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Footer nav */}
                  <div className="flex items-center justify-between gap-4 border-t border-[#EFEFEA] px-5 py-5 md:px-10">
                    {step > 0 ? (
                      <button
                        type="button"
                        onClick={goBack}
                        className="inline-flex cursor-pointer items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-[#555555] transition-colors hover:bg-[#F3F3F0] hover:text-[#111111]"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                      </button>
                    ) : (
                      <span className="text-sm text-[#8A8A8A]">
                        {selectedItems.length > 0
                          ? `${selectedItems.length} selected`
                          : "Step 1 of 3"}
                      </span>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group inline-flex cursor-pointer items-center gap-2.5 rounded-xl bg-[#111111] px-7 py-3.5 text-sm font-medium text-white transition-all hover:bg-[#2A2A2A] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending
                        </>
                      ) : step === STEPS.length - 1 ? (
                        <>
                          Send inquiry
                          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </>
                      ) : (
                        <>
                          Continue
                          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>

              {/* Side panel */}
              <motion.aside
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
                className="space-y-5 lg:sticky lg:top-28 lg:self-start"
              >
                <div className="rounded-3xl border border-[#E8E8E4] bg-white p-6">
                  <h3 className="text-base font-medium">Prefer to talk?</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#666666]">
                    Message us directly. We are happy to answer questions before
                    you send a full inquiry.
                  </p>
                  <div className="mt-5 space-y-2">
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-xl border border-[#E8E8E4] px-4 py-3 text-sm text-[#333333] transition-colors hover:border-[#111111]"
                    >
                      <WhatsAppIcon className="h-5 w-5 shrink-0 text-[#25D366]" />
                      <span className="flex-1">{CONTACT_PHONE_DISPLAY}</span>
                      <ArrowRight className="h-4 w-4 text-[#AAAAAA] transition-transform group-hover:translate-x-0.5 group-hover:text-[#111111]" />
                    </a>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="group flex items-center gap-3 rounded-xl border border-[#E8E8E4] px-4 py-3 text-sm text-[#333333] transition-colors hover:border-[#111111]"
                    >
                      <Mail className="h-5 w-5 shrink-0 text-[#777777]" />
                      <span className="flex-1 break-all">{CONTACT_EMAIL}</span>
                      <ArrowRight className="h-4 w-4 text-[#AAAAAA] transition-transform group-hover:translate-x-0.5 group-hover:text-[#111111]" />
                    </a>
                  </div>
                </div>

                <div className="rounded-3xl border border-[#E8E8E4] bg-white p-6">
                  <h3 className="text-base font-medium">What happens next</h3>
                  <ol className="mt-4 space-y-4">
                    {[
                      [
                        "We review your inquiry",
                        "A team member reads every request personally.",
                      ],
                      [
                        "You get a reply in 24 hours",
                        "With questions, a rough scope and next steps.",
                      ],
                      [
                        "Call on Google Meet",
                        "We agree on scope, pricing and timeline together.",
                      ],
                    ].map(([t, d], i) => (
                      <li key={t} className="flex gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#111111] text-xs font-medium text-white">
                          {i + 1}
                        </span>
                        <div>
                          <p className="text-sm font-medium">{t}</p>
                          <p className="mt-0.5 text-sm leading-relaxed text-[#777777]">
                            {d}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                <p className="px-2 text-xs leading-relaxed text-[#8A8A8A]">
                  All inquiries are confidential. We never share project details
                  or use your information for marketing.
                </p>
              </motion.aside>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
