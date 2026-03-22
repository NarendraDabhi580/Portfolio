"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Instagram } from "lucide-react";

const NaukriIcon = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6.3 3.9C6.3 3.4 5.9 3 5.4 3s-.9.4-.9.9v16.2c0 .5.4.9.9.9s.9-.4.9-.9v-9l7.7 9.5c.3.3.8.4 1.1.2.3-.2.5-.5.5-.9V3.9c0-.5-.4-.9-.9-.9s-.9.4-.9.9v9L6.1 3.5c0-.1-.1-.1-.1-.1" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="relative py-6 px-6 overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0, 229, 255,0.2), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0, 229, 255,0.15), rgba(124, 58, 237,0.15))",
                border: "1px solid rgba(0, 229, 255,0.2)",
              }}
            >
              <span
                className="gradient-text text-sm font-black"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                N
              </span>
            </div>
            <span
              className="text-sm"
              style={{
                fontFamily: "var(--font-jetbrains)",
                color: "rgba(232, 244, 253,0.3)",
                fontSize: "0.7rem",
              }}
            >
              Narendra Dabhi © {new Date().getFullYear()}
            </span>
          </div>

          {/* Center text */}
          <p
            className="text-xs text-center"
            style={{
              fontFamily: "var(--font-jetbrains)",
              color: "rgba(232, 244, 253,0.2)",
              fontSize: "0.62rem",
            }}
          >
            Built with Next.js · React Three Fiber · Framer Motion
          </p>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {[
              {
                icon: <Github size={15} />,
                label: "GitHub",
                href: "https://github.com/NarendraDabhi580",
              },
              {
                icon: <Linkedin size={15} />,
                label: "LinkedIn",
                href: "https://linkedin.com/in/narendra-dabhi",
              },
              {
                icon: <NaukriIcon size={14} />,
                label: "Naukri",
                href: "https://www.naukri.com/mnjuser/profile",
              },
              {
                icon: <Instagram size={15} />,
                label: "Instagram",
                href: "https://www.instagram.com/itz_nandu_dabhi",
              },
            ].map(({ icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(232, 244, 253, 0.7)",
                }}
                whileHover={{
                  scale: 1.1,
                  borderColor: "rgba(0, 229, 255, 0.4)",
                  background: "rgba(0, 229, 255, 0.1)",
                  color: "#00e5ff",
                }}
                whileTap={{ scale: 0.95 }}
                title={label}
                data-cursor-hover
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
