// components/ResultList.tsx
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Chip,
  Stack,
} from "@mui/material";
import type { BacktestResult, RawOrder } from "../types/types";
import { format, differenceInSeconds } from "date-fns";

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

function getStatusChip(status: BacktestResult["status"]) {
  const color = {
    completed: "success" as const,
    pending: "warning" as const,
    error: "error" as const,
  }[status];

  const label = {
    completed: "Completed",
    pending: "Pending",
    error: "Failed",
  }[status];

  return <Chip label={label} color={color} size="small" />;
}

function formatDuration(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
}

export function ResultList({
  results,
  onSelect,
}: {
  results: BacktestResult[];
  onSelect: (index: number) => void;
}) {
  return (
    <List>
      {results.map((result, idx) => {
        const { strategy, status, created_at, updated_at, results: resultData, error } = result;

        const summary = resultData?.data ? getSummary(resultData.data) : null;
        const legsCount = strategy.position.legs.length;
        const symbol = strategy.position.focus.symbol;

        const primary = `Strategy ${idx + 1}: ${symbol} | Legs: ${legsCount}`;
        let secondary = `Created: ${format(new Date(created_at), "yyyy-MM-dd HH:mm")}`;

        const created = new Date(created_at);
        const updated = new Date(updated_at);
        const durationSeconds = differenceInSeconds(updated, created);
        const processingTime = formatDuration(durationSeconds);

        secondary += ` | Processing Time: ${processingTime}`;

        if (status === "completed" && summary) {
          secondary += ` | Duration: ${summary.start} → ${summary.end} | ₹${summary.totalPnl.toFixed(2)}`;
        } else if (status === "error" && error) {
          secondary += ` | Error: ${error}`;
        } else {
          secondary += ` | Status: ${status}`;
        }

        return (
          <ListItem key={idx} disablePadding>
            <ListItemButton onClick={() => onSelect(idx)}>
              <ListItemText
                primary={
                  <Stack direction="row" spacing={1} alignItems="center">
                    {getStatusChip(status)}
                    <span>{primary}</span>
                  </Stack>
                }
                secondary={secondary}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
