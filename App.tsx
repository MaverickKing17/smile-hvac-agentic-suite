import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BentoGrid from './components/BentoGrid';
import AiVoiceAgent from './components/AiVoiceAgent';
import UxAuditSection from './components/UxAuditSection';
import RoiSection from './components/RoiSection';
import KnowledgeBase from './components/KnowledgeBase';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-24 pb-0">
        {/* Module 2: Bento Grid Homepage */}
        <section className="mb-12">
          <div className="text-center mb-8 px-4">
            <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              Proposed Homepage Structure
            </span>
          </div>
          <BentoGrid />
        </section>

        {/* Module 1: UX Audit */}
        <UxAuditSection />

        {/* Module 3: Agent Intelligence */}
        <KnowledgeBase />

        {/* Module 4: ROI Business Case */}
        <RoiSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating AI Agent */}
      <AiVoiceAgent />
    </div>
  );
};

export default App;