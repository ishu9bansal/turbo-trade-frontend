import type { BacktestFormData } from "./orchestrator";

export type TransactionType = "BUY" | "SELL";
export type OptionType = "CE" | "PE";

export type Contract = {
    expiry: string; // ISO date string
    type: OptionType; // Call or Put
    strike: number; // Strike price
    symbol: string; // e.g., "NIFTY"
    id: string; // Unique identifier for the contract
}

export type RawOrder = {
  entry_price: number;
  quantity: number;
  transaction_type: TransactionType;
  entry_time: string;
  contract: Contract;
};

export type BacktestResult = {
  strategy: BacktestFormData; // The strategy input used for the backtest
  results: {
    data: RawOrder[];
    initial_capital: number;
  } | null;
  error: string | null;
  status: 'completed' | 'pending' | 'error';
  updated_at: string;
  created_at: string;
};
