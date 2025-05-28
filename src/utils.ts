type RawApiData = {
  entry_price: Record<string, number>;
  quantity: Record<string, number>;
  transaction_type: Record<string, "BUY" | "SELL">;
  date: Record<string, string>;
};

export type FlattenedOrder = {
  entry_price: number;
  quantity: number;
  transaction_type: "BUY" | "SELL";
  date: string;
};

export function transformApiDataToOrders(data: RawApiData): FlattenedOrder[] {
  const length = Object.keys(data.entry_price).length;
  const orders: FlattenedOrder[] = [];

  for (let i = 0; i < length; i++) {
    orders.push({
      entry_price: data.entry_price[i.toString()],
      quantity: data.quantity[i.toString()],
      transaction_type: data.transaction_type[i.toString()],
      date: data.date[i.toString()],
    });
  }

  return orders;
}
