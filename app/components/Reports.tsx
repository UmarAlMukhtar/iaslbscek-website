"use client";
import { useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileText, Download, ChevronRight, Calendar, Tag } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Report = {
  eventName: string;
  eventType: string;
  date: string;
  pdfUrl: string;
  description: string;
};

type YearReports = {
  year: string;
  tag: string;
  reports: Report[];
};

/* ── Report Data Object ── */
const reportsData: YearReports[] = [
  {
    year: "2025",
    tag: "RPT_LOG_2025",
    reports: [
      {
        eventName: "Inauguration Ceremony",
        eventType: "Talk Session",
        date: "OCT 2025",
        pdfUrl: "/reports/2025/inauguration-ceremony.pdf",
        description:
          "Kickstarting the academic year with insights from industry leaders on emerging technologies.",
      },
      {
        eventName: "Onam Tech-Fusion",
        eventType: "Workshops & Competitions",
        date: "AUG 2025",
        pdfUrl: "/reports/2025/Onam_Tech_Fusion_2025_Report.pdf",
        description:
          "A blend of traditional festivities with modern tech workshops and competitive events.",
      },
    ],
  },
];

const yearKeys = reportsData.map((y) => y.year);

export default function Reports() {
  const container = useRef(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeYear, setActiveYear] = useState(yearKeys[0]);

  const currentData = reportsData.find((y) => y.year === activeYear)!;

  const animateCards = useCallback(() => {
    if (!gridRef.current) return;
    const cards =
      gridRef.current.querySelectorAll<HTMLElement>(".report-card");
    gsap.set(cards, { autoAlpha: 0, y: 40 });
    gsap.to(cards, {
      autoAlpha: 1,
      y: 0,
      stagger: 0.08,
      duration: 0.6,
      ease: "power3.out",
      overwrite: true,
    });
  }, []);

  const handleYearSwitch = useCallback(
    (year: string) => {
      if (year === activeYear || !gridRef.current) return;

      const cards =
        gridRef.current.querySelectorAll<HTMLElement>(".report-card");
      gsap.to(cards, {
        autoAlpha: 0,
        y: -20,
        stagger: 0.03,
        duration: 0.3,
        ease: "power2.in",
        overwrite: true,
        onComplete: () => {
          setActiveYear(year);
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

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const cards = gsap.utils.toArray<HTMLElement>(".report-card");
      gsap.set(cards, { autoAlpha: 0, y: 40 });

      ScrollTrigger.batch(cards, {
        start: "top 85%",
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            stagger: 0.1,
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

      requestAnimationFrame(() => ScrollTrigger.refresh());
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="reports"
      className="py-32 px-6 md:px-20 bg-white scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Section Header ── */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-accent font-mono text-xs uppercase tracking-[0.5em] block mb-4">
              / 05 ARCHIVES
            </span>
            <h2 className="text-6xl font-black tracking-tighter uppercase leading-none">
              Event <br />{" "}
              <span className="text-charcoal/20 italic">Reports</span>
            </h2>
          </div>
          <div className="font-mono text-[10px] text-charcoal/40 uppercase tracking-widest text-right">
            {currentData.tag} <br />
            [TOTAL_REPORTS: {currentData.reports.length}]
          </div>
        </div>

        {/* ── Year Toggle ── */}
        <div className="mb-12 flex items-center gap-3">
          <span className="font-mono text-[9px] text-charcoal/30 uppercase tracking-widest mr-2">
            {"// SELECT_YEAR >"}
          </span>
          <div className="inline-flex border border-charcoal/10 bg-background relative">
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
                {year}
              </button>
            ))}
          </div>
          <div className="hidden sm:block h-px flex-1 bg-charcoal/5 ml-4" />
        </div>

        {/* ── Report Cards ── */}
        <div ref={gridRef} className="space-y-4">
          {currentData.reports.map((report, i) => (
            <a
              key={`${activeYear}-${i}`}
              href={report.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="report-card group block relative overflow-hidden border border-charcoal/5 bg-background hover:bg-accent/5 transition-all duration-500"
            >
              {/* Top accent line on hover */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              <div className="p-6 sm:p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
                {/* Icon + Index */}
                <div className="flex items-center gap-5 shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-charcoal/3 border border-charcoal/5 flex items-center justify-center group-hover:bg-accent/20 group-hover:border-accent/30 transition-all duration-500">
                    <FileText className="w-6 h-6 text-charcoal/30 group-hover:text-accent transition-colors duration-500" />
                  </div>
                  <div className="md:hidden">
                    <span className="font-mono text-[9px] text-charcoal/25 uppercase tracking-widest">
                      RPT-{String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 min-w-0 space-y-3">
                  {/* Meta Tags */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-accent/10 text-accent font-mono text-[9px] uppercase tracking-widest">
                      <Tag className="w-2.5 h-2.5" />
                      {report.eventType}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-[9px] text-charcoal/30 uppercase tracking-widest">
                      <Calendar className="w-2.5 h-2.5" />
                      {report.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight uppercase group-hover:text-accent transition-colors duration-300 leading-tight">
                    {report.eventName}
                  </h3>

                  {/* Description */}
                  <p className="text-charcoal/40 text-sm leading-relaxed max-w-2xl hidden sm:block">
                    {report.description}
                  </p>
                </div>

                {/* Index (desktop) + Download Action */}
                <div className="flex items-center gap-6 shrink-0">
                  <span className="hidden md:block font-mono text-[9px] text-charcoal/15 uppercase tracking-widest">
                    RPT-{String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Download Indicator */}
                  <div className="flex items-center gap-2 px-4 py-2.5 border border-charcoal/8 bg-white group-hover:border-accent/40 group-hover:bg-accent/10 transition-all duration-300">
                    <Download className="w-3.5 h-3.5 text-charcoal/30 group-hover:text-accent transition-colors" />
                    <span className="font-mono text-[9px] text-charcoal/40 uppercase tracking-widest group-hover:text-accent transition-colors">
                      .PDF
                    </span>
                    <ChevronRight className="w-3 h-3 text-charcoal/20 group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </div>

              {/* Decorative background number */}
              <div className="absolute top-1/2 right-6 -translate-y-1/2 text-charcoal/[0.02] font-black text-[8rem] sm:text-[10rem] italic select-none pointer-events-none leading-none">
                0{i + 1}
              </div>
            </a>
          ))}

          {/* Empty State */}
          {currentData.reports.length === 0 && (
            <div className="report-card py-20 text-center border border-dashed border-charcoal/10">
              <FileText className="w-10 h-10 text-charcoal/10 mx-auto mb-4" />
              <p className="font-mono text-[11px] text-charcoal/30 uppercase tracking-widest">
                {"// NO_REPORTS_FOUND"}
              </p>
              <p className="font-mono text-[9px] text-charcoal/15 uppercase tracking-widest mt-2">
                Reports for this year will be uploaded soon.
              </p>
            </div>
          )}
        </div>

        {/* ── Footer Note ── */}
        <div className="mt-16 flex items-center justify-between">
          <div className="h-px flex-1 bg-charcoal/5" />
          <span className="px-6 font-mono text-[9px] text-charcoal/20 uppercase tracking-[0.3em]">
            {"// End_of_Report_Archive.log"}
          </span>
          <div className="h-px flex-1 bg-charcoal/5" />
        </div>
      </div>
    </section>
  );
}
