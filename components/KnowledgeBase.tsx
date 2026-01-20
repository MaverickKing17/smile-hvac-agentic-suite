import React from 'react';
import { KNOWLEDGE_BASE } from '../constants';
import { Brain, Database, ShieldCheck, Wrench, Globe, Info } from 'lucide-react';

const KnowledgeBase: React.FC = () => {
  const getIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'integrity': return <ShieldCheck className="w-5 h-5" />;
      case 'troubleshooting': return <Wrench className="w-5 h-5" />;
      case 'geography': return <Globe className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  const getGradient = (category: string) => {
    switch (category.toLowerCase()) {
      case 'integrity': return 'from-blue-500/10 to-indigo-500/10 text-indigo-600';
      case 'troubleshooting': return 'from-orange-500/10 to-red-500/10 text-orange-600';
      case 'geography': return 'from-emerald-500/10 to-teal-500/10 text-emerald-600';
      default: return 'from-slate-500/10 to-slate-800/10 text-slate-600';
    }
  };

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#CBD5E1 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 mb-4 shadow-sm">
               <Brain className="w-4 h-4 text-indigo-600" />
               <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Core Intelligence</span>
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none mb-4">
              The Agent <span className="text-smileRed">Brain</span>
            </h2>
            <p className="text-slate-500 text-lg font-medium">
              We pre-load our AI agents with 15+ years of HVAC logic, ensuring Chloe and Sam sound like seasoned technicians, not chatbots.
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-4 bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
             <div className="text-right">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Data Points</p>
               <p className="text-xl font-black text-slate-900 leading-none">12.4k+</p>
             </div>
             <div className="w-px h-8 bg-slate-100"></div>
             <div className="text-right">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Latency</p>
               <p className="text-xl font-black text-emerald-500 leading-none">&lt;200ms</p>
             </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {KNOWLEDGE_BASE.map((node, idx) => (
            <div key={idx} className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-white to-slate-100 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-xl"></div>
              <div className="relative bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-[2.5rem] p-10 flex flex-col h-full smile-card">
                <div className="flex items-center justify-between mb-8">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${getGradient(node.category)} shadow-sm`}>
                    {getIcon(node.category)}
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-100 rounded-full">
                    <Database className="w-3 h-3 text-slate-400" />
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Verified Log</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight leading-tight uppercase group-hover:text-smileRed transition-colors">
                  {node.title}
                </h3>
                <p className="text-sm text-slate-600 mb-8 leading-relaxed font-medium flex-1">
                  {node.content}
                </p>
                
                <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-50">
                  {node.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-black text-slate-400 bg-slate-100 px-3 py-1 rounded-lg uppercase tracking-wider">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KnowledgeBase;