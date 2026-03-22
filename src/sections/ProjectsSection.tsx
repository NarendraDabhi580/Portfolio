"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const PROJECTS = [
  {
    id: 1,
    title: "E-Commerce Platform",
    subtitle: "Full-Stack MERN Application",
    description:
      "A production-grade e-commerce platform with real-time inventory, Stripe payments, JWT authentication, and admin dashboard. Built with React, Node.js, Express, and MongoDB.",
    tech: ["React", "Node.js", "MongoDB", "Express", "Stripe", "JWT", "Redux"],
    color: "#00e5ff",
    gradient: "from-cyan-500/10 to-blue-500/10",
    glowColor: "rgba(0, 229, 255,0.15)",
    icon: "🛒",
    metrics: { stars: "1.2k", forks: "340", views: "12k" },
    features: ["Real-time updates", "Payment integration", "Admin dashboard"],
  },
  {
    id: 2,
    title: "Social Media App",
    subtitle: "Real-time Chat & Feed",
    description:
      "A feature-rich social platform with Socket.io real-time messaging, infinite scroll feed, image uploads with Cloudinary, and follow/unfollow system.",
    tech: ["React", "Socket.io", "Node.js", "MongoDB", "Cloudinary", "Redis"],
    color: "#7c3aed",
    gradient: "from-purple-500/10 to-violet-500/10",
    glowColor: "rgba(124, 58, 237,0.15)",
    icon: "💬",
    metrics: { stars: "890", forks: "210", views: "8k" },
    features: ["Real-time messaging", "Image uploads", "Follow system"],
  },
  {
    id: 3,
    title: "Task Management SaaS",
    subtitle: "Kanban & Collaboration Tool",
    description:
      "A Notion-inspired productivity tool with drag-and-drop Kanban boards, team workspaces, nested pages, and rich text editing. Multi-tenant architecture.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Auth.js", "DnD"],
    color: "#f72585",
    gradient: "from-pink-500/10 to-rose-500/10",
    glowColor: "rgba(247, 37, 133,0.15)",
    icon: "📋",
    metrics: { stars: "2.1k", forks: "567", views: "20k" },
    features: ["Drag & Drop", "Team workspaces", "Rich text editor"],
  },
  {
    id: 4,
    title: "DevOps Dashboard",
    subtitle: "CI/CD Monitoring Platform",
    description:
      "A real-time DevOps monitoring dashboard with Docker container management, GitHub Actions integration, deployment logs, and performance metrics.",
    tech: ["React", "Docker", "GitHub API", "Node.js", "MongoDB", "Charts"],
    color: "#00ff88",
    gradient: "from-green-500/10 to-emerald-500/10",
    glowColor: "rgba(0,255,136,0.15)",
    icon: "⚙️",
    metrics: { stars: "650", forks: "180", views: "5k" },
    features: ["Docker integration", "GitHub Actions", "Real-time metrics"],
  },
  {
    id: 5,
    title: "AI Study Assistant",
    subtitle: "GPT-Powered Learning App",
    description:
      "An AI-powered study companion that generates custom quizzes, summarizes PDFs, and creates personalized learning paths using OpenAI's API.",
    tech: ["Next.js", "OpenAI API", "MongoDB", "Langchain", "TypeScript"],
    color: "#ff9900",
    gradient: "from-orange-500/10 to-amber-500/10",
    glowColor: "rgba(255,153,0,0.15)",
    icon: "🧠",
    metrics: { stars: "980", forks: "290", views: "9k" },
    features: ["AI quiz generation", "PDF summarization", "Learning paths"],
  },
  {
    id: 6,
    title: "Crypto Portfolio Tracker",
    subtitle: "Real-time Market Analytics",
    description:
      "A cryptocurrency tracking app with real-time price updates via WebSocket, portfolio analytics, alerts system, and chart visualizations.",
    tech: [
      "React",
      "WebSocket",
      "Chart.js",
      "Node.js",
      "CoinGecko API",
      "Redis",
    ],
    color: "#f6d860",
    gradient: "from-yellow-500/10 to-gold-500/10",
    glowColor: "rgba(246,216,96,0.15)",
    icon: "📈",
    metrics: { stars: "1.5k", forks: "420", views: "15k" },
    features: ["WebSocket updates", "Portfolio analytics", "Price alerts"],
  },
];

function ProjectCard({
  project,
  index,
  onSelect,
  isInView,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
  onSelect: (id: number) => void;
  isInView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    // Use requestAnimationFrame to avoid layout thrashing during mouse move
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    
    // Cache clientX and clientY before RAF
    const clientX = e.clientX;
    const clientY = e.clientY;
    
    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Throttle rotation slightly to reduce math intensity
      const rotateX = (y - centerY) / 25;
      const rotateY = -(x - centerX) / 25;
      
      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
  };

  const handleMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (!cardRef.current) return;
    
    cardRef.current.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    cardRef.current.style.transition =
      "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)";
    setHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: Math.min(index * 0.1, 0.3), // Cap the delay to avoid long queue during rapid scroll
        duration: 0.5, // slightly faster
        ease: "easeOut",
      }}
    >
      <div
        ref={cardRef}
        className="relative rounded-3xl p-6 cursor-pointer overflow-hidden group"
        style={{
          background: "rgba(13,27,62,0.85)", // Replaced expensive blur with solid-ish fallback
          border: `1px solid ${hovered ? project.color + "40" : project.color + "15"}`,
          transform: "translateZ(0)", // Force hardware acceleration
          willChange: "transform", // Hint browser to composite on GPU
          transition: "border-color 0.3s ease, transform 0.1s ease",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => {
          setHovered(true);
          if (cardRef.current) {
            cardRef.current.style.transition = "transform 0.1s ease";
          }
        }}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect(project.id)}
        data-cursor-hover
      >
        {/* Glow on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                background: `radial-gradient(circle at 50% 0%, ${project.glowColor} 0%, transparent 60%)`,
              }}
            />
          )}
        </AnimatePresence>

        {/* Top row */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
              style={{
                background: `${project.color}12`,
                border: `1px solid ${project.color}25`,
              }}
            >
              {project.icon}
            </div>
            <div>
              <h3
                className="text-base font-bold text-star-white"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {project.title}
              </h3>
              <p
                className="text-xs"
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  color: project.color,
                  opacity: 0.7,
                  fontSize: "0.6rem",
                }}
              >
                {project.subtitle}
              </p>
            </div>
          </div>
          <div
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ color: project.color }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </div>
        </div>

        {/* Description */}
        <p
          className="text-sm mb-4 leading-relaxed"
          style={{ color: "rgba(232, 244, 253,0.45)" }}
        >
          {project.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.features.map((feat) => (
            <span
              key={feat}
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                fontFamily: "var(--font-jetbrains)",
                color: project.color,
                background: `${project.color}10`,
                border: `1px solid ${project.color}20`,
                fontSize: "0.6rem",
              }}
            >
              ✓ {feat}
            </span>
          ))}
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-1 rounded-lg"
              style={{
                fontFamily: "var(--font-jetbrains)",
                color: "rgba(232, 244, 253,0.45)",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                fontSize: "0.6rem",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Metrics */}
        <div
          className="flex items-center gap-4 mt-4 pt-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          {[
            { label: "★", value: project.metrics.stars },
            { label: "⑂", value: project.metrics.forks },
            { label: "👁", value: project.metrics.views },
          ].map(({ label, value }) => (
            <span
              key={label}
              className="flex items-center gap-1 text-xs"
              style={{
                fontFamily: "var(--font-jetbrains)",
                color: "rgba(232, 244, 253,0.3)",
                fontSize: "0.65rem",
              }}
            >
              {label} {value}
            </span>
          ))}
        </div>

        {/* Animated bottom border */}
        <motion.div
          className="absolute bottom-0 left-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
          }}
          animate={
            hovered
              ? { width: "100%", opacity: 1 }
              : { width: "0%", opacity: 0 }
          }
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const selectedProject = PROJECTS.find((p) => p.id === selectedId);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: "var(--space-void)" }}
    >
      {/* Background */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(124, 58, 237,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-16"
        >
          <div
            className="text-xs tracking-[0.4em] uppercase mb-4"
            style={{
              fontFamily: "var(--font-jetbrains)",
              color: "rgba(247, 37, 133,0.6)",
              fontSize: "0.65rem",
            }}
          >
            // Featured Work
          </div>
          <h2
            className="section-heading text-5xl md:text-6xl mb-4"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            <span className="text-star-white">Selected </span>
            <span className="gradient-text">Projects</span>
          </h2>
          <p
            className="text-base max-w-xl mx-auto"
            style={{ color: "rgba(232, 244, 253,0.4)" }}
          >
            A showcase of real-world applications built with modern technologies
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onSelect={setSelectedId}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Modal expanded view */}
        <AnimatePresence>
          {selectedId && selectedProject && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: "rgba(3, 5, 15,0.85)",
                  backdropFilter: "blur(20px)",
                }}
              />
              <motion.div
                className="relative z-10 max-w-2xl w-full rounded-3xl p-8 overflow-hidden"
                style={{
                  background: "rgba(13,27,62,1)", // Solid color for flawless rendering instead of inner blur
                  border: `1px solid ${selectedProject.color}30`,
                }}
                initial={{ scale: 0.8, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 40 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Glow */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse, ${selectedProject.glowColor} 0%, transparent 70%)`,
                    filter: "blur(20px)",
                  }}
                />

                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                      style={{
                        background: `${selectedProject.color}12`,
                        border: `1px solid ${selectedProject.color}25`,
                      }}
                    >
                      {selectedProject.icon}
                    </div>
                    <div>
                      <h3
                        className="text-2xl font-bold text-star-white"
                        style={{ fontFamily: "var(--font-outfit)" }}
                      >
                        {selectedProject.title}
                      </h3>
                      <p
                        className="text-sm"
                        style={{ color: selectedProject.color, opacity: 0.7 }}
                      >
                        {selectedProject.subtitle}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedId(null)}
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(232, 244, 253,0.5)",
                    }}
                  >
                    ✕
                  </button>
                </div>

                <p
                  className="text-base leading-relaxed mb-6"
                  style={{ color: "rgba(232, 244, 253,0.6)" }}
                >
                  {selectedProject.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 rounded-xl text-xs"
                      style={{
                        fontFamily: "var(--font-jetbrains)",
                        color: selectedProject.color,
                        background: `${selectedProject.color}12`,
                        border: `1px solid ${selectedProject.color}25`,
                        fontSize: "0.68rem",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href="#"
                    className="flex-1 py-3 rounded-xl text-center text-sm font-semibold tracking-wider"
                    style={{
                      fontFamily: "var(--font-jetbrains)",
                      background: `linear-gradient(135deg, ${selectedProject.color}40, ${selectedProject.color}20)`,
                      border: `1px solid ${selectedProject.color}40`,
                      color: selectedProject.color,
                      fontSize: "0.72rem",
                    }}
                    data-cursor-hover
                  >
                    View Demo →
                  </a>
                  <a
                    href="#"
                    className="flex-1 py-3 rounded-xl text-center text-sm font-semibold tracking-wider"
                    style={{
                      fontFamily: "var(--font-jetbrains)",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(232, 244, 253,0.5)",
                      fontSize: "0.72rem",
                    }}
                    data-cursor-hover
                  >
                    GitHub ⑂
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
