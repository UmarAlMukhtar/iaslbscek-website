"use client";
import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Hero = () => {
  const containerRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapperRef = useRef(null);
  useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    // 1. Title Entrance
    gsap.from(".title", {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "expo.out",
    });

    gsap.from(".subtitle", {
      opacity: 0,
      y: 40,
      duration: 1.5,
      ease: "expo.out",
      delay: 0.5,
    });

    // 2. Video Scrubbing & Parallax Logic
    const vid = videoRef.current;
    if (!vid) return;

    // Timeline for scroll-based actions
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        // pin: true, // REMOVED so it scrolls naturally
      },
    });

    // Scrub the video time
    vid.onloadedmetadata = () => {
      tl.to(vid, {
        currentTime: vid.duration,
        ease: "none",
      }, 0);
    };

    // PARALLAX: Move the video wrapper DOWN as we scroll
    tl.to(videoWrapperRef.current, {
      y: "30%", // Adjust this percentage for more/less parallax
      ease: "none",
    }, 0);

    // Fade out text content
    tl.to(".content-overlay", {
      opacity: 0,
      y: -100,
      ease: "none",
    }, 0);

  }, { scope: containerRef });

  return (
    <div ref={containerRef} id="hero-wrapper" className="relative h-screen w-full">
      <section id="hero" className="relative h-full w-full flex items-center justify-center overflow-hidden bg-background scroll-mt-24">
        
        {/* Centered Content */}
        <div className="content-overlay z-20 text-center px-6">
          <div className="mb-6">
            <span className="subtitle font-mono text-[10px] tracking-[0.5em] text-accent uppercase block">
              {"// The BluePrint"}
            </span>
          </div>
          
          <h1 className="title text-7xl md:text-[12rem] font-black tracking-tighter leading-none text-charcoal">
           IEEE <span className="text-accent italic font-light">IAS </span>LBSCEK
          </h1>
          
          <div className="mt-10">
            <p className="subtitle text-charcoal/50 text-sm md:text-base font-medium max-w-md mx-auto leading-relaxed uppercase tracking-widest">
              Architecting Industrial Innovation <br /> Through Technical Excellence
            </p>
          </div>
        </div>

        {/* Video Background with Parallax Wrapper */}
        <div ref={videoWrapperRef} className="video-container absolute inset-0 z-0 h-[130%] -top-[15%]">
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover grayscale opacity-20 brightness-105"
            src="/output.mp4"
          />
          {/* Subtle Grid Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(var(--color-accent)_1px,transparent_1px)] bg-size-[40px_40px] opacity-[0.1]" />
        </div>

      </section>
    </div>
  );
};

export default Hero;