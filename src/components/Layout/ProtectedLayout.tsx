import type { PropsWithChildren } from "react";
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

export default function ProtectedLayout({children}: PropsWithChildren){
    try {
        const { isSignedIn, isLoaded } = useUser();
        if (!isLoaded) return null; // Show a loader if needed
        return isSignedIn ? <>{children}</> : <Navigate to="/" />;
    } catch (error) {
        // If Clerk is not properly configured, redirect to home
        console.warn('Clerk authentication not available:', error);
        return <Navigate to="/" />;
    }
}