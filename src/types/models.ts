export interface Contract {
  expiry: string;
  type: string;
  strike: number;
  symbol: string;
}

export interface Order {
  contract: Contract;
  quantity: number;
  transaction_type: 'BUY' | 'SELL';
  entry_time: string;
  entry_price: number;
}