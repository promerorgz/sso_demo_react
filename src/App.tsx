/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import Section from "./components/Section";
import Sidebar from "./components/Sidebar";
import ProgressBar from "./components/ProgressBar";
import Parallax from "./components/Parallax";
import sections from "./content/sections";

export default function App() {
  const sectionRefs = useRef([]);
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Intersection Observer to set active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.index);
            setActiveIndex(idx);
          }
        });
      },
      { threshold: 0.6 }
    );

    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      const sectionsEls = sectionRefs.current;
      const current = activeIndex;

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        const next = sectionsEls[current + 1];
        if (next) next.scrollIntoView({ behavior: "smooth" });
      }

      if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        const prev = sectionsEls[current - 1];
        if (prev) prev.scrollIntoView({ behavior: "smooth" });
      }

      if (e.key === "Home") {
        e.preventDefault();
        if (sectionsEls[0]) {
          sectionsEls[0].scrollIntoView({ behavior: "smooth" });
        }
      }

      if (e.key === "End") {
        e.preventDefault();
        const last = sectionsEls[sectionsEls.length - 1];
        if (last) last.scrollIntoView({ behavior: "smooth" });
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex]);

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen bg-gray-950 text-white relative snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth"
    >
      <ProgressBar />
      <Sidebar sections={sections} activeIndex={activeIndex} />
      <Parallax />

      <main className="relative z-10">
        {sections.map((sec, i) => (
          <Section
            key={i}
            title={sec.title}
            content={sec.content}
            Component={sec.component}
            innerRef={(el: any) => (sectionRefs.current[i] = el)}
            index={i}
          />
        ))}
      </main>
    </div>
  );
}
