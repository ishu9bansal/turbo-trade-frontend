import BacktestForm from "../pages/InputPage";
import ContractScatterPlot from "../pages/PlotPage";
import HistoryViewer from "../pages/HistoryPage";
import { lazy } from "react";
import HowTo from "../pages/HowTo";
import Guide from "../pages/Guide";
import StraddleVisualization from "../pages/StraddleVisualization";
import type { ComponentType } from "react";

// Lazy load the landing page to avoid calling Clerk hooks during initial load
const LandingPage = lazy(() => import("../pages/LandingPage2"));

// Define routes with component references instead of elements
// This prevents evaluating JSX and calling hooks during module load
const allRoutes: Array<{
  path: string;
  Component: ComponentType;
  label: string;
  public: boolean;
  hideTab?: boolean;
  requiresClerkFallback?: boolean;
}> = [
  {
    path: "/",
    Component: LandingPage,
    label: "Home",
    public: true,
    requiresClerkFallback: true
  },
  {
    path: "/how-to",
    Component: HowTo,
    label: "How to Use",
    public: true
  },
  {
    path: "/guide",
    Component: Guide,
    label: "Guide",
    hideTab: true,
    public: true
  },
  {
    path: "/straddle-visualization",
    Component: StraddleVisualization,
    label: "Straddle Monitor",
    public: true
  },
  {
    path: "/backtest",
    Component: BacktestForm,
    label: "Backtest",
    public: false
  },
  {
    path: "/history",
    Component: HistoryViewer,
    label: "History",
    public: false
  },
  {
    path: "/plot",
    Component: ContractScatterPlot,
    label: "Plot",
    public: false
  },
];

export default allRoutes;