"use client";
import { useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import heavy components
const LoadingScreen = dynamic(() => import("@/components/ui/LoadingScreen"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), { ssr: false });
const ScrollProgress = dynamic(() => import("@/components/ui/ScrollProgress"), { ssr: false });
const ScrollToTop = dynamic(() => import("@/components/ui/ScrollToTop"), { ssr: false });
const Navbar = dynamic(() => import("@/components/ui/Navbar"), { ssr: false });
const Footer = dynamic(() => import("@/components/ui/Footer"), { ssr: false });

import InfiniteMarquee from "@/components/ui/InfiniteMarquee";
import HeroSection from "@/sections/HeroSection";
import AboutSection from "@/sections/AboutSection";
import SkillsSection from "@/sections/SkillsSection";
import ProjectsSection from "@/sections/ProjectsSection";
import ContactSection from "@/sections/ContactSection";

export default function Home() {

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = "none";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <>
      {/* Loading screen */}
      <LoadingScreen />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Scroll progress */}
      <ScrollProgress />

      {/* Scroll to top button */}
      <ScrollToTop />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main className="relative">
        {/* Hero */}
        <HeroSection />

        {/* Infinite Scrolling Marquee */}
        <InfiniteMarquee />

        {/* About */}
        <AboutSection />

        {/* Skills */}
        <SkillsSection />

        {/* Projects */}
        <ProjectsSection />

        {/* Contact */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
