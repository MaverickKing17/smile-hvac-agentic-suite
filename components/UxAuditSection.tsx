import React from 'react';
import { XCircle, CheckCircle, ArrowRight, Zap, Target, Layers } from 'lucide-react';

const UxAuditSection: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-900 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 mb-4">
            <Layers className="w-3 h-3 text-smileRed" />
            <span className="text-smileRed font-black tracking-widest uppercase text-[10px]">Module 1: 2026 UX Strategy</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-black text-slate-900 mt-2 tracking-tight">
            Passive Design vs. <span className="text-smileRed">Agentic Flow</span>
          </h2>
          <p className="mt-6 text-slate-500 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            Stop making customers hunt for "Submit" buttons. Proactively solve problems at the point of intent using contextual AI data.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          
          {/* Old Design (Passive) */}
          <div className="group border border-slate-100 bg-slate-50/50 rounded-[3rem] p-10 relative transition-all duration-500 hover:bg-white hover:shadow-xl">
            <div className="absolute top-6 right-8 bg-slate-200 text-slate-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
              Legacy State
            </div>
            <div className="mb-10 opacity-40 group-hover:opacity-100 transition-opacity">
               <div className="w-12 h-12 bg-slate-200 rounded-2xl flex items-center justify-center mb-6">
                 <Target className="w-6 h-6 text-slate-400" />
               </div>
               <h3 className="text-2xl font-black text-slate-400 group-hover:text-slate-900 transition-colors">Static Lead Gen</h3>
            </div>
            
            <ul className="space-y-8">
              {[
                { title: "Generic Forms", desc: "Standard 'Request a Quote' pages see 40% drop-off due to high friction and zero immediate value." },
                { title: "Seasonally Blind", desc: "Showing the same hero image in July vs January fails to capture the 'No-Heat' emergency urgency." },
                { title: "Hidden Intelligence", desc: "Customers struggle to find rebate eligibility, forcing them to call competitors for fast answers." }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 opacity-50 group-hover:opacity-100 transition-all">
                  <XCircle className="w-6 h-6 text-slate-300 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-black text-slate-800 text-sm uppercase tracking-tight">{item.title}</p>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* New Design (Agentic) */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-[3.1rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative border border-emerald-100 bg-white rounded-[3rem] p-10 shadow-2xl h-full flex flex-col ring-8 ring-emerald-50/50">
               <div className="absolute top-6 right-8 bg-emerald-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-emerald-200">
                <Zap className="w-3 h-3 fill-current" />
                2026 Proposal
              </div>
              
              <div className="mb-10">
                 <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-emerald-200">
                   <Zap className="w-6 h-6 text-white" />
                 </div>
                 <h3 className="text-2xl font-black text-slate-900">Agentic UX Stack</h3>
              </div>
              
              <ul className="space-y-8 flex-1">
                {[
                  { title: "Voice-First Intake", desc: "Instant AI qualification via phone or web-voice. No forms, just immediate answers and routing." },
                  { title: "Context-Aware UI", desc: "Dynamic modules that pivot based on weather, location, and the specific age of the user's HVAC unit." },
                  { title: "Tactile Intelligence", desc: "Live-synced technician maps and high-fidelity rebate calculators build instant authority and trust." }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-black text-slate-900 text-sm uppercase tracking-tight">{item.title}</p>
                      <p className="text-sm text-slate-600 mt-1 leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-12 pt-8 border-t border-slate-50">
                <button onClick={() => window.dispatchEvent(new Event('smile-trigger-ai'))} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group">
                  Preview Flow <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default UxAuditSection;