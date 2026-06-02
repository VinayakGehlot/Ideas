import React from 'react';
import { Bookmark, Lock, IndianRupee, Clock, Zap, Sparkles } from 'lucide-react';
import { type Idea } from '../types';
import { useAppStore } from '../store';
import { cn } from '../lib/utils';
import { translateCategory, translateSkillLevel, translateEarningPotential } from '../lib/translate';
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
        "bg-white p-5 rounded-2xl border relative flex flex-col transition-all duration-300 min-h-[170px]",
        locked 
          ? "border-slate-200 bg-slate-50 overflow-hidden" 
          : "border-slate-200 shadow-sm cursor-pointer hover:shadow-md hover:border-indigo-300"
      )}
    >
      {locked ? (
        <div className="absolute inset-0 flex flex-col justify-between p-5 bg-gradient-to-b from-white via-slate-50/98 to-slate-100 z-10">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />
          
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">
              {translateCategory(idea.category)}
            </span>
            <span className="text-[10px] font-black text-rose-500 bg-rose-50 px-2 py-0.5 rounded flex items-center gap-1 border border-rose-100 select-none">
              <Lock className="w-2.5 h-2.5" /> Locked
            </span>
          </div>

          <div className="my-auto text-center py-2">
            <div className="inline-flex items-center gap-1 text-slate-850 font-extrabold text-sm mb-1">
              <span className="text-amber-500">🔒</span> Premium Idea
            </div>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-[200px] mx-auto">
              Ye idea unlock karne ke liye 5 shares complete karein.
            </p>
          </div>

          <button 
            onClick={scrollToShare}
            className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-2 px-4 rounded-xl text-xs tracking-wider transition-all shadow-sm hover:shadow active:scale-98 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Unlock Now
          </button>
        </div>
      ) : (
        <>
          <div className="absolute right-4 top-4 z-10">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                toggleBookmark(idea.id);
              }}
              className="text-slate-300 hover:text-indigo-600 transition p-1 rounded-full hover:bg-slate-50"
              title="Bookmark"
            >
              <Bookmark className={cn("h-4 w-4", isBookmarked && "fill-indigo-650 text-indigo-650")} />
            </button>
          </div>
          
          <div className="flex justify-between items-center mb-2.5 pr-6 flex-wrap gap-1.5">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-widest bg-indigo-50/80 text-indigo-750 px-2.5 py-0.5 rounded select-none">
                {translateCategory(idea.category)}
              </span>
              {badgeInfo.label && (
                <span className={cn("text-[8.5px] font-extrabold uppercase px-1.5 py-0.5 rounded border tracking-wider select-none shrink-0", badgeInfo.colorClass)}>
                  {badgeInfo.label}
                </span>
              )}
            </div>
            <div className="flex items-center gap-0.5 shrink-0 select-none bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100/60">
              <span className="text-amber-500 text-xs">★</span>
              <span className="text-xs font-black text-slate-700">{scoreDetails.score}</span>
            </div>
          </div>
          
          <h4 className="font-bold text-slate-800 text-base mb-1 pr-6 line-clamp-1">{idea.title}</h4>
          <p className="text-xs text-slate-605 line-clamp-2 mb-3 leading-relaxed">{idea.summary}</p>
          
          <div className="mt-auto flex justify-between items-center pt-3 border-t border-slate-100">
            <div className="flex flex-col">
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Earning Potential</span>
              <span className="text-indigo-600 font-black text-sm truncate">{translateEarningPotential(idea.earningPotential)}</span>
            </div>
            <button className="text-indigo-650 font-black text-xs uppercase hover:underline whitespace-nowrap">
              Poora Padhein &rarr;
            </button>
          </div>
        </>
      )}
    </div>
  );
}
