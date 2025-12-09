import React, { useEffect, useState } from "react";

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handle = () => {
      const scrollTop = window.scrollY;

      const docHeight = document.body.scrollHeight - window.innerHeight;
      const pct = Math.max(0, Math.min(100, (scrollTop / docHeight) * 100));
      console.log({ pct });
      setProgress(pct);
    };

    window.addEventListener("scroll", handle, { passive: true });
    handle();
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-2 bg-gray-800 z-50">
      <div
        className="h-full bg-yellow-400 transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
