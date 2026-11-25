"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const WORKING_PARTNERS = [
  { name: "Razorpay", logo: "/gateway/razorpay.webp" },
  { name: "GoKwik", logo: "/gateway/gokwik.webp" },
  { name: "PayU", logo: "/gateway/payu.webp" },
  { name: "Stripe", logo: "/gateway/stripe.webp" },
  { name: "Cashfree Payments", logo: "/gateway/cashfree.webp" },
  { name: "PhonePe", logo: "/gateway/phonepe.webp" },
  { name: "Amazon Pay", logo: "/gateway/amazonpay.webp" },
  { name: "Shiprocket", logo: "/gateway/shiprocket.webp" },
];

const MARQUEE_DURATION = 35; // seconds for one full loop — higher = slower

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -10% 0px" },
  transition: { duration: 0.7, ease: EASE, delay },
});

/* One set of logos; rendered twice so the loop is seamless */
const LogoSet: React.FC<{ hidden?: boolean }> = ({ hidden }) => (
  <div
    className="flex shrink-0 items-center gap-4 pr-12 md:gap-20 md:pr-20"
    aria-hidden={hidden}
  >
    {WORKING_PARTNERS.map((partner) => (
      <Image
        key={partner.name}
        src={partner.logo}
        alt={hidden ? "" : partner.name}
        width={0}
        height={0}
        sizes="240px"
        draggable={false}
        className="h-24 w-auto shrink-0 object-contain md:h-16 lg:h-20"
      />
    ))}
  </div>
);

export const OnlineStore: React.FC = () => {
  return (
    <section
      id="online-store"
      className={`${poppins.className} overflow-hidden bg-white pt-14 text-[#111] md:pt-20`}
    >
      {/* Heading, text, button */}
      <div className="mx-auto w-[90vw] max-w-[1100px] text-center">
        <motion.h2
          {...fadeUp()}
          className="text-[clamp(2rem,4vw,3.5rem)] font-normal leading-[1.15] tracking-tight"
        >
          Get your Own online Store
        </motion.h2>

        <motion.p
          {...fadeUp(0.1)}
          className="mx-auto mt-6 max-w-[620px] text-[clamp(1rem,1.4vw,1.2rem)] font-normal leading-8"
        >
          Our experts can create a better version of your website and content
          with guidance from our expert Content Advisors.
        </motion.p>

        <motion.div {...fadeUp(0.2)} className="mt-9 flex justify-center">
          <Link
            href="/online-store"
            className="group inline-flex items-center gap-10 rounded-full bg-black py-1.5 pl-8 pr-1.5 text-[15px] font-medium text-white transition-colors duration-200 hover:bg-[#222]"
          >
            <span>Get Your Online Store</span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowRight className="h-[18px] w-[18px]" strokeWidth={2.5} />
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Store image */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.9, ease: EASE }}
        className="mx-auto mt-10 w-[80vw] max-w-[560px] md:mt-12"
      >
        <Image
          src="/online_store.png"
          alt="Online store preview with fashion, electronics and accessories product cards"
          width={0}
          height={0}
          sizes="(min-width: 768px) 560px, 80vw"
          quality={90}
          draggable={false}
          className="mx-auto block h-auto w-full scale-110"
        />
      </motion.div>

      {/* Payment partners: logo marquee (85vw) + faded title */}
      <div className="relative mt-4 pb-6 md:mt-6 md:pb-10">
        <div
          className="relative z-10 mx-auto w-[85vw] overflow-hidden"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)",
          }}
        >
          <motion.div
            className="flex w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: MARQUEE_DURATION,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            <LogoSet />
            <LogoSet hidden />
          </motion.div>
        </div>

        {/* Faded text: 2 lines on mobile, 1 line on desktop */}
        <p
          aria-hidden="true"
          className="pointer-events-none relative -mt-1 select-none bg-gradient-to-b from-[#d9d9d9] via-[#efefef] to-white bg-clip-text text-center text-[clamp(2rem,6vw,5.5rem)] font-extrabold leading-[1.05] tracking-tight text-transparent md:-mt-2 md:whitespace-nowrap md:leading-none"
        >
          Our Payment
          <br className="md:hidden" /> Partners
        </p>
      </div>
    </section>
  );
};

export default OnlineStore;
