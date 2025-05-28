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
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { useState } from "react";

type Result = {
  date: string;
  pnl: number;
};

type Props = {
  data: Result[];
};

export default function ResultViewer({ data }: Props) {
  const [view, setView] = useState<"table" | "chart">("chart");

  const handleViewChange = (_: any, newView: "table" | "chart" | null) => {
    if (newView) setView(newView);
  };

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        Backtest Result
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
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#ccc" />
            <Line type="monotone" dataKey="pnl" stroke="#1976d2" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>PnL</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.pnl}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
}
