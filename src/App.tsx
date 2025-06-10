import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BacktestForm from "./components/BacktestForm";
import Layout from "./components/Layout";
import ContractScatterPlot from "./components/ContractScatterPlot";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/backtest"
            element={
              <ProtectedRoute>
                <BacktestForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/plot"
            element={
              <ProtectedRoute>
                <ContractScatterPlot />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}
