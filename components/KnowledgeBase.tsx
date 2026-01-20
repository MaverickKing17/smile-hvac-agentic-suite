import React from 'react';
import { KNOWLEDGE_BASE } from '../constants';
import { Brain, Database, ShieldCheck, Wrench, Globe, Info } from 'lucide-react';

const KnowledgeBase: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden border-t border-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center gap-5 mb-14">
          <div className="w-16 h-16 bg-[#EEF2FF] rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-[#E0E7FF]">
            <Brain className="w-9 h-9 text-[#4F46E5]" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-2">Agent Intelligence</h2>
            <p className="text-slate-500 font-medium">
              The "Brain" behind Alex: Pre-loaded with Smile HVAC expertise.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {KNOWLEDGE_BASE.map((node, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-[1.5rem] p-8 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow relative smile-card">
              <div className="flex items-center justify-between mb-8">
                <div className="px-3 py-1 bg-[#EEF2FF] border border-[#E0E7FF] rounded-lg">
                  <span className="text-[10px] font-black text-[#4F46E5] uppercase tracking-widest">
                    {node.category}
                  </span>
                </div>
                <Database className="w-4 h-4 text-slate-300" />
              </div>
              
              <h3 className="text-xl font-black text-slate-900 mb-4 leading-tight">
                {node.title}
              </h3>
              
              <p className="text-sm text-slate-600 leading-relaxed font-medium flex-1 mb-10">
                {node.content}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {node.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-black text-slate-400 bg-[#F9FAFB] border border-slate-100 px-3 py-1 rounded-lg uppercase tracking-tight">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KnowledgeBase;