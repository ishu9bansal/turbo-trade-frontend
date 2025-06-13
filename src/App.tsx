import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import protectedRoutes from "./routes/protectedRoutes";
import publicRoutes from "./routes/publicRoutes";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {publicRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
          {protectedRoutes.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={<ProtectedRoute>{element}</ProtectedRoute>}
            />
          ))}
        </Routes>
      </Layout>
    </Router>
  );
}
