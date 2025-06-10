import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Tabs,
  Tab,
  Box,
  Button
} from "@mui/material";
import { type PropsWithChildren, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react';

export default function Layout({ children }: PropsWithChildren) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const [tab, setTab] = useState(0);

  useEffect(() => {
    // Update the selected tab based on current path
    if (location.pathname === "/") setTab(0);
    else if (location.pathname === "/backtest") setTab(1);
    else if (location.pathname === "/plot") setTab(2);
  }, [location.pathname]);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
    if (newValue === 0) navigate("/");
    else if (newValue === 1) navigate("/backtest");
    else if (newValue === 2) navigate("/plot")
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Turbo Trade - Backtest Dashboard
          </Typography>
          <Tabs value={tab} onChange={handleChange} textColor="inherit" indicatorColor="secondary">
            <Tabs value={tab} onChange={handleChange} textColor="inherit" indicatorColor="secondary">
            <Tab label="Home" />
            {isSignedIn && <Tab label="BackTest" />}
            {isSignedIn && <Tab label="Plot" />}
          </Tabs>
          </Tabs>
          <Box sx={{ color: "black", display: 'flex', alignItems: 'center', gap: 2 }}>
            <SignedOut>
              <SignInButton mode="modal">
                <Button
                  sx={{ color: 'white'}}
                >
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton
                mode="modal"
              >
                <Button
                  sx={{ color: 'white' }}
                >
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: {
                      width: '32px',
                      height: '32px',
                      borderRadius: "100%",
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
