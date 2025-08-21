import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";

import allRoutes from "./routes/allRoutes";
import ProtectedLayout from "./components/Layout/ProtectedLayout";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {allRoutes.map(({ path, element, public: isPublic }) => (
            <Route key={path} path={path} element={isPublic ? element: ProtectedLayout({ children: element })} />
          ))}
        </Routes>
      </Layout>
    </Router>
  );
}
