import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ClerkProvider } from '@clerk/clerk-react'
import TagManager from 'react-gtm-module';
import { Provider } from 'react-redux';
import { store } from './store/store';

TagManager.initialize({
  gtmId: 'G-YR39QYFHDG',
});

const theme = createTheme();

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Check if we have a valid Clerk key (starts with pk_live or pk_test with proper format)
const hasValidClerkKey = PUBLISHABLE_KEY && (
  PUBLISHABLE_KEY.startsWith('pk_live_') || 
  (PUBLISHABLE_KEY.startsWith('pk_test_') && PUBLISHABLE_KEY.length > 20)
);

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  if (hasValidClerkKey) {
    return (
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
        {children}
      </ClerkProvider>
    );
  }
  // Without a valid Clerk key, protected routes won't work but public routes will
  return <>{children}</>;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppWrapper>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </AppWrapper>
    </Provider>
  </React.StrictMode>
);
