import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BacktestForm from "./components/BacktestForm";
import Layout from "./components/Layout";
import ContractScatterPlot from "./components/ContractScatterPlot"; // Adjust path if needed

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<BacktestForm />} />
          <Route path="/plot" element={<ContractScatterPlot />} />
        </Routes>
      </Layout>
    </Router>
  );
}
