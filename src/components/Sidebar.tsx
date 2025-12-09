import React from "react";

export default function Sidebar({
  sections,
  activeIndex,
}: {
  sections: { title: string }[];
  activeIndex: number;
}) {
  return (
    <aside className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-gray-900/60 backdrop-blur-md border border-gray-800 p-3 rounded-lg hidden md:flex flex-col gap-2 z-40">
      {sections.map((sec, i) => (
        <a
          key={i}
          href={`#section-${i}`}
          onClick={(e) => {
            e.preventDefault();
            document
              .querySelector(`#section-${i}`)
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className={`text-sm px-2 py-1 rounded transition-all whitespace-nowrap ${
            activeIndex === i
              ? "bg-yellow-400/10 text-yellow-300 font-semibold"
              : "text-gray-300 hover:text-white"
          }`}
        >
          {sec.title}
        </a>
      ))}
    </aside>
  );
}
