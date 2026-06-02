import React, { useState } from 'react';
import { Share2, Instagram, Award, Lock, Sparkles } from 'lucide-react';
import { useAppStore } from '../store';
import { triggerWhatsAppShare, triggerInstagramShare } from '../lib/share';
import { AdPlacement, MONETAG_SMARTLINK_URL } from './AdPlacement';

export function ShareCard() {
  const store = useAppStore();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Safeguards for backward compatibility on legacy loaded states
  const whatsappShares = store.whatsappSharesCount !== undefined ? store.whatsappSharesCount : (store.sharesCount || 0);
  const instagramShares = store.instagramSharesCount || 0;
  const totalShares = whatsappShares + instagramShares;
  const unlockedCount = store.unlockedCount !== undefined ? store.unlockedCount : 20;

  const totalAim = 1000;
  const isFullyUnlocked = unlockedCount >= totalAim;
  
  const sharesInCurrentMilestone = totalShares % 5;
  const progressPercent = (sharesInCurrentMilestone / 5) * 100;

  const handleWhatsApp = () => {
    triggerWhatsAppShare(() => {
      store.incrementWhatsAppShare();
      setToastMessage('WhatsApp share progress saved! 🎁');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    });
  };

  const handleInstagram = () => {
    triggerInstagramShare(() => {
      store.incrementInstagramShare();
      setToastMessage('Message copied! Instagram opened. Progress saved! 📸');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    });
  };

  if (isFullyUnlocked) {
    return (
      <div className="bg-gradient-to-r from-amber-50 via-indigo-50 to-emerald-50 rounded-2xl p-6 border border-indigo-100 shadow-sm mb-6 text-center">
        <span className="text-3xl mb-2 block">🎉</span>
        <h3 className="font-extrabold text-indigo-900 text-xl">Sabhi 1000+ Ideas Unlock Ho Gaye!</h3>
        <p className="mt-1.5 text-sm text-indigo-700 max-w-md mx-auto">
          Aapne milkar saare discrete premium business & online earning ideas unlock kar liye hain. Apna pasandida business abhi shuru karein!
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs font-bold text-slate-500">
          <span className="bg-white/80 px-3 py-1.5 rounded-full border border-slate-100">WhatsApp Shares: {whatsappShares}</span>
          <span className="bg-white/80 px-3 py-1.5 rounded-full border border-slate-100">Instagram Shares: {instagramShares}</span>
          <span className="bg-indigo-600 px-3 py-1.5 rounded-full text-white">Total: {totalShares} Shares</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-6 relative overflow-hidden">
      {/* Background visual accents */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 blur-2xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-5 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md mb-2 inline-block">
            🎁 Premium Unlocker Active
          </span>
          <h3 className="text-xl font-black text-slate-800 tracking-tight mt-1">
            Progress: {unlockedCount} / {totalAim} Ideas
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Agle 100 premium ideas unlock karne ke liye 5 total shares complete karein.
          </p>
        </div>

        {/* Dashboard statistics requested */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-wrap gap-4 text-center items-center justify-between sm:justify-start">
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase">Unlocked ideas</div>
            <div className="text-sm font-black text-slate-800 flex items-center justify-center gap-1">
              <Award className="w-3.5 h-3.5 text-indigo-500" />
              {unlockedCount}
            </div>
          </div>
          <div className="hidden sm:block w-px bg-slate-200 self-stretch" />
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase">WhatsApp Shares</div>
            <div className="text-sm font-black text-slate-850">{whatsappShares}</div>
          </div>
          <div className="hidden sm:block w-px bg-slate-200 self-stretch" />
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase">Instagram Shares</div>
            <div className="text-sm font-black text-slate-850">{instagramShares}</div>
          </div>
          <div className="w-px bg-slate-200 self-stretch" />
          <div>
            <div className="text-[10px] font-bold text-indigo-500 uppercase">Total Progress</div>
            <div className="text-sm font-black text-indigo-650 bg-indigo-50/80 px-2 py-0.5 rounded-md border border-indigo-100">
              {sharesInCurrentMilestone} / 5
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-5 bg-slate-50 p-3 rounded-xl border border-slate-100">
        <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-1.5">
          <span>Current Milestone Tracker: {sharesInCurrentMilestone} / 5 Shares</span>
          <span className="text-indigo-600 font-extrabold">{Math.round(progressPercent)}% Completed</span>
        </div>
        <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-emerald-500 to-indigo-600 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Recommended Placement: Before unlock actions */}
      <AdPlacement format="native-banner" />

      {/* Share Actions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button 
          onClick={handleWhatsApp}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold py-3 px-5 rounded-full flex items-center justify-center gap-2.5 transition-all shadow-md hover:shadow-lg active:scale-95 text-xs tracking-wider uppercase cursor-pointer font-manrope"
        >
          <Share2 className="w-4.5 h-4.5" />
          WhatsApp pe Share karein
        </button>
        <button 
          onClick={handleInstagram}
          className="bg-gradient-to-r from-pink-500 via-rose-500 to-yellow-500 hover:opacity-95 text-white font-extrabold py-3 px-5 rounded-full flex items-center justify-center gap-2.5 transition-all shadow-md hover:shadow-lg active:scale-95 text-xs tracking-wider uppercase cursor-pointer"
        >
          <Instagram className="w-4.5 h-4.5" />
          Instagram pe Share karein
        </button>
      </div>

      <p className="text-[11px] text-slate-400 font-medium italic text-center mt-3">
        "Copy text auto-copy ho jayega, direct apne friends ya groups me paste karke help karein!"
      </p>

      {/* Direct SmartLink Option for exploring curated campaigns */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2.5 bg-slate-50/50 p-3 rounded-xl">
        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-manrope text-center sm:text-left">
          🎁 Direct Option (Sponsor Unlock Shortcut)
        </span>
        <button 
          onClick={() => window.open(MONETAG_SMARTLINK_URL, '_blank', 'noopener,noreferrer')}
          className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-[9px] tracking-wider uppercase px-4 py-2 rounded-full flex items-center gap-1 transition-all active:scale-98 cursor-pointer font-manrope whitespace-nowrap"
        >
          🚀 Explore Opportunities &rarr;
        </button>
      </div>
      
      {/* Floating inlineToast inside card */}
      {showToast && (
        <div className="absolute inset-x-0 bottom-0 py-2.5 bg-slate-800 text-center text-xs font-black text-white animate-in slide-in-from-bottom border-t border-slate-700 z-10">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
