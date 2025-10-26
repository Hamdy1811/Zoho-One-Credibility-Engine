export interface Industry {
  name: string;
  subIndustries: string[];
}

export type InputMode = 'guided' | 'freeform' | 'checklist' | null;

export interface ChallengeGoal {
  title: string;
  description: string;
}

export interface CustomerData {
  industry: string;
  subIndustry: string;
  companySize?: number;
  timeline?: string;
  challenges: ChallengeGoal[];
  goals: ChallengeGoal[];
  currentTools: string;
  notes?: string;
}

export interface ProposalSolution {
  serviceName: string;
  outcomes: string[];
}

export interface Proposal {
  solutions: ProposalSolution[];
  summary: string;
}

export type AppStep = 'selectIndustry' | 'selectInputMode' | 'inputData' | 'generating' | 'proposalReady';