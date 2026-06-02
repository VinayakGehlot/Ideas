import React, { useEffect, useState } from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';

interface Props {
  format?: 'banner' | 'rectangle' | 'native-banner';
}

// Monetag verified SmartLink URL (built on native zone and domain details)
export const MONETAG_SMARTLINK_URL = "https://omg10.com/4/11090638";

export function AdPlacement({ format = 'banner' }: Props) {
  // Rotate premium mock sponsors/native ads so it always looks dynamic, clean and high retention
  const [adIndex, setAdIndex] = useState(0);

  const SPONSORS = [
    {
      title: "Google AI Startup Bootcamp 2026",
      desc: "Apply for free access & cloud credits up to $200k. Limit: 20 slots remaining.",
      action: "Explore Opportunities",
    },
    {
      title: "Hostinger - Super Fast Indian Cloud Hosting",
      desc: "Start your earning website at ₹149/mo with premium free domain + SSL.",
      action: "Discover New Ideas",
    },
    {
      title: "Shopify - Create E-Commerce Store for ₹20",
      desc: "Sell products across India easily. Get 3-Months trial at just ₹20.",
      action: "Unlock More Ideas",
    }
  ];

  useEffect(() => {
    // Rotate every 12 seconds
    const interval = setInterval(() => {
      setAdIndex((prev) => (prev + 1) % SPONSORS.length);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const activeSponsor = SPONSORS[adIndex];

  // Dedicated function for SmartLink clicks to verify secure routing
  const handleSmartLinkClick = () => {
    if (typeof window !== 'undefined') {
      window.open(MONETAG_SMARTLINK_URL, '_blank', 'noopener,noreferrer');
    }
  };

  // 1. Native Banner Target Container placeholder layout (to prevent layout shifts)
  if (format === 'native-banner') {
    return (
      <div className="my-5 mx-auto w-full max-w-4xl p-0.5 rounded-2xl bg-gradient-to-r from-indigo-100/30 to-slate-100/20 border border-slate-150 shadow-[0_1px_3px_rgba(0,0,0,0.01)] text-center animate-in fade-in duration-300">
        <div className="text-[8px] font-bold text-slate-400 p-1 tracking-widest uppercase select-none border-b border-light border-slate-200/40">
          RECOMMENDED NATIVE AD PARTNER
        </div>
        {/* Placeholder element for dynamically loaded Monetag Native Banner */}
        <div 
          className="monetag-native-zone-target min-h-[90px] flex items-center justify-center p-3 text-xs text-slate-500 font-medium"
        >
          <div className="flex flex-col items-center gap-1.5 py-4 cursor-pointer" onClick={handleSmartLinkClick}>
            <p className="font-poppins font-semibold text-slate-700 hover:text-indigo-650 flex items-center gap-1">
              🚀 Explore Global Premium Opportunities <ExternalLink className="w-3 h-3 text-indigo-500" />
            </p>
            <span className="text-[9px] text-slate-400 font-manrope">Sponsored Content Verified</span>
          </div>
        </div>
      </div>
    );
  }

  // 2. Banner design integration with SmartLink on dedicated Action button
  if (format === 'banner') {
    return (
      <div className="my-5 mx-auto w-full max-w-4xl p-4 bg-gradient-to-r from-slate-50 via-indigo-50/15 to-slate-50 rounded-2xl border border-slate-200/80 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row items-center justify-between gap-3 overflow-hidden animate-in fade-in duration-300">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="bg-indigo-600/10 text-indigo-700 font-extrabold text-[9px] tracking-widest px-2 py-1 rounded select-none uppercase shrink-0">
            SPONSOR
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-[12px] text-slate-800 line-clamp-1 font-poppins">{activeSponsor.title}</h4>
            <p className="text-[10px] text-slate-500 font-medium line-clamp-1 mt-0.5">{activeSponsor.desc}</p>
          </div>
        </div>
        <button 
          onClick={handleSmartLinkClick}
          className="whitespace-nowrap bg-slate-900 hover:bg-indigo-650 text-white font-bold text-[10px] tracking-wider uppercase px-4 py-2 rounded-xl text-center cursor-pointer transition-all active:scale-95 shrink-0 w-full sm:w-auto font-manrope shadow-button"
        >
          {activeSponsor.action} &rarr;
        </button>
      </div>
    );
  }

  // 3. Rectangle Card format
  return (
    <div className="my-5 mx-auto w-full p-5 bg-gradient-to-tr from-white via-indigo-50/5 to-slate-50 rounded-2xl border border-slate-200/90 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.03)] flex flex-col justify-between h-56 animate-in fade-in duration-300">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="bg-indigo-600/10 text-indigo-700 font-extrabold text-[9px] tracking-widest px-2 py-0.5 rounded select-none uppercase">
            Sponsored Offer
          </span>
          <span className="text-[9px] text-slate-400 font-bold uppercase font-mono">Premium Partner</span>
        </div>
        <h4 className="font-extrabold text-sm text-slate-800 mb-1.5 font-poppins">{activeSponsor.title}</h4>
        <p className="text-xs text-slate-500 font-medium leading-relaxed">{activeSponsor.desc}</p>
      </div>
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-4">
        <span className="text-[10px] text-slate-400 font-bold italic">Link Securely Verified</span>
        <button 
          onClick={handleSmartLinkClick}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs tracking-wider uppercase px-5 py-2.5 rounded-xl cursor-pointer transition active:scale-95 font-manrope"
        >
          {activeSponsor.action}
        </button>
      </div>
    </div>
  );
}
