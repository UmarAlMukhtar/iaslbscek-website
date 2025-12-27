"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Instagram, Linkedin, Mail, MapPin, Globe } from "lucide-react";

export default function Footer() {
  const container = useRef(null);

  return (
    <footer ref={container} className="bg-charcoal text-white pt-24 pb-10 px-6 md:px-20 relative overflow-hidden">
      {/* Background Decorative Text */}
      <div className="absolute top-0 right-0 p-10 opacity-[0.02] select-none pointer-events-none">
        <h2 className="text-[20rem] font-black leading-none uppercase">LBS</h2>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 pb-20 border-b border-white/10">
          
          {/* Left: Branding & Mission */}
          <div className="space-y-8">
            <div>
              <h3 className="text-4xl font-black tracking-tighter uppercase mb-4">
                IEEE <span className="text-accent italic">IAS</span> <br />
                LBSCEK
              </h3>
              <p className="text-white/50 max-w-sm text-sm leading-relaxed font-light">
                The Industry Applications Society at LBS College of Engineering, Kasaragod. 
                Bridging the gap between laboratory research and industrial application.
              </p>
            </div>

            <div className="flex flex-col gap-4 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">
              <div className="flex items-center gap-3">
                <MapPin size={14} className="text-accent" />
                <span>Povval, Kasaragod, Kerala - 671542</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-accent" />
                <span>ieeeias@lbscek.ac.in</span>
              </div>
            </div>
          </div>

          {/* Right: Links & Socials */}
          <div className="grid grid-cols-2 gap-10">
            <div className="space-y-6">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Navigation</h4>
              <ul className="space-y-3 text-sm text-white/60 font-medium">
                <li className="hover:text-accent transition-colors"><a href="#hero">01_Home</a></li>
                <li className="hover:text-accent transition-colors"><a href="#about">02_The_Spec</a></li>
                <li className="hover:text-accent transition-colors"><a href="#events">03_Operations</a></li>
                <li className="hover:text-accent transition-colors"><a href="#execom">04_Core_Stack</a></li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Connect</h4>
              <div className="flex flex-wrap gap-4">
                <a href="https://www.linkedin.com/showcase/ieee-industry-applications-society-lbscek/" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:text-charcoal transition-all">
                  <Linkedin size={18} />
                </a>
                <a href="https://www.instagram.com/ieee.ias.sbc.lbscek/" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:text-charcoal transition-all">
                  <Instagram size={18} />
                </a>
                {/* <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-accent hover:text-charcoal transition-all">
                  <Globe size={18} />
                </a> */}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
             <div className="font-mono text-[9px] text-white/20 uppercase tracking-[0.5em]">
               // SYSTEM_STABLE_V1.0
             </div>
             <div className="font-mono text-[9px] text-white/20 uppercase tracking-[0.5em]">
               [ SESSION: 2025-26 ]
             </div>
          </div>
          
          <div className="text-[9px] font-mono text-white/40 uppercase tracking-widest text-center md:text-right">
            Designed & Engineered by <br />
            <span className="text-white/80 font-bold">LBSCEK Web Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
}