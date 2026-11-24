"use client";

import React from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { motion } from "motion/react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Accent colour taken from the card artwork (orange)
const ACCENT = "#F26A1B";

const CARDS = [
  {
    src: "/why/no_scam.jpeg",
    alt: "No Online Scam: 100% genuine, verified process with clear scope, pricing and timelines",
  },
  {
    src: "/why/end-to-end.jpeg",
    alt: "End to End Solutions and Server Setup",
  },
  {
    src: "/why/g_meet.jpeg",
    alt: "Google Meet Support: regular project updates, reviews and discussions",
  },
  {
    src: "/why/after_sales.jpeg",
    alt: "After-Sales Support: we stay with you for updates, fixes and long-term assistance",
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section
      id="why-choose-us"
      className="bg-white px-4 py-12 text-black md:py-20"
    >
      <div className="mx-auto w-[90vw] max-w-[1400px]">
        {/* Header: eyebrow + heading on the left, description on the right */}
        <div className="mb-8 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="mb-4 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-0.5 w-10 rounded-full"
                style={{ backgroundColor: ACCENT }}
              />
              <span
                className={`${poppins.className} text-xs font-semibold uppercase tracking-[0.18em] text-neutral-800`}
              >
                Our Promises
              </span>
            </div>

            <h2
              className={`${poppins.className} text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold leading-[1.15] tracking-tight`}
            >
              A Clear, <span style={{ color: ACCENT }}>Reliable</span>{" "}
              Experience
            </h2>
          </motion.div>

          {/* <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
            className={`${poppins.className} max-w-md text-sm leading-relaxed text-neutral-600 md:text-base md:leading-relaxed`}
          >
            We work with complete clarity, honest communication, and ongoing
            support to make your project smooth, secure, and successful.
          </motion.p> */}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 + i * 0.1 }}
              className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl"
            >
              <Image
                src={card.src}
                alt={card.alt}
                fill
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                quality={90}
                draggable={false}
                className="object-cover object-center"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
