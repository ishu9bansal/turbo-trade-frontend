import {
  Dialog, DialogContent, DialogTitle, Paper,
  Table, TableBody, TableCell, TableHead, TableRow, ToggleButton, ToggleButtonGroup,
  Accordion, AccordionSummary, AccordionDetails,
  Typography, Grid, Chip, Stack, Box, Alert
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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import EventNoteIcon from "@mui/icons-material/EventNote";

export function ResultDialog({
  onClose,
  result,
}: {
  onClose: () => void;
  result: BacktestResult | null;
}) {

  const dailyData = useMemo(() => {
    const data = result?.results?.data || null;
    if (!data) return data;
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
    <Dialog open={!!result} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Result</DialogTitle>
      <DialogContent>
        {result && <StrategyConfig result={result} />}
        {dailyData ? (
          <ResultView data={dailyData} />
        ) : (
          <ErrorView error={result?.error} status={result?.status} />
        )}
      </DialogContent>
    </Dialog>
  );
}

function StrategyConfig({ result }: { result: BacktestResult }) {
  const strategy = result.strategy;
  const { position } = strategy;
  const expiryDay = position.focus.expiry.weekday;

  return (
    <Accordion sx={{ mb: 2 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="subtitle1">Strategy Config</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2} alignItems="center">
          <Grid size={6}>
            <Stack direction="row" spacing={1} alignItems="center">
              <AccessTimeIcon fontSize="small" />
              <Typography variant="body2" color="text.secondary">Entry:</Typography>
              <Typography variant="body1">{position.entry.time}</Typography>
            </Stack>
          </Grid>
          <Grid size={6}>
            <Stack direction="row" spacing={1} alignItems="center">
              <AccessTimeIcon fontSize="small" />
              <Typography variant="body2" color="text.secondary">Exit:</Typography>
              <Typography variant="body1">{position.exit.time}</Typography>
            </Stack>
          </Grid>
          <Grid size={6}>
            <Stack direction="row" spacing={1} alignItems="center">
              <ShowChartIcon fontSize="small" />
              <Typography variant="body2" color="text.secondary">Symbol:</Typography>
              <Typography variant="body1">{position.focus.symbol}</Typography>
            </Stack>
          </Grid>
          <Grid size={6}>
            <Stack direction="row" spacing={1} alignItems="center">
              <CurrencyRupeeIcon fontSize="small" />
              <Typography variant="body2" color="text.secondary">Capital:</Typography>
              <Typography variant="body1">₹{strategy.capital.toLocaleString()}</Typography>
            </Stack>
          </Grid>
          <Grid size={6}>
            <Stack direction="row" spacing={1} alignItems="center">
              <StackedLineChartIcon fontSize="small" />
              <Typography variant="body2" color="text.secondary">Lot Size:</Typography>
              <Typography variant="body1">{strategy.lot_size}</Typography>
            </Stack>
          </Grid>
          <Grid size={6}>
            <Stack direction="row" spacing={1} alignItems="center">
              <FormatListNumberedIcon fontSize="small" />
              <Typography variant="body2" color="text.secondary">Positions/day:</Typography>
              <Typography variant="body1">{position.per_day_positions_threshold}</Typography>
            </Stack>
          </Grid>
          <Grid size={12}>
            <Stack direction="row" spacing={1} alignItems="center">
              <EventNoteIcon fontSize="small" />
              <Typography variant="body2" color="text.secondary">Expiry Day:</Typography>
              <ToggleButtonGroup exclusive size="small" value={expiryDay} sx={{ ml: 1 }}>
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
                  <ToggleButton key={day} value={idx} disabled>
                    {day}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Stack>
          </Grid>
          <Grid size={12}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Legs:
            </Typography>
            <Stack spacing={1}>
              {position.legs.map((leg, i) => (
                <Chip
                  key={i}
                  label={`${leg.transaction} ${leg.type} @ offset ${leg.strike.offset}`}
                  color={leg.transaction === "BUY" ? "success" : "error"}
                  variant="outlined"
                />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

function ErrorView({ error, status }: { error?: string | null; status?: 'completed' | 'pending' | 'error' }) {
  const severity = status === 'pending' ? 'warning' : 'error';
  error = status === 'pending' ? "Backtest is still running, please check back later." : error || "An unknown error occurred.";
  const isDetailed = error.length > 120 || error.includes("\n");

  return (
    <>
      <Alert severity={severity} sx={{ mt: 2 }}>{error}</Alert>
      {isDetailed && (
        <Accordion sx={{ mt: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Error Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box component="pre" sx={{ fontSize: 12, whiteSpace: 'pre-wrap' }}>{error}</Box>
          </AccordionDetails>
        </Accordion>
      )}
    </>
  );
}

function ResultView({ data }: { data: { date: string; pnl: number }[] }) {
  const [view, setView] = useState<"table" | "chart">("chart");
  return (
    <>
      <ViewToggle view={view} onChange={setView} />
      {view === "chart" ? <PnLChart data={data} /> : <PnLTable data={data} />}
    </>
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
