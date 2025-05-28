import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useState, useMemo } from "react";

type RawOrder = {
  entry_price: number;
  quantity: number;
  transaction_type: "BUY" | "SELL";
  date: string;
};

type Props = {
  data: RawOrder[];
};

type DailyResult = {
  date: string;
  pnl: number;
};

export default function ResultViewer({ data }: Props) {
  const [view, setView] = useState<"table" | "chart">("chart");

  const handleViewChange = (_: any, newView: "table" | "chart" | null) => {
    if (newView) setView(newView);
  };

  // Group orders by date and calculate daily PnL
  const dailyData: DailyResult[] = useMemo(() => {
    const map = new Map<string, number>();

    data.forEach(({ date, entry_price, quantity, transaction_type }) => {
      const amount = entry_price * quantity;
      const pnl = transaction_type === "SELL" ? amount : -amount;
      map.set(date, (map.get(date) || 0) + pnl);
    });

    const arr = Array.from(map.entries()).map(([date, pnl]) => ({ date, pnl }));
    const cumulativePnl = arr.reduce((acc, curr) => {
      const lastPnl = acc.length > 0 ? acc[acc.length - 1].pnl : 0;
      acc.push({ date: curr.date, pnl: lastPnl + curr.pnl });
      return acc;
    }, [] as DailyResult[]);

    return cumulativePnl;
  }, [data]);

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        Backtest Results
      </Typography>

      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={handleViewChange}
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
    </Box>
  );
}
