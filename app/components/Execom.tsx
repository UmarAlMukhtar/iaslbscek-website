"use client";
import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const leads = [
  { 
    name: "Dr. Sarith Divakar M", 
    role: "Faculty Advisor", 
    dept: "Asst. Prof CSE", 
    id: "STK-00",
    image: "/images/SDM.png" 
  },
  { 
    name: "Sreenivas Pai K", 
    role: "Mentor", 
    dept: "IEEE Senior Member", 
    id: "STK-01",
    image: "/images/SPK.png" 
  },
  { 
    name: "KE Nandagopal", 
    role: "Chairperson", 
    dept: "S8 ECE", 
    id: "STK-02",
    image: "/images/KE.png" 
  },
  { 
    name: "Fathima Basheer MTP", 
    role: "Vice Chairperson", 
    dept: "S6 CSE", 
    id: "STK-03",
    image: "/images/MTP.png" 
  },
  { 
    name: "Abdul Afuw", 
    role: "Treasurer", 
    dept: "S6 ME", 
    id: "STK-04",
    image: "/images/AFU.png" 
  },
  { 
    name: "Thanseeha Nasrin PM", 
    role: "Secretary", 
    dept: "S4 CSE", 
    id: "STK-05",
    image: "/images/TNPM.png" 
  },
  { 
    name: "Umar Al Mukhtar Ibrahimkutty", 
    role: "Webmaster", 
    dept: "S6 CSE", 
    id: "STK-06",
    image: "/images/UAM.png" 
  },
  { 
    name: "Nithya A", 
    role: "MDC", 
    dept: "S4 CSE", 
    id: "STK-07",
    image: "/images/NITY.png" 
  },
  { 
    name: "Aswathy Shyji", 
    role: "MDC", 
    dept: "S4 CSE", 
    id: "STK-08",
    image: "/images/ASW.png" 
  },
  { 
    name: "Aysha Safa", 
    role: "MDC", 
    dept: "S4 CSE", 
    id: "STK-09",
    image: "/images/AYS.png" 
  },
  { 
    name: "Adhish R", 
    role: "Designer", 
    dept: "S6 CSE", 
    id: "STK-10",
    image: "/images/ADH.png" 
  },
  { 
    name: "Nivedya PV", 
    role: "Designer", 
    dept: "S4 CSE", 
    id: "STK-11",
    image: "/images/NIV.png" 
  },
  { 
    name: "Neeraj Rajeev", 
    role: "Technical Activity Coordinator", 
    dept: "S4 CSE", 
    id: "STK-12",
    image: "/images/NEER.png" 
  },
  { 
    name: "Harikrishnan Panayal", 
    role: "Student Activity Coordinator", 
    dept: "S6 ECE", 
    id: "STK-13",
    image: "/images/HARI.png" 
  },
];

export default function Execom() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray<HTMLElement>(".member-card");
    gsap.set(cards, { autoAlpha: 0, y: 40 });

    ScrollTrigger.batch(cards, {
      start: "top 85%",
      onEnter: (batch) =>
        gsap.to(batch, {
          autoAlpha: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: "power3.out",
          overwrite: true,
        }),
      onLeaveBack: (batch) =>
        gsap.set(batch, {
          autoAlpha: 0,
          y: 40,
          overwrite: true,
        }),
    });

    // Ensure trigger positions are correct after layout/images settle.
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, { scope: container });

  return (
    <section ref={container} id="execom" className="py-32 px-6 md:px-20 bg-background scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-accent font-mono text-xs uppercase tracking-[0.5em] block mb-4">/ 04 CORE STACK</span>
            <h2 className="text-6xl font-black tracking-tighter uppercase leading-none">
              Executive <br /> <span className="text-charcoal/20 italic">Committee</span>
            </h2>
          </div>
          <div className="font-mono text-[10px] text-charcoal/40 uppercase tracking-widest text-right">
            LBSCEK_IAS_OFFICERS_2025-26 <br />
            [TOTAL_MEMBERS: 14]
          </div>
        </div>

        {/* Member Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-charcoal/5 border border-charcoal/5">
          {leads.map((member, i) => (
            <div 
              key={i} 
              className="member-card group bg-white p-0 relative overflow-hidden transition-all duration-500 hover:bg-accent/2"
            >
              {/* Image Container with BG removed styling */}
              <div className="relative aspect-4/5 overflow-hidden bg-[#f3f3f3]">
                {/* Subtle Grid Background for BG-less photos */}
                <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-size-[20px_20px]" />
                
                {/* Radial gradient to highlight the subject */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(152,251,152,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-contain object-bottom grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 z-10"
                />
                
                {/* Technical Scan Line */}
                <div className="absolute top-0 left-0 w-full h-0.5 bg-accent -translate-y-full group-hover:animate-scan z-20" />
                
                {/* ID Tag Overlay */}
                <div className="absolute top-4 left-4 z-20">
                   <span className="font-mono text-[9px] bg-charcoal text-white px-2 py-1 tracking-widest uppercase">
                    {member.id}
                   </span>
                </div>
              </div>

              {/* Text Details */}
              <div className="p-8 relative z-10 bg-white">
                <div className="space-y-4">
                  <h4 className="text-2xl font-bold tracking-tight uppercase group-hover:text-accent transition-colors leading-tight">
                    {member.name}
                  </h4>
                  <div>
                    <p className="text-[10px] font-mono font-bold text-accent uppercase tracking-widest">{member.role}</p>
                    <p className="text-[9px] font-mono text-charcoal/40 uppercase tracking-tighter">{member.dept}</p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-charcoal/5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 text-charcoal/60">
                   <p className="text-[9px] font-mono leading-tight uppercase tracking-tighter">
                     {"// Ready for Industrial "}<br /> Collaboration
                   </p>
                </div>
              </div>

              {/* Decorative Number */}
              <div className="absolute top-2 right-2 text-charcoal/3 font-black text-6xl italic select-none pointer-events-none">
                0{i + 1}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="text-[10px] font-mono text-charcoal/30 uppercase tracking-[0.4em] hover:text-accent transition-colors">
            {"// Access_Full_Officer_Directory.exe"}
          </button>
        </div>
      </div>
    </section>
  );
}