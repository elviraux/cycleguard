export interface CycleData {
  lastPeriodStart: string; // ISO date string
  periodLength: number;
  cycleLength: number;
}

export interface PeriodDay {
  date: string; // ISO date string (YYYY-MM-DD)
}

export interface SymptomLog {
  date: string; // ISO date string (YYYY-MM-DD)
  symptoms: string[];
  notes: string;
}

export interface UserData {
  cycleData?: CycleData;
  periodDays: PeriodDay[];
  symptomLogs: SymptomLog[];
  hasCompletedOnboarding: boolean;
}
