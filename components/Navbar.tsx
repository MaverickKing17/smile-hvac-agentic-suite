import React from 'react';
import { Phone, Menu } from 'lucide-react';

const Navbar: React.FC = () => {
  const handleScroll = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCTA = () => {
    window.dispatchEvent(new Event('smile-trigger-ai'));
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <a href="#home" onClick={(e) => handleScroll(e, 'home')} className="flex items-center gap-2 group">
            <div className="text-2xl font-black font-heading tracking-tighter text-slate-900">
              SMILE <span className="text-smileRed">HVAC</span>
            </div>
          </a>

          <div className="hidden md:flex items-center space-x-10">
            {['Heating', 'Cooling', 'Rebates'].map(item => (
              <a key={item} href="#home" onClick={(e) => handleScroll(e, 'home')} className="text-slate-500 hover:text-slate-900 font-black text-[10px] uppercase tracking-widest transition-all">{item}</a>
            ))}
            <div className="h-4 w-px bg-slate-200"></div>
            <a href="#ux-audit" onClick={(e) => handleScroll(e, 'ux-audit')} className="text-indigo-600 hover:text-indigo-800 font-black text-[10px] uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">Proposal</a>
            <a href="#business-case" onClick={(e) => handleScroll(e, 'business-case')} className="text-emerald-600 hover:text-emerald-800 font-black text-[10px] uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">ROI</a>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex flex-col items-end mr-4">
              <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-0.5">24/7 Priority Line</span>
              <a href="tel:4377774555" className="text-base font-black text-slate-900 hover:text-smileRed transition-colors">437-777-4555</a>
            </div>
            <button onClick={handleCTA} className="bg-smileRed hover:bg-red-700 text-white px-6 py-3.5 rounded-2xl font-black shadow-xl shadow-red-900/20 transition-all active:scale-95 flex items-center gap-2 text-[10px] uppercase tracking-widest">
              <Phone className="w-3.5 h-3.5" />
              <span>Live Support</span>
            </button>
            <button className="md:hidden p-2 text-slate-900" onClick={handleCTA}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;