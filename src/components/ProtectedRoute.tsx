// components/ProtectedRoute.tsx
import React, {type JSX } from "react";
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

// Higher Order Component
export default function ProtectedRoute<P extends JSX.IntrinsicAttributes>(
    Component: React.ComponentType<P>
) {
    return function ProtectedComponent(props: P) {
        const { isSignedIn, isLoaded } = useUser();

        if (!isLoaded) return null; // Show a loader if needed

        return isSignedIn ? <Component {...props} /> : <Navigate to="/" />;
    };
}