import BacktestForm from "../pages/InputPage";
import ContractScatterPlot from "../pages/PlotPage";
import HistoryViewer from "../pages/HistoryPage";
import LandingPage from "../pages/LandingPage2";
import HowTo from "../pages/HowTo";
import Guide from "../pages/Guide";

const allRoutes = [
  {
    path: "/",
    element: <LandingPage />,
    label: "Home",
    public: true
  },
  {
    path: "/how-to",
    element: <HowTo />,
    label: "How to Use",
    public: true
  },
  {
    path: "/guide",
    element: <Guide />,
    label: "Guide",
    hideTab: true,
    public: true
  },
  {
    path: "/backtest",
    element: <BacktestForm />,
    label: "Backtest",
    public: false
  },
  {
    path: "/history",
    element: <HistoryViewer />,
    label: "History",
    public: false
  },
  {
    path: "/plot",
    element: <ContractScatterPlot />,
    label: "Plot",
    public: false
  },
];

export default allRoutes;