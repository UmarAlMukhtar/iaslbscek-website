"use client";
import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Member = {
  name: string;
  role: string;
  dept: string;
  id: string;
  image: string;
  linkedin?: string;
};

type YearData = {
  label: string;
  tag: string;
  members: Member[];
};

/* ── LinkedIn SVG icon ── */
function LinkedInIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const execomByYear: Record<string, YearData> = {
  "2025": {
    label: "2025",
    tag: "LBSCEK_IAS_OFFICERS_2025",
    members: [
      { name: "Dr. Sarith Divakar M", role: "Faculty Advisor", dept: "Asst. Prof CSE", id: "STK-00", image: "/images/SDM.png", linkedin: "https://www.linkedin.com/in/sarithdivakarm/" },
      { name: "Srinivas Pai K", role: "Mentor", dept: "IEEE Senior Member", id: "STK-01", image: "/images/SPK.png", linkedin: "https://www.linkedin.com/in/ersreenivaspaik/" },
      { name: "K E Nandagopal", role: "Chairperson", dept: "S6 ECE", id: "STK-02", image: "/images/KE.png", linkedin: "https://www.linkedin.com/in/kenandagopal/" },
      { name: "Fathima Basheer MTP", role: "Vice Chairperson", dept: "S6 CSE", id: "STK-03", image: "/images/MTP.png", linkedin: "https://www.linkedin.com/in/fathimabasheermtp/" },
      { name: "Abdul Afuw", role: "Treasurer", dept: "S6 ME", id: "STK-04", image: "/images/AFU.png", linkedin: "https://www.linkedin.com/in/afuwabdulsathar/" },
      { name: "Thanseeha Nasrin PM", role: "Secretary", dept: "S4 CSE", id: "STK-05", image: "/images/TNPM.png", linkedin: "https://www.linkedin.com/in/thanseeha-na/" },
      { name: "Umar Al Mukhtar Ibrahimkutty", role: "Webmaster", dept: "S6 CSE", id: "STK-06", image: "/images/UAM.png", linkedin: "https://www.linkedin.com/in/umaralmukhtaribrahimkutty/" },
      { name: "Nithya A", role: "MDC", dept: "S4 CSE", id: "STK-07", image: "/images/NITY.png", linkedin: "https://www.linkedin.com/in/nithyaavilary/" },
      { name: "Aswathy Shyji", role: "MDC", dept: "S4 CSE", id: "STK-08", image: "/images/ASW.png", linkedin: "https://www.linkedin.com/in/aswathy-shyji/" },
      { name: "Aysha Safa", role: "MDC", dept: "S4 CSE", id: "STK-09", image: "/images/AYS.png", linkedin: "https://www.linkedin.com/in/aysha-safa-803b82330/" },
      { name: "Adhish R", role: "Designer", dept: "S6 CSE", id: "STK-10", image: "/images/ADH.png", linkedin: "https://www.linkedin.com/in/adhishratheesh/" },
      { name: "Nivedya PV", role: "Designer", dept: "S4 CSE", id: "STK-11", image: "/images/NIV.png", linkedin: "" },
      { name: "Neeraj Rajeev", role: "Technical Activity Coordinator", dept: "S4 CSE", id: "STK-12", image: "/images/NEER.png", linkedin: "https://www.linkedin.com/in/idkneeraj/" },
      { name: "Harikrishnan Panayal", role: "Student Activity Coordinator", dept: "S6 ECE", id: "STK-13", image: "/images/HARI.png", linkedin: "https://www.linkedin.com/in/harikrishnanpanayal/" },
    ],
  },
  "2026": {
    label: "2026",
    tag: "LBSCEK_IAS_OFFICERS_2026",
    members: [
      { name: "Dr. Sarith Divakar M", role: "Faculty Advisor", dept: "Asst. Prof CSE", id: "STK-00", image: "/images/SDM.png", linkedin: "https://www.linkedin.com/in/sarithdivakarm/" },
      { name: "KE Nandagopal", role: "Mentor", dept: "IEEE IAS SBC Past Chair", id: "STK-01", image: "/images/KE.png", linkedin: "https://www.linkedin.com/in/kenandagopal/" },
      { name: "Fathima Basheer MTP", role: "Chairperson", dept: "S7 CSE", id: "STK-02", image: "/images/MTP.png", linkedin: "https://www.linkedin.com/in/fathimabasheermtp/" },
      { name: "Mohammed Zain", role: "Vice Chairperson", dept: "S7 EEE", id: "STK-03", image: "/images/zai.png", linkedin: "https://www.linkedin.com/in/zainm5158/" },
      { name: "Thameem T M", role: "Treasurer", dept: "S3 ECE", id: "STK-04", image: "/images/tha.png", linkedin: "https://www.linkedin.com/in/thameemtm/" },
      { name: "Thanseeha Nasrin PM", role: "Secretary", dept: "S5 CSE", id: "STK-05", image: "/images/TNPM.png", linkedin: "https://www.linkedin.com/in/thanseeha-na/" },
      { name: "Aswathy Shyji", role: "Webmaster", dept: "S5 CSE", id: "STK-06", image: "/images/ASW.png", linkedin: "https://www.linkedin.com/in/aswathy-shyji/" },
      { name: "Alphons N J", role: "MDC", dept: "S3 ECE", id: "STK-07", image: "/images/alp.png", linkedin: "https://www.linkedin.com/in/alphonsnj/" },
      { name: "Mohammed Shasin Chalil", role: "MDC", dept: "S3 CSE", id: "STK-08", image: "/images/sha.png", linkedin: "https://www.linkedin.com/in/mohammedshasinchalil/" },
      { name: "Nithya A", role: "Content Writer", dept: "S5 CSE", id: "STK-09", image: "/images/NITY.png", linkedin: "https://www.linkedin.com/in/nithyaavilary/" },
      { name: "Jyothish Nalinakshan", role: "Design Coordinator", dept: "S3 CSBS", id: "STK-10", image: "/images/jyo.png", linkedin: "https://www.linkedin.com/in/jyothish-nalinakshan/" },
      { name: "Mohammed Sinan", role: "EC Coordinator", dept: "S3 ECE", id: "STK-11", image: "/images/sin.png", linkedin: "https://www.linkedin.com/in/mohdsinanabdulla/" },
      { name: "Fathima Ridha P", role: "Technical Activity Coordinator", dept: "S3 CSE", id: "STK-12", image: "/images/riid.png", linkedin: "https://www.linkedin.com/in/fathimaridha/" },
      { name: "Ambika M", role: "Student Activity Coordinator", dept: "S3 ECE", id: "STK-13", image: "/images/ambi.png", linkedin: "https://www.linkedin.com/in/ambikaam/" },
    ],
  },
};

const yearKeys = Object.keys(execomByYear);

export default function Execom() {
  const container = useRef(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeYear, setActiveYear] = useState("2026");

  const currentData = execomByYear[activeYear];

  const animateCards = useCallback(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll<HTMLElement>(".member-card");
    gsap.set(cards, { autoAlpha: 0, y: 40 });
    gsap.to(cards, {
      autoAlpha: 1,
      y: 0,
      stagger: 0.06,
      duration: 0.6,
      ease: "power3.out",
      overwrite: true,
    });
  }, []);

  const handleYearSwitch = useCallback(
    (year: string) => {
      if (year === activeYear || !gridRef.current) return;

      const cards = gridRef.current.querySelectorAll<HTMLElement>(".member-card");
      gsap.to(cards, {
        autoAlpha: 0,
        y: -20,
        stagger: 0.03,
        duration: 0.3,
        ease: "power2.in",
        overwrite: true,
        onComplete: () => {
          setActiveYear(year);
          // Wait for React to render new cards, then animate in
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              animateCards();
              ScrollTrigger.refresh();
            });
          });
        },
      });
    },
    [activeYear, animateCards]
  );

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
            {currentData.tag} <br />
            [TOTAL_MEMBERS: {currentData.members.length}]
          </div>
        </div>

        {/* Year Toggle */}
        <div className="mb-12 flex items-center gap-3">
          <span className="font-mono text-[9px] text-charcoal/30 uppercase tracking-widest mr-2">
            {"// SELECT_YEAR >"}
          </span>
          <div className="inline-flex border border-charcoal/10 bg-white relative">
            {yearKeys.map((year) => (
              <button
                key={year}
                onClick={() => handleYearSwitch(year)}
                className={`
                  relative z-10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em]
                  transition-all duration-300 cursor-pointer
                  ${activeYear === year
                    ? "bg-charcoal text-white"
                    : "text-charcoal/40 hover:text-charcoal/70 hover:bg-charcoal/5"
                  }
                `}
              >
                {execomByYear[year].label}
              </button>
            ))}
          </div>
          <div className="hidden sm:block h-px flex-1 bg-charcoal/5 ml-4" />
        </div>

        {/* Member Grid */}
        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-charcoal/5 border border-charcoal/5">
          {currentData.members.map((member, i) => (
            <div
              key={`${activeYear}-${i}`}
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

                {/* LinkedIn Icon — always visible on touch, hover-reveal on desktop */}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} LinkedIn`}
                    className="
                      absolute bottom-4 right-4 z-30
                      w-9 h-9 flex items-center justify-center
                      bg-charcoal/80 backdrop-blur-sm text-white
                      border border-white/10 rounded-lg
                      transition-all duration-300
                      hover:bg-accent hover:scale-110
                      opacity-100
                      md:opacity-0 md:translate-y-2
                      md:group-hover:opacity-100 md:group-hover:translate-y-0
                    "
                  >
                    <LinkedInIcon className="w-4 h-4" />
                  </a>
                )}
              </div>

              {/* Text Details */}
              <div className="p-4 sm:p-8 relative z-10 bg-white">
                <div className="space-y-4">
                  <h4 className="text-lg sm:text-2xl font-bold tracking-tight uppercase group-hover:text-accent transition-colors leading-tight break-words">
                    {member.name}
                  </h4>
                  <div>
                    <p className="text-[10px] font-mono font-bold text-accent uppercase tracking-widest">{member.role}</p>
                    <p className="text-[9px] font-mono text-charcoal/40 uppercase tracking-tighter">{member.dept}</p>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 pt-6 border-t border-charcoal/5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 text-charcoal/60">
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