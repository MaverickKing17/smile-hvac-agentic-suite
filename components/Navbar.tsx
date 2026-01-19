import React from 'react';
import { Phone, Menu } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="text-2xl font-black font-heading tracking-tighter text-slate-900">
              SMILE <span className="text-smileRed">HVAC</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-slate-600 hover:text-smileRed font-medium text-sm transition-colors">Heating</a>
            <a href="#" className="text-slate-600 hover:text-smileRed font-medium text-sm transition-colors">Cooling</a>
            <a href="#" className="text-slate-600 hover:text-smileRed font-medium text-sm transition-colors">Rebates</a>
            <a href="#" className="text-slate-600 hover:text-smileRed font-medium text-sm transition-colors">Reviews</a>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end mr-2">
              <span className="text-xs font-bold text-green-600 uppercase tracking-wide animate-pulse">24/7 Live Support</span>
              <span className="text-lg font-bold text-slate-900">437-777-4555</span>
            </div>
            <button className="bg-smileRed hover:bg-red-700 text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-red-500/30 transition-all transform hover:-translate-y-0.5 flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Emergency Service</span>
              <span className="sm:hidden">Call</span>
            </button>
            <button className="md:hidden p-2 text-slate-600">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;