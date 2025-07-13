import {
  Box,
  Button,
  Typography,
  Grid,
  Paper,
  Chip,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { useAuth, useClerk } from "@clerk/clerk-react";

export default function TurboTradeLanding() {
  const { isSignedIn } = useAuth();
  const { openSignUp } = useClerk();
  const navigate = useNavigate();
  const handleGetStarted = () => {
    if (!isSignedIn) {
      openSignUp();
      return;
    }
    navigate("/backtest");
  }
  return (
    <Box sx={{ color: "black", minHeight: "100vh" }}>
      <Grid container justifyContent="center" alignItems="center" spacing={6} sx={{ p: 4 }}>
        <Grid size={{xs:12, md: 6}}>
          <Box textAlign="center">
            <Typography variant="h3" fontWeight="bold">TURBO</Typography>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              TRADE
            </Typography>
            <Typography variant="h5" gutterBottom>
              Backtesting Engine
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: 500, mx: "auto", mt: 2 }}>
              Take control of your option trading journey on the NIFTY index with our backtesting solution
              for strategy development and optimization.
            </Typography>

            <Button
              variant="contained"
              sx={{
                mt: 4,
                px: 4,
                py: 1.5,
                fontSize: "1.2rem",
                backgroundImage: "linear-gradient(to right, #f44336, #ff9800)",
                borderRadius: 2,
              }}
              endIcon={<ArrowForwardIcon />}
              onClick={handleGetStarted}
            >
              Get started
            </Button>

            <Box sx={{ mt: 3, textAlign: "left", maxWidth: 300, mx: "auto" }}>
              <Typography>⭐ Nifty Option Expert
              </Typography>
              <Typography>⭐ Full Strategy Control
              </Typography>
              <Typography>⭐ Zero Risk
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid size={{xs:12, md: 6}}>
          <Grid container spacing={3} justifyContent="center">
            <Grid>
              <Paper sx={{
                    bgcolor: "#161b22",
                    color: "white", p: 2, 
                    transform: "rotate(1deg)",
                    borderRadius: 2,
                    minWidth: 200,
                }}>
                <Typography variant="subtitle2">Strategy Performance</Typography>
                <Typography variant="h6" color="success.main">
                  + ₹32,540
                </Typography>
                <Typography variant="body2" color="green">
                  ↑ Win rate 68.40%
                </Typography>
              </Paper>
            </Grid>

            <Grid>
              <Paper sx={{
                bgcolor: "#161b22",
                color: "white",
                p: 2,
                transform: "rotate(-1deg)",
                borderRadius: 2,
                minWidth: 200,
              }}>
                <Typography variant="subtitle2">Annual Performance</Typography>
                <Typography variant="h6">
                  Sharpe: 1.82 <span style={{ color: "#4caf50" }}>+27.6%</span>
                </Typography>
              </Paper>
            </Grid>

            <Grid>
              <Paper
                sx={{
                  bgcolor: "#161b22",
                  color: "white",
                  p: 2,
                  borderRadius: 2,
                  transform: "rotate(-5deg)",
                  minWidth: 300,
                }}
              >
                <Typography variant="subtitle1" gutterBottom>
                  Iron Condor
                </Typography>
                <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                  <Chip label="Weekly" variant="outlined" sx={{ color: "white", borderColor: "white" }} />
                  <Chip label="Monthly" color="error" />
                  <Chip label="Friday" variant="outlined" sx={{ color: "white", borderColor: "white" }} />
                  <Chip label="Delta" variant="outlined" sx={{ color: "white", borderColor: "white" }} />
                </Box>
                <Box
                  sx={{
                    bgcolor: "#0d1117",
                    py: 1,
                    px: 2,
                    borderRadius: 1,
                    textAlign: "center",
                    mb: 1,
                  }}
                >
                  2 Lots x 4 legs
                </Box>
                <Button fullWidth variant="contained" sx={{ bgcolor: "#b71c1c" }}>
                  Run Backtest
                </Button>
              </Paper>
            </Grid>

            <Grid>
              <Paper
                sx={{
                  bgcolor: "#161b22",
                  color: "white",
                  p: 2,
                  borderRadius: 2,
                  transform: "rotate(5deg)",
                  minWidth: 300,
                }}
              >
                <Typography variant="subtitle1" gutterBottom>
                  Long Straddle
                </Typography>
                <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                  <Chip label="Weekly" variant="outlined" sx={{ color: "white", borderColor: "white" }} />
                  <Chip label="Monthly" color="error" />
                  <Chip label="Friday" variant="outlined" sx={{ color: "white", borderColor: "white" }} />
                  <Chip label="Delta" variant="outlined" sx={{ color: "white", borderColor: "white" }} />
                </Box>
                <Button fullWidth variant="contained" sx={{ bgcolor: "#b71c1c" }}>
                  Run Backtest
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
