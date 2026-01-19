import React from 'react';
import { Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const handleLinkClick = (e: React.MouseEvent, linkName: string) => {
    e.preventDefault();
    if (['Services', 'Reviews', 'Products'].includes(linkName)) {
      document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      alert(`The "${linkName}" page is not included in this single-page proposal demo.`);
    }
  };

  return (
    <footer className="bg-[#001529] text-white pt-20 pb-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand & Socials */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
               {/* Brand Logo Text */}
              <div className="flex flex-col">
                <div className="text-2xl font-black font-heading tracking-tighter text-white leading-none">
                  Smile <span className="text-white">HVAC</span>
                </div>
                <span className="text-xs text-slate-400 italic mt-1">We care about your comfort</span>
              </div>
            </div>
            
            <div className="flex gap-3 pt-2">
              <a href="#" onClick={(e) => handleLinkClick(e, 'Facebook')} className="w-10 h-10 rounded-full border border-slate-600 flex items-center justify-center hover:bg-slate-800 hover:border-white transition-all group">
                <Facebook className="w-5 h-5 text-slate-300 group-hover:text-white" />
              </a>
               <a href="#" onClick={(e) => handleLinkClick(e, 'Pinterest')} className="w-10 h-10 rounded-full border border-slate-600 flex items-center justify-center hover:bg-slate-800 hover:border-white transition-all group">
                {/* Custom Pinterest Icon */}
                <svg className="w-5 h-5 text-slate-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.399.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.173 0 7.41 2.967 7.41 6.923 0 4.135-2.607 7.512-6.232 7.512-1.219 0-2.365-.635-2.757-1.386l-.753 2.874c-.271 1.045-1.006 2.348-1.503 3.146 1.135.344 2.327.531 3.568.531 6.608 0 11.968-5.368 11.968-11.987 0-6.607-5.36-11.987-11.968-11.987z" />
                </svg>
              </a>
              <a href="#" onClick={(e) => handleLinkClick(e, 'Instagram')} className="w-10 h-10 rounded-full border border-slate-600 flex items-center justify-center hover:bg-slate-800 hover:border-white transition-all group">
                <Instagram className="w-5 h-5 text-slate-300 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">Navigation</h3>
            <ul className="space-y-3">
              {['Services', 'Service Areas', 'Brands', 'Products', 'Coupons & Promotions', 'Reviews', 'Blog'].map((item) => (
                <li key={item}>
                  <a href="#" onClick={(e) => handleLinkClick(e, item)} className="text-slate-300 hover:text-white transition-colors text-sm font-medium">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services Links */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">Services</h3>
            <ul className="space-y-3">
              {['Furnace', 'Air Conditioners', 'Water Treatment', 'HEPA Air Filter Services', 'HRV Services', 'Additional Services'].map((item) => (
                <li key={item}>
                  <a href="#" onClick={(e) => handleLinkClick(e, item)} className="text-slate-300 hover:text-white transition-colors text-sm font-medium">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Badges */}
          <div>
             <h3 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">SMILE HVAC</h3>
             <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <span className="block max-w-[250px] leading-relaxed">8540 Keele Street Unit 41,<br/>Vaughan, ON, L4K 2N2</span>
                </div>
                <div>
                  <a href="mailto:email@smilehvac.ca" className="hover:text-white transition-colors">email@smilehvac.ca</a>
                </div>
                <div className="text-2xl font-bold text-amber-500 pt-1 tracking-tight">
                  (+1) 437-777-4555
                </div>
             </div>

             {/* Badges */}
             <div className="mt-8 flex flex-wrap items-center gap-3">
               {/* Google Guaranteed Badge Simulation */}
               <div className="bg-white rounded p-1 flex items-center gap-1.5 h-10 px-2 shadow-lg">
                 <div className="bg-green-500 rounded-full p-0.5 flex items-center justify-center w-5 h-5">
                   <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                 </div>
                 <div className="leading-none">
                   <div className="text-[9px] font-black text-slate-600 tracking-tighter">GOOGLE</div>
                   <div className="text-[9px] font-black text-slate-900 tracking-tighter">GUARANTEED</div>
                 </div>
               </div>
               
               {/* HomeStars Badge Simulation */}
               <div className="bg-white rounded h-10 w-10 flex flex-col items-center justify-center border-l-2 border-orange-400 shadow-lg">
                  <div className="text-[5px] font-bold text-slate-900">HomeStars</div>
                  <div className="text-[5px] font-bold text-orange-500 uppercase leading-none my-0.5">Best of</div>
                  <div className="text-[6px] font-black text-slate-900">2024</div>
               </div>
               <div className="bg-white rounded h-10 w-10 flex flex-col items-center justify-center border-l-2 border-orange-400 shadow-lg">
                  <div className="text-[5px] font-bold text-slate-900">HomeStars</div>
                  <div className="text-[5px] font-bold text-orange-500 uppercase leading-none my-0.5">Best of</div>
                  <div className="text-[6px] font-black text-slate-900">2025</div>
               </div>
             </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
          <p className="mb-4 md:mb-0">Copyright © 2026 | Smile HVAC</p>
          <div className="flex gap-8">
            <a href="#" onClick={(e) => handleLinkClick(e, 'About us')} className="hover:text-white transition-colors">About us</a>
            <a href="#" onClick={(e) => handleLinkClick(e, 'Sitemap')} className="hover:text-white transition-colors">Sitemap</a>
            <a href="#" onClick={(e) => handleLinkClick(e, 'Privacy Policy')} className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;