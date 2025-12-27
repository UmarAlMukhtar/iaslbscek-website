"use client";
import { useState, useEffect } from "react";
import Loader from "./components/Loader";
import Navbar from "./components/NavBar";
import Hero from "./components/Hero";
import About from "./components/About";
import Events from "./components/Events";
import Execom from "./components/Execom";
import Footer from "./components/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Prevent scrolling while the loader is active
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [loading]);

  return (
    <main className="relative bg-background overflow-x-hidden">
      {/* 1. INITIAL SYSTEM LOADER */}
      {loading && (
        <Loader onComplete={() => setLoading(false)} />
      )}

      {/* 2. MAIN WEBSITE CONTENT */}
      <div 
        className={`transition-opacity duration-1000 ease-in-out ${
          loading ? "opacity-0 invisible" : "opacity-100 visible"
        }`}
      >
        {/* Floating Navigation */}
        <Navbar />

        {/* Section 01: Hero with Scrubbing Video */}
        <Hero />

        {/* Section 02: About Us (The Spec) */}
        <About />

        {/* Section 03: Events (Horizontal Scroll / Operations) */}
        <Events />

        {/* Section 04: Execom (Core Stack) */}
        <Execom />

        {/* Section 05: System Termination (Footer) */}
        <Footer />
      </div>

      {/* Optional: Global Progress Line at the very top of the screen */}
      {!loading && (
        <div className="fixed top-0 left-0 w-full h-0.5 z-110 pointer-events-none">
          <div id="scroll-progress" className="h-full bg-accent w-0" />
        </div>
      )}
    </main>
  );
}