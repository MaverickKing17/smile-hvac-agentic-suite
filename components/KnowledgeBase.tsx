import React from 'react';
import { KNOWLEDGE_BASE } from '../constants';
import { Brain, Database, ShieldCheck, Wrench, Globe, Info } from 'lucide-react';

const KnowledgeBase: React.FC = () => {
  const getIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'integrity': return <ShieldCheck className="w-4 h-4" />;
      case 'troubleshooting': return <Wrench className="w-4 h-4" />;
      case 'geography': return <Globe className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  return (
    <section className="py-24 bg-[#F8FAFC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-start gap-4 mb-12">
          <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-indigo-200">
            <Brain className="w-8 h-8 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-2 uppercase">Agent Intelligence</h2>
            <p className="text-slate-500 font-medium">
              The "Brain" behind Alex: Pre-loaded with Smile HVAC expertise.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {KNOWLEDGE_BASE.map((node, idx) => (
            <div key={idx} className="bg-white border border-slate-100 rounded-[1.5rem] p-8 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow relative smile-card">
              <div className="flex items-center justify-between mb-8">
                <div className="px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-lg">
                  <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">
                    {node.category}
                  </span>
                </div>
                <Database className="w-4 h-4 text-slate-300" />
              </div>
              
              <h3 className="text-xl font-black text-slate-900 mb-4 leading-tight uppercase tracking-tight">
                {node.title}
              </h3>
              
              <p className="text-sm text-slate-500 leading-relaxed font-medium flex-1 mb-8">
                {node.content}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {node.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-black text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md uppercase tracking-tighter">
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