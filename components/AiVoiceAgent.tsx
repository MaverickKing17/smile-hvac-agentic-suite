import React, { useEffect, useRef } from 'react';

const AiVoiceAgent: React.FC = () => {
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    const injectVariables = () => {
      if (widgetRef.current) {
        const vars = {
          user_name: "Valued Customer",
          service_location: "Greater Toronto Area"
        };
        
        // 1. Set as a stringified attribute (standard for Web Components)
        widgetRef.current.setAttribute('dynamic-variables', JSON.stringify(vars));
        
        // 2. Set as a property (common for Lit-based components like ElevenLabs)
        try {
          widgetRef.current.dynamicVariables = vars;
        } catch (e) {
          console.warn("Could not set dynamicVariables property, falling back to attribute.");
        }
      }
    };

    // Inject immediately on mount
    injectVariables();

    // Use a small delay as a fallback to ensure the custom element is defined/upgraded
    const timer = setTimeout(injectVariables, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative z-[9999]">
      {/* @ts-ignore - custom element from ElevenLabs embed script */}
      <elevenlabs-convai 
        ref={widgetRef}
        agent-id="agent_9401kfc1kyg8egxrmwf4542hvrtq"
      ></elevenlabs-convai>
    </div>
  );
};

export default AiVoiceAgent;