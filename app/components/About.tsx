"use client";
import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const container = useRef(null);
  const imageRef = useRef(null);

  useGSAP(() => {
    // Parallax effect on the image wrapper
    gsap.to(imageRef.current, {
      y: -50,
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // Staggered text entrance
    gsap.from(".about-text", {
      x: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about-text-container",
        start: "top 80%",
      },
    });
  }, { scope: container });

  return (
    <section ref={container} id="about" className="relative py-32 px-6 md:px-20 bg-background overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* LEFT: Image with Technical Frame */}
        <div className="relative group">
          <div className="absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 border-accent z-10" />
          <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-2 border-r-2 border-accent z-10" />
          
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-charcoal/5">
            <div ref={imageRef} className="relative w-full h-[110%]">
              <Image
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80"
                alt="LBSCEK Campus/Industrial"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover grayscale brightness-110 contrast-125"
              />
            </div>
            <div className="absolute inset-0 bg-accent/5 mix-blend-multiply" />
          </div>
          
          {/* Subtle Label */}
          <div className="absolute top-6 right-6 font-mono text-[9px] text-white/50 bg-charcoal/80 px-2 py-1 backdrop-blur-md">
            LOC_KASARAGOD_12.50
          </div>
        </div>

        {/* RIGHT: Technical Specifications */}
        <div className="about-text-container space-y-10">
          <div className="about-text">
            <span className="text-accent font-mono text-xs uppercase tracking-[0.4em] block mb-4">/ 02 THE SPEC</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
              Defining <br /> <span className="text-charcoal/20 italic">The Mission</span>
            </h2>
          </div>

          <div className="about-text space-y-6 max-w-lg">
            <p className="text-charcoal/70 leading-relaxed text-sm md:text-base font-medium">
              IEEE Industry Applications Society (IAS) at LBSCEK is a technical collective dedicated to bridging the gap between theoretical electrical engineering and real-world industrial systems.
            </p>
            <p className="text-charcoal/50 leading-relaxed text-sm italic">
              "To be the world’s leading professional association for the advancement of technology for humanity."
            </p>
          </div>

          {/* Feature List */}
          <div className="about-text grid grid-cols-2 gap-6 pt-10 border-t border-charcoal/5">
            <div>
              <h4 className="text-accent font-bold text-xs uppercase tracking-widest mb-2">Technical Prowess</h4>
              <p className="text-[10px] text-charcoal/40 font-mono uppercase tracking-tighter">Workshops. Hands-on Training. Certification.</p>
            </div>
            <div>
              <h4 className="text-accent font-bold text-xs uppercase tracking-widest mb-2">Industry Link</h4>
              <p className="text-[10px] text-charcoal/40 font-mono uppercase tracking-tighter">Industrial Visits. Expert Talks. Collaboration.</p>
            </div>
          </div>

          <div className="about-text pt-6">
             <button className="group flex items-center gap-4 hover:text-accent transition-colors">
                <div className="w-10 h-[1px] bg-charcoal group-hover:bg-accent group-hover:w-16 transition-all duration-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Download Society Bylaws</span>
             </button>
          </div>
        </div>
      </div>

      {/* Background Graphic */}
      <div className="absolute bottom-0 right-0 p-20 opacity-[0.03] select-none pointer-events-none">
        <h3 className="text-[15rem] font-black leading-none">IAS</h3>
      </div>
    </section>
  );
}