"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const loaderRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ onComplete });
    gsap.set(progressRef.current, { width: 0 });

    tl.to(progressRef.current, {
      width: "100%",
      duration: 2,
      ease: "power2.inOut",
    })
    .to(loaderRef.current, {
      yPercent: -100, // Slides up
      duration: 1,
      ease: "expo.inOut",
      delay: 0.3
    });
  }, [onComplete]);

  return (
    /* Change 1: Use 'fixed' and 'inset-0' to force it over everything.
       Change 2: Use 'z-[9999]' to ensure it sits above Navbars/Headers.
    */
    <div 
      ref={loaderRef} 
      className="fixed inset-0 w-full h-full z-[9999] bg-background flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="flex flex-col items-center w-full max-w-xs px-10">
        <h1 className="text-[10px] font-mono font-bold tracking-[0.5em] uppercase mb-8 text-charcoal/40">
          IEEE IAS <span className="text-accent font-black tracking-normal ml-2">LBSCEK</span>
        </h1>

        <div className="w-full h-[1px] bg-charcoal/5 relative">
          <div 
            ref={progressRef} 
            className="absolute top-0 left-0 h-full bg-accent shadow-[0_0_15px_#98FB98]"
          />
        </div>
      </div>
    </div>
  );
}   