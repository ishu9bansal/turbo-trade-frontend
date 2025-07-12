import BacktestForm from "../components/BacktestForm";
import ContractScatterPlot from "../pages/PlotPage";
import HistoryViewer from "../pages/HistoryPage";
import LandingPage from "../pages/LandingPage";

const allRoutes = [
  {
    path: "/",
    element: <LandingPage />,
    label: "Home",
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