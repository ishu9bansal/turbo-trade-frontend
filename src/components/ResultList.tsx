// components/ResultList.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
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
  const sortedResults = [...results].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell>Symbol</TableCell>
            <TableCell>Legs</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Processing Time</TableCell>
            <TableCell>PnL (₹)</TableCell>
            {/* <TableCell>Action</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedResults.map((result, idx) => {
            const { strategy, status, created_at, updated_at, results: resultData } = result;

            const summary = resultData?.data ? getSummary(resultData.data) : null;
            const legsCount = strategy.position.legs.length;
            const symbol = strategy.position.focus.symbol;
            const created = new Date(created_at);
            const updated = new Date(updated_at);
            const processingTime = formatDuration(differenceInSeconds(updated, created));

            return (
              <TableRow key={idx} hover onClick={() => onSelect(idx)}>
                <TableCell>{getStatusChip(status)}</TableCell>
                <TableCell>{symbol}</TableCell>
                <TableCell>{legsCount}</TableCell>
                <TableCell>{strategy.start_date}</TableCell>
                <TableCell>{strategy.end_date}</TableCell>
                <TableCell>{format(created, "yyyy-MM-dd HH:mm")}</TableCell>
                <TableCell>{processingTime}</TableCell>
                <TableCell>
                  {status === "completed" && summary ? summary.totalPnl.toFixed(2) : "-"}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
