import {
  Dialog, DialogContent, DialogTitle, Paper,
  Table, TableBody, TableCell, TableHead, TableRow, ToggleButton, ToggleButtonGroup
} from "@mui/material";
import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
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
        <ViewToggle view={view} onChange={setView} />
        {view === "chart" ? <PnLChart data={dailyData} /> : <PnLTable data={dailyData} />}
      </DialogContent>
    </Dialog>
  );
}

function ViewToggle({
  view,
  onChange,
}: {
  view: "table" | "chart";
  onChange: (view: "table" | "chart") => void;
}) {
  return (
    <ToggleButtonGroup
      value={view}
      exclusive
      onChange={(_, newView) => newView && onChange(newView)}
      size="small"
      sx={{ mb: 2 }}
    >
      <ToggleButton value="chart">Chart</ToggleButton>
      <ToggleButton value="table">Table</ToggleButton>
    </ToggleButtonGroup>
  );
}

function PnLChart({ data }: { data: { date: string; pnl: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip formatter={(v) => `₹${Number(v).toFixed(2)}`} />
        <CartesianGrid stroke="#ccc" />
        <Line type="monotone" dataKey="pnl" stroke="#1976d2" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}

function PnLTable({ data }: { data: { date: string; pnl: number }[] }) {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>PnL (₹)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.pnl.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
