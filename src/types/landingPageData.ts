import { BarChart3, Zap, CheckCircle2, MonitorSmartphone, TrendingUp } from "lucide-react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import InsightsIcon from "@mui/icons-material/Insights";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import SettingsIcon from "@mui/icons-material/Settings";

export const FEATURES = [
    {
        icon: MonitorSmartphone,
        title: "Build Any Strategy",
        desc: "From straddles to complex multi-leg setups — define your trades in minutes."
    },
    {
        icon: BarChart3,
        title: "Backtest Without Limits",
        desc: "Run unlimited tests on historical data, compare variations, and find your edge."
    },
    {
        icon: Zap,
        title: "Deploy With Confidence",
        desc: "Go live with the exact same strategy you tested — no mismatches, no guesswork."
    },
    {
        icon: TrendingUp,
        title: "No More Screen Fatigue",
        desc: "Set your rules once and let automation handle the market’s every move."
    },
    {
        icon: CheckCircle2,
        title: "Rules You Define",
        desc: "Custom entry & exit conditions, volatility checks, time limits, and more."
    }
];

export const HOW_TO_USE_DATA = {
  title: "How to Use the Platform",
  sections: [
    {
      title: "1. Getting Started",
      icon: CheckCircleOutlineIcon,
      steps: [
        {
          title: "Sign up & Log in",
          items: [
            "Create an account or log in with your credentials.",
            "All your strategies, backtests, and results are tied to your account.",
          ],
        },
        {
          title: "Explore Your Dashboard",
          items: [
            "Saved strategies",
            "Backtest history",
            "Live trading deployment (coming soon)",
          ],
        },
      ],
    },
    {
      title: "2. Creating Your First Strategy",
      icon: SettingsIcon,
      steps: [
        {
          title: "Go to “Create Strategy”",
          items: ["Click New Strategy to open the form-based strategy builder."],
        },
        {
          title: "Define Your Position",
          items: [
            "Choose instrument: Nifty, BankNifty, or FinNifty.",
            "Define legs (buy/sell Call/Put at strike relative to current price).",
            "Multiple legs can be combined to form complex strategies.",
          ],
        },
        {
          title: "Set Entry & Exit Rules",
          items: [
            "Entry triggers: market signals, time, volatility, or custom rules.",
            "Exit triggers: stop-loss, time-based exits, hard trade limits, or custom rules.",
          ],
        },
        {
          title: "Save Strategy",
          items: [
            "Your defined strategy is stored in your account for reuse and modification.",
          ],
        },
      ],
    },
    {
      title: "3. Backtesting Your Strategy",
      icon: InsightsIcon,
      steps: [
        {
          title: "Select a Date Range",
          items: [
            "Run tests on minute-resolution data for the last 2 years (free).",
            "Custom or older data coming soon with pay-per-query model.",
          ],
        },
        {
          title: "Run Backtest",
          items: [
            "System simulates your strategy exactly as defined.",
            "See trade-by-trade logs, profit/loss curves, and performance graphs.",
          ],
        },
        {
          title: "Compare Variations",
          items: [
            "Duplicate a strategy, tweak parameters, and run multiple backtests.",
            "Compare results side-by-side to find the optimal configuration.",
          ],
        },
      ],
    },
    {
      title: "4. Deploying Live (Coming Soon)",
      icon: RocketLaunchIcon,
      steps: [
        {
          title: null,
          items: [
            "Select a Strategy from Your Account",
            "Connect Your Broker (support launching soon)",
            "Deploy with One Click — strategy runs live exactly as tested.",
          ],
        },
      ],
    },
    {
      title: "5. Advanced Features",
      icon: SettingsIcon,
      steps: [
        {
          title: null,
          items: [
            "Custom Data Sources (coming soon): Upload your own market data.",
            "Unlimited Backtests: No restrictions on runs for last 2 years of data.",
            "Scalable Instruments: New instruments added as data becomes available.",
          ],
        },
      ],
    },
    {
      title: "6. Tips for Best Results",
      icon: LightbulbIcon,
      steps: [
        {
          title: null,
          items: [
            "Always run multiple variations to optimize parameters.",
            "Save a 'base' version of your strategy for quick reversion.",
            "Use backtest history to monitor long-term consistency.",
          ],
        },
      ],
    },
  ],
};