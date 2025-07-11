import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";

import allRoutes from "./routes/allRoutes";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {allRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </Layout>
    </Router>
  );
}
