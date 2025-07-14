import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Tabs,
  Tab,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import { type PropsWithChildren } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser
} from '@clerk/clerk-react';
import allRoutes from "../../routes/allRoutes";
import {
  appBarStyles,
  toolbarStyles,
  titleStyles,
  tabsStyles,
  authBoxStyles,
  containerStyles,
  userButtonStyle
} from "./Layout.styles";
import { FormProvider } from "../../context/context";
import { getConfig } from "../../api/backtest";
import { DEFAULT_FORM_DATA } from "../../types/constants";
import type { BacktestFormData } from "../../types/orchestrator";

export default function Layout({ children }: PropsWithChildren) {
  const [defaultFormData, setDefaultFormData] = useState<BacktestFormData>(DEFAULT_FORM_DATA);
  const location = useLocation();
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [drawerOpen, setDrawerOpen] = useState(false);
  const currentRoutes = isSignedIn ? allRoutes : allRoutes.filter(route => route.public);

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };

  const handleDrawerItemClick = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const onInit = async () => {
    try {
      const defaultValues = await getConfig();
      setDefaultFormData(defaultValues);
    } catch (err: any) {
      alert(err.message);
    }
  };

  useEffect(() => {
    onInit();
  }, []);

  return (
    <FormProvider value={defaultFormData}>
      <AppBar sx={appBarStyles}>
        <Toolbar sx={toolbarStyles}>
          <Typography variant="h6" sx={titleStyles}>
            Turbo Trade
          </Typography>

          {isSmallScreen ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setDrawerOpen(true)}
                sx={{ ml: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
              >
                <Box
                  sx={{ width: 250 }}
                  role="presentation"
                  onClick={() => setDrawerOpen(false)}
                  onKeyDown={() => setDrawerOpen(false)}
                >
                  <List>
                    {currentRoutes.map((tab, index) => (
                      <ListItem key={index} disablePadding>
                        <ListItemButton onClick={() => handleDrawerItemClick(tab.path)}>
                          <ListItemText primary={tab.label} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <Tabs
              value={location.pathname}
              onChange={handleTabChange}
              textColor="inherit"
              indicatorColor="secondary"
              sx={tabsStyles}
              variant="scrollable"
              scrollButtons="auto"
            >
              {currentRoutes.map((tab, index) => (
                <Tab key={index} label={tab.label} value={tab.path} />
              ))}
            </Tabs>
          )}

          <Box sx={authBoxStyles}>
            <SignedOut>
              <SignInButton mode="modal">
                <Button sx={{ color: 'white' }}>
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button sx={{ color: 'white' }}>
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton appearance={userButtonStyle} />
            </SignedIn>
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={containerStyles}>
        {children}
      </Container>
    </FormProvider>
  );
}
