import React from 'react';
import { XCircle, CheckCircle } from 'lucide-react';

const UxAuditSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-smileRed font-bold tracking-wide uppercase text-sm">Module 1: 2026 UX Audit</span>
          <h2 className="text-3xl md:text-4xl font-heading font-black text-slate-900 mt-2">
            Passive Design vs. <span className="text-smileRed">Agentic Design</span>
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Traditional HVAC sites make customers hunt for information. Our new Agentic approach proactively solves problems using AI and contextual data.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-stretch">
          
          {/* Old Design (Passive) */}
          <div className="border border-red-100 bg-red-50/30 rounded-3xl p-8 relative grayscale opacity-70 hover:opacity-100 transition-opacity">
            <div className="absolute top-4 right-4 bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold">
              CURRENT STATE
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-6">Passive Design</h3>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-700">Generic Forms</p>
                  <p className="text-sm text-slate-500">"Request a Quote" with no immediate feedback loop leads to 40% drop-off.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-700">Static Content</p>
                  <p className="text-sm text-slate-500">Same homepage in Summer and Winter. Doesn't address "No-Heat" urgency.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-700">Hidden Pricing</p>
                  <p className="text-sm text-slate-500">Customers have to dig for rebate info or pricing, increasing anxiety.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* New Design (Agentic) */}
          <div className="border border-green-200 bg-white shadow-xl shadow-green-900/5 rounded-3xl p-8 relative ring-4 ring-green-50">
             <div className="absolute top-4 right-4 bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              PROPOSAL
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-6">Agentic Design (2026)</h3>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Conversational AI ("Alex")</p>
                  <p className="text-sm text-slate-500">Proactively asks: "Is this an emergency?" Qualifies leads instantly.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Context-Aware Modules</p>
                  <p className="text-sm text-slate-500">Detects January date -> Prioritizes Furnace Repair & Heat Pumps.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">Tactile 3D CTAs</p>
                  <p className="text-sm text-slate-500">Interactive calculators and status maps build trust and dwell time.</p>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default UxAuditSection;