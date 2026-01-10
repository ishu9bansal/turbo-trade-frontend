import type { PropsWithChildren } from "react";
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

export default function ProtectedLayout({children}: PropsWithChildren){
    // Always call hooks at the top level
    const { isSignedIn, isLoaded } = useUser();
    
    // Show loader while checking auth status
    if (!isLoaded) return null;
    
    // Redirect to home if not signed in
    return isSignedIn ? <>{children}</> : <Navigate to="/" />;
}