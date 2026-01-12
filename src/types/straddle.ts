// Type definitions for Straddle Premium Visualization

export interface PremiumSnapshot {
  timestamp: string; // HH:MM:SS format
  spotPrice: number;
  premiums: {
    '-3': number;
    '-2': number;
    '-1': number;
    '0': number;  // ATM
    '1': number;
    '2': number;
    '3': number;
  };
}

export interface StraddleState {
  data: PremiumSnapshot[];
  isSimulating: boolean;
}
