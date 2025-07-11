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
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
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
import { useState, useMemo, useEffect } from "react";
import type { BacktestResult, RawOrder } from "../types/types";
import { fetchHistory } from "../api/backtest";
import { useAuth } from "@clerk/clerk-react";

type DailyResult = {
  date: string;
  pnl: number;
};

export default function HistoryViewer() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [view, setView] = useState<"table" | "chart">("chart");
  const [results, setResults] = useState([] as BacktestResult[]);
  const { getToken } = useAuth();

  const handleViewChange = (_: any, newView: "table" | "chart" | null) => {
    if (newView) setView(newView);
  };

  const handleClose = () => setSelectedIndex(null);

  const dailyData: DailyResult[] = useMemo(() => {
    if (selectedIndex === null) return [];

    const data = results[selectedIndex].results?.data ?? [];
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

    const cumulative = arr.reduce((acc, curr) => {
      const last = acc.length > 0 ? acc[acc.length - 1].pnl : 0;
      acc.push({ date: curr.date, pnl: last + curr.pnl });
      return acc;
    }, [] as DailyResult[]);

    return cumulative;
  }, [results, selectedIndex]);

  const getSummary = (orders: RawOrder[]) => {
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
  };

  const onInit = async () => {
    // Fetch results from API
    try {
      const token = await getToken();
      const history = await fetchHistory(token);
      setResults(history.backtests);
    } catch (err: any) {
      alert(err.message);
    }
  };

  useEffect(() => {
    onInit();
  });

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        Backtest History
      </Typography>

      <List>
        {results.map((result, idx) => {
          const summary = getSummary(result.results?.data || []);
          return (
            <ListItem key={idx} disablePadding>
              <ListItemButton onClick={() => setSelectedIndex(idx)}>
                <ListItemText
                  primary={`Result ${idx + 1}`}
                  secondary={`Duration: ${summary.start} to ${summary.end} | PnL: ₹${summary.totalPnl.toFixed(2)}`}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Dialog open={selectedIndex !== null} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Result {selectedIndex !== null ? selectedIndex + 1 : ""}</DialogTitle>
        <DialogContent>
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
        </DialogContent>
      </Dialog>
    </Box>
  );
}
