/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import React from "react";

export default function Section({
  title,
  content = "",
  innerRef,
  index,
  Component,
}: {
  title: string;
  content: string | string[];
  innerRef: React.RefObject<HTMLElement>;
  index: number;
  Component: any;
}) {
  console.log({ Component });
  return (
    <section
      id={`section-${index}`}
      data-index={index}
      ref={innerRef}
      className="snap-start w-[60%] h-screen flex flex-col justify-center justify-self-end items-start p-8 md:p-16 border-b border-gray-800 relative z-10"
    >
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-extrabold mb-6 text-start"
      >
        {title}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.12 }}
        viewport={{ once: true }}
        className="max-w-3xl text-base h-auto md:text-lg leading-relaxed text-start whitespace-pre-line text-gray-200"
      >
        {content instanceof Array ? (
          <ul className="list-disc pl-5">
            {content.map((paragraph, idx) => (
              <li key={idx} className="mb-4">
                {paragraph}
              </li>
            ))}
          </ul>
        ) : (
          content
        )}
      </motion.div>
      <motion.div>{Component}</motion.div>
    </section>
  );
}
