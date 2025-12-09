import React, { useEffect, useState } from "react";

export default function Parallax() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    let raf = null;
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setOffsetY(window.scrollY * 0.25);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none z-0"
      style={{ transform: `translateY(${offsetY}px)` }}
    >
      <div
        className="absolute inset-0 bg-center bg-cover opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(14,16,20,0.4), rgba(14,16,20,0.6)), url('https://images.unsplash.com/photo-1545670723-196ed0954986?auto=format&fit=crop&w=2000&q=60')",
          filter: "grayscale(30%) blur(1px)",
        }}
      />
    </div>
  );
}
