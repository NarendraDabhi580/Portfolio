"use client";
import { useEffect, useRef } from "react";

export function useScrollProgress() {
  const progressRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      progressRef.current = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progressRef;
}

export function useIntersectionObserver(
  options: IntersectionObserverInit = {}
) {
  const elementRef = useRef<HTMLElement | null>(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
    }, options);

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [options]);

  return { elementRef, isVisibleRef };
}
