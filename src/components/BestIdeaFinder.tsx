import React, { useState } from 'react';
import { Sparkles, ArrowRight, RefreshCw, CheckCircle, HelpCircle, AlertCircle, X } from 'lucide-react';
import { Idea } from '../types';
import { IDEAS } from '../data';
import { calculateIdeaScore } from '../lib/score';
import { translateEarningPotential, translateCategory } from '../lib/translate';

interface Props {
  onSelectIdea: (id: string) => void;
  unlockedCount: number;
}

export function BestIdeaFinder({ onSelectIdea, unlockedCount }: Props) {
  const [isActive, setIsActive] = useState(false);
  const [step, setStep] = useState(0);
  const [budget, setBudget] = useState<string>('');
  const [skills, setSkills] = useState<string>('');
  const [format, setFormat] = useState<string>('');
  const [experience, setExperience] = useState<string>('');
  
  const [recommended, setRecommended] = useState<Idea[]>([]);

  const resetQuiz = () => {
    setStep(0);
    setBudget('');
    setSkills('');
    setFormat('');
    setExperience('');
    setRecommended([]);
  };

  const handleQuizSubmit = () => {
    // Advanced filtering to match actual specifications
    let results = [...IDEAS];

    // Filter by budget
    if (budget === 'low') {
      results = results.filter(i => {
        const cost = (i.startCost || '').toLowerCase();
        return cost === '₹0' || cost.includes('free') || cost.includes('1000') || cost.includes('2000') || cost.includes('3000') || cost.includes('5000');
      });
    }

    // Filter by skill & experience
    if (skills === 'beginner') {
      results = results.filter(i => i.skillLevel === 'Beginner');
    } else if (skills === 'intermediate') {
      results = results.filter(i => i.skillLevel === 'Intermediate' || i.skillLevel === 'Beginner');
    }

    // Filter by online vs offline
    if (format === 'online') {
      results = results.filter(i => {
        const cat = i.category.toLowerCase();
        return cat.includes('online') || cat === 'freelancing' || cat === 'content creation' || cat === 'affiliate marketing' || cat === 'digital products';
      });
    } else if (format === 'offline') {
      results = results.filter(i => {
        const cat = i.category.toLowerCase();
        return cat.includes('offline') || cat === 'local business';
      });
    }

    // Sort by final quality score descending
    results.sort((a, b) => calculateIdeaScore(b).score - calculateIdeaScore(a).score);

    // Take top 3 recommendations
    setRecommended(results.slice(0, 3));
    setStep(4);
  };

  return (
    <div className="bg-white rounded-2xl border border-indigo-100 shadow-sm p-6 mb-8 relative">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-550/10 to-transparent rounded-bl-full pointer-events-none" />
      
      {!isActive ? (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="text-3xl mt-0.5">🧠</span>
            <div>
              <h3 className="font-extrabold text-slate-800 text-base flex items-center gap-1.5">
                Best Idea Finder Quiz <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-black">Free</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Apne personal budget, technical skills aur time ke anusar sabse best earning plan ko instantly unlock karein. 
              </p>
            </div>
          </div>
          <button 
            onClick={() => { setIsActive(true); resetQuiz(); }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs tracking-wider uppercase py-2.5 px-5 rounded-xl transition duration-200 active:scale-95 shrink-0 shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
          >
            🎯 Start Finder Quiz
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Best Match Tracker (Step {step + 1} / 4)
            </span>
            <button 
              onClick={() => setIsActive(false)}
              className="text-slate-400 hover:text-slate-600 text-xs flex items-center gap-0.5 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" /> Close
            </button>
          </div>

          {step === 0 && (
            <div className="animate-in fade-in zoom-in-95 duration-150">
              <h4 className="font-black text-slate-800 text-sm mb-3">1. Apka shuruat karne ka budget (Investment) kitna hai?</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button 
                  onClick={() => { setBudget('low'); setStep(1); }}
                  className="bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 border border-slate-150 text-left p-3.5 rounded-xl text-xs font-extrabold text-slate-700 transition cursor-pointer"
                >
                  💰 ₹0 - ₹5,000 (Low Investment / Bilkul Free)
                </button>
                <button 
                  onClick={() => { setBudget('any'); setStep(1); }}
                  className="bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 border border-slate-150 text-left p-3.5 rounded-xl text-xs font-extrabold text-slate-700 transition cursor-pointer"
                >
                  🚀 ₹5,000+ Ya Koi Bhi Range (Medium/High)
                </button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="animate-in fade-in zoom-in-95 duration-150">
              <h4 className="font-black text-slate-800 text-sm mb-3">2. Apki current Technical ya Professional Skills kaisi hain?</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button 
                  onClick={() => { setSkills('beginner'); setStep(2); }}
                  className="bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 border border-slate-150 text-left p-3.5 rounded-xl text-xs font-extrabold text-slate-705 transition cursor-pointer"
                >
                  🌱 Beginner (No coding, simple copy-paste or post writing work)
                </button>
                <button 
                  onClick={() => { setSkills('intermediate'); setStep(2); }}
                  className="bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 border border-slate-150 text-left p-3.5 rounded-xl text-xs font-extrabold text-slate-705 transition cursor-pointer"
                >
                  ⚡ Intermediate (Basic computer skills, video editing or design)
                </button>
                <button 
                  onClick={() => { setSkills('any'); setStep(2); }}
                  className="bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 border border-slate-150 text-left p-3.5 rounded-xl text-xs font-extrabold text-slate-705 transition cursor-pointer"
                >
                  💎 Expert (Specialized software, web development or AI agency)
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in zoom-in-95 duration-150">
              <h4 className="font-black text-slate-800 text-sm mb-3">3. Aap online ghar baithe kamana chahte hain ya offline field business?</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button 
                  onClick={() => { setFormat('online'); setStep(3); }}
                  className="bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 border border-slate-150 text-left p-3.5 rounded-xl text-xs font-extrabold text-slate-705 transition cursor-pointer"
                >
                  🌐 Online Business (Ghar baithe, mobile ya laptop se)
                </button>
                <button 
                  onClick={() => { setFormat('offline'); setStep(3); }}
                  className="bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 border border-slate-150 text-left p-3.5 rounded-xl text-xs font-extrabold text-slate-705 transition cursor-pointer"
                >
                  🏪 Offline Business (Local area service, physical setups)
                </button>
                <button 
                  onClick={() => { setFormat('any'); setStep(3); }}
                  className="bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 border border-slate-150 text-left p-3.5 rounded-xl text-xs font-extrabold text-slate-705 transition cursor-pointer"
                >
                  🔥 Both (Kuch bhi chalega, kamaai acchi honi chahiye)
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in zoom-in-95 duration-150">
              <h4 className="font-black text-slate-800 text-sm mb-3">4. Experienced background ya working constraints background check:</h4>
              <div className="flex gap-3 justify-end items-center mt-4">
                <button 
                  onClick={handleQuizSubmit}
                  className="flex-1 bg-indigo-650 hover:bg-indigo-700 text-white font-extrabold text-xs tracking-wider uppercase py-3.5 rounded-xl transition shadow cursor-pointer text-center"
                >
                  📊 Show Recommended Match Results &rarr;
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-in fade-in zoom-in-95 duration-150">
              <h4 className="font-black text-slate-800 text-sm mb-2 text-indigo-700 flex items-center gap-1.5 justify-center">
                🎉 Congratulations! Top 3 Matches Formulated Successfully
              </h4>
              <p className="text-[11px] text-slate-400 text-center mb-4">
                Aapke matching parameters ke strong filters ke sath nikaale gaye high-yield plans check karein:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                {recommended.length > 0 ? (
                  recommended.map(idea => {
                    const score = calculateIdeaScore(idea).score;
                    return (
                      <div 
                        key={`finder-${idea.id}`}
                        onClick={() => onSelectIdea(idea.id)}
                        className="bg-indigo-50/50 hover:bg-indigo-100/50 border border-indigo-100 p-4 rounded-xl cursor-pointer transition text-left relative flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[9px] font-bold text-indigo-600 bg-white/80 border border-indigo-100 px-1.5 py-0.5 rounded uppercase">
                              {translateCategory(idea.category)}
                            </span>
                            <span className="text-[10px] font-black text-slate-700">★ {score}</span>
                          </div>
                          <h5 className="font-black text-slate-800 text-xs line-clamp-1 mb-1">{idea.title}</h5>
                          <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed">{idea.summary}</p>
                        </div>
                        <div className="mt-3 text-xs font-black text-indigo-600 border-t border-indigo-100/60 pt-2 flex justify-between items-center">
                          <span>{translateEarningPotential(idea.earningPotential)}</span>
                          <span className="text-[10px] uppercase font-bold text-indigo-550">Open &rarr;</span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="col-span-3 text-center py-4 bg-slate-50 border rounded-xl">
                    <span className="text-[11px] text-slate-500">Perfect matching results calculation failed. Please retry after modifying inputs.</span>
                  </div>
                )}
              </div>

              <div className="text-center mt-3 border-t border-slate-50 pt-3">
                <button 
                  onClick={resetQuiz}
                  className="text-xs text-indigo-650 hover:text-indigo-800 font-extrabold flex items-center justify-center gap-1 mx-auto cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Retake Best Match Quiz
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
