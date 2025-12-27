"use client";
import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Navbar() {
  const navRef = useRef(null);
  const logoRef = useRef(null);

  useGSAP(() => {
    gsap.to(navRef.current, {
      backgroundColor: "rgba(251, 251, 251, 0.9)",
      backdropFilter: "blur(12px)",
      paddingTop: "0.5rem",
      paddingBottom: "0.5rem",
      scrollTrigger: {
        trigger: "body",
        start: "50px top",
        end: "100px top",
        scrub: true,
      },
    });

    gsap.to(logoRef.current, {
      scale: 0.8,
      scrollTrigger: {
        trigger: "body",
        start: "50px top",
        end: "100px top",
        scrub: true,
      },
    });
  }, { scope: navRef });

  return (
    <nav 
      ref={navRef} 
      className="fixed top-0 left-0 w-full z-[100] px-6 py-6 transition-all duration-500 ease-out"
    >
      {/* Reduced width from max-w-7xl to max-w-5xl */}
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        
        {/* Logo Section - Image size kept as is */}
        <div className="flex items-center w-[100px] md:w-[120px]"> 
          <div 
            ref={logoRef}
            className="relative w-24 h-24 md:w-32 md:h-15" 
          >
            <Image
              src="/ias-logo.svg"
              alt="IEEE IAS LBSCEK logo"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Home", href: "#hero" },
            { label: "The Spec", href: "#about" },
            { label: "Operations", href: "#events" },
            { label: "Core Stack", href: "#execom" },
          ].map((item, i) => (
            <a 
              key={i}
              href={item.href}
              className="text-[10px] font-bold uppercase tracking-widest text-charcoal/60 hover:text-accent transition-colors"
            >
              0{i + 1}_{item.label.replace(" ", "_")}
            </a>
          ))}
          
          <a
            href="https://www.ieee.org/membership-catalog/productdetail/showProductDetailPage.html?product=MEMIA034&searchResults=Y"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-charcoal text-white text-[9px] font-bold uppercase tracking-widest rounded-full hover:bg-accent hover:text-charcoal transition-all shadow-lg shadow-charcoal/5"
          >
            Join_Now
          </a>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex flex-col gap-1.5 w-6 cursor-pointer">
           <div className="h-[2px] w-full bg-charcoal" />
           <div className="h-[2px] w-2/3 bg-charcoal self-end" />
        </div>
      </div>
    </nav>
  );
}