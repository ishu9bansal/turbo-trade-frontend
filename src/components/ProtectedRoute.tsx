// components/ProtectedRoute.tsx
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
    const { isSignedIn, isLoaded } = useUser();

    if (!isLoaded) return null; // Optionally show loader

    return isSignedIn ? <>{children}</> : <Navigate to="/" />;
}
