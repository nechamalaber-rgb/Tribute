export type ViewState = 'ONBOARDING' | 'DASHBOARD' | 'DAILY_GROW' | 'MOMENT_FLOW' | 'CREATE_GROW' | 'TEFILLAH';

export type GrowLevel = 'FOUNDATION' | 'INNER_STRENGTH' | 'LEADERSHIP';

export interface BitachonBrick {
  id: string;
  date: string;
  label: string;
  type: 'TRUST' | 'PAUSE' | 'CONNECTION' | 'GENERIC';
}

export interface UserCreatedGrow {
  id: string;
  date: string;
  recognize: string;
  yearn: string;
  trust: string;
  grow: string;
}

export interface UserStreak {
  currentStreak: number;
  totalCheckins: number;
  lastCheckinDate: string | null;
  history: string[]; // List of dates YYYY-MM-DD
}

export interface UserState {
  hasOnboarded: boolean;
  level: GrowLevel;
  bricks: BitachonBrick[];
  userGrows: UserCreatedGrow[];
  streak: UserStreak;
  lastVisitDate: string | null;
}

export interface DailyGrowContent {
  theme: string;
  recognize: string;
  yearn: string;
  trust: string;
  grow: string;
  source?: string;
}