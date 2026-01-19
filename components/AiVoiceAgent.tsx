import React, { useState, useEffect, useRef } from 'react';
import { Mic, X, MessageSquare, Volume2 } from 'lucide-react';

const AiVoiceAgent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<{role: string, text: string}[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Simulate initial greeting logic from PDF
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([
          {
            role: 'agent',
            text: "Hi, I'm Alex from Smile HVAC. I see it's -5°C in Vaughan today. Do you have a no-heat emergency, or are you looking for the $7,100 Enbridge rebate?"
          }
        ]);
      }, 500);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSimulatedInput = () => {
    setIsListening(true);
    // Simulate thinking delay
    setTimeout(() => {
      setIsListening(false);
      const userMsg = { role: 'user', text: "My furnace is making a weird noise and not heating properly." };
      setMessages(prev => [...prev, userMsg]);
      
      setTimeout(() => {
        const agentResponse = { 
          role: 'agent', 
          text: "I can help with that immediately. Based on our 'Rule of 5', if your furnace is under 15 years old, it's likely worth repairing. I see Technician Carl is available in your area (Vaughan) in about 20 minutes. Would you like me to book him?" 
        };
        setMessages(prev => [...prev, agentResponse]);
      }, 1500);
    }, 2000);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-black text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-transform group flex items-center gap-3"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
        </div>
        <span className="font-bold pr-2">Ask Alex (AI)</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300">
      {/* Header */}
      <div className="bg-slate-900 p-4 flex justify-between items-center text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Volume2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-sm">Alex</h3>
            <p className="text-xs text-slate-400">Digital Specialist • Online</p>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 bg-gray-50 h-80 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
              msg.role === 'user' 
                ? 'bg-smileRed text-white rounded-br-sm' 
                : 'bg-white text-slate-700 shadow-sm border border-gray-100 rounded-bl-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isListening && (
          <div className="flex justify-center items-center py-4 space-x-1">
             <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
             <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
             <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        <button 
          onClick={handleSimulatedInput}
          className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-all ${
            isListening 
              ? 'bg-red-50 text-smileRed border border-red-100' 
              : 'bg-slate-900 text-white hover:bg-slate-800'
          }`}
        >
          {isListening ? (
            <>Listening...</>
          ) : (
            <>
              <Mic className="w-5 h-5" />
              Tap to Speak
            </>
          )}
        </button>
        <div className="text-center mt-2 text-[10px] text-gray-400">
          Powered by ElevenLabs & Gemini
        </div>
      </div>
    </div>
  );
};

export default AiVoiceAgent;