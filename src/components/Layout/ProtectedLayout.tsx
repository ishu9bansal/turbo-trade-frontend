import type { PropsWithChildren } from "react";
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

export default function ProtectedLayout({children}: PropsWithChildren){
    const { isSignedIn, isLoaded } = useUser();
    if (!isLoaded) return null; // Show a loader if needed
    return isSignedIn ? <>{children}</> : <Navigate to="/" />;
}