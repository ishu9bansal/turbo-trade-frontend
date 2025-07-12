
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchHistory } from "../api/backtest";
import { useAuth } from "@clerk/clerk-react";
import type { BacktestResult } from "../types/types";
import { ResultList } from "../components/ResultList";
import { ResultDialog } from "../components/ResultDialog";

export default function HistoryViewer() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [results, setResults] = useState<BacktestResult[]>([]);
  const { getToken } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const token = await getToken();
        const history = await fetchHistory(token);
        setResults(history.backtests);
      } catch (err: any) {
        alert(err.message);
      }
    })();
  }, []);

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        Backtest History
      </Typography>

      <ResultList results={results} onSelect={setSelectedIndex} />

      <ResultDialog
        open={selectedIndex !== null}
        onClose={() => setSelectedIndex(null)}
        result={selectedIndex !== null ? results[selectedIndex] : null}
        index={selectedIndex}
      />
    </Box>
  );
}
