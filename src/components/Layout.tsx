import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Tabs,
  Tab,
} from "@mui/material";
import { type PropsWithChildren, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        {children}
      </Container>
    </>
  );
}
