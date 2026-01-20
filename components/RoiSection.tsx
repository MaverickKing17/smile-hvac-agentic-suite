import React from 'react';
import { ROI_DATA } from '../constants';
import { TrendingUp, Check, AlertCircle } from 'lucide-react';

const RoiSection: React.FC = () => {
  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Visual background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-smileRed opacity-5 blur-[120px] rounded-full translate-x-1/2 pointer-events-none"></div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
            <TrendingUp className="w-3 h-3 text-emerald-400" />
            <span className="text-emerald-400 font-black tracking-widest uppercase text-[10px]">Financial Impact Analysis</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-black text-white tracking-tight">The <span className="text-smileRed">Investment</span> Case</h2>
          <p className="mt-4 text-slate-400 text-lg font-medium">Projected monthly revenue lift across the Toronto GTA service area.</p>
        </div>

        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
          <div className="p-8 sm:p-12">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-slate-50">
                    <th className="text-left py-6 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Growth Metric</th>
                    <th className="text-left py-6 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Current (Passive)</th>
                    <th className="text-left py-6 px-4 text-[10px] font-black text-emerald-600 uppercase tracking-widest">Agentic Flow</th>
                    <th className="text-right py-6 px-4 text-[10px] font-black text-slate-900 uppercase tracking-widest">Impact Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {ROI_DATA.map((row, idx) => (
                    <tr key={idx} className="group hover:bg-slate-50/50 transition-all">
                      <td className="py-6 px-4">
                        <div className="font-black text-slate-900 text-sm uppercase tracking-tight group-hover:text-smileRed transition-colors">{row.metric}</div>
                      </td>
                      <td className="py-6 px-4">
                        <div className="flex items-center gap-2 text-slate-400 font-bold text-sm">
                          <AlertCircle className="w-3 h-3" />
                          {row.current}
                        </div>
                      </td>
                      <td className="py-6 px-4">
                        <div className="flex items-center gap-2 text-emerald-600 font-black text-sm">
                          <Check className="w-3.5 h-3.5 stroke-[3px]" />
                          {row.projected}
                        </div>
                      </td>
                      <td className="py-6 px-4 text-right">
                        <div className="font-black text-slate-900 text-sm tracking-tight">{row.value}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-900 text-white">
                    <td colSpan={3} className="py-8 px-8 text-right font-black text-xs uppercase tracking-widest text-slate-400">Projected Monthly Total:</td>
                    <td className="py-8 px-8 text-right font-black text-3xl text-emerald-400 tracking-tighter">+$19,200</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-6 flex gap-4 items-start">
                <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Payback Period</p>
                  <p className="text-sm font-bold text-slate-800 leading-relaxed">
                    The $5,000 setup fee is recovered in <span className="text-smileRed font-black italic">9 business days</span>.
                  </p>
                </div>
              </div>
              <button onClick={() => window.dispatchEvent(new Event('smile-trigger-ai'))} className="bg-smileRed hover:bg-red-700 text-white rounded-[2rem] p-6 flex items-center justify-center font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-red-500/20 active:scale-95">
                Approve Deployment Flow
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoiSection;