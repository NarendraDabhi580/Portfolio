"use client";
import { useEffect } from "react";
import { useMagneticCursor } from "@/hooks/useMagneticCursor";

export default function CustomCursor() {
  const { cursorRef, ringRef } = useMagneticCursor();

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    const handleHover = () => {
      cursor.style.transform = "translate(-50%, -50%) scale(2)";
      ring.style.width = "60px";
      ring.style.height = "60px";
      ring.style.borderColor = "rgba(0, 229, 255,0.8)";
    };

    const handleUnhover = () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
      ring.style.width = "40px";
      ring.style.height = "40px";
      ring.style.borderColor = "rgba(0, 229, 255,0.4)";
    };

    const interactives = document.querySelectorAll(
      "a, button, [data-cursor-hover]"
    );
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleUnhover);
    });

    return () => {
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleHover);
        el.removeEventListener("mouseleave", handleUnhover);
      });
    };
  }, [cursorRef, ringRef]);

  return (
    <>
      <div ref={cursorRef} id="cursor" />
      <div ref={ringRef} id="cursor-ring" />
    </>
  );
}
