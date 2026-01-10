import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { Suspense } from "react";

import allRoutes from "./routes/allRoutes";
import ProtectedLayout from "./components/Layout/ProtectedLayout";
import { ClerkErrorBoundary } from "./components/Layout/ClerkErrorBoundary";

export default function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<div style={{padding: '40px', textAlign: 'center'}}>Loading...</div>}>
          <Routes>
            {allRoutes.map(({ path, Component, public: isPublic, requiresClerkFallback }) => {
              // Create element with error boundary for Clerk-dependent pages
              let element = requiresClerkFallback ? (
                <ClerkErrorBoundary fallback={<div style={{padding: '40px', textAlign: 'center'}}>Welcome to Turbo Trade</div>}>
                  <Component />
                </ClerkErrorBoundary>
              ) : (
                <Component />
              );
              
              // Wrap with ProtectedLayout if not public
              if (!isPublic) {
                element = <ProtectedLayout>{element}</ProtectedLayout>;
              }
              
              return (
                <Route 
                  key={path} 
                  path={path} 
                  element={element} 
                />
              );
            })}
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}
