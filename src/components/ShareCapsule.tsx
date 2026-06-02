import React from 'react';
import { Share2, Instagram, Sparkles, LockOpen } from 'lucide-react';
import { useAppStore } from '../store';

export function ShareCapsule() {
  const store = useAppStore();

  const whatsappShares = store.whatsappSharesCount !== undefined ? store.whatsappSharesCount : (store.sharesCount || 0);
  const instagramShares = store.instagramSharesCount || 0;
  const totalShares = whatsappShares + instagramShares;
  const unlockedCount = store.unlockedCount !== undefined ? store.unlockedCount : 20;
  
  const currentProgress = totalShares % 5;

  const scrollToShare = () => {
    const element = document.querySelector('.share-card-container') || document.querySelector('header');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div 
      onClick={scrollToShare}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 backdrop-blur-md text-white px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-3 border border-slate-700/80 cursor-pointer hover:scale-105 active:scale-95 transition-all text-xs font-bold whitespace-nowrap md:px-5 md:py-3 select-none"
    >
      <div className="flex items-center gap-1 text-emerald-400">
        <LockOpen className="w-3.5 h-3.5 animate-pulse" />
        <span>{unlockedCount}/1000 Unlocked</span>
      </div>
      <div className="h-3 w-px bg-slate-700" />
      <div className="flex items-center gap-1 text-slate-300">
        <Share2 className="w-3 h-3 text-emerald-450" />
        <span>WA: {whatsappShares}</span>
      </div>
      <div className="flex items-center gap-1 text-slate-300">
        <Instagram className="w-3 h-3 text-pink-450" />
        <span>IG: {instagramShares}</span>
      </div>
      <div className="h-3 w-px bg-slate-700" />
      <div className="flex items-center gap-1.5">
        <span className="text-indigo-400">Next Milestone:</span>
        <span className="bg-indigo-650 text-white rounded-full px-2 py-0.5 text-[10px] font-black">
          {currentProgress}/5 Shares
        </span>
      </div>
    </div>
  );
}
