"use client";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-px z-[9999] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #00e5ff, #7c3aed, #f72585)",
        boxShadow: "0 0 10px rgba(0, 229, 255,0.8)",
      }}
    />
  );
}
