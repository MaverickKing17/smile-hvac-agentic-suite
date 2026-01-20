
import React, { useState, useMemo, useEffect } from 'react';
import { MapPin, ArrowRight, Clock, Flame, Zap, Droplets, Car, ShieldCheck, RefreshCw, AlertTriangle } from 'lucide-react';
import { TECHNICIANS } from '../constants';
import { TechStatus } from '../types';
import { GoogleGenAI } from "@google/genai";

const BentoGrid: React.FC = () => {
  const [houseType, setHouseType] = useState('detached');
  const [heatingType, setHeatingType] = useState('furnace');
  const [trafficLevel, setTrafficLevel] = useState<'light' | 'moderate' | 'heavy'>('moderate');
  const [isSyncing, setIsSyncing] = useState(false);
  const [showRebateResult, setShowRebateResult] = useState(false);
  const [lastSync, setLastSync] = useState<string | null>(null);
  
  const rebateAmount = useMemo(() => {
    let base = heatingType === 'electric' ? 7500 : (heatingType === 'furnace' ? 2000 : 10000);
    if (houseType === 'town') base *= 0.8;
    return Math.ceil(base / 50) * 50;
  }, [houseType, heatingType]);

  const fetchLiveTraffic = async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    try {
      // Fix: Initialize GoogleGenAI with the API key from environment directly.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      let lat = 43.6532; // Default Toronto
      let lng = -79.3832;

      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
        });
        lat = position.coords.latitude;
        lng = position.coords.longitude;
      } catch (e) {
        console.warn("Geolocation failed, using default Toronto coords.");
      }

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Analyze current traffic conditions in the Greater Toronto Area (GTA). Based on congestion, accidents, and construction, classify the overall traffic as exactly one of these words: LIGHT, MODERATE, or HEAVY. Provide a one sentence explanation why.",
        config: {
          tools: [{ googleMaps: {} }],
          toolConfig: {
            retrievalConfig: {
              latLng: {
                latitude: lat,
                longitude: lng
              }
            }
          }
        },
      });

      // Fix: Use the .text property directly (not a method) as per SDK rules.
      const text = response.text?.toUpperCase() || '';
      if (text.includes('HEAVY')) setTrafficLevel('heavy');
      else if (text.includes('LIGHT')) setTrafficLevel('light');
      else setTrafficLevel('moderate');

      setLastSync(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch (error) {
      console.error("Traffic Sync Error:", error);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    fetchLiveTraffic();
  }, []);

  const getAdjustedEta = (baseEta: string | undefined) => {
    if (!baseEta) return null;
    const minutes = parseInt(baseEta);
    const multiplier = trafficLevel === 'light' ? 0.7 : (trafficLevel === 'heavy' ? 1.6 : 1);
    return `${Math.ceil(minutes * multiplier)}m`;
  };

  const triggerVoiceAgent = () => {
    window.dispatchEvent(new Event('smile-trigger-ai'));
  };

  const handleVerify = () => {
    setShowRebateResult(true);
    setTimeout(() => setShowRebateResult(false), 8000);
  };

  const StatusBadge = ({ status }: { status: TechStatus }) => {
    const config = {
      [TechStatus.AVAILABLE]: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500', ping: 'bg-emerald-400', border: 'border-emerald-200' },
      [TechStatus.ON_JOB]: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500', ping: 'bg-amber-400', border: 'border-amber-200' },
      [TechStatus.EN_ROUTE]: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500', ping: 'bg-blue-400', border: 'border-blue-200' },
      [TechStatus.OFF_DUTY]: { bg: 'bg-slate-50', text: 'text-slate-500', dot: 'bg-slate-400', ping: 'bg-slate-300', border: 'border-slate-200' },
    };
    const c = config[status];
    return (
      <span className={`inline-flex items-center gap-1.5 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter border ${c.bg} ${c.text} ${c.border}`}>
        <span className="relative flex h-1.5 w-1.5">
          {status !== TechStatus.OFF_DUTY && <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${c.ping}`}></span>}
          <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${c.dot}`}></span>
        </span>
        {status.replace('_', ' ')}
      </span>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 h-auto md:h-[850px] w-full max-w-7xl mx-auto p-4 sm:p-6 font-sans">
      
      {/* Hero Card */}
      <div className="col-span-1 md:col-span-2 md:row-span-2 bg-slate-900 rounded-[2.5rem] p-10 flex flex-col justify-between relative overflow-hidden smile-card shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-smileRed opacity-[0.08] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 mb-8">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-[10px] font-black text-white uppercase tracking-widest">Active Dispatch GTA</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white font-heading leading-[1.1] tracking-tight mb-6">
            Toronto's Most <br/>
            <span className="text-smileRed">Reliable</span> Heating.
          </h1>
          <p className="text-slate-400 text-lg max-w-sm font-medium leading-relaxed">
            From emergency repairs to $7,500 rebates, we keep your family warm.
          </p>
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row gap-4 mt-10">
          <button onClick={triggerVoiceAgent} className="bg-smileRed text-white px-8 py-5 rounded-2xl font-black hover:bg-red-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-red-900/20 active:scale-95 group">
            Speak to a Human
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Tech Live Map Card */}
      <div className="col-span-1 md:col-span-1 md:row-span-2 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-6 flex flex-col smile-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-black text-slate-900 flex items-center gap-2 text-sm uppercase tracking-widest">
            <MapPin className="w-4 h-4 text-smileRed" />
            Live Dispatch
          </h3>
          <button 
            onClick={fetchLiveTraffic} 
            disabled={isSyncing}
            className={`p-2 rounded-xl border border-slate-100 transition-all ${isSyncing ? 'bg-slate-50' : 'hover:bg-slate-50 active:scale-90'}`}
          >
            <RefreshCw className={`w-3.5 h-3.5 text-slate-400 ${isSyncing ? 'animate-spin text-smileRed' : ''}`} />
          </button>
        </div>

        <div className="mb-6 bg-slate-900 rounded-2xl p-4 border border-slate-800 relative overflow-hidden">
          <div className={`absolute inset-0 bg-red-600/10 transition-opacity duration-1000 ${trafficLevel === 'heavy' ? 'opacity-100' : 'opacity-0'}`}></div>
          <div className="flex items-center justify-between mb-3 relative z-10">
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <Car className="w-3 h-3" />
              AI Traffic Radar
            </div>
            {lastSync && (
              <span className="text-[9px] font-bold text-slate-500 uppercase">Updated {lastSync}</span>
            )}
          </div>
          
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <div className={`w-3 h-3 rounded-full animate-pulse-slow ${trafficLevel === 'light' ? 'bg-emerald-500' : trafficLevel === 'heavy' ? 'bg-red-500' : 'bg-amber-500'}`}></div>
            <div>
              <p className={`text-xs font-black uppercase tracking-tighter ${trafficLevel === 'heavy' ? 'text-red-400' : 'text-white'}`}>
                {trafficLevel === 'heavy' ? 'HEAVY CONGESTION' : trafficLevel === 'light' ? 'CLEAR CONDITIONS' : 'MODERATE FLOW'}
              </p>
              <p className="text-[9px] text-slate-400 font-medium">GTAs live conditions fetched via Maps Grounding</p>
            </div>
          </div>

          <div className="flex bg-white/5 p-1 rounded-xl relative z-10">
            {['light', 'moderate', 'heavy'].map(l => (
              <button key={l} onClick={() => setTrafficLevel(l as any)} className={`flex-1 py-1.5 text-[9px] font-black rounded-lg transition-all uppercase ${trafficLevel === l ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-white/80'}`}>
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3 flex-1 overflow-y-auto">
          {TECHNICIANS.map(tech => (
            <div key={tech.id} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-transparent hover:border-slate-200 transition-all">
              <img src={tech.avatar} alt={tech.name} className="w-12 h-12 rounded-full object-cover shadow-sm ring-2 ring-white" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <p className="text-xs font-black text-slate-900">{tech.name}</p>
                  <StatusBadge status={tech.status} />
                </div>
                <div className="flex justify-between items-end">
                  <p className="text-[10px] text-slate-500 font-medium truncate w-24">{tech.currentLocation}</p>
                  {tech.eta && <span className="text-[10px] font-black text-slate-900">~{getAdjustedEta(tech.eta)}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {trafficLevel === 'heavy' && (
          <div className="mt-4 p-3 bg-red-50 rounded-xl border border-red-100 flex items-center gap-2">
            <AlertTriangle className="w-3 h-3 text-red-600 shrink-0" />
            <p className="text-[9px] font-bold text-red-800 uppercase tracking-tighter">GTA Traffic Delay: ETAs adjusted for congestion</p>
          </div>
        )}
      </div>

      {/* Rebate Card */}
      <div className="col-span-1 md:col-span-1 md:row-span-2 bg-gradient-to-br from-green-50 to-emerald-50 rounded-[2.5rem] border border-green-100 p-8 flex flex-col smile-card">
        <div className="inline-block bg-green-100 text-green-700 text-[10px] font-black px-3 py-1 rounded-full mb-6 uppercase tracking-widest self-start">
          2026 Savings
        </div>
        <h3 className="text-2xl font-black text-slate-900 mb-6 leading-tight">Rebate Calculator</h3>
        <div className="space-y-5">
          <div>
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Property Type</label>
            <div className="grid grid-cols-2 gap-2">
              {['Detached', 'Town'].map(t => (
                <button key={t} onClick={() => setHouseType(t.toLowerCase())} className={`text-[10px] font-black py-2.5 rounded-xl border transition-all ${houseType === t.toLowerCase() ? 'bg-green-600 text-white border-green-600' : 'bg-white text-slate-600 border-green-100 hover:border-green-300'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Current Fuel</label>
            <div className="grid grid-cols-3 gap-2">
              {['furnace', 'electric', 'oil'].map(f => (
                <button key={f} onClick={() => setHeatingType(f)} className={`text-[10px] font-black py-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${heatingType === f ? 'bg-green-600 text-white border-green-600' : 'bg-white text-slate-600 border-green-100 hover:border-green-300'}`}>
                   {f === 'furnace' ? <Flame className="w-3 h-3" /> : (f === 'electric' ? <Zap className="w-3 h-3" /> : <Droplets className="w-3 h-3" />)}
                   {f.charAt(0).toUpperCase() + f.slice(1,4)}
                </button>
              ))}
            </div>
          </div>
          <div className={`p-6 rounded-[2rem] text-center transition-all ${showRebateResult ? 'bg-green-600 text-white shadow-xl scale-105' : 'bg-white text-slate-900 border border-green-100 shadow-sm'}`}>
            <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${showRebateResult ? 'text-green-100' : 'text-slate-400'}`}>Est. Eligibility</p>
            <p className="text-4xl font-black leading-none">${rebateAmount.toLocaleString()}</p>
          </div>
          <button onClick={handleVerify} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg active:scale-95">
            Verify Now
          </button>
        </div>
      </div>

      {/* Social Proof */}
      <div className="col-span-1 bg-white rounded-[2rem] border border-slate-100 p-6 flex flex-col justify-center smile-card">
        <div className="flex text-amber-400 mb-3 gap-0.5">
          {[1,2,3,4,5].map(i => <ShieldCheck key={i} className="w-4 h-4 fill-current" />)}
        </div>
        <p className="text-slate-700 font-bold italic text-sm leading-relaxed mb-4">
          "Carl arrived in 25 mins. Knowledgeable and honest about the repair costs."
        </p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-xs font-black text-slate-400 ring-2 ring-white">DE</div>
          <div>
            <p className="text-xs font-black text-slate-900 uppercase tracking-tight">Dave Elfassy</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Toronto, ON</p>
          </div>
        </div>
      </div>

      {/* Response Stat */}
      <div className="col-span-1 bg-slate-900 rounded-[2rem] p-6 flex flex-col items-center justify-center text-center smile-card">
        <Clock className="w-8 h-8 text-smileRed mb-2" />
        <h3 className="text-4xl font-black text-white leading-none mb-1 tracking-tighter">
          {trafficLevel === 'heavy' ? '58m' : trafficLevel === 'light' ? '28m' : '42m'}
        </h3>
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Live Response <br/>Vaughan / North York</p>
      </div>

      {/* Protection Plan */}
      <div className="col-span-1 md:col-span-2 bg-smileRed rounded-[2rem] p-8 flex items-center justify-between relative overflow-hidden smile-card shadow-2xl shadow-red-900/10">
        <div className="absolute inset-0 bg-black/5 opacity-20"></div>
        <div className="relative z-10">
          <h3 className="text-2xl font-black text-white mb-1 tracking-tight">Protection Plan</h3>
          <p className="text-red-100 text-sm font-medium">Free maintenance & priority for $14.99/mo.</p>
        </div>
        <button onClick={() => window.location.href='#business-case'} className="relative z-10 bg-white text-smileRed px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-50 transition-all active:scale-95">
          Join
        </button>
      </div>

    </div>
  );
};

export default BentoGrid;
