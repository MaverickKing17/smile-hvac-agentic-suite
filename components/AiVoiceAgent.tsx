
import React, { useEffect, useRef } from 'react';

// Fix: Use a type-cast variable for the custom element to avoid breaking the global JSX namespace
// which was causing standard HTML tags like 'div', 'nav', etc. to not be recognized.
const ElevenLabsConvAI = 'elevenlabs-convai' as any;

const AiVoiceAgent: React.FC = () => {
  const widgetRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleTrigger = () => {
      console.log("Triggering Melissa AI Agent...");
      
      // The ElevenLabs widget is a shadow-dom component. 
      // We attempt to find the button inside it and click it to start the call.
      const widget = document.querySelector('elevenlabs-convai');
      if (widget && widget.shadowRoot) {
        const button = widget.shadowRoot.querySelector('button');
        if (button) {
          button.click();
        } else {
          // Fallback: If we can't click it, at least ensure it's visible or scroll to it
          widget.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('smile-trigger-ai', handleTrigger);
    return () => window.removeEventListener('smile-trigger-ai', handleTrigger);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {/* Melissa AI Agent Widget Integration */}
      <ElevenLabsConvAI 
        agent-id="agent_9401kfc1kyg8egxrmwf4542hvrtq"
      ></ElevenLabsConvAI>
      
      {/* Visual cue to let users know Melissa is ready */}
      <div className="hidden md:block absolute bottom-20 right-0 bg-white border border-slate-100 px-4 py-2 rounded-2xl shadow-xl animate-bounce pointer-events-none">
        <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest whitespace-nowrap">
          Talk to <span className="text-smileRed">Melissa</span>
        </p>
      </div>
    </div>
  );
};

export default AiVoiceAgent;
