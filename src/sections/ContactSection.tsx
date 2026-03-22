"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          // Add your Web3Forms access key here:
          access_key: "6315378c-3f08-4f2d-b55a-134d8eb48d1c",
          name: form.name,
          email: form.email,
          message: form.message,
          subject: "New Message Received",
          from_name: "Source - Portfolio",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        console.error(result);
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const inputStyle = (field: string) => ({
    background:
      focused === field ? "rgba(0, 229, 255,0.06)" : "rgba(255,255,255,0.03)",
    border:
      focused === field
        ? "1px solid rgba(0, 229, 255,0.4)"
        : "1px solid rgba(255,255,255,0.08)",
    boxShadow:
      focused === field
        ? "0 0 20px rgba(0, 229, 255,0.1), inset 0 0 20px rgba(0, 229, 255,0.03)"
        : "none",
    transition: "all 0.3s ease",
  });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: "var(--space-dark)" }}
    >
      {/* Background */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0, 229, 255,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto">
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
              color: "rgba(0, 229, 255,0.6)",
              fontSize: "0.65rem",
            }}
          >
            // Establish Connection
          </div>
          <h2
            className="section-heading text-5xl md:text-6xl mb-4"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            <span className="text-star-white">Let&apos;s </span>
            <span className="gradient-text">Connect</span>
          </h2>
          <p
            className="text-base max-w-lg mx-auto"
            style={{ color: "rgba(232, 244, 253,0.4)" }}
          >
            Have a project in mind? Let&apos;s build something remarkable
            together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left info panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Contact cards */}
            {[
              {
                icon: "✉️",
                label: "Email",
                value: "nandudabhi580@gmail.com",
                href: "mailto:nandudabhi580@gmail.com",
                color: "#00e5ff",
              },
              {
                icon: "💼",
                label: "LinkedIn",
                value: "linkedin.com/in/narendra-dabhi",
                href: "https://linkedin.com/in/narendra-dabhi",
                color: "#7c3aed",
              },
              {
                icon: "📞",
                label: "Phone",
                value: "+91 79903 33121",
                href: "tel:+917990333121",
                color: "#f72585",
              },
            ].map((contact, i) => (
              <motion.a
                key={contact.label}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                className="flex items-center gap-4 p-4 rounded-2xl group block"
                style={{
                  background: "rgba(13,27,62,0.85)",
                  border: `1px solid ${contact.color}15`,
                  transition: "border-color 0.3s ease, background 0.3s ease",
                }}
                whileHover={{
                  borderColor: `${contact.color}35`,
                  x: 4,
                }}
                data-cursor-hover
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                  style={{
                    background: `${contact.color}12`,
                    border: `1px solid ${contact.color}20`,
                  }}
                >
                  {contact.icon}
                </div>
                <div>
                  <div
                    className="text-xs tracking-wider uppercase mb-0.5"
                    style={{
                      fontFamily: "var(--font-jetbrains)",
                      color: contact.color,
                      opacity: 0.6,
                      fontSize: "0.6rem",
                    }}
                  >
                    {contact.label}
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: "rgba(232, 244, 253,0.6)" }}
                  >
                    {contact.value}
                  </div>
                </div>
                <div
                  className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: contact.color }}
                >
                  →
                </div>
              </motion.a>
            ))}

            {/* Availability indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="p-4 rounded-2xl"
              style={{
                background: "rgba(0,255,136,0.06)",
                border: "1px solid rgba(0,255,136,0.15)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                <span
                  className="text-xs font-semibold tracking-wider uppercase"
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    color: "#00ff88",
                    fontSize: "0.65rem",
                  }}
                >
                  Open to Work
                </span>
              </div>
              <p className="text-xs" style={{ color: "rgba(0,255,136,0.5)" }}>
                Available for full-time positions & freelance projects
              </p>
            </motion.div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="lg:col-span-3"
          >
            <div
              className="relative rounded-3xl p-8 overflow-hidden"
              style={{
                background: "rgba(13,27,62,0.85)",
                border: "1px solid rgba(0, 229, 255,0.1)",
              }}
            >
              {/* Corner decorations */}
              {[
                "top-3 left-3",
                "top-3 right-3",
                "bottom-3 left-3",
                "bottom-3 right-3",
              ].map((pos, i) => (
                <div
                  key={i}
                  className={`absolute ${pos} w-3 h-3`}
                  style={{
                    borderTop:
                      i < 2 ? "1px solid rgba(0, 229, 255,0.3)" : "none",
                    borderBottom:
                      i >= 2 ? "1px solid rgba(0, 229, 255,0.3)" : "none",
                    borderLeft:
                      i === 0 || i === 2
                        ? "1px solid rgba(0, 229, 255,0.3)"
                        : "none",
                    borderRight:
                      i === 1 || i === 3
                        ? "1px solid rgba(0, 229, 255,0.3)"
                        : "none",
                  }}
                />
              ))}

              <AnimatePresence mode="wait">
                {status === "sent" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <motion.div
                      className="w-20 h-20 rounded-full flex items-center justify-center mb-6 text-4xl"
                      style={{
                        background: "rgba(0,255,136,0.12)",
                        border: "1px solid rgba(0,255,136,0.3)",
                        boxShadow: "0 0 40px rgba(0,255,136,0.2)",
                      }}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      ✓
                    </motion.div>
                    <h3
                      className="text-2xl font-bold mb-2"
                      style={{
                        fontFamily: "var(--font-outfit)",
                        color: "#00ff88",
                      }}
                    >
                      Message Sent!
                    </h3>
                    <p style={{ color: "rgba(232, 244, 253,0.4)" }}>
                      I&apos;ll get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid sm:grid-cols-2 gap-5">
                      {/* Name */}
                      <div>
                        <label
                          className="block text-xs mb-2 tracking-wider uppercase"
                          style={{
                            fontFamily: "var(--font-jetbrains)",
                            color:
                              focused === "name"
                                ? "#00e5ff"
                                : "rgba(232, 244, 253,0.35)",
                            fontSize: "0.6rem",
                            transition: "color 0.3s ease",
                          }}
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          onFocus={() => setFocused("name")}
                          onBlur={() => setFocused(null)}
                          required
                          placeholder="Your name"
                          className="w-full px-4 py-3 rounded-xl text-sm placeholder:text-white/20"
                          style={{
                            fontFamily: "var(--font-jetbrains)",
                            color: "rgba(232, 244, 253,0.8)",
                            fontSize: "0.82rem",
                            outline: "none",
                            ...inputStyle("name"),
                          }}
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          className="block text-xs mb-2 tracking-wider uppercase"
                          style={{
                            fontFamily: "var(--font-jetbrains)",
                            color:
                              focused === "email"
                                ? "#00e5ff"
                                : "rgba(232, 244, 253,0.35)",
                            fontSize: "0.6rem",
                            transition: "color 0.3s ease",
                          }}
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                          onFocus={() => setFocused("email")}
                          onBlur={() => setFocused(null)}
                          required
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 rounded-xl text-sm placeholder:text-white/20"
                          style={{
                            fontFamily: "var(--font-jetbrains)",
                            color: "rgba(232, 244, 253,0.8)",
                            fontSize: "0.82rem",
                            outline: "none",
                            ...inputStyle("email"),
                          }}
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        className="block text-xs mb-2 tracking-wider uppercase"
                        style={{
                          fontFamily: "var(--font-jetbrains)",
                          color:
                            focused === "message"
                              ? "#00e5ff"
                              : "rgba(232, 244, 253,0.35)",
                          fontSize: "0.6rem",
                          transition: "color 0.3s ease",
                        }}
                      >
                        Message
                      </label>
                      <textarea
                        rows={5}
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        onFocus={() => setFocused("message")}
                        onBlur={() => setFocused(null)}
                        required
                        placeholder="Tell me about your project..."
                        className="w-full px-4 py-3 rounded-xl text-sm placeholder:text-white/20 resize-none"
                        style={{
                          fontFamily: "var(--font-jetbrains)",
                          color: "rgba(232, 244, 253,0.8)",
                          fontSize: "0.82rem",
                          outline: "none",
                          ...inputStyle("message"),
                        }}
                      />
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full py-4 rounded-xl font-bold tracking-wider uppercase relative overflow-hidden"
                      style={{
                        fontFamily: "var(--font-jetbrains)",
                        background:
                          status === "sending"
                            ? "rgba(0, 229, 255,0.1)"
                            : "linear-gradient(135deg, #00e5ff, #7c3aed)",
                        color: "#fff",
                        fontSize: "0.72rem",
                        letterSpacing: "0.12em",
                        cursor:
                          status === "sending" ? "not-allowed" : "pointer",
                      }}
                      whileHover={
                        status !== "sending"
                          ? {
                              scale: 1.02,
                              boxShadow: "0 0 30px rgba(0, 229, 255,0.4)",
                            }
                          : {}
                      }
                      whileTap={status !== "sending" ? { scale: 0.98 } : {}}
                      data-cursor-hover
                    >
                      {status === "sending" ? (
                        <span className="flex items-center justify-center gap-2">
                          <motion.span
                            className="w-1 h-4 rounded-full bg-white/50 inline-block"
                            animate={{ scaleY: [1, 2, 1] }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay: 0,
                            }}
                          />
                          <motion.span
                            className="w-1 h-4 rounded-full bg-white/50 inline-block"
                            animate={{ scaleY: [1, 2, 1] }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay: 0.15,
                            }}
                          />
                          <motion.span
                            className="w-1 h-4 rounded-full bg-white/50 inline-block"
                            animate={{ scaleY: [1, 2, 1] }}
                            transition={{
                              duration: 0.6,
                              repeat: Infinity,
                              delay: 0.3,
                            }}
                          />
                        </span>
                      ) : (
                        "Transmit Message →"
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
