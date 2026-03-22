"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

function NavLink({
  href,
  label,
  onClick,
  isActive,
}: {
  href: string;
  label: string;
  onClick: () => void;
  isActive: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    onClick();
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative text-[15px] transition-colors"
      style={{
        fontFamily: "var(--font-inter)",
        color: hovered || isActive ? "#7c3aed" : "rgba(232, 244, 253, 0.75)",
        fontWeight: isActive ? 600 : 400,
      }}
      data-cursor-hover
    >
      {label}
      <motion.div
        className="absolute -bottom-[4px] left-0 h-[2px] rounded-full"
        style={{ background: "#7c3aed" }}
        animate={{ width: hovered || isActive ? "100%" : "0%" }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      />
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#hero");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Intersection Observer for active sections
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveHash(`#${entry.target.id}`);
        }
      });
    }, { threshold: 0.4 }); // Trigger when 40% of section is visible

    NAV_LINKS.forEach((link) => {
      const el = document.querySelector(link.href);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 py-5 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(3, 5, 15, 0.95)" : "transparent",
        borderBottom: scrolled
          ? "1px solid rgba(232, 244, 253, 0.05)"
          : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        {/* Original Logo */}
        <motion.a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="relative group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          data-cursor-hover
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(0, 229, 255,0.15), rgba(124, 58, 237,0.15))",
              border: "1px solid rgba(0, 229, 255,0.2)",
            }}
          >
            <span
              className="gradient-text text-xl font-black"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              N
            </span>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0, 229, 255,0.2), rgba(124, 58, 237,0.2))",
              }}
            />
          </div>
        </motion.a>

        {/* Desktop Nav - Centered exactly like image */}
        <div className="hidden md:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.label}
              href={link.href}
              label={link.label}
              onClick={() => setMenuOpen(false)}
              isActive={activeHash === link.href}
            />
          ))}
        </div>

        {/* Right Actions: Resume Button + Sun Toggle */}
        <div className="flex items-center gap-6">
          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center justify-center px-6 py-[8px] rounded-full text-[14px] transition-colors"
            style={{
              fontFamily: "var(--font-inter)",
              border: "1px solid rgba(124, 58, 237, 0.4)",
              color: "rgba(232, 244, 253, 0.9)",
              backgroundColor: "rgba(124, 58, 237, 0.05)",
            }}
            whileHover={{
              backgroundColor: "rgba(124, 58, 237, 0.15)",
              borderColor: "rgba(124, 58, 237, 0.8)",
            }}
            whileTap={{ scale: 0.95 }}
            data-cursor-hover
          >
            Resume
          </motion.a>

          {/* Mobile menu button */}
          <button
            className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            data-cursor-hover
          >
            <motion.span
              className="w-5 h-[2px] rounded-full bg-white block"
              animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="w-5 h-[2px] rounded-full bg-white block"
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className="w-5 h-[2px] rounded-full bg-white block"
              animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="md:hidden mt-4 rounded-2xl overflow-hidden"
            style={{
              background: "rgba(3, 5, 15,1)",
              border: "1px solid rgba(0, 229, 255,0.12)",
            }}
          >
            <div className="flex flex-col p-4 gap-4">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.label}
                  href={link.href}
                  label={link.label}
                  onClick={() => setMenuOpen(false)}
                  isActive={activeHash === link.href}
                />
              ))}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-center py-3 rounded-xl transition-colors"
                style={{
                  border: "1px solid rgba(124, 58, 237, 0.4)",
                  color: "#7c3aed",
                  backgroundColor: "rgba(124, 58, 237, 0.05)",
                }}
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
