"use client";

import React from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { motion } from "motion/react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const WhyChooseUs: React.FC = () => {
  return (
    <section
      id="why-choose-us"
      className="bg-white px-4 py-12 text-black md:py-16"
    >
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className={`${poppins.className} mb-8 flex items-center justify-center text-center text-[clamp(1.75rem,3.4vw,2.75rem)] font-bold leading-tight md:mb-10`}
      >
        <span>Why Choose Visitinglink</span>
        <span
          aria-hidden="true"
          className="ml-2 text-[1.7em] font-bold leading-none text-[#d4d4d4]"
        >
          ?
        </span>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        className="mx-auto w-[90vw] max-w-[1600px]"
      >
        <Image
          src="/why_choose_us.webp"
          alt="Our promises: a clear, transparent and reliable experience — No Online Scam, Clear & Transparent, Google Meet Support and After-Sales Support"
          width={0}
          height={0}
          sizes="90vw"
          quality={90}
          draggable={false}
          className="block h-auto w-full"
        />
      </motion.div>
    </section>
  );
};

export default WhyChooseUs;
