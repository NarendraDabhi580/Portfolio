"use client";
import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, Stars } from "@react-three/drei";
import { motion } from "framer-motion";
import HeroScene from "@/components/3d/HeroScene";
import ParticleField from "@/components/3d/ParticleField";
import { useMagneticButton } from "@/hooks/useMagneticCursor";

const textVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(20px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.15 + 0.8,
      duration: 0.9,
      ease: [0.23, 1, 0.32, 1] as const,
    },
  }),
};

export default function HeroSection() {
  const primaryBtnRef = useMagneticButton();
  const secondaryBtnRef = useMagneticButton();
  const sectionRef = useRef<HTMLElement>(null);

  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-24 pb-12 px-6 overflow-hidden"
      style={{ background: "var(--space-dark)" }}
    >
      {/* 3D Canvas */}
      <div className="canvas-container">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <AdaptiveDpr pixelated />
          <fog attach="fog" args={["#03050f", 8, 25]} />
          <Suspense fallback={null}>
            <HeroScene />
            <ParticleField count={2000} color="#00e5ff" size={0.008} />
          </Suspense>
          <Stars
            radius={50}
            depth={50}
            count={3000}
            factor={4}
            saturation={0.5}
            fade
          />
        </Canvas>
      </div>

      {/* Radial gradient overlay — fades in dark mode, hidden in light via CSS */}
      <div
        className="absolute inset-0 z-10 pointer-events-none hero-radial-overlay"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, var(--space-dark) 100%)",
        }}
      />

      {/* Bottom fade — uses CSS var so it's transparent in light mode */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(transparent, var(--space-dark))",
        }}
      />

      {/* Content overlay */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
        {/* Status badge */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full"
          style={{
            background: "rgba(0, 229, 255,0.08)",
            border: "1px solid rgba(0, 229, 255,0.2)",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
          <span
            className="text-xs tracking-widest uppercase"
            style={{
              fontFamily: "var(--font-jetbrains)",
              color: "rgba(0, 229, 255,0.8)",
              fontSize: "0.65rem",
            }}
          >
            Available for opportunities
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.div
          custom={1}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="mb-2"
        >
          <h1
            className="section-heading text-7xl md:text-8xl lg:text-9xl leading-none tracking-tight"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            <span className="block text-star-white font-light">NARENDRA</span>
            <span className="block gradient-text font-black">DABHI</span>
          </h1>
        </motion.div>

        {/* Role */}
        <motion.div
          custom={2}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="mb-6"
        >
          <p
            className="text-sm md:text-base tracking-[0.4em] uppercase"
            style={{
              fontFamily: "var(--font-jetbrains)",
              color: "rgba(232, 244, 253,0.5)",
            }}
          >
            MERN Stack Developer
            <span className="text-electric-cyan mx-3">·</span>
            Frontend Developer
            <span className="text-electric-cyan mx-3">·</span>
            React.js Specialist
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          custom={3}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="max-w-xl text-base md:text-lg mb-10 leading-relaxed"
          style={{ color: "rgba(232, 244, 253,0.45)" }}
        >
          Crafting immersive full-stack experiences where performance meets
          artistry. Transforming complex ideas into elegant digital realities.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <button
            ref={primaryBtnRef as React.RefObject<HTMLButtonElement>}
            onClick={scrollToProjects}
            className="btn-magnetic group relative px-8 py-4 rounded-2xl text-sm font-bold tracking-wider uppercase overflow-hidden"
            style={{
              fontFamily: "var(--font-jetbrains)",
              background: "linear-gradient(135deg, #00e5ff, #7c3aed)",
              color: "#fff",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
            }}
            data-cursor-hover
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore My Work
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="transition-transform group-hover:translate-x-1"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </span>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #f72585)",
              }}
            />
          </button>

          <button
            ref={secondaryBtnRef as React.RefObject<HTMLButtonElement>}
            onClick={scrollToContact}
            className="btn-magnetic px-8 py-4 rounded-2xl text-sm font-bold tracking-wider uppercase"
            style={{
              fontFamily: "var(--font-jetbrains)",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(232, 244, 253,0.7)",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
            }}
            data-cursor-hover
          >
            Get in Touch
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          custom={5}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="absolute bottom-10 flex flex-col items-center gap-2"
        >
          <span
            className="text-xs tracking-widest uppercase"
            style={{
              fontFamily: "var(--font-jetbrains)",
              color: "rgba(232, 244, 253,0.25)",
              fontSize: "0.6rem",
            }}
          >
            Scroll
          </span>
          <motion.div
            className="w-px h-12 origin-top"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0, 229, 255,0.6), transparent)",
            }}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      {/* Tech tags floating */}
      {["React.js", "TypeScript", "Next.js", "Redux Toolkit", "Material UI"].map(
        (tech, i) => (
          <motion.div
            key={tech}
            className="absolute hidden lg:flex px-3 py-1 rounded-full text-xs"
            style={{
              fontFamily: "var(--font-jetbrains)",
              color: "rgba(0, 229, 255,0.5)",
              border: "1px solid rgba(0, 229, 255,0.1)",
              background: "rgba(0, 229, 255,0.04)",
              top: `${20 + i * 13}%`,
              right: "5%",
              fontSize: "0.6rem",
            }}
            initial={{ opacity: 0, x: 20 }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              x: [0, -5, 0],
            }}
            transition={{
              delay: 1 + i * 0.2,
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {tech}
          </motion.div>
        ),
      )}
    </section>
  );
}
