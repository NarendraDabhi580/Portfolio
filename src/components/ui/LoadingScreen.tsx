"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setDone(true), 300);
          return 100;
        }
        return prev + Math.random() * 8 + 2;
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Central logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="relative mb-12"
          >
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full animate-ping"
              style={{
                background: "radial-gradient(circle, rgba(0, 229, 255,0.15) 0%, transparent 70%)",
                width: "120px",
                height: "120px",
                top: "-15px",
                left: "-15px",
              }}
            />
            {/* Logo */}
            <div
              className="w-24 h-24 rounded-2xl glass-cyan flex items-center justify-center relative"
              style={{ border: "1px solid rgba(0, 229, 255,0.3)" }}
            >
              <span
                className="font-display text-4xl font-black gradient-text"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                N
              </span>
              {/* Corner dots */}
              {[
                "top-2 left-2",
                "top-2 right-2",
                "bottom-2 left-2",
                "bottom-2 right-2",
              ].map((pos) => (
                <div
                  key={pos}
                  className={`absolute ${pos} w-1.5 h-1.5 rounded-full bg-electric-cyan`}
                />
              ))}
            </div>
          </motion.div>

          {/* Loading text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center mb-8"
          >
            <p
              className="text-xs tracking-[0.4em] uppercase text-electric-cyan mb-2"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              Initializing Universe
            </p>
            <div
              className="text-sm text-star-white/30"
              style={{ fontFamily: "var(--font-jetbrains)" }}
            >
              {Math.min(Math.floor(progress), 100)}%
            </div>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="w-64 h-px bg-white/5 relative overflow-hidden"
          >
            <motion.div
              className="absolute top-0 left-0 h-full"
              style={{
                width: `${Math.min(progress, 100)}%`,
                background:
                  "linear-gradient(90deg, #00e5ff, #7c3aed, #f72585)",
                boxShadow:
                  "0 0 10px rgba(0, 229, 255,0.8), 0 0 20px rgba(0, 229, 255,0.4)",
                transition: "width 0.1s ease",
              }}
            />
          </motion.div>

          {/* Floating particles */}
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 4 + 2 + "px",
                height: Math.random() * 4 + 2 + "px",
                background: ["#00e5ff", "#7c3aed", "#f72585"][i % 3],
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
                opacity: 0.4,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
