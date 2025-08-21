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
      title: "Getting Started",
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
      title: "Creating Your First Strategy",
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
      title: "Backtesting Your Strategy",
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
      title: "Deploying Live (Coming Soon)",
      icon: RocketLaunchIcon,
      steps: [
        {
          title: "Select a Strategy from Your Account",
          items: [],
        },
        {
          title: "Connect Your Broker (support launching soon)",
          items: [],
        },
        {
          title: "Deploy with One Click — strategy runs live exactly as tested.",
          items: [],
        },
      ],
    },
  ],
};

export const TIPS_AND_TRICKS = {
  title: "Tips & Tricks",
  sections: [
    {
      title: "Advanced Features",
      icon: SettingsIcon,
      items: [
        "Custom Data Sources (coming soon): Upload your own market data.",
        "Unlimited Backtests: No restrictions on runs for last 2 years of data.",
        "Scalable Instruments: New instruments added as data becomes available.",
      ],
    },
    {
      title: "Tips for Best Results",
      icon: LightbulbIcon,
      items: [
        "Always run multiple variations to optimize parameters.",
        "Save a 'base' version of your strategy for quick reversion.",
        "Use backtest history to monitor long-term consistency.",
      ],
    },
  ],
};

export const GUIDE = {
  title: "Position Philosophy in Options Trading",
  sections: [
    {
      title: "1. Core Philosophy of a Position",
      steps: [
        {
          title: "At any given moment, there exists an **ideal position** in the market — one that is determined relative to the *current strike* of the underlying asset. This ideal position serves as the foundation of your strategy.",
          items: [],
        },
      ],
    },
    {
      title: "2. Intraday Strategy Approach",
      steps: [
        {
          title: " - Typically, in an intraday strategy, you enter a position and hold it until the end of the trading day.",
          items: [],
        },
        {
          title: " - The primary objective is to **capture and eat the premium** as the position is exited by the market close.",
          items: [],
        },
      ],
    },
    {
      title: "3. When the Market Moves",
      steps: [
        {
          title: "- The market is dynamic. If it moves significantly, your \"ideal\" position can drift far from your current holdings.",
          items: [],
        },
        {
          title: "- In such cases, it may be more profitable to **readjust your position** to align with the updated ideal position.",
          items: [],
        },
      ],
    },
    {
      title: "4. Readjustment = Exit + Entry",
      steps: [
        {
          title: "Readjustment can be visualized as:",
          items: [
            "Exiting your current position.",
            "Entering a new position that matches the updated ideal.",
          ],
        },
        {
          title: "This process can occur multiple times intraday depending on your conditions.",
          items: [],
        },
      ],
    },
    {
      title: "5. Defining Entry & Exit Conditions",
      steps: [
        {
          title: "Entry and exit triggers are fully customizable:",
          items: [
            "Market signals (e.g., trend reversals, momentum indicators)",
            "Stop-loss or profit targets",
            "Volatility checks",
            "Fixed time intervals",
            "Position shift limits (e.g., max 5 shifts/day)",
          ],
        },
        {
          title: "These rules define your unique variant of the base strategy.",
          items: [],
        },
      ],
    },
    {
      title: "6. Automation of Your Style",
      steps: [
        {
          title: "By setting your own rules, the system can execute your strategy automatically.",
          items: [],
        },
        {
          title: "This ensures:",
          items: [
            "no emotional decision-making",
            "precise alignment with your tested strategy",
            "consistency in execution",
          ],
        },
      ],
    },
    {
      title: "7. Key Benefits of the Position Philosophy",
      steps: [
        {
          title: "Flexibility, Customization, Scalability, Confidence",
          items: [
            "Flexibility to adapt to changing market conditions in real-time.",
            "Customization to fine-tune to your risk appetite.",
            "Scalability across Nifty, BankNifty, FinNifty, and future instruments.",
            "Confidence knowing the same strategy is used for backtesting and live execution — no mismatch."
          ],
        },
      ],
    },
  ],
};
