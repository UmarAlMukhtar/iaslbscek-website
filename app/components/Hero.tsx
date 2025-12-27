"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Hero = () => {
  const containerRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapperRef = useRef(null);

  // Improve autoplay reliability (mobile Safari / visibility changes / bfcache restore)
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    const kick = () => {
      try {
        vid.muted = true;
        // iOS Safari requires playsInline for background videos.
        vid.playsInline = true;

        // If the element was hidden (loader) some browsers delay fetching/decoding.
        if (vid.readyState < 2) {
          vid.load();
        }

        const playPromise = vid.play();
        if (playPromise && typeof (playPromise as Promise<void>).then === "function") {
          (playPromise as Promise<void>)
            .then(() => {
              // We scrub via GSAP, so keep it paused.
              vid.pause();
            })
            .catch(() => {
              // Autoplay can still be blocked (Low Power Mode / user settings).
            });
        }
      } catch {
        // Ignore
      }
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") kick();
    };

    kick();
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pageshow", kick);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pageshow", kick);
    };
  }, []);

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

    let scrubTween: gsap.core.Tween | null = null;
    const setupScrub = () => {
      if (!Number.isFinite(vid.duration) || vid.duration <= 0) return;

      // Ensure we have a decodable frame.
      if (vid.currentTime === 0) {
        try {
          vid.currentTime = 0.001;
        } catch {
          // Ignore
        }
      }

      if (scrubTween) {
        tl.remove(scrubTween);
        scrubTween.kill();
        scrubTween = null;
      }

      scrubTween = gsap.to(vid, {
        currentTime: vid.duration,
        ease: "none",
      });
      tl.add(scrubTween, 0);
    };

    if (vid.readyState >= 1) {
      setupScrub();
    } else {
      vid.addEventListener("loadedmetadata", setupScrub, { once: true });
    }

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

    return () => {
      if (scrubTween) {
        tl.remove(scrubTween);
        scrubTween.kill();
      }
    };

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