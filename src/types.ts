export interface Idea {
  id: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  steps: string[];
  earningPotential: string;
  startCost: string;
  skillLevel: string;
  timeToStart: string;
  bestFor: string;
  pros: string[];
  cautions: string[];
  tags: string[];
  relatedIdeaIds: string[];
}
