"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CreditCard, Server, Store } from "lucide-react";

// Change these to match your project
const DESKTOP_IMG = "/images/Launch_Your_Online_Store.webp"; // laptop + admin panel, empty left side (desktop background)
const MOBILE_IMG = "/images/Launch_Your_Online_Store.png"; // demo image shown in the middle of the content on mobile
const BUTTON_HREF = "/online-store";

const FEATURES = [
  {
    icon: Store,
    title: "Your own store, ready in days",
    text: "A branded online store with a powerful admin panel to manage products, orders, and more.",
  },
  {
    icon: CreditCard,
    title: "Accept payments from day one",
    text: "Integrated with trusted payment gateways for secure and seamless transactions.",
  },
  {
    icon: Server,
    title: "Full ownership, zero platform fees",
    text: "Host it on your own server. No monthly subscriptions and no commission on your sales.",
  },
];

const LaunchStore = memo(function LaunchStore() {
  return (
    // Full width section. On desktop, everything scales with the section width (cqw)
    // so the text always lines up with the image.
    <section className="relative w-full overflow-hidden bg-[#F5F3F0] lg:[container-type:inline-size] py-12 sm:py-0">
      {/* Text: stacked on mobile, overlaid on the empty left side of the image on desktop */}
      <div className="relative z-10 p-6 sm:p-8 lg:absolute lg:left-[5%] lg:top-[15%] lg:w-[34%] lg:p-0">
        <h2 className="text-3xl font-bold leading-[1.1] tracking-tight text-[#222222] sm:text-4xl lg:text-[2.6cqw]">
          Launch Your Own
          <span className="relative block w-fit text-[#F26A1B]">
            Online Store
            <svg
              viewBox="0 0 300 12"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="absolute -bottom-2 left-0 h-2 w-full lg:-bottom-[0.7cqw] lg:h-[0.6cqw]"
            >
              <path
                d="M2 9 C 60 1, 160 1, 298 6"
                fill="none"
                stroke="#F26A1B"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h2>

        <p className="mt-6 max-w-xl text-sm leading-relaxed text-[#555555] sm:text-base lg:mt-[1.6cqw] lg:max-w-none lg:text-[max(11px,1cqw)] lg:leading-[1.45]">
          A complete e-commerce solution with a powerful admin panel, built for
          your brand, your products, and your customers.
        </p>

        {/* Mobile only: demo image in the middle, between description and features */}
        <div className="mt-6 lg:hidden">
          <Image
            src={MOBILE_IMG}
            alt="Online store and admin panel shown on a laptop"
            width={1000}
            height={700}
            sizes="(min-width: 640px) 600px, 100vw"
            className="h-auto w-full rounded-2xl"
          />
        </div>

        <ul className="mt-6 space-y-4 lg:mt-[2cqw] lg:space-y-[1.1cqw]">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-start gap-3 lg:gap-[0.9cqw]">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FDEBDD] text-[#F26A1B] lg:h-[3.4cqw] lg:w-[3.4cqw] lg:rounded-[0.8cqw]">
                <Icon className="h-5 w-5 lg:h-[1.6cqw] lg:w-[1.6cqw]" />
              </span>
              <div>
                <p className="text-[15px] font-semibold text-[#222222] lg:text-[max(12px,1.05cqw)]">
                  {title}
                </p>
                <p className="mt-0.5 text-sm leading-snug text-[#666666] lg:text-[max(10px,0.82cqw)]">
                  {text}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <Link
          href={BUTTON_HREF}
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#F26A1B] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#D95A10] lg:mt-[1.8cqw] lg:gap-[0.5cqw] lg:rounded-[0.7cqw] lg:px-[1.7cqw] lg:py-[0.75cqw] lg:text-[max(11px,0.95cqw)]"
        >
          Launch your store
          <ArrowRight className="h-4 w-4 lg:h-[1.1cqw] lg:w-[1.1cqw]" />
        </Link>
      </div>

      {/* Desktop only: .webp background image */}
      <div className="relative hidden aspect-[1057/595] w-full lg:block">
        <Image
          src={DESKTOP_IMG}
          alt="Online store and admin panel shown on a laptop"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
    </section>
  );
});

export default LaunchStore;