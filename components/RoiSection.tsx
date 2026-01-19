import React from 'react';
import { ROI_DATA } from '../constants';
import { TrendingUp } from 'lucide-react';

const RoiSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-slate-900 p-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-500 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Business Case: The $5k Investment</h2>
            </div>
            <p className="text-slate-400">
              Projected ROI based on capturing just 3 additional emergency calls per week.
            </p>
          </div>
          
          <div className="p-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Metric</th>
                    <th className="text-left py-4 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Current Site</th>
                    <th className="text-left py-4 px-4 text-xs font-bold text-green-600 uppercase tracking-wider">With New Stack</th>
                    <th className="text-right py-4 px-4 text-xs font-bold text-slate-900 uppercase tracking-wider">Revenue Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {ROI_DATA.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4 font-medium text-slate-900">{row.metric}</td>
                      <td className="py-4 px-4 text-slate-500">{row.current}</td>
                      <td className="py-4 px-4 font-bold text-green-600">{row.projected}</td>
                      <td className="py-4 px-4 text-right font-bold text-slate-900">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className="pt-6 text-right font-medium text-slate-500">Monthly Revenue Increase:</td>
                    <td className="pt-6 text-right font-black text-2xl text-smileRed">~$19,200</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            
            <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800 flex items-start gap-3">
              <div className="font-bold shrink-0">ROI Insight:</div>
              <p>
                The $5,000 setup fee is recovered in the first <strong>1.5 weeks</strong> of operation solely through the AI Receptionist handling missed after-hours calls.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoiSection;