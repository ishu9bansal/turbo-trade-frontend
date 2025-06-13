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
import { type PropsWithChildren } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react';
import publicRoutes from "../../routes/publicRoutes";
import protectedRoutes from "../../routes/protectedRoutes";
import {
  appBarStyles,
  toolbarStyles,
  titleStyles,
  tabsStyles,
  authBoxStyles,
  containerStyles,
  userButtonStyle
} from "./Layout.styles";

export default function Layout({ children }: PropsWithChildren) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();
  // const { getToken } = useAuth();
  console.log(user);

  // const saveToken = getToken().then(data=> console.log(data));

  // console.log(saveToken);

  const allTabs = isSignedIn
    ? [...publicRoutes, ...protectedRoutes]
    : publicRoutes;

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    navigate(newValue); // newValue is now pathname
  };

  return (
    <>
      <AppBar sx={appBarStyles}>
        <Toolbar sx={toolbarStyles}>
          <Typography variant="h6" sx={titleStyles}>
            Turbo Trade - Backtest Dashboard
          </Typography>
          <Tabs
            value={location.pathname}
            onChange={handleChange}
            textColor="inherit"
            indicatorColor="secondary"
            sx={tabsStyles}
          >
            {allTabs.map((tab, index) => (
              <Tab key={index} label={tab.label} value={tab.path} />
            ))}
          </Tabs>
          <Box sx={authBoxStyles}>
            <SignedOut>
              <SignInButton mode="modal">
                <Button sx={{ color: 'white'}} >
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal" >
                <Button sx={{ color: 'white' }} >
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <UserButton
                appearance={userButtonStyle}
              />
            </SignedIn>
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={containerStyles}>
        {children}
      </Container>
    </>
  );
}
