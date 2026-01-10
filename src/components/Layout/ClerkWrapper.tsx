import { useUser, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Button } from '@mui/material';
import { userButtonStyle } from './Layout.styles';

/**
 * Wrapper component that handles Clerk functionality safely
 * Only renders when Clerk is properly configured
 */
export function ClerkUserInfo({ onUserStateChange }: { onUserStateChange?: (isSignedIn: boolean) => void }) {
  const { isSignedIn } = useUser();
  
  // Call callback if provided
  if (onUserStateChange) {
    onUserStateChange(isSignedIn || false);
  }
  
  return null;
}

export function ClerkAuthButtons() {
  return (
    <>
      <SignedOut>
        <SignInButton mode="modal">
          <Button sx={{ color: 'white' }}>
            Sign In
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton appearance={userButtonStyle} />
      </SignedIn>
    </>
  );
}
