"use client";
import { useEffect, useRef, useState } from "react";

export function useMagneticCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${posRef.current.x}px`;
        cursorRef.current.style.top = `${posRef.current.y}px`;
      }

      if (ringRef.current) {
        ringPosRef.current.x += (posRef.current.x - ringPosRef.current.x) * 0.12;
        ringPosRef.current.y += (posRef.current.y - ringPosRef.current.y) * 0.12;
        ringRef.current.style.left = `${ringPosRef.current.x}px`;
        ringRef.current.style.top = `${ringPosRef.current.y}px`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return { mousePos, isHovering, setIsHovering, cursorRef, ringRef };
}

export function useMagneticButton() {
  const buttonRef = useRef<HTMLButtonElement | HTMLDivElement | null>(null);

  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = (btn as HTMLElement).getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      (btn as HTMLElement).style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    };

    const handleMouseLeave = () => {
      (btn as HTMLElement).style.transform = "translate(0px, 0px)";
      (btn as HTMLElement).style.transition =
        "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)";
    };

    const handleMouseEnter = () => {
      (btn as HTMLElement).style.transition = "transform 0.1s ease";
    };

    btn.addEventListener("mousemove", handleMouseMove as EventListener);
    btn.addEventListener("mouseleave", handleMouseLeave);
    btn.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      btn.removeEventListener("mousemove", handleMouseMove as EventListener);
      btn.removeEventListener("mouseleave", handleMouseLeave);
      btn.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return buttonRef;
}
