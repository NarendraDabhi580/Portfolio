"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: "3+", label: "Years Experience", color: "#00e5ff" },
  { value: "15+", label: "Projects Built", color: "#7c3aed" },
  { value: "10+", label: "Technologies", color: "#f72585" },
  { value: "∞", label: "Tea Consumed", color: "#00ff88" },
];

const ABOUT_LINES = [
  "Frontend Developer with 3 years of experience building",
  "scalable and responsive web applications using React.js,",
  "TypeScript, and modern JavaScript (ES6+).",
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: "var(--space-void)" }}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/4 w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(124, 58, 237,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Holographic panel */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="relative"
          >
            {/* Main glass card */}
            <div
              className="relative rounded-3xl p-8 overflow-hidden"
              style={{
                background: "rgba(13, 27, 62, 0.85)",
                border: "1px solid rgba(0, 229, 255,0.12)",
              }}
            >
              {/* Holographic scanlines */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 229, 255,0.015) 2px, rgba(0, 229, 255,0.015) 4px)",
                }}
              />

              {/* Corner decorations */}
              {[
                "top-4 left-4",
                "top-4 right-4",
                "bottom-4 left-4",
                "bottom-4 right-4",
              ].map((pos, i) => (
                <motion.div
                  key={i}
                  className={`absolute ${pos} w-4 h-4`}
                  style={{
                    borderTop:
                      i < 2 ? "1px solid rgba(0, 229, 255,0.5)" : "none",
                    borderBottom:
                      i >= 2 ? "1px solid rgba(0, 229, 255,0.5)" : "none",
                    borderLeft:
                      i === 0 || i === 2
                        ? "1px solid rgba(0, 229, 255,0.5)"
                        : "none",
                    borderRight:
                      i === 1 || i === 3
                        ? "1px solid rgba(0, 229, 255,0.5)"
                        : "none",
                  }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                />
              ))}

              {/* Avatar placeholder */}
              <div className="flex items-start gap-6 mb-8">
                <div
                  className="w-20 h-20 rounded-2xl flex-shrink-0 flex items-center justify-center relative overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(0, 229, 255,0.2), rgba(124, 58, 237,0.2))",
                    border: "1px solid rgba(0, 229, 255,0.25)",
                  }}
                >
                  <span
                    className="text-3xl font-black gradient-text"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    N
                  </span>
                  {/* Pulse ring */}
                  <div
                    className="absolute inset-0 rounded-2xl animate-ping"
                    style={{ border: "1px solid rgba(0, 229, 255,0.15)" }}
                  />
                </div>

                <div>
                  <div
                    className="text-xs tracking-widest uppercase mb-1"
                    style={{
                      fontFamily: "var(--font-jetbrains)",
                      color: "rgba(0, 229, 255,0.6)",
                      fontSize: "0.6rem",
                    }}
                  >
                    // Developer Profile
                  </div>
                  <h2
                    className="text-2xl font-bold text-star-white mb-1"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    Narendra Dabhi
                  </h2>
                  <p
                    className="text-sm"
                    style={{
                      fontFamily: "var(--font-jetbrains)",
                      color: "rgba(232, 244, 253,0.4)",
                    }}
                  >
                    Frontend Developer
                  </p>
                </div>
              </div>

              {/* Bio text */}
              <div className="mb-8 space-y-1">
                {ABOUT_LINES.map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      delay: 0.3 + i * 0.1,
                      duration: 0.7,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                    className="text-lg leading-relaxed"
                    style={{ color: "rgba(232, 244, 253,0.65)" }}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              <p
                className="text-base leading-relaxed mb-8"
                style={{ color: "rgba(232, 244, 253,0.45)" }}
              >
                Experienced in developing interactive user interfaces, reusable
                UI components, and performance-optimized web applications.
                Skilled in responsive web design, cross-browser compatibility,
                and modern component-based frontend architecture. Currently
                building scalable products at Bankai Informatics Pvt. Ltd.
              </p>

              {/* Location & status */}
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: "📍", text: "Ahmedabad, Gujarat" },
                  { icon: "💼", text: "Bankai Informatics" },
                  { icon: "🎓", text: "B.Com (Computer Sci.)" },
                  { icon: "🌐", text: "Open to Opportunities" },
                ].map(({ icon, text }) => (
                  <span
                    key={text}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
                    style={{
                      fontFamily: "var(--font-jetbrains)",
                      background: "rgba(0, 229, 255,0.06)",
                      border: "1px solid rgba(0, 229, 255,0.12)",
                      color: "rgba(232, 244, 253,0.5)",
                      fontSize: "0.65rem",
                    }}
                  >
                    <span>{icon}</span>
                    <span>{text}</span>
                  </span>
                ))}
              </div>

              {/* Glow effect */}
              <div
                className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(0, 229, 255,0.08) 0%, transparent 70%)",
                }}
              />
            </div>
          </motion.div>

          {/* Right — Stats + Code snippet */}
          <div className="space-y-6">
            {/* Stats grid */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    delay: 0.3 + i * 0.1,
                    duration: 0.6,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  className="relative rounded-2xl p-6 text-center overflow-hidden group"
                  style={{
                    background: "rgba(13,27,62,0.85)",
                    border: `1px solid ${stat.color}20`,
                  }}
                  whileHover={{ scale: 1.03 }}
                >
                  <div
                    className="text-4xl font-black mb-1"
                    style={{
                      fontFamily: "var(--font-outfit)",
                      color: stat.color,
                      textShadow: `0 0 30px ${stat.color}60`,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-xs tracking-wider uppercase"
                    style={{
                      fontFamily: "var(--font-jetbrains)",
                      color: "rgba(232, 244, 253,0.35)",
                      fontSize: "0.6rem",
                    }}
                  >
                    {stat.label}
                  </div>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                    style={{
                      background: `radial-gradient(circle at 50% 120%, ${stat.color}12 0%, transparent 60%)`,
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Code snippet card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.5,
                duration: 0.8,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(8,12,32,0.8)",
                border: "1px solid rgba(0, 229, 255,0.1)",
              }}
            >
              {/* Window bar */}
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
              >
                {["#ff5f57", "#febc2e", "#28c840"].map((color) => (
                  <div
                    key={color}
                    className="w-3 h-3 rounded-full"
                    style={{ background: color }}
                  />
                ))}
                <span
                  className="ml-2 text-xs"
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    color: "rgba(232, 244, 253,0.2)",
                    fontSize: "0.65rem",
                  }}
                >
                  narendra.tsx
                </span>
              </div>

              {/* Code */}
              <pre
                className="p-5 text-xs leading-relaxed overflow-x-auto"
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "0.72rem",
                }}
              >
                <code>
                  <span style={{ color: "#7c3aed" }}>const </span>
                  <span style={{ color: "#00e5ff" }}>developer </span>
                  <span style={{ color: "rgba(232, 244, 253,0.4)" }}>
                    = {"{"}
                  </span>
                  {"\n"}
                  <span style={{ color: "#00ff88" }}>name</span>
                  <span style={{ color: "rgba(232, 244, 253,0.4)" }}>: </span>
                  <span style={{ color: "#f72585" }}>
                    &apos;Narendra Dabhi&apos;
                  </span>
                  <span style={{ color: "rgba(232, 244, 253,0.4)" }}>,</span>
                  {"\n"}
                  {"  "}
                  <span style={{ color: "#00ff88" }}>role</span>
                  <span style={{ color: "rgba(232, 244, 253,0.4)" }}>: </span>
                  <span style={{ color: "#f72585" }}>
                    &apos;Frontend Developer&apos;
                  </span>
                  <span style={{ color: "rgba(232, 244, 253,0.4)" }}>,</span>
                  {"\n"}
                  {"  "}
                  <span style={{ color: "#00ff88" }}>stack</span>
                  <span style={{ color: "rgba(232, 244, 253,0.4)" }}>: [</span>
                  <span style={{ color: "#f72585" }}>
                    &apos;React&apos;, &apos;TypeScript&apos;,
                    &apos;Next.js&apos;
                  </span>
                  <span style={{ color: "rgba(232, 244, 253,0.4)" }}>],</span>
                  {"\n"}
                  {"  "}
                  <span style={{ color: "#00ff88" }}>experience</span>
                  <span style={{ color: "rgba(232, 244, 253,0.4)" }}>: </span>
                  <span style={{ color: "#00e5ff" }}>&apos;3+ years&apos;</span>
                  <span style={{ color: "rgba(232, 244, 253,0.4)" }}>,</span>
                  {"\n"}
                  {"  "}
                  <span style={{ color: "#00ff88" }}>available</span>
                  <span style={{ color: "rgba(232, 244, 253,0.4)" }}>: </span>
                  <span style={{ color: "#00e5ff" }}>true</span>
                  {"\n"}
                  <span style={{ color: "rgba(232, 244, 253,0.4)" }}>
                    {"}"}
                  </span>
                  <span className="cursor-blink" style={{ color: "#00e5ff" }}>
                    _
                  </span>
                </code>
              </pre>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
