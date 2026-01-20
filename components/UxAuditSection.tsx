import React from 'react';
import { XCircle, CheckCircle, Zap, Target, Layers, ArrowRight } from 'lucide-react';

const UxAuditSection: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 mb-4">
            <Layers className="w-3 h-3 text-smileRed" />
            <span className="text-smileRed font-black tracking-widest uppercase text-[10px]">Module 1: 2026 UX Audit</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-black text-slate-900 mt-2 tracking-tight">
            Passive Design vs. <span className="text-smileRed">Agentic Design</span>
          </h2>
          <p className="mt-6 text-slate-500 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            Traditional HVAC sites make customers hunt for information. Our new Agentic approach proactively solves problems using AI and contextual data.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto items-stretch">
          {/* Passive Design Card */}
          <div className="relative group flex flex-col bg-slate-50/50 border border-slate-100 rounded-[2.5rem] p-10 text-left transition-all duration-300 hover:bg-white hover:shadow-xl">
            <div className="absolute top-6 right-8 bg-slate-200 text-slate-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
              Current State
            </div>
            
            <div className="mb-8">
              <h3 className="text-2xl font-black text-slate-900 mb-2">Passive Design</h3>
            </div>

            <ul className="space-y-8 flex-1">
              {[
                { title: "Generic Forms", desc: "\"Request a Quote\" with no immediate feedback loop leads to 40% drop-off." },
                { title: "Static Content", desc: "Same homepage in Summer and Winter. Doesn't address \"No-Heat\" urgency." },
                { title: "Hidden Pricing", desc: "Customers have to dig for rebate info or pricing, increasing anxiety." }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <XCircle className="w-6 h-6 text-slate-300 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-black text-slate-800 text-sm uppercase tracking-tight">{item.title}</p>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Agentic Design Card */}
          <div className="relative group flex flex-col h-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-[2.6rem] blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative bg-white border border-emerald-100 rounded-[2.5rem] p-10 text-left h-full flex flex-col shadow-2xl shadow-emerald-200/20 ring-4 ring-emerald-50/50">
              <div className="absolute top-6 right-8 bg-emerald-100 text-emerald-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                <CheckCircle className="w-3 h-3 fill-emerald-500 text-white" />
                Proposal
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-black text-slate-900 mb-2">Agentic Design (2026)</h3>
              </div>

              <ul className="space-y-8 flex-1">
                {[
                  { title: "Conversational AI (\"Alex\")", desc: "Proactively asks: \"Is this an emergency?\" Qualifies leads instantly." },
                  { title: "Context-Aware Modules", desc: "Detects January date → Prioritizes Furnace Repair & Heat Pumps." },
                  { title: "Tactile 3D CTAs", desc: "Interactive calculators and status maps build trust and dwell time." }
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
                  Try Agentic Flow <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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