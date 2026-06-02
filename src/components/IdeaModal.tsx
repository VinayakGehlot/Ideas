import React, { useEffect, useState } from 'react';
import { Bookmark, X, IndianRupee, Clock, Zap, CheckCircle2, AlertTriangle, Wallet, Share2 } from 'lucide-react';
import { type Idea } from '../types';
import { useAppStore } from '../store';
import { cn } from '../lib/utils';
import { IDEAS } from '../data';
import { AdPlacement } from './AdPlacement';
import { triggerWhatsAppShare } from '../lib/share';
import { 
  translateCategory, 
  translateSkillLevel, 
  translateTimeToStart, 
  translateEarningPotential, 
  translateTextDescription, 
  translateProOption, 
  translateCautionOption 
} from '../lib/translate';

interface Props {
  idea: Idea | null;
  onClose: () => void;
  onOpenRelated: (id: string) => void;
}

export function IdeaModal({ idea, onClose, onOpenRelated }: Props) {
  const { bookmarks, toggleBookmark, addToHistory, incrementShare } = useAppStore();
  const [isVisible, setIsVisible] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (idea) {
      setIsVisible(true);
      addToHistory(idea.id);
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [idea, addToHistory]);

  if (!idea) return null;
  
  const isBookmarked = bookmarks.includes(idea.id);

  // find related ideas
  const relatedIdeas = IDEAS.filter(i => idea.relatedIdeaIds.includes(i.id));

  const handleShare = () => {
    triggerWhatsAppShare(() => {
      incrementShare();
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    });
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 sm:p-6 md:p-12">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className={cn(
        "relative flex h-full max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-300",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      )}>
        {/* Toast */}
        {showToast && (
          <div className="absolute top-20 right-6 animate-in fade-in slide-in-from-top-4 rounded-lg bg-slate-800 px-4 py-2 text-sm text-white shadow-lg z-50">
            Progress save ho gaya! 👍
          </div>
        )}

        {/* Header */}
        <div className="flex shrink-0 items-start justify-between border-b border-slate-200 p-6 sm:px-8 bg-white">
          <div className="pr-24">
            <span className="mb-3 inline-block rounded bg-indigo-50 px-2 py-1 text-[10px] uppercase font-bold tracking-widest text-indigo-700">
              {translateCategory(idea.category)}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 leading-tight">
              {idea.title}
            </h2>
          </div>
          
          <div className="absolute right-6 top-6 flex gap-2">
            <button 
              onClick={handleShare}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 transition hover:bg-emerald-100 cursor-pointer"
              title="WhatsApp par share karein"
            >
              <Share2 className="h-5 w-5" />
            </button>
            <button 
              onClick={() => toggleBookmark(idea.id)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition hover:bg-slate-100 hover:text-indigo-600 cursor-pointer"
            >
              <Bookmark className={cn("h-5 w-5", isBookmarked && "fill-indigo-600 text-indigo-600")} />
            </button>
            <button 
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition hover:bg-red-50 hover:text-red-500 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:px-8 bg-slate-50 text-slate-800">
          
          <p className="mb-8 text-sm sm:text-base leading-relaxed text-slate-600">
            {translateTextDescription(idea.description)}
          </p>

          <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <IndianRupee className="mb-2 h-5 w-5 text-indigo-500" />
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Potential Kamai</div>
              <div className="font-bold text-slate-800 text-sm">{translateEarningPotential(idea.earningPotential)}</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <Wallet className="mb-2 h-5 w-5 text-indigo-500" />
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Shuruaati Kharch</div>
              <div className="font-bold text-slate-800 text-sm">{idea.startCost}</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <Zap className="mb-2 h-5 w-5 text-indigo-500" />
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Zaroori Hunar</div>
              <div className="font-bold text-slate-800 text-sm">{translateSkillLevel(idea.skillLevel)}</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <Clock className="mb-2 h-5 w-5 text-indigo-500" />
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Lagne Wala Time</div>
              <div className="font-bold text-slate-800 text-sm">{translateTimeToStart(idea.timeToStart)}</div>
            </div>
          </div>

          <AdPlacement format="rectangle" />

          <div className="my-8">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">Kaise Shuru Karein (Step by Step)</h3>
            <ul className="space-y-3">
              {idea.steps.map((step, idx) => (
                <li key={idx} className="flex gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-indigo-100 text-xs font-bold text-indigo-700">
                    {idx + 1}
                  </span>
                  <p className="text-sm text-slate-700 font-medium">{step}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
              <h4 className="mb-3 flex items-center font-bold text-emerald-800 text-sm uppercase tracking-wider">
                <CheckCircle2 className="mr-2 h-4 w-4" /> Faaide (Pros)
              </h4>
              <ul className="space-y-2 text-xs font-medium text-emerald-900/80">
                {idea.pros.map((pro, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="mr-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" /> {translateProOption(pro)}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="rounded-xl border border-red-200 bg-red-50 p-5">
              <h4 className="mb-3 flex items-center font-bold text-red-800 text-sm uppercase tracking-wider">
                <AlertTriangle className="mr-2 h-4 w-4" /> Dhyaan Rakhein (Cautions)
              </h4>
              <ul className="space-y-2 text-xs font-medium text-red-900/80">
                {idea.cautions.map((caution, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="mr-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" /> {translateCautionOption(caution)}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-4 pt-8 mt-12 bg-white -mx-6 sm:-mx-8 px-6 sm:px-8 pb-8 border-t border-slate-200">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400 pt-4">Aur ideas jo aapko pasand aayenge</h3>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {relatedIdeas.map((rel) => (
                <div 
                  key={rel.id} 
                  onClick={() => onOpenRelated(rel.id)}
                  className="cursor-pointer rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-white hover:border-indigo-300 hover:shadow-sm"
                >
                  <div className="mb-2 text-[10px] uppercase font-bold tracking-widest text-indigo-600">{translateCategory(rel.category)}</div>
                  <div className="font-bold text-slate-800 text-sm line-clamp-2">{rel.title}</div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
