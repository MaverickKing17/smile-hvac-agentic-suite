import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { Phone, Mic, MicOff, X, Volume2, ShieldAlert, Loader2 } from 'lucide-react';

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const AiVoiceAgent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'listening' | 'speaking'>('idle');
  
  const sessionRef = useRef<any>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const inputAudioCtxRef = useRef<AudioContext | null>(null);
  const outputAudioCtxRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef(new Set<AudioBufferSourceNode>());

  useEffect(() => {
    const handleTrigger = () => {
      setIsOpen(true);
      // Auto-start if not active
      if (!isActive) setTimeout(startSession, 500);
    };
    window.addEventListener('smile-trigger-ai', handleTrigger);
    return () => window.removeEventListener('smile-trigger-ai', handleTrigger);
  }, [isActive]);

  const startSession = async () => {
    if (isActive) return;
    
    try {
      setStatus('connecting');
      setIsActive(true);

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      inputAudioCtxRef.current = inputCtx;
      outputAudioCtxRef.current = outputCtx;

      await inputCtx.resume();
      await outputCtx.resume();
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setStatus('listening');
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              
              sessionPromise.then(session => {
                session.sendRealtimeInput({ media: pcmBlob });
              }).catch(() => {});
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio) {
              setStatus('speaking');
              const ctx = outputAudioCtxRef.current!;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              
              const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(ctx.destination);
              
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
                if (sourcesRef.current.size === 0) setStatus('listening');
              });

              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
              for (const s of sourcesRef.current) try { s.stop(); } catch(e) {}
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              setStatus('listening');
            }
          },
          onerror: () => stopSession(),
          onclose: () => stopSession()
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          systemInstruction: `
            You are a dual-persona AI for Smile HVAC. 
            PRIMARY: Chloe (Front-Desk). Expert in Home Renovation Savings Program. Offer $7,500 (Electric) or $2,000 (Gas) rebates.
            SECONDARY: Sam (Emergency Dispatch). Triggered by gas smell, no heat, leak.
             Chloe must hand off: "That sounds urgent. Let me get Sam, our emergency specialist, on the line."
            SAFETY: If "gas smell" is mentioned, say: "For your safety, hang up, leave house immediately, and call 911."
            Start as Chloe: "Thanks for calling Smile HVAC! Are you calling for a repair or about those $7,500 rebates?"
          `,
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      stopSession();
    }
  };

  const stopSession = () => {
    if (sessionRef.current) try { sessionRef.current.close(); } catch(e) {}
    sessionRef.current = null;
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    streamRef.current = null;
    inputAudioCtxRef.current?.close();
    outputAudioCtxRef.current?.close();
    for (const s of sourcesRef.current) try { s.stop(); } catch(e) {}
    sourcesRef.current.clear();
    setIsActive(false);
    setStatus('idle');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4">
      {isOpen && (
        <div className="w-80 md:w-96 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-slate-900 p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-smileRed flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold leading-none tracking-tight">Smile AI Voice</h3>
                <span className="text-[10px] text-green-400 font-bold uppercase tracking-widest">Active Connection</span>
              </div>
            </div>
            <button onClick={() => { stopSession(); setIsOpen(false); }} className="text-slate-400 hover:text-white transition-colors p-2"><X className="w-5 h-5" /></button>
          </div>

          <div className="p-8 flex flex-col items-center justify-center text-center space-y-6">
            {!isActive ? (
              <>
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-2"><Mic className="w-8 h-8 text-slate-400" /></div>
                <div>
                  <h4 className="font-black text-slate-900 text-lg leading-tight">Emergency or Rebates?</h4>
                  <p className="text-sm text-slate-500 mt-2">Chloe and Sam are standing by to assist you.</p>
                </div>
                <button onClick={startSession} className="w-full bg-smileRed hover:bg-red-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-red-500/20 transition-all active:scale-95 flex items-center justify-center gap-2">
                  {status === 'connecting' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Phone className="w-5 h-5" />}
                  {status === 'connecting' ? 'Connecting...' : 'Connect to Live Agent'}
                </button>
              </>
            ) : (
              <>
                <div className="relative flex items-center justify-center py-6 w-full">
                  <div className="flex gap-1.5 h-16 items-center">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className={`w-1.5 bg-smileRed rounded-full transition-all duration-150 ${status === 'speaking' ? 'animate-pulse' : status === 'listening' ? 'opacity-40' : 'opacity-10'}`} style={{ height: status === 'speaking' ? `${30 + Math.random() * 40}px` : '6px', animationDelay: `${i * 0.1}s` }} />
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black border uppercase tracking-widest transition-colors ${status === 'speaking' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-green-50 text-green-700 border-green-100'}`}>
                    <span className={`relative flex h-2 w-2 rounded-full ${status === 'speaking' ? 'bg-red-500' : 'bg-green-500'}`}>
                      <span className={`animate-ping absolute inset-0 rounded-full opacity-75 ${status === 'speaking' ? 'bg-red-400' : 'bg-green-400'}`}></span>
                    </span>
                    {status === 'speaking' ? 'Agent Speaking' : 'Listening...'}
                  </div>
                  <p className="text-sm font-medium text-slate-500">Ask: "Tell me about rebates" or report an emergency.</p>
                </div>
                <button onClick={stopSession} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-widest"><MicOff className="w-4 h-4" /> End Session</button>
              </>
            )}
          </div>
          <div className="bg-red-50 p-4 border-t border-red-100 flex items-center gap-3">
            <ShieldAlert className="w-4 h-4 text-smileRed shrink-0" />
            <span className="text-[10px] text-red-800 font-bold uppercase tracking-tight leading-relaxed text-left">Gas smell? Leave the house and call 911 immediately.</span>
          </div>
        </div>
      )}
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="group relative flex items-center justify-center w-16 h-16 bg-smileRed hover:bg-red-700 rounded-full shadow-2xl shadow-red-500/40 transition-all hover:scale-110 active:scale-95">
          <div className="absolute inset-0 rounded-full bg-smileRed animate-ping opacity-20 group-hover:opacity-40"></div>
          <Volume2 className="w-8 h-8 text-white relative z-10" />
          <div className="absolute -top-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
        </button>
      )}
    </div>
  );
};

export default AiVoiceAgent;