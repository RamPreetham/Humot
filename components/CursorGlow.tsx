"use client";

import { useEffect, useState } from "react";

export function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div
        className="absolute h-[450px] w-[450px] rounded-full blur-3xl opacity-60"
        style={{
          transform: `translate3d(${pos.x - 225}px, ${pos.y - 225}px, 0)`,
          background:
            "radial-gradient(circle at center, rgba(56,189,248,0.6), transparent 60%)"
        }}
      />
    </div>
  );
}
