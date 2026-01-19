import React, { useState, useMemo } from 'react';
import { MapPin, ArrowRight, Thermometer, ShieldCheck, DollarSign, Clock, Flame, Zap, Droplets, Car } from 'lucide-react';
import { TECHNICIANS } from '../constants';
import { TechStatus } from '../types';

const BentoGrid: React.FC = () => {
  const [houseType, setHouseType] = useState('detached');
  const [heatingType, setHeatingType] = useState('furnace');
  const [trafficLevel, setTrafficLevel] = useState<'light' | 'moderate' | 'heavy'>('moderate');
  
  // Dynamic Rebate Calculation
  const rebateAmount = useMemo(() => {
    let base = 0;
    // Base amount by current heating source
    switch (heatingType) {
      case 'furnace': base = 7100; break;
      case 'electric': base = 4200; break;
      case 'oil': base = 6500; break;
      default: base = 7100;
    }

    // Adjustment by home type (mocking efficiency potential)
    if (houseType === 'town') base = Math.floor(base * 0.85); // Lower potential
    if (houseType === 'semi') base = Math.floor(base * 0.95);

    // Round to nearest 50
    return Math.ceil(base / 50) * 50;
  }, [houseType, heatingType]);

  // ETA Calculation based on Traffic
  const getAdjustedEta = (baseEta: string | undefined) => {
    if (!baseEta) return null;
    const minutes = parseInt(baseEta.replace('m', ''));
    if (isNaN(minutes)) return baseEta;

    let multiplier = 1;
    switch (trafficLevel) {
      case 'light': multiplier = 0.8; break;
      case 'heavy': multiplier = 1.4; break;
      default: multiplier = 1;
    }

    return `${Math.ceil(minutes * multiplier)}m`;
  };

  // Button Handlers
  const handleBooking = () => {
    alert("DEMO ACTION: Initiating Emergency Booking Flow...\n\nIn the live app, this would open the AI scheduling widget or dispatch form.");
  };

  const handleVerify = () => {
    alert(`DEMO ACTION: Verifying eligibility...\n\nBased on your inputs (${houseType} home, ${heatingType} heating), you qualify for the estimated $${rebateAmount.toLocaleString()} rebate.`);
  };

  const handleJoinProtection = () => {
    alert("DEMO ACTION: Smile Protection Plan\n\nRedirecting to subscription checkout...");
  };

  // Quick status Badge helper
  const StatusBadge = ({ status }: { status: TechStatus }) => {
    const config = {
      [TechStatus.AVAILABLE]: { 
        bg: 'bg-emerald-50', 
        text: 'text-emerald-700', 
        dot: 'bg-emerald-500', 
        ping: 'bg-emerald-400',
        border: 'border-emerald-200' 
      },
      [TechStatus.ON_JOB]: { 
        bg: 'bg-amber-50', 
        text: 'text-amber-700', 
        dot: 'bg-amber-500', 
        ping: 'bg-amber-400',
        border: 'border-amber-200' 
      },
      [TechStatus.EN_ROUTE]: { 
        bg: 'bg-blue-50', 
        text: 'text-blue-700', 
        dot: 'bg-blue-500', 
        ping: 'bg-blue-400',
        border: 'border-blue-200' 
      },
      [TechStatus.OFF_DUTY]: { 
        bg: 'bg-slate-50', 
        text: 'text-slate-500', 
        dot: 'bg-slate-400', 
        ping: 'bg-slate-300',
        border: 'border-slate-200' 
      },
    };

    const c = config[status];

    return (
      <span className={`inline-flex items-center gap-2 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border transition-all duration-300 hover:shadow-sm ${c.bg} ${c.text} ${c.border}`}>
        <span className="relative flex h-2 w-2">
          {status !== TechStatus.OFF_DUTY && (
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${c.ping}`}></span>
          )}
          <span className={`relative inline-flex rounded-full h-2 w-2 ${c.dot}`}></span>
        </span>
        {status.replace('_', ' ')}
      </span>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 h-auto md:h-[800px] w-full max-w-7xl mx-auto p-4 sm:p-6">
      
      {/* Card 1: Hero / Main Value Prop (Span 2 cols, 2 rows) */}
      <div className="col-span-1 md:col-span-2 md:row-span-2 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-smileRed opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-700"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 mb-6 shadow-lg shadow-black/10">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-xs font-medium text-white tracking-wide">High Demand: 4 Techs Active</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white font-heading leading-tight mb-4">
            Toronto's Fastest <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">No-Heat Response.</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-md">
            Don't freeze. We deploy local technicians like Dimitri and Carl within minutes. 
            Backed by our 10-Year Installation Warranty.
          </p>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row gap-4 mt-8">
          <button onClick={handleBooking} className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 shadow-lg">
            Book Emergency Repair
            <ArrowRight className="w-5 h-5" />
          </button>
          <div className="flex -space-x-3 items-center">
            {TECHNICIANS.map(t => (
              <img key={t.id} src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full border-2 border-slate-800" />
            ))}
            <div className="w-10 h-10 rounded-full bg-slate-700 border-2 border-slate-800 flex items-center justify-center text-xs text-white font-bold">
              500+
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: Real-time Technician Status (Span 1 col, 2 rows) */}
      <div className="col-span-1 md:col-span-1 md:row-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-smileRed" />
            Live Map
          </h3>
          <span className="text-xs text-gray-400">GTA Zone</span>
        </div>

        {/* Traffic Simulation Controls */}
        <div className="mb-4 bg-gray-50 rounded-xl p-3 border border-gray-100">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-500 uppercase tracking-wide">
            <Car className="w-3 h-3" />
            Traffic Conditions
          </div>
          <div className="flex rounded-lg bg-gray-200 p-1">
            <button 
              onClick={() => setTrafficLevel('light')}
              className={`flex-1 py-1 text-[10px] font-bold rounded-md transition-all ${trafficLevel === 'light' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Light
            </button>
            <button 
              onClick={() => setTrafficLevel('moderate')}
              className={`flex-1 py-1 text-[10px] font-bold rounded-md transition-all ${trafficLevel === 'moderate' ? 'bg-white text-amber-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Normal
            </button>
            <button 
              onClick={() => setTrafficLevel('heavy')}
              className={`flex-1 py-1 text-[10px] font-bold rounded-md transition-all ${trafficLevel === 'heavy' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Heavy
            </button>
          </div>
        </div>
        
        <div className="flex-1 space-y-4">
          {TECHNICIANS.map((tech) => (
            <div key={tech.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer group border border-transparent hover:border-gray-100">
              <div className="relative">
                <img src={tech.avatar} alt={tech.name} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" />
                {tech.status === TechStatus.AVAILABLE && (
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-bold text-slate-900">{tech.name}</p>
                  <StatusBadge status={tech.status} />
                </div>
                <div className="flex items-center justify-between">
                   <p className="text-xs text-gray-500 truncate">
                    {tech.currentLocation}
                  </p>
                  {tech.eta && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors duration-500 ${
                      trafficLevel === 'heavy' ? 'bg-red-100 text-red-700' :
                      trafficLevel === 'light' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      ~{getAdjustedEta(tech.eta)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">
            ETAs updated based on live traffic data
          </p>
        </div>
      </div>

      {/* Card 3: Rebate Calculator (Span 1 col, 2 rows) */}
      <div className="col-span-1 md:col-span-1 md:row-span-2 bg-gradient-to-b from-green-50 to-white rounded-3xl border border-green-100 p-6 flex flex-col relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <DollarSign className="w-32 h-32 text-green-600" />
        </div>
        
        <div className="relative z-10">
          <div className="inline-block bg-green-100 text-green-800 text-[10px] font-bold px-2 py-1 rounded mb-4">
            ENBRIDGE REBATES 2026
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Qualify for ${rebateAmount.toLocaleString()}?</h3>
          <p className="text-sm text-slate-500 mb-6">Heat Pump upgrades are heavily subsidized right now.</p>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase mb-1 block">Home Type</label>
              <div className="grid grid-cols-3 gap-2">
                {['Detached', 'Semi', 'Town'].map((type) => (
                  <button 
                    key={type}
                    onClick={() => setHouseType(type.toLowerCase())}
                    className={`text-xs py-2 rounded-lg border font-medium transition-all ${
                      houseType === type.toLowerCase() 
                      ? 'bg-green-600 text-white border-green-600' 
                      : 'bg-white text-slate-600 border-gray-200 hover:border-green-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase mb-1 block">Current System</label>
              <div className="grid grid-cols-3 gap-2">
                <button 
                  onClick={() => setHeatingType('furnace')}
                  className={`text-xs py-2 rounded-lg border flex flex-col items-center justify-center gap-1 transition-all ${
                    heatingType === 'furnace' 
                    ? 'bg-green-600 text-white border-green-600' 
                    : 'bg-white text-slate-600 border-gray-200 hover:border-green-300'
                  }`}
                >
                  <Flame className="w-3 h-3" />
                  Gas
                </button>
                <button 
                  onClick={() => setHeatingType('electric')}
                  className={`text-xs py-2 rounded-lg border flex flex-col items-center justify-center gap-1 transition-all ${
                    heatingType === 'electric' 
                    ? 'bg-green-600 text-white border-green-600' 
                    : 'bg-white text-slate-600 border-gray-200 hover:border-green-300'
                  }`}
                >
                  <Zap className="w-3 h-3" />
                  Elec
                </button>
                <button 
                  onClick={() => setHeatingType('oil')}
                  className={`text-xs py-2 rounded-lg border flex flex-col items-center justify-center gap-1 transition-all ${
                    heatingType === 'oil' 
                    ? 'bg-green-600 text-white border-green-600' 
                    : 'bg-white text-slate-600 border-gray-200 hover:border-green-300'
                  }`}
                >
                  <Droplets className="w-3 h-3" />
                  Oil
                </button>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-green-100 shadow-sm text-center">
              <p className="text-xs text-slate-400 mb-1">Estimated Rebate</p>
              <p className="text-3xl font-black text-green-600 tracking-tight">${rebateAmount.toLocaleString()}</p>
            </div>

            <button onClick={handleVerify} className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors">
              Verify Eligibility
            </button>
          </div>
        </div>
      </div>

      {/* Card 4: Social Proof / Review (Span 1 col, 1 row) */}
      <div className="col-span-1 bg-white rounded-3xl border border-gray-100 p-6 flex flex-col justify-center">
        <div className="flex text-yellow-400 mb-2">
          {[1,2,3,4,5].map(i => <ShieldCheck key={i} className="w-5 h-5 fill-current" />)}
        </div>
        <p className="text-slate-800 font-medium italic mb-4">
          "Carl was professional, punctual, and extremely knowledgeable. He quickly identified the problems..."
        </p>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold">DE</div>
          <div>
            <p className="text-xs font-bold text-slate-900">Dave Elfassy</p>
            <p className="text-[10px] text-gray-400">Verified Customer</p>
          </div>
        </div>
      </div>

       {/* Card 5: Service Stats (Span 1 col, 1 row) */}
       <div className="col-span-1 bg-slate-50 rounded-3xl border border-gray-200 p-6 flex flex-col items-center justify-center text-center">
        <Clock className="w-8 h-8 text-smileRed mb-2" />
        <h3 className="text-3xl font-black text-slate-900">42m</h3>
        <p className="text-sm text-slate-500 font-medium">Avg. Response Time <br/>in Vaughan today</p>
      </div>

       {/* Card 6: Promo / Maintenance (Span 2 cols, 1 row) */}
       <div className="col-span-1 md:col-span-2 bg-smileRed rounded-3xl p-6 flex items-center justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="relative z-10 text-white">
          <h3 className="text-xl font-bold mb-1">Smile Protection Plan</h3>
          <p className="text-red-100 text-sm">Priority service & free maintenance for $14.99/mo.</p>
        </div>
        <button onClick={handleJoinProtection} className="relative z-10 bg-white text-smileRed px-6 py-2 rounded-lg font-bold text-sm hover:bg-red-50 transition-colors">
          Join Now
        </button>
      </div>

    </div>
  );
};

export default BentoGrid;