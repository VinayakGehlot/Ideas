import React from 'react';
import { Bookmark, Lock, Sparkles, Star } from 'lucide-react';
import { type Idea } from '../types';
import { useAppStore } from '../store';
import { cn } from '../lib/utils';
import { translateCategory, translateEarningPotential } from '../lib/translate';
import { calculateIdeaScore, getIdeaBadge } from '../lib/score';

interface Props {
  idea: Idea;
  locked: boolean;
  onClick: () => void;
  key?: string | number;
}

export function IdeaCard({ idea, locked, onClick }: Props) {
  const { bookmarks, toggleBookmark } = useAppStore();
  const isBookmarked = bookmarks.includes(idea.id);

  const scoreDetails = calculateIdeaScore(idea);
  const badgeInfo = getIdeaBadge(idea, scoreDetails.score);

  const scrollToShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const element = document.querySelector('.share-card-container') || document.querySelector('header');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div 
      onClick={locked ? undefined : onClick}
      className={cn(
        "bg-white p-4.5 rounded-xl border relative flex flex-col justify-between transition-all duration-300 min-h-[175px] group select-none",
        locked 
          ? "border-slate-205/60 overflow-hidden bg-slate-50/40" 
          : "border-slate-100 hover:border-indigo-400/70 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_-6px_rgba(79,70,229,0.12)] cursor-pointer hover:-translate-y-0.5"
      )}
    >
      {locked ? (
        <>
          {/* Blurred preview of the design content under the hood */}
          <div className="blur-[4px] opacity-25 select-none pointer-events-none flex flex-col h-full justify-between">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[9px] font-black uppercase bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
                Category Label
              </span>
              <span className="text-[10px] text-slate-400">★ 00</span>
            </div>
            <div>
              <h4 className="font-extrabold text-slate-700 text-sm mb-1 leading-tight">Dummy Title Preview Text</h4>
              <p className="text-[11px] text-slate-400 line-clamp-2">This is some teaser paragraph text to indicate premium contents for the monetization idea folder.</p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-100 flex justify-between items-center">
              <span className="text-[9px] text-slate-400 uppercase font-black">Earning Potential</span>
              <span className="text-xs font-black text-indigo-405">₹20,000 - ₹50,000</span>
            </div>
          </div>

          {/* Premium Lock Overlay */}
          <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-b from-white/95 via-white/40 to-white/98 z-10">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase tracking-wider font-manrope bg-slate-100 text-slate-600 px-2 py-0.5 rounded shadow-sm">
                {translateCategory(idea.category)}
              </span>
              <span className="text-[9px] font-extrabold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/50 flex items-center gap-1">
                <Lock className="w-2.5 h-2.5 animate-pulse" /> Premium
              </span>
            </div>

            <div className="text-center py-1">
              <p className="text-[13px] font-black tracking-tight text-slate-800 font-poppins flex items-center justify-center gap-1">
                🔒 {idea.title} <span className="text-[9px] bg-indigo-50 text-indigo-600 px-1 py-0.5 rounded font-black">PRO</span>
              </p>
              <p className="text-[10px] text-slate-500 font-medium max-w-[210px] mx-auto mt-1 leading-relaxed">
                Ye high-grade earning sheet ko unlock karne ke liye 5 shares complete karein.
              </p>
            </div>

            <button 
              onClick={scrollToShare}
              className="w-full bg-slate-900 hover:bg-indigo-650 text-white font-extrabold py-2 px-3 rounded-lg text-[10px] tracking-wider uppercase transition-all shadow-sm active:scale-98 cursor-pointer flex items-center justify-center gap-1 font-manrope whitespace-nowrap"
            >
              <Sparkles className="w-3 h-3 text-indigo-300" />
              Unlock Premium Plan
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Bookmark Button */}
          <div className="absolute right-3 top-3.5 z-10">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                toggleBookmark(idea.id);
              }}
              className="text-slate-300 hover:text-indigo-650 transition-all p-1.5 rounded-full hover:bg-slate-100"
              title="Bookmark"
            >
              <Bookmark className={cn("h-3.5 w-3.5", isBookmarked ? "fill-indigo-600 text-indigo-600" : "text-slate-400")} />
            </button>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2 pr-6 flex-wrap gap-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[9px] font-semibold uppercase tracking-wider font-manrope bg-indigo-50 text-indigo-650 px-2 py-0.5 rounded select-none">
                  {translateCategory(idea.category)}
                </span>
                {badgeInfo.label && (
                  <span className={cn("text-[8px] font-black uppercase px-1.5 py-0.5 rounded border tracking-wider select-none shrink-0 font-manrope", badgeInfo.colorClass)}>
                    {badgeInfo.label}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-0.5 shrink-0 select-none bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100/60 mt-0.5">
                <Star className="w-2.5 h-2.5 stroke-amber-500 fill-amber-500" />
                <span className="text-[10px] font-black text-slate-700 font-manrope">{scoreDetails.score}</span>
              </div>
            </div>
            
            <h4 className="font-bold text-slate-900 font-poppins text-[15px] mb-1 pr-6 tracking-tight line-clamp-1 group-hover:text-indigo-600 transition-colors">
              {idea.title}
            </h4>
            <p className="text-[11.5px] text-slate-500 line-clamp-2 leading-relaxed mb-3">
              {idea.summary}
            </p>
          </div>
          
          <div className="mt-auto flex justify-between items-center pt-2.5 border-t border-slate-50">
            <div className="flex flex-col">
              <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider font-manrope">Earning Potential</span>
              <span className="text-indigo-650 font-black text-xs font-poppins truncate max-w-[120px]">{translateEarningPotential(idea.earningPotential)}</span>
            </div>
            <button className="bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 font-bold text-[9px] uppercase px-3 py-1.5 rounded-lg border border-slate-205 transition-all flex items-center gap-0.5 whitespace-nowrap font-manrope">
              View Details &rarr;
            </button>
          </div>
        </>
      )}
    </div>
  );
}
