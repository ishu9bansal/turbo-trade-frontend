// components/ResultDialog.tsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useMemo, useState } from "react";
import type { BacktestResult } from "../types/types";

export function ResultDialog({
  open,
  onClose,
  result,
  index,
}: {
  open: boolean;
  onClose: () => void;
  result: BacktestResult | null;
  index: number | null;
}) {
  const [view, setView] = useState<"table" | "chart">("chart");

  const dailyData = useMemo(() => {
    if (!result) return [];
    const data = result.results?.data ?? [];
    const map = new Map<string, number>();

    data.forEach(({ entry_time, entry_price, quantity, transaction_type }) => {
      const amount = entry_price * quantity;
      const pnl = transaction_type === "SELL" ? amount : -amount;
      const date = new Date(entry_time).toISOString().split("T")[0];
      map.set(date, (map.get(date) || 0) + pnl);
    });

    const arr = Array.from(map.entries())
      .map(([date, pnl]) => ({ date, pnl }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return arr.reduce((acc, curr) => {
      const last = acc.length > 0 ? acc[acc.length - 1].pnl : 0;
      acc.push({ date: curr.date, pnl: last + curr.pnl });
      return acc;
    }, [] as { date: string; pnl: number }[]);
  }, [result]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Result {index !== null ? index + 1 : ""}</DialogTitle>
      <DialogContent>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={(_, newView) => newView && setView(newView)}
          size="small"
          sx={{ mb: 2 }}
        >
          <ToggleButton value="chart">Chart</ToggleButton>
          <ToggleButton value="table">Table</ToggleButton>
        </ToggleButtonGroup>

        {view === "chart" ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(v) => `₹${Number(v).toFixed(2)}`} />
              <CartesianGrid stroke="#ccc" />
              <Line
                type="monotone"
                dataKey="pnl"
                stroke="#1976d2"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>PnL (₹)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dailyData.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.pnl.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}
      </DialogContent>
    </Dialog>
  );
}
