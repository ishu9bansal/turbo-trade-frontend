import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error boundary to catch Clerk-related errors when Clerk is not available
 */
export class ClerkErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    // Check if it's a Clerk-related error
    if (error.message && error.message.includes('ClerkProvider')) {
      return { hasError: true, error };
    }
    // Re-throw non-Clerk errors
    throw error;
  }

  componentDidCatch(error: Error) {
    // Only silence Clerk-related errors
    if (error.message && error.message.includes('ClerkProvider')) {
      console.warn('Clerk not available - running without authentication');
      // Don't re-throw - this suppresses the error
    } else {
      // Re-throw non-Clerk errors
      throw error;
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }

    return this.props.children;
  }
}
