import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Tabs,
  Tab,
  Box
} from "@mui/material";
import { type PropsWithChildren, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

export default function Layout({ children }: PropsWithChildren) {
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);

  useEffect(() => {
    // Update the selected tab based on current path
    if (location.pathname === "/") setTab(0);
    else if (location.pathname === "/plot") setTab(1);
  }, [location.pathname]);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
    if (newValue === 0) navigate("/");
    else if (newValue === 1) navigate("/plot");
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Turbo Trade - Backtest Dashboard
          </Typography>
          <Tabs value={tab} onChange={handleChange} textColor="inherit" indicatorColor="secondary">
            <Tab label="Home" />
            <Tab label="Plot" />
          </Tabs>
          <Box sx={{ color:"black", display: 'flex', alignItems: 'center', gap: 2 }}>
            <SignedOut>
              <SignInButton
                mode="modal"
                appearance={{
                  elements: {
                    button: {
                      background: 'transparent',
                      color: 'white',
                      fontWeight: 500,
                      fontSize: '0.875rem',
                      padding: '6px 12px',
                      minWidth: '48px',
                      minHeight: '48px',
                      textTransform: 'none',
                      border: 'none',
                      borderRadius: 0,
                      transition: 'background-color 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.12)',
                      },
                      '&:focus': {
                        outline: 'none',
                      },
                    },
                  },
                }}
              />
            </SignedOut>

            <SignedIn>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: {
                      width: '32px',
                      height: '32px',
                      borderRadius: '4px',
                      '&:hover': {
                        outline: '2px solid rgba(255,255,255,0.4)',
                      },
                    },
                  },
                }}
              />
            </SignedIn>
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        {children}
      </Container>
    </>
  );
}
