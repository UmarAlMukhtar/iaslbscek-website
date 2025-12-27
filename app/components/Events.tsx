"use client";
import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const events = [
  {
    id: "EV-01",
    title: "Inaugration Ceremony",
    type: "Talk Session",
    date: "OCT 2025",
    desc: "Kickstarting the academic year with insights from industry leaders on emerging technologies.",
    img: "/events/EV_01.jpg"
  },
  {
    id: "EV-02",
    title: "Onam Tech-Fusion",
    type: "Workshops & Competitions",
    date: "AUG 2025",
    desc: "A blend of traditional festivities with modern tech workshops and competitive events.",
    img: "/events/EV_02.jpg"
  },
  {
    id: "EV-03",
    title: "Startup Coffee Chat - CS Manu Francis",
    type: "Talk Session",
    date: "JUL 2025",
    desc: "An interactive session with CS Manu Francis discussing startup culture and innovation.",
    img: "/events/EV_03.jpg"
  },
  {
    id: "EV-04",
    title: "Useless Projects - Tinkerhub Hackathon",
    type: "Competition",
    date: "AUG 2026",
    desc: "A hackathon focused on creating unconventional and 'useless' tech projects for fun and learning.",
    img: "/events/EV_04.jpg"
  }
];

export default function Events() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  useGSAP(() => {
    const pin = gsap.fromTo(
      triggerRef.current,
      { x: 0 },
      {
        x: "-300vw", // Moves across based on the number of items
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: "+=3000", // Length of the scroll
        },
      }
    );
    return () => pin.kill();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="events" className="overflow-hidden bg-white scroll-mt-24">
      <div ref={triggerRef} className="relative flex h-screen w-[400vw] items-center px-[10vw]">
        
        {/* Intro Slide */}
        <div className="flex h-full w-screen flex-col justify-center pr-20">
          <span className="font-mono text-xs uppercase tracking-[0.5em] text-accent mb-4">/ 03 Operations</span>
          <h2 className="text-8xl font-black uppercase tracking-tighter leading-none">
            Event <br /> <span className="text-charcoal/10 italic">Log</span>
          </h2>
          <p className="mt-8 text-charcoal/40 font-mono text-[10px] uppercase tracking-widest animate-pulse">
            Scroll to Navigate Timeline →
          </p>
        </div>

        {/* Event Cards */}
        {events.map((event, index) => (
          <div key={index} className="flex h-full w-screen items-center justify-center px-10">
            <div className="relative grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl gap-12 items-center">
              
              {/* Image Side */}
              <div className="relative aspect-video md:aspect-square overflow-hidden rounded-xl bg-gray-100 group">
                <div className="absolute top-4 left-4 z-20 bg-accent px-3 py-1 font-mono text-[10px] font-bold text-white">
                  {event.id}
                </div>
                <Image
                  src={event.img}
                  alt={event.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-accent/10 mix-blend-multiply" />
              </div>

              {/* Text Side */}
              <div className="space-y-6">
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent border-b border-accent/20 pb-2">
                  {event.type} {"//"} {event.date}
                </span>
                <h3 className="text-5xl font-bold uppercase tracking-tighter leading-tight">
                  {event.title}
                </h3>
                <p className="text-charcoal/60 text-sm leading-relaxed max-w-sm">
                  {event.desc}
                </p>
                
                <div className="pt-8">
                  <button className="h-12 w-12 rounded-full border border-charcoal/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all duration-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-charcoal" />
                  </button>
                </div>
              </div>

              {/* Background Number */}
              <span className="absolute -bottom-10 -right-10 text-[15rem] font-black text-charcoal/3 select-none pointer-events-none">
                0{index + 1}
              </span>
            </div>
          </div>
        ))}

        {/* Ending Spacer */}
        <div className="w-[50vw] flex items-center justify-center">
             <div className="w-px h-40 bg-linear-to-b from-accent to-transparent" />
        </div>
      </div>
    </section>
  );
}