import React from 'react';
import { KNOWLEDGE_BASE } from '../constants';
import { Brain, Database } from 'lucide-react';

const KnowledgeBase: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-10">
          <div className="p-3 bg-indigo-100 rounded-xl">
             <Brain className="w-8 h-8 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Agent Intelligence</h2>
            <p className="text-slate-500">The "Brain" behind Alex: Pre-loaded with Smile HVAC expertise.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {KNOWLEDGE_BASE.map((node, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded uppercase tracking-wide">
                  {node.category}
                </span>
                <Database className="w-4 h-4 text-gray-400" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">{node.title}</h3>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                {node.content}
              </p>
              <div className="flex flex-wrap gap-2">
                {node.tags.map(tag => (
                  <span key={tag} className="text-[10px] text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
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