// lib/types.ts
export interface CurrentBounty {
  id: number;
  day: number;
  title: string;
  description: string;
  amount: string;
  tokenAmount: string;
  timeLeft: string;
  submissions: number;
  created_at: string;
  issuer?: string;
  claimer?: string;
  claimId?: string;
}

export interface Stats {
  currentDay: number;
  totalRewards: string;
  tokenDistribution: string;
}

export interface PreviousBounty {
  day: number;
  title: string;
  description: string;
  winner: string | null;
  amount: string;
  tokenAmount: string;
  created_at: string;
  task: string;
}

export interface APIResponse<T> {
  success: boolean;
  error?: string;
  data?: T;
}
