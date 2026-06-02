import { Idea } from '../types';
import { IDEAS } from '../data';

export interface ScoreDetails {
  score: number;            // Overall aggregated score (0-10 scale)
  practicality: number;     // 0-10 rating
  earningPotential: number; // 0-10 rating
  demand: number;           // 0-10 rating
  growthPotential: number;  // 0-10 rating
  uniqueness: number;       // 0-10 rating
  easeOfStarting: number;   // 0-10 rating
}

export function calculateIdeaScore(idea: Idea): ScoreDetails {
  // Deterministic calculation from exact database properties of each idea

  // 1. Earning Potential Rating (derived from earningPotential range string)
  let earningPotential = 5; 
  const epStr = idea.earningPotential?.toLowerCase() || '';
  if (epStr.includes('1,50,000') || epStr.includes('2,50,000') || epStr.includes('1,80,000') || epStr.includes('1,00,000') || epStr.includes('2,20,000')) {
    earningPotential = 10;
  } else if (epStr.includes('80,000') || epStr.includes('90,000') || epStr.includes('75,000') || epStr.includes('60,000') || epStr.includes('1,00,000')) {
    earningPotential = 9;
  } else if (epStr.includes('30,000') || epStr.includes('25,000') || epStr.includes('40,000') || epStr.includes('50,000') || epStr.includes('55,000')) {
    earningPotential = 7;
  } else {
    earningPotential = 5;
  }

  // 2. Practicality (based on startCost and general complexity)
  let practicality = 7;
  const scStr = idea.startCost?.toLowerCase() || '';
  if (scStr.includes('0') || scStr.includes('free')) {
    practicality = 10; // Free to start is highly practical
  } else if (scStr.includes('1000') || scStr.includes('2000') || scStr.includes('3000')) {
    practicality = 8;
  } else if (scStr.includes('5000')) {
    practicality = 6;
  } else {
    practicality = 5;
  }

  // 3. Ease of Starting (based on skillLevel and timeToStart)
  let easeOfStarting = 6;
  const skStr = idea.skillLevel?.toLowerCase() || '';
  const timeStr = idea.timeToStart?.toLowerCase() || '';
  
  let skillPart = 5;
  if (skStr.includes('beginner')) skillPart = 10;
  else if (skStr.includes('intermediate')) skillPart = 7;
  else skillPart = 5;

  let timePart = 5;
  if (timeStr.includes('immediate') || timeStr.includes('2 days') || timeStr.includes('3-5 days') || timeStr.includes('5 days')) {
    timePart = 10;
  } else if (timeStr.includes('1 week') || timeStr.includes('7 days')) {
    timePart = 8;
  } else if (timeStr.includes('2 weeks') || timeStr.includes('1-2 weeks')) {
    timePart = 6;
  } else {
    timePart = 5;
  }
  easeOfStarting = Math.round((skillPart + timePart) / 2);

  // 4. Demand (based on current-era categories like AI and digital assets)
  let demand = 6;
  const cat = idea.category.toLowerCase();
  const tagsJoined = (idea.tags || []).join(' ').toLowerCase();
  
  if (tagsJoined.includes('ai') || tagsJoined.includes('automation') || tagsJoined.includes('saas') || tagsJoined.includes('micro-saas')) {
    demand = 10;
  } else if (cat.includes('online') || cat.includes('digital') || cat.includes('content') || cat.includes('freelancing')) {
    demand = 9;
  } else if (cat.includes('local') || cat.includes('services')) {
    demand = 8;
  } else {
    demand = 7;
  }

  // 5. Growth Potential
  let growthPotential = 6;
  if (tagsJoined.includes('ai') || tagsJoined.includes('software') || tagsJoined.includes('saas') || tagsJoined.includes('api')) {
    growthPotential = 10;
  } else if (cat.includes('digital') || cat.includes('online') || cat.includes('affiliate')) {
    growthPotential = 8;
  } else {
    growthPotential = 7;
  }

  // 6. Uniqueness
  let uniqueness = 6;
  // If the idea belongs to the extended collection (ID > 500), it's highly specific & unique
  const ideaNum = parseInt(idea.id.split('_')[1] || '0');
  if (ideaNum > 500) {
    uniqueness = 9;
  } else {
    uniqueness = 7;
  }

  // Combined score calculations
  const totalWeightedScore = (
    practicality * 2.0 +
    earningPotential * 2.5 +
    demand * 2.0 +
    growthPotential * 1.5 +
    uniqueness * 1.0 +
    easeOfStarting * 1.0
  );

  // Normalize score into a polished 0-10 rating scale (e.g. 9.4)
  const score = parseFloat((totalWeightedScore / 10).toFixed(1));

  return {
    score,
    practicality,
    earningPotential,
    demand,
    growthPotential,
    uniqueness,
    easeOfStarting
  };
}

export interface BadgeInfo {
  label: '🔥 Trending' | '⭐ Recommended' | '🏆 Top Rated' | '💎 Premium' | '✅ Trusted' | null;
  colorClass: string;
}

export function getIdeaBadge(idea: Idea, calculatedScore: number): BadgeInfo {
  const sumChars = idea.title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  if (calculatedScore >= 9.0) {
    if (sumChars % 2 === 0) {
      return { label: '🏆 Top Rated', colorClass: 'bg-indigo-600 text-white border-indigo-700' };
    } else {
      return { label: '💎 Premium', colorClass: 'bg-violet-600 text-white border-violet-700' };
    }
  } else if (calculatedScore >= 8.2) {
    if (sumChars % 2 === 0) {
      return { label: '🔥 Trending', colorClass: 'bg-rose-500 text-white border-rose-600' };
    } else {
      return { label: '⭐ Recommended', colorClass: 'bg-amber-500 text-white border-amber-600' };
    }
  } else if (calculatedScore >= 7.0) {
    return { label: '✅ Trusted', colorClass: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
  }
  return { label: null, colorClass: '' };
}

let rankedIdeasCache: string[] | null = null;

export function getRankedIdeasIds(): string[] {
  if (!rankedIdeasCache) {
    rankedIdeasCache = [...IDEAS]
      .map(idea => ({ id: idea.id, score: calculateIdeaScore(idea).score }))
      .sort((a, b) => b.score - a.score)
      .map(item => item.id);
  }
  return rankedIdeasCache;
}

export function isIdeaLocked(idea: Idea, unlockedCount: number): boolean {
  const rankedIds = getRankedIdeasIds();
  const globalIndex = rankedIds.indexOf(idea.id);
  
  // First 20 ideas are visible in advance
  if (globalIndex < 20) {
    return false;
  }
  
  // Ideas #21 onward are locked unless globalIndex < unlockedCount
  return globalIndex >= unlockedCount;
}

