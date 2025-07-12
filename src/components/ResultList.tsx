// components/ResultList.tsx
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import type { BacktestResult, RawOrder } from "../types/types";

function getSummary(orders: RawOrder[]) {
  let totalPnl = 0;
  let start = "", end = "";
  const map = new Map<string, number>();

  orders.forEach(({ entry_time, entry_price, quantity, transaction_type }) => {
    const amount = entry_price * quantity;
    const pnl = transaction_type === "SELL" ? amount : -amount;
    const date = new Date(entry_time).toISOString().split("T")[0];
    map.set(date, (map.get(date) || 0) + pnl);
  });

  const sortedDates = [...map.keys()].sort();
  start = sortedDates[0];
  end = sortedDates[sortedDates.length - 1];
  totalPnl = Array.from(map.values()).reduce((a, b) => a + b, 0);

  return { totalPnl, start, end };
}

export function ResultList({ results, onSelect }: {
  results: BacktestResult[];
  onSelect: (index: number) => void;
}) {
  return (
    <List>
      {results.map((result, idx) => {
        const summary = getSummary(result.results?.data || []);
        return (
          <ListItem key={idx} disablePadding>
            <ListItemButton onClick={() => onSelect(idx)}>
              <ListItemText
                primary={`Result ${idx + 1}`}
                secondary={`Duration: ${summary.start} to ${summary.end} | PnL: ₹${summary.totalPnl.toFixed(2)}`}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
