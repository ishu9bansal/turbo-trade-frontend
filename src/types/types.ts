export type TransactionType = "BUY" | "SELL";
export type OptionType = "CE" | "PE";

export type RawOrder = {
  entry_price: number;
  quantity: number;
  transaction_type: TransactionType;
  entry_time: string;
};

export type Contract = {
    expiry: string; // ISO date string
    type: OptionType; // Call or Put
    strike: number; // Strike price
    symbol: string; // e.g., "NIFTY"
    id: string; // Unique identifier for the contract
}

export type BacktestResult = {
  results: {
    data: RawOrder[]
  } | null;
};
