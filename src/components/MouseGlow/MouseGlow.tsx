"use client";

import { useEffect, useState } from "react";

export const MouseGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    console.log(window.innerWidth);
    console.log(position.x, position.y);
  }, [position]);

  return (
    <div
      style={{
        display:
          position.x < window.innerWidth - 100 &&
          position.x > 100 &&
          position.y > 100 &&
          position.y < window.innerHeight - 100
            ? "block"
            : "none",
        position: "absolute",
        top: position.y,
        left: position.x,
        width: "100px",
        height: "100px",
        background:
          "radial-gradient(circle at center,rgba(2, 209, 192, 0.4), transparent)",
        filter: "blur(40px)",
        borderRadius: "50%",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none", // Prevents interference with mouse events
      }}
    />
  );
};
