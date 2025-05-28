import { AppBar, Toolbar, Typography, Container } from "@mui/material";
import { type PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Turbo Trade - Backtest Dashboard</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        {children}
      </Container>
    </>
  );
}
