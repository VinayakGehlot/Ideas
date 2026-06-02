import React, { useEffect, useState } from 'react';

interface Props {
  format?: 'banner' | 'rectangle';
}

export function AdPlacement({ format = 'banner' }: Props) {
  // Rotate premium mock sponsors/native ads so it always looks dynamic, clean and high retention
  const [adIndex, setAdIndex] = useState(0);

  const SPONSORS = [
    {
      title: "Google AI Startup Bootcamp 2026",
      desc: "Apply for free access & cloud credits up to $200k. Limit: 20 slots remaining.",
      action: "Apply Now",
    },
    {
      title: "Hostinger - Super Fast Indian Cloud Hosting",
      desc: "Start your earning website at ₹149/mo with premium free domain + SSL.",
      action: "Get 75% Off",
    },
    {
      title: "Shopify - Create E-Commerce Store for ₹20",
      desc: "Sell products across India easily. Get 3-Months trial at just ₹20.",
      action: "Start Trial",
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

  if (format === 'banner') {
    return (
      <div className="my-6 mx-auto w-full max-w-4xl p-4 bg-gradient-to-r from-slate-50 via-indigo-50/10 to-slate-50 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 overflow-hidden animate-in fade-in duration-300">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="bg-indigo-600/10 text-indigo-700 font-extrabold text-[9px] tracking-widest px-2 py-1 rounded select-none uppercase shrink-0">
            SPONSORED
          </div>
          <div className="min-w-0">
            <h4 className="font-extrabold text-[12px] text-slate-800 line-clamp-1">{activeSponsor.title}</h4>
            <p className="text-[10px] text-slate-500 font-medium line-clamp-1 mt-0.5">{activeSponsor.desc}</p>
          </div>
        </div>
        <button className="whitespace-nowrap bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-[10px] tracking-wider uppercase px-4 py-2 rounded-xl text-center cursor-pointer transition active:scale-95 shrink-0 w-full sm:w-auto">
          {activeSponsor.action}
        </button>
      </div>
    );
  }

  // Rectangle format
  return (
    <div className="my-6 mx-auto w-full p-5 bg-gradient-to-tr from-white via-indigo-50/5 to-slate-50 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between h-56 animate-in fade-in duration-300">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="bg-indigo-600/10 text-indigo-700 font-extrabold text-[9px] tracking-widest px-2 py-0.5 rounded select-none uppercase">
            Sponsored Offer
          </span>
          <span className="text-[9px] text-slate-400 font-bold uppercase font-mono">Premium Partner</span>
        </div>
        <h4 className="font-black text-sm text-slate-800 mb-1.5">{activeSponsor.title}</h4>
        <p className="text-xs text-slate-500 font-medium leading-relaxed">{activeSponsor.desc}</p>
      </div>
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-4">
        <span className="text-[10px] text-slate-400 font-bold italic">Link Securly Verified</span>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs tracking-wider uppercase px-5 py-2.5 rounded-xl cursor-pointer transition active:scale-95">
          {activeSponsor.action}
        </button>
      </div>
    </div>
  );
}
