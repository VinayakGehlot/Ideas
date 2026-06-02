import React, { useState, useEffect, useMemo } from 'react';
import { IDEAS } from './data';
import { useAppStore } from './store';
import { IdeaCard } from './components/IdeaCard';
import { IdeaModal } from './components/IdeaModal';
import { ShareCard } from './components/ShareCard';
import { AdPlacement } from './components/AdPlacement';
import { BestIdeaFinder } from './components/BestIdeaFinder';
import { AdBlockerOverlay } from './components/AdBlockerOverlay';
import { 
  Search, 
  Sparkles, 
  Filter, 
  Bookmark as BookmarkIcon, 
  History, 
  Briefcase, 
  Globe, 
  Bot, 
  Smartphone, 
  Lightbulb, 
  TrendingUp, 
  ArrowRight, 
  RefreshCw, 
  ChevronDown, 
  Compass, 
  Check, 
  X,
  Bookmark
} from 'lucide-react';
import { cn } from './lib/utils';
import { Idea } from './types';
import { translateCategory, translateEarningPotential } from './lib/translate';
import { ShareCapsule } from './components/ShareCapsule';
import { calculateIdeaScore, isIdeaLocked } from './lib/score';

export default function App() {
  const { unlockedCount, bookmarks, history, addToHistory, incrementWhatsAppShare } = useAppStore();
  const [selectedIdeaId, setSelectedIdeaId] = useState<string | null>(null);
  
  // Search & Filter state
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'all' | 'bookmarks' | 'history'>('all');
  
  // Advanced Checkbox Filters
  const [showFilters, setShowFilters] = useState(false);
  const [filterDifficulty, setFilterDifficulty] = useState<string>('All'); // 'All' | 'Beginner' | 'Intermediate' | 'Advanced'
  const [filterInvestment, setFilterInvestment] = useState<string>('All'); // 'All' | 'Low' | 'Medium' | 'High'
  const [filterChannel, setFilterChannel] = useState<string>('All'); // 'All' | 'Online' | 'Offline' | 'AI' | 'Students' | 'Business'

  // Limits for homepage subsections
  const [limits, setLimits] = useState({
    business: 6,
    online: 6,
    ai: 6,
    mobile: 6,
    sabhi: 9,
    remaining: 12
  });

  // Track viewing history when selectedIdeaId transitions
  useEffect(() => {
    if (selectedIdeaId) {
      addToHistory(selectedIdeaId);
    }
  }, [selectedIdeaId, addToHistory]);

  const handleShowMore = (section: keyof typeof limits) => {
    setLimits(prev => ({
      ...prev,
      [section]: prev[section] + 12
    }));
  };

  // Surprise Me: Open a random unlocked idea to spark delight
  const handleSurpriseMe = () => {
    const list = [...IDEAS].filter(idea => !isIdeaLocked(idea, unlockedCount));
    if (list.length > 0) {
      const randomIndex = Math.floor(Math.random() * list.length);
      setSelectedIdeaId(list[randomIndex].id);
    } else {
      setSelectedIdeaId(IDEAS[0].id);
    }
  };

  // Reset all active filters
  const resetFilters = () => {
    setSearch('');
    setSelectedCat('All');
    setFilterDifficulty('All');
    setFilterInvestment('All');
    setFilterChannel('All');
    setViewMode('all');
  };

  // Clean Category Tabs mapping user specifications
  const CATEGORY_TABS = [
    { id: 'All', label: '🔥 Sabhi Ideas' },
    { id: 'Business', label: '💼 Business' },
    { id: 'Online', label: '🌐 Online' },
    { id: 'Offline', label: '🏪 Offline' },
    { id: 'AI', label: '🤖 AI' },
    { id: 'Mobile', label: '📱 Mobile' },
    { id: 'Students', label: '🎓 Students' },
    { id: 'Low Investment', label: '💰 Low Investment' }
  ];

  // Helper check: are we browsing default, unfiltered list vs filtered list?
  const isDefaultUnfilteredMain = viewMode === 'all' && selectedCat === 'All' && search.trim() === '' && filterDifficulty === 'All' && filterInvestment === 'All' && filterChannel === 'All';

  // Filter & sort database based on general search, category tabs and advanced filter selections
  const filteredIdeas = useMemo(() => {
    let result = [...IDEAS];

    if (viewMode === 'bookmarks') {
      result = result.filter(i => bookmarks.includes(i.id));
    } else if (viewMode === 'history') {
      result = result.filter(i => history.includes(i.id));
      result.sort((a, b) => history.indexOf(a.id) - history.indexOf(b.id));
      return result;
    }

    // Tab Category Filtering
    if (selectedCat !== 'All') {
      result = result.filter(idea => {
        const catLower = idea.category.toLowerCase();
        const tagsJoined = (idea.tags || []).join(' ').toLowerCase();
        const bestForLower = (idea.bestFor || '').toLowerCase();
        const scLower = (idea.startCost || '').toLowerCase();
        const titleLower = idea.title.toLowerCase();
        const summaryLower = idea.summary.toLowerCase();

        switch (selectedCat) {
          case 'Business':
            return catLower.includes('business') || catLower === 'services';
          case 'Online':
            return catLower === 'online business' || catLower === 'freelancing' || catLower === 'content creation' || catLower === 'affiliate marketing' || catLower === 'digital products' || catLower === 'services';
          case 'Offline':
            return catLower === 'offline business' || catLower === 'local business';
          case 'AI':
            return tagsJoined.includes('ai') || tagsJoined.includes('automation') || titleLower.includes('ai') || summaryLower.includes('ai');
          case 'Mobile':
            return catLower === 'mobile earning' || tagsJoined.includes('mobile');
          case 'Students':
            return bestForLower.includes('student') || tagsJoined.includes('student') || titleLower.includes('student') || summaryLower.includes('student');
          case 'Low Investment':
            return catLower.includes('low-investment') || catLower.includes('low investment') || scLower === '₹0' || scLower.includes('free') || scLower.includes('1000') || scLower.includes('3000') || tagsJoined.includes('low-investment');
          default:
            return true;
        }
      });
    }

    // Search query matching: supports Title, Category, Difficulty, Investment Level, and Keywords
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(i => 
        i.title.toLowerCase().includes(q) || 
        (i.category && i.category.toLowerCase().includes(q)) ||
        (i.skillLevel && i.skillLevel.toLowerCase().includes(q)) ||
        (i.startCost && i.startCost.toLowerCase().includes(q)) ||
        i.tags.some(t => t.includes(q)) || 
        i.summary.toLowerCase().includes(q) ||
        (i.bestFor && i.bestFor.toLowerCase().includes(q))
      );
    }

    // Difficulty Checks
    if (filterDifficulty !== 'All') {
      result = result.filter(i => i.skillLevel === filterDifficulty);
    }

    // Investment Level Selector
    if (filterInvestment !== 'All') {
      result = result.filter(i => {
        const sc = (i.startCost || '').toLowerCase();
        if (filterInvestment === 'Low') {
          return sc === '₹0' || sc.includes('free') || sc.includes('1000') || sc.includes('2000') || sc.includes('3000') || sc.includes('5000');
        } else if (filterInvestment === 'Medium') {
          return sc.includes('5000') || sc.includes('10000') || sc.includes('15000') || sc.includes('20000');
        } else {
          return sc.includes('20000') || sc.includes('50000') || sc.includes('5000+') || sc.includes('100000');
        }
      });
    }

    // Channels / Focus Niche Checker
    if (filterChannel !== 'All') {
      result = result.filter(i => {
        const cat = i.category.toLowerCase();
        const tagsJoined = (i.tags || []).join(' ').toLowerCase();
        const titleLower = i.title.toLowerCase();
        const summaryLower = i.summary.toLowerCase();
        const bestForLower = (i.bestFor || '').toLowerCase();

        if (filterChannel === 'Online') {
          return cat.includes('online') || cat === 'freelancing' || cat === 'content creation' || cat === 'affiliate marketing' || cat === 'digital products';
        } else if (filterChannel === 'Offline') {
          return cat.includes('offline') || cat === 'local business';
        } else if (filterChannel === 'AI') {
          return tagsJoined.includes('ai') || tagsJoined.includes('automation') || titleLower.includes('ai') || summaryLower.includes('ai');
        } else if (filterChannel === 'Students') {
          return bestForLower.includes('student') || tagsJoined.includes('student') || titleLower.includes('student') || summaryLower.includes('student');
        } else if (filterChannel === 'Business') {
          return cat.includes('business') || cat === 'services';
        }
        return true;
      });
    }

    // Sort globally by score descending
    result.sort((a, b) => calculateIdeaScore(b).score - calculateIdeaScore(a).score);

    return result;
  }, [search, selectedCat, viewMode, bookmarks, history, filterDifficulty, filterInvestment, filterChannel]);

  // Premium Section: Top Recommended Ideas (Global top 6 high-grade ideas)
  const topRecommended = useMemo(() => {
    const sorted = [...IDEAS].map(idea => ({
      idea,
      score: calculateIdeaScore(idea).score
    })).sort((a, b) => b.score - a.score);
    
    // Select the first 6 items: display 5 as unlocked, 1 as premium lock preview
    return sorted.map(item => item.idea).slice(0, 6);
  }, []);

  // Trending Section (Curated score between 80 and 95)
  const trendingThisWeek = useMemo(() => {
    const list = [...IDEAS].filter(idea => {
      const score = calculateIdeaScore(idea).score;
      return score >= 82 && score <= 94;
    });
    return list.slice(10, 16);
  }, []);

  // Mutually-exclusive allocations for Home Order sections (ensures any idea appears at most once!)
  const homepageSegments = useMemo(() => {
    const businessList: Idea[] = [];
    const onlineList: Idea[] = [];
    const aiList: Idea[] = [];
    const mobileList: Idea[] = [];
    const remainingList: Idea[] = [];

    // Pre-calculate score and sort the entire 1000 ideas dataset descending
    const sortedAll = [...IDEAS].map(idea => ({
      idea,
      score: calculateIdeaScore(idea).score
    })).sort((a, b) => b.score - a.score);

    // Track assigned IDs to keep segments perfectly mutually exclusive
    const assignedIds = new Set<string>();

    // 1. Fill Business Segment (Offline / business tags)
    for (const item of sortedAll) {
      const idea = item.idea;
      const catLower = idea.category.toLowerCase();
      if (catLower.includes('business') || catLower === 'services') {
        businessList.push(idea);
        assignedIds.add(idea.id);
      }
    }

    // 2. Fill Online Earning Segment (Online business / Content creation / Affiliate marketing / Freelancing)
    for (const item of sortedAll) {
      const idea = item.idea;
      if (assignedIds.has(idea.id)) continue;
      
      const catLower = idea.category.toLowerCase();
      if (
        catLower === 'online business' || 
        catLower === 'freelancing' || 
        catLower === 'content creation' || 
        catLower === 'affiliate marketing' || 
        catLower === 'digital products' || 
        catLower === 'services'
      ) {
        onlineList.push(idea);
        assignedIds.add(idea.id);
      }
    }

    // 3. Fill AI Segment (AI tags or automation logs)
    for (const item of sortedAll) {
      const idea = item.idea;
      if (assignedIds.has(idea.id)) continue;

      const tagsJoined = (idea.tags || []).join(' ').toLowerCase();
      const titleLower = idea.title.toLowerCase();
      if (tagsJoined.includes('ai') || tagsJoined.includes('automation') || titleLower.includes('ai')) {
        aiList.push(idea);
        assignedIds.add(idea.id);
      }
    }

    // 4. Fill Mobile Segment (Mobile se kamai)
    for (const item of sortedAll) {
      const idea = item.idea;
      if (assignedIds.has(idea.id)) continue;

      const catLower = idea.category.toLowerCase();
      const tagsJoined = (idea.tags || []).join(' ').toLowerCase();
      if (catLower === 'mobile earning' || tagsJoined.includes('mobile')) {
        mobileList.push(idea);
        assignedIds.add(idea.id);
      }
    }

    // 5. Remaining
    for (const item of sortedAll) {
      const idea = item.idea;
      if (!assignedIds.has(idea.id)) {
        remainingList.push(idea);
      }
    }

    return {
      business: businessList,
      online: onlineList,
      ai: aiList,
      mobile: mobileList,
      remaining: remainingList
    };
  }, []);

  const selectedIdea = useMemo(() => {
    return IDEAS.find(i => i.id === selectedIdeaId) || null;
  }, [selectedIdeaId]);

  // Selected ideas for recently viewed panel
  const recentlyViewedObjects = useMemo(() => {
    return history
      .map(id => IDEAS.find(i => i.id === id))
      .filter((i): i is Idea => !!i)
      .slice(0, 5);
  }, [history]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-900 flex flex-col pb-24">
      {/* Dynamic AdBlocker restriction modal */}
      <AdBlockerOverlay />

      {/* Header Panel */}
      <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
          <div 
            onClick={resetFilters}
            className="flex items-center gap-1.5 cursor-pointer select-none"
          >
            <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-sm">
              ₹
            </div>
            <h1 className="text-lg font-black tracking-tight text-slate-800">
              Kamao<span className="text-indigo-600">Ideas</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => setViewMode(viewMode === 'bookmarks' ? 'all' : 'bookmarks')}
              className={cn(
                "p-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer", 
                viewMode === 'bookmarks' ? "bg-indigo-50 text-indigo-700 font-black" : "text-slate-500 hover:bg-slate-100 hover:text-slate-850"
              )}
            >
              <Bookmark className="h-4 w-4" />
              <span className="hidden sm:inline">Bookmarks ({bookmarks.length})</span>
            </button>
            <button 
              onClick={() => setViewMode(viewMode === 'history' ? 'all' : 'history')}
              className={cn(
                "p-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer", 
                viewMode === 'history' ? "bg-indigo-50 text-indigo-700 font-black" : "text-slate-500 hover:bg-slate-100 hover:text-slate-850"
              )}
            >
              <History className="h-4 w-4" />
              <span className="hidden sm:inline">History ({history.length})</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        
        {/* HERO SECTION */}
        {isDefaultUnfilteredMain && (
          <div className="bg-gradient-to-tr from-white via-slate-50/50 to-indigo-50/20 rounded-3xl p-6 sm:p-8 border border-slate-200/60 mb-6 text-center max-w-4xl mx-auto relative overflow-hidden shadow-sm">
            <div className="absolute -top-12 -left-12 w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-pink-500/5 rounded-full blur-3xl" />
            
            <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-indigo-500/10 to-indigo-650/10 text-indigo-700 px-3.5 py-1 rounded-full text-xs font-extrabold mb-4 select-none">
              🚀 Roman Hindi (Hinglish) Business Directory
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-black mb-3 text-slate-850 leading-tight">
              Paise Kamane Ke Asli Aur Real Tareeqe Khojein
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto mb-6 leading-relaxed">
              KamaoIdeas par curated 1000 practical blueprints hain jinse aap online digital dhande, freelancing setups, content monetization aur low-investment field businesses ko asani se start kar sakte hain.
            </p>

            <div className="flex sm:inline-flex items-center gap-2.5 w-full sm:w-auto justify-center flex-wrap">
              <button 
                onClick={handleSurpriseMe}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs tracking-wider uppercase py-3 px-5 rounded-xl transition duration-150 active:scale-95 shadow-md shadow-indigo-600/15 flex items-center justify-center gap-1.5 w-full sm:w-auto cursor-pointer"
              >
                🎲 Surprise Me (Random Plan)
              </button>
              <a 
                href="#tracker-card"
                className="bg-white hover:bg-slate-50 text-indigo-600 border border-indigo-150 font-extrabold text-xs tracking-wider uppercase py-3 px-5 rounded-xl transition duration-150 flex items-center justify-center gap-1.5 w-full sm:w-auto cursor-pointer"
              >
                🔒 Unlock Progress Status
              </a>
            </div>
          </div>
        )}

        {/* SEARCH & FILTERS BOX */}
        <div className="bg-white border rounded-2xl p-4 shadow-sm mb-6 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 relative">
              <input 
                type="text" 
                placeholder="Ideas search karein (jaise: 'Freelancing', 'AI Agent', 'Low Investment', 'Beginner')..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-100 border-none rounded-xl py-3 pl-4 pr-10 text-xs focus:ring-2 focus:ring-indigo-600 transition"
              />
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
            </div>
            
            <div className="flex gap-2 shrink-0">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={cn(
                  "p-3 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer justify-center flex-1 sm:flex-initial",
                  showFilters || filterDifficulty !== 'All' || filterInvestment !== 'All' || filterChannel !== 'All'
                    ? "bg-indigo-50 border-indigo-200 text-indigo-700 font-extrabold"
                    : "border-slate-200 hover:bg-slate-50 text-slate-600"
                )}
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
                {(filterDifficulty !== 'All' || filterInvestment !== 'All' || filterChannel !== 'All') && (
                  <span className="w-2 h-2 rounded-full bg-rose-500 inline-block animate-pulse" />
                )}
              </button>
              
              <button 
                onClick={resetFilters}
                className="p-3 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-500 cursor-pointer flex items-center justify-center"
                title="Reset Search & Filters"
              >
                Reset
              </button>
            </div>
          </div>

          {/* ADVANCED CHECKBOX FILTER DRAWER */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in slide-in-from-top-2 duration-150">
              {/* Experience / Difficulty Levels */}
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">⚡ Difficulty (Experience)</span>
                <div className="flex flex-col gap-1.5">
                  {['All', 'Beginner', 'Intermediate', 'Advanced'].map(lvl => (
                    <button
                      key={`difficulty-${lvl}`}
                      onClick={() => setFilterDifficulty(lvl)}
                      className={cn(
                        "text-left font-bold text-xs px-2.5 py-1.5 rounded-lg flex items-center justify-between border cursor-pointer",
                        filterDifficulty === lvl ? "bg-indigo-50 border-indigo-150 text-indigo-700" : "bg-white border-transparent text-slate-600 hover:bg-slate-50"
                      )}
                    >
                      <span>{lvl === 'All' ? 'Sabhi Difficulty' : lvl}</span>
                      {filterDifficulty === lvl && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Startup Investment cost */}
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">💰 Investment Level</span>
                <div className="flex flex-col gap-1.5">
                  {['All', 'Low', 'Medium', 'High'].map(inv => (
                    <button
                      key={`investment-${inv}`}
                      onClick={() => setFilterInvestment(inv)}
                      className={cn(
                        "text-left font-bold text-xs px-2.5 py-1.5 rounded-lg flex items-center justify-between border cursor-pointer",
                        filterInvestment === inv ? "bg-indigo-50 border-indigo-150 text-indigo-700" : "bg-white border-transparent text-slate-600 hover:bg-slate-50"
                      )}
                    >
                      <span className="truncate">
                        {inv === 'All' ? 'Sabhi Budgets' : inv === 'Low' ? 'Low Budget (₹0 - ₹5k)' : inv === 'Medium' ? 'Medium (₹5k - ₹20k)' : 'Premium (₹20k+)'}
                      </span>
                      {filterInvestment === inv && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Channels & Platforms */}
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">🎯 Focus Channels</span>
                <div className="flex flex-col gap-1.5">
                  {['All', 'Online', 'Offline', 'AI', 'Students', 'Business'].map(chn => (
                    <button
                      key={`channel-${chn}`}
                      onClick={() => setFilterChannel(chn)}
                      className={cn(
                        "text-left font-bold text-xs px-2.5 py-1.5 rounded-lg flex items-center justify-between border cursor-pointer",
                        filterChannel === chn ? "bg-indigo-50 border-indigo-150 text-indigo-700" : "bg-white border-transparent text-slate-600 hover:bg-slate-50"
                      )}
                    >
                      <span>{chn === 'All' ? 'Sabhi Focus Modes' : chn}</span>
                      {filterChannel === chn && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FIXED CATEGORY TABS SYSTEM */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar sticky top-16 bg-slate-50/95 py-2.5 z-25 border-b border-slate-200/50">
          <div className="flex gap-1.5">
            {CATEGORY_TABS.map(tab => (
              <button
                key={`tab-${tab.id}`}
                onClick={() => { setSelectedCat(tab.id); setViewMode('all'); }}
                className={cn(
                  "whitespace-nowrap px-4 py-2 rounded-xl font-extrabold text-xs transition-all cursor-pointer border select-none", 
                  selectedCat === tab.id && viewMode === 'all'
                    ? "bg-indigo-600 border-indigo-650 text-white shadow-sm" 
                    : "bg-white border-slate-200 hover:bg-slate-100 text-slate-600"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* BEST MATCH FINDER INTEGRATIVE QUIZ CARD */}
        {isDefaultUnfilteredMain && (
          <BestIdeaFinder 
            onSelectIdea={(id) => setSelectedIdeaId(id)} 
            unlockedCount={unlockedCount} 
          />
        )}

        {/* RECENTLY VIEWED ROW */}
        {isDefaultUnfilteredMain && recentlyViewedObjects.length > 0 && (
          <div className="mb-8 bg-white border border-slate-100/85 p-4 rounded-2xl shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2.5 flex items-center gap-1.5">
              🕒 Recently Viewed (Haal Hi Me Dekhe)
            </span>
            <div className="flex gap-3 overflow-x-auto pb-1.5 no-scrollbar">
              {recentlyViewedObjects.map(idea => (
                <div
                  key={`history-row-${idea.id}`}
                  onClick={() => setSelectedIdeaId(idea.id)}
                  className="bg-slate-50 hover:bg-indigo-50/50 border border-slate-150 p-3 rounded-xl cursor-pointer min-w-[190px] max-w-[210px] shrink-0 transition"
                >
                  <span className="text-[8.5px] font-bold uppercase text-indigo-600 block mb-0.5">{translateCategory(idea.category)}</span>
                  <p className="font-extrabold text-xs text-slate-800 line-clamp-1 mb-0.5">{idea.title}</p>
                  <p className="text-[10px] text-slate-500 font-bold">{translateEarningPotential(idea.earningPotential)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* UNLOCK CARD STATUS */}
        <div id="tracker-card" className="mb-8 share-card-container">
          <ShareCard />
        </div>

        <AdPlacement format="banner" />

        {isDefaultUnfilteredMain ? (
          /* ================= HOMEPAGE LAYOUT WITH SPECIFIED SEGMENTED ORDER ================= */
          <div className="space-y-12">
            
            {/* FEATURED: TOP RECOMMENDED IDEAS (Show exactly 5 unlocked, 1 premium locked preview!) */}
            <div className="bg-gradient-to-b from-indigo-50/40 via-white to-transparent p-6 rounded-3xl border border-indigo-100/50">
              <div className="flex items-center gap-2 mb-5">
                <div className="bg-indigo-600 text-white p-1.5 rounded-lg">
                  <Sparkles className="w-5 h-5 text-indigo-200" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-800 tracking-tight">Top Recommended Ideas ⭐</h2>
                  <p className="text-xs text-slate-500 font-medium">Verified sources dwara pin-pointed highest high-grade earning setups.</p>
                </div>
              </div>
              
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {topRecommended.map((idea, index) => {
                  // Ensure 5 are ALWAYS unlocked, and only 1 (index 5) is locked preview matching guidelines
                  const forceUnlocked = index < 5;
                  const isLocked = forceUnlocked ? false : isIdeaLocked(idea, unlockedCount);
                  
                  return (
                    <IdeaCard 
                      key={`recommended-${idea.id}`}
                      idea={idea}
                      locked={isLocked}
                      onClick={() => setSelectedIdeaId(idea.id)}
                    />
                  );
                })}
              </div>
            </div>

            {/* SEGMENT 1: TOP BUSINESS IDEAS */}
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-base font-extrabold text-slate-800">Top Business Ideas 🏢</h3>
                </div>
                <span className="text-xs font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded">
                  {homepageSegments.business.length} Plan
                </span>
              </div>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {homepageSegments.business.slice(0, limits.business).map(idea => {
                  const isLocked = isIdeaLocked(idea, unlockedCount);
                  return (
                    <IdeaCard 
                      key={`business-${idea.id}`}
                      idea={idea}
                      locked={isLocked}
                      onClick={() => setSelectedIdeaId(idea.id)}
                    />
                  );
                })}
              </div>
              {homepageSegments.business.length > limits.business && (
                <div className="mt-5 text-center">
                  <button 
                    onClick={() => handleShowMore('business')}
                    className="inline-flex items-center gap-1 bg-white hover:bg-slate-100 text-indigo-600 font-bold text-xs py-2 px-5 rounded-lg border border-slate-200 transition active:scale-95 cursor-pointer shadow-sm"
                  >
                    Naye Business Ideas Dekhein (+{homepageSegments.business.length - limits.business} aur)
                  </button>
                </div>
              )}
            </div>

            <AdPlacement format="banner" />

            {/* SEGMENT 2: TOP ONLINE EARNING IDEAS */}
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-base font-extrabold text-slate-800">Top Online Earning Ideas 🌐</h3>
                </div>
                <span className="text-xs font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded">
                  {homepageSegments.online.length} Plan
                </span>
              </div>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {homepageSegments.online.slice(0, limits.online).map(idea => {
                  const isLocked = isIdeaLocked(idea, unlockedCount);
                  return (
                    <IdeaCard 
                      key={`online-${idea.id}`}
                      idea={idea}
                      locked={isLocked}
                      onClick={() => setSelectedIdeaId(idea.id)}
                    />
                  );
                })}
              </div>
              {homepageSegments.online.length > limits.online && (
                <div className="mt-5 text-center">
                  <button 
                    onClick={() => handleShowMore('online')}
                    className="inline-flex items-center gap-1 bg-white hover:bg-slate-100 text-indigo-600 font-bold text-xs py-2 px-5 rounded-lg border border-slate-200 transition active:scale-95 cursor-pointer shadow-sm"
                  >
                    Naye Online Earning Ideas Dekhein (+{homepageSegments.online.length - limits.online} aur)
                  </button>
                </div>
              )}
            </div>

            {/* TRENDING THIS WEEK */}
            <div className="bg-gradient-to-tr from-amber-500/5 to-transparent p-6 rounded-3xl border border-amber-100/50">
              <div className="flex items-center gap-2 mb-5">
                <TrendingUp className="w-5 h-5 text-amber-500" />
                <div>
                  <h4 className="font-extrabold text-slate-800 text-base">Trending This Week 🔥</h4>
                  <p className="text-xs text-slate-500 font-bold">Social networks par high virality aur extreme views paane wale digital trends.</p>
                </div>
              </div>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {trendingThisWeek.map(idea => {
                  const isLocked = isIdeaLocked(idea, unlockedCount);
                  return (
                    <IdeaCard 
                      key={`trending-${idea.id}`}
                      idea={idea}
                      locked={isLocked}
                      onClick={() => setSelectedIdeaId(idea.id)}
                    />
                  );
                })}
              </div>
            </div>

            {/* SEGMENT 3: TOP AI-BASED IDEAS */}
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-base font-extrabold text-slate-800">Top AI-Based Ideas 🤖</h3>
                </div>
                <span className="text-xs font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded">
                  {homepageSegments.ai.length} Plan
                </span>
              </div>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {homepageSegments.ai.slice(0, limits.ai).map(idea => {
                  const isLocked = isIdeaLocked(idea, unlockedCount);
                  return (
                    <IdeaCard 
                      key={`ai-${idea.id}`}
                      idea={idea}
                      locked={isLocked}
                      onClick={() => setSelectedIdeaId(idea.id)}
                    />
                  );
                })}
              </div>
              {homepageSegments.ai.length > limits.ai && (
                <div className="mt-5 text-center">
                  <button 
                    onClick={() => handleShowMore('ai')}
                    className="inline-flex items-center gap-1 bg-white hover:bg-slate-100 text-indigo-600 font-bold text-xs py-2 px-5 rounded-lg border border-slate-200 transition active:scale-95 cursor-pointer shadow-sm"
                  >
                    Naye AI Ideas Dekhein (+{homepageSegments.ai.length - limits.ai} aur)
                  </button>
                </div>
              )}
            </div>

            {/* SEGMENT 4: TOP MOBILE EARNING IDEAS */}
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-base font-extrabold text-slate-800">Top Mobile Earning Ideas 📱</h3>
                </div>
                <span className="text-xs font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded">
                  {homepageSegments.mobile.length} Plan
                </span>
              </div>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {homepageSegments.mobile.slice(0, limits.mobile).map(idea => {
                  const isLocked = isIdeaLocked(idea, unlockedCount);
                  return (
                    <IdeaCard 
                      key={`mobile-${idea.id}`}
                      idea={idea}
                      locked={isLocked}
                      onClick={() => setSelectedIdeaId(idea.id)}
                    />
                  );
                })}
              </div>
              {homepageSegments.mobile.length > limits.mobile && (
                <div className="mt-5 text-center">
                  <button 
                    onClick={() => handleShowMore('mobile')}
                    className="inline-flex items-center gap-1 bg-white hover:bg-slate-100 text-indigo-600 font-bold text-xs py-2 px-5 rounded-lg border border-slate-200 transition active:scale-95 cursor-pointer shadow-sm"
                  >
                    Naye Mobile Ideas Dekhein (+{homepageSegments.mobile.length - limits.mobile} aur)
                  </button>
                </div>
              )}
            </div>

            {/* SABHI IDEAS SECTION (Simple vertical list of top concepts, ranked high quality first without categories grouping) */}
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-1.5 animate-pulse">
                  <TrendingUp className="w-5 h-5 text-rose-500" />
                  <h3 className="text-base font-black text-rose-600">Sabhi Earning Ideas ⭐</h3>
                </div>
                <span className="text-xs font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                  All Sorted & Ranked
                </span>
              </div>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {[...IDEAS].sort((a,b) => calculateIdeaScore(b).score - calculateIdeaScore(a).score).slice(0, limits.sabhi).map(idea => {
                  const isLocked = isIdeaLocked(idea, unlockedCount);
                  return (
                    <IdeaCard 
                      key={`sabhi-ideas-${idea.id}`}
                      idea={idea}
                      locked={isLocked}
                      onClick={() => setSelectedIdeaId(idea.id)}
                    />
                  );
                })}
              </div>
              {IDEAS.length > limits.sabhi && (
                <div className="mt-5 text-center">
                  <button 
                    onClick={() => handleShowMore('sabhi')}
                    className="inline-flex items-center gap-1 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs py-2.5 px-6 rounded-xl transition active:scale-95 cursor-pointer shadow-md shadow-rose-600/10"
                  >
                    Poore 1000 Earning Ideas Dekhein (+{IDEAS.length - limits.sabhi} aur bache hain)
                  </button>
                </div>
              )}
            </div>

            <AdPlacement format="banner" />

            {/* SEGMENT 5: REMAINING IDEAS */}
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-base font-extrabold text-slate-800">Remaining Ideas 💡</h3>
                </div>
                <span className="text-xs font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded">
                  {homepageSegments.remaining.length} Plan
                </span>
              </div>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {homepageSegments.remaining.slice(0, limits.remaining).map(idea => {
                  const isLocked = isIdeaLocked(idea, unlockedCount);
                  return (
                    <IdeaCard 
                      key={`remaining-${idea.id}`}
                      idea={idea}
                      locked={isLocked}
                      onClick={() => setSelectedIdeaId(idea.id)}
                    />
                  );
                })}
              </div>
              {homepageSegments.remaining.length > limits.remaining && (
                <div className="mt-5 text-center">
                  <button 
                    onClick={() => handleShowMore('remaining')}
                    className="inline-flex items-center gap-1 bg-white hover:bg-slate-100 text-indigo-600 font-bold text-xs py-2 px-5 rounded-lg border border-slate-200 transition active:scale-95 cursor-pointer shadow-sm"
                  >
                    Baaki Sabhi Ideas Aur Dekhein (+{homepageSegments.remaining.length - limits.remaining} aur)
                  </button>
                </div>
              )}
            </div>

          </div>
        ) : (
          /* ================= FILTER / SEARCH / BOOKMARKS LIST VIEW ================= */
          <div className="animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200/60 max-w-4xl mx-auto">
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                {viewMode === 'bookmarks' && '🔖 Aapke Bookmarked Blueprints'}
                {viewMode === 'history' && '⏱️ Haal hi me dekhe gaye'}
                {viewMode === 'all' && `🔍 Match Found: ${translateCategory(selectedCat)}`}
              </h2>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                {filteredIdeas.length} concepts matched
              </span>
            </div>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
               {filteredIdeas.map((idea) => {
                 const isLocked = isIdeaLocked(idea, unlockedCount);
                 return (
                   <IdeaCard 
                     key={`list-${idea.id}`} 
                     idea={idea} 
                     locked={isLocked && viewMode === 'all'} 
                     onClick={() => setSelectedIdeaId(idea.id)} 
                   />
                 )
               })}
            </div>

            {filteredIdeas.length === 0 && (
              <div className="py-20 text-center max-w-md mx-auto border border-dashed border-slate-350 rounded-2xl bg-white p-6 shadow-sm">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-50 text-slate-400">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-black text-slate-800 mb-1">Koi Ideas nahi mile</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto mb-4 leading-relaxed">
                  Apne active search keywords ya advanced filters badal kar check karein.
                </p>
                <button 
                  onClick={resetFilters}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs px-4 py-2 rounded-xl"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Detail Blueprint Modal */}
      <IdeaModal 
        idea={selectedIdea} 
        onClose={() => setSelectedIdeaId(null)} 
        onOpenRelated={(id) => setSelectedIdeaId(id)}
      />

      {/* Floating Share Stats Widget */}
      <ShareCapsule />
    </div>
  );
}
