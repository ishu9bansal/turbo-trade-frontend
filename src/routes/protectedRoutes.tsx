import BacktestForm from "../components/BacktestForm";
import ContractScatterPlot from "../components/ContractScatterPlot";

const protectedRoutes = [
  {
    path: "/backtest",
    element: <BacktestForm />,
    label: "Backtest",
  },
  {
    path: "/plot",
    element: <ContractScatterPlot />,
    label: "Plot",
  },
];

export default protectedRoutes;
