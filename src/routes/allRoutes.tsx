import BacktestForm from "../components/BacktestForm";
import ContractScatterPlot from "../components/ContractScatterPlot";
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
    path: "/plot",
    element: <ContractScatterPlot />,
    label: "Plot",
    public: false
  },
];

export default allRoutes;