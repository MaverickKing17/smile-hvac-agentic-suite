
import React, { useEffect } from 'react';

// Using a type-cast to avoid JSX namespace issues with custom elements
const ElevenLabsConvAI = 'elevenlabs-convai' as any;

const AiVoiceAgent: React.FC = () => {
  useEffect(() => {
    const handleTrigger = () => {
      console.log("Activating Melissa AI Agent...");
      
      // The ElevenLabs widget is a web component with a Shadow DOM.
      // We look for the component and attempt to trigger its internal call button.
      const widget = document.querySelector('elevenlabs-convai');
      if (widget && widget.shadowRoot) {
        // Attempt to find the action button inside the widget's shadow DOM
        const button = widget.shadowRoot.querySelector('button');
        if (button) {
          (button as HTMLElement).click();
        } else {
          // Fallback: If we can't click it, ensure it's in view
          widget.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('smile-trigger-ai', handleTrigger);
    return () => window.removeEventListener('smile-trigger-ai', handleTrigger);
  }, []);

  // Define the dynamic variables required by the Melissa Agent's first message
  // These are mandatory as specified in the error message: {'service_location', 'user_name'}
  const dynamicVariables = {
    user_name: "Valued Customer",
    service_location: "Toronto/GTA"
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {/* 
          Melissa AI Agent Widget 
          Fix: Added dynamic-variables attribute to satisfy the agent's prompt requirements.
      */}
      <ElevenLabsConvAI 
        agent-id="agent_9401kfc1kyg8egxrmwf4542hvrtq"
        dynamic-variables={JSON.stringify(dynamicVariables)}
      ></ElevenLabsConvAI>
      
      {/* Floating tag for desktop users */}
      <div className="hidden lg:block absolute bottom-20 right-0 bg-white border border-slate-100 px-4 py-2 rounded-2xl shadow-xl animate-bounce pointer-events-none">
        <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest whitespace-nowrap">
          Talk to <span className="text-smileRed">Melissa</span>
        </p>
      </div>
    </div>
  );
};

export default AiVoiceAgent;
