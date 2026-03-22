"use client";
import { useRef, Suspense } from "react";
import { motion, useInView } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import SkillsScene from "@/components/3d/SkillsScene";

const SKILL_CATEGORIES = [
  {
    title: "MERN Stack Core",
    color: "#00ff88", // Neon green for MERN
    skills: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "Next.js",
      "TypeScript",
    ],
  },
  {
    title: "Frontend & UI",
    color: "#00e5ff", // Cyan
    skills: [
      "JavaScript (ES6+)",
      "HTML5 & CSS3",
      "Tailwind CSS",
      "Material UI (MUI)",
      "Responsive Web Design",
      "Framer Motion",
    ],
  },
  {
    title: "State & Data",
    color: "#7c3aed", // Plasma violet
    skills: [
      "Redux Toolkit",
      "React Query",
      "Context API",
      "RESTful APIs",
      "Mongoose",
    ],
  },
  {
    title: "Tools & Practices",
    color: "#f72585", // Pink
    skills: [
      "Git & GitHub",
      "VS Code",
      "NPM / Yarn",
      "Code Reviews",
      "SEO & Accessibility",
      "Agile / Scrum",
    ],
  },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: "var(--space-dark)" }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(0, 229, 255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-20"
        >
          <div
            className="text-xs tracking-[0.4em] uppercase mb-4"
            style={{
              fontFamily: "var(--font-jetbrains)",
              color: "rgba(0, 229, 255,0.6)",
              fontSize: "0.65rem",
            }}
          >
            // Technical Arsenal
          </div>
          <h2
            className="section-heading text-5xl md:text-6xl mb-4"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            <span className="text-star-white">My </span>
            <span className="gradient-text">Skills</span>
          </h2>
          <p
            className="text-base max-w-xl mx-auto"
            style={{ color: "rgba(232, 244, 253,0.4)" }}
          >
            Technologies and tools I wield to build extraordinary digital
            experiences
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Skills network */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="relative h-[450px] rounded-3xl overflow-hidden"
            style={{
              background: "rgba(8,12,32,0.6)",
              border: "1px solid rgba(0, 229, 255,0.1)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(8,12,32,0.8) 100%)",
              }}
            />
            <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 1.5]}>
              <Suspense fallback={null}>
                <SkillsScene />
              </Suspense>
            </Canvas>
            <div
              className="absolute bottom-4 left-0 right-0 text-center"
              style={{
                fontFamily: "var(--font-jetbrains)",
                color: "rgba(0, 229, 255,0.3)",
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
              }}
            >
              MOVE CURSOR TO INTERACT
            </div>
          </motion.div>

          {/* Skill categories */}
          <div className="grid grid-cols-1 gap-4">
            {SKILL_CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  delay: 0.1 + i * 0.1,
                  duration: 0.7,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="relative rounded-2xl p-5 overflow-hidden group"
                style={{
                  background: "rgba(13,27,62,0.85)",
                  border: `1px solid ${cat.color}20`,
                  transition: "border-color 0.3s ease",
                }}
                whileHover={{
                  borderColor: `${cat.color}40`,
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: cat.color,
                      boxShadow: `0 0 8px ${cat.color}`,
                    }}
                  />
                  <h3
                    className="text-sm font-semibold tracking-wider uppercase"
                    style={{
                      fontFamily: "var(--font-jetbrains)",
                      color: cat.color,
                      fontSize: "0.7rem",
                    }}
                  >
                    {cat.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="skill-badge px-3 py-1 rounded-lg text-xs"
                      style={{
                        fontFamily: "var(--font-jetbrains)",
                        fontSize: "0.68rem",
                        color: "rgba(232, 244, 253,0.65)",
                        background: `${cat.color}08`,
                        border: `1px solid ${cat.color}20`,
                        transition: "all 0.3s ease",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{
                    background: `radial-gradient(circle at 0% 50%, ${cat.color}06 0%, transparent 60%)`,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
