import { motion } from "framer-motion";
import { Button, Container, Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { FEATURES } from "../types/landingPageData";
import { useAuth, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { indigo, yellow } from "@mui/material/colors";

export default function LandingPage() {
  const features = FEATURES;
  const { isSignedIn } = useAuth();
  const { openSignUp } = useClerk();
  const navigate = useNavigate();
  const handleGetStarted = () => {
    if (!isSignedIn) {
      openSignUp();
      return;
    }
    navigate("/backtest");
  }

  return (
    <Box sx={{ bgcolor: "grey.50", color: "grey.900" }}>
      {/* Hero Section */}
      <Box
        component="section"
        sx={{
          position: "relative",
          overflow: "hidden",
          bgcolor: "linear-gradient(135deg, #4F46E5, #9333EA)",
          background: "linear-gradient(135deg, #4F46E5, #9333EA)",
          color: "white",
          py: { xs: 12, md: 20 },
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h2" fontWeight="800" gutterBottom sx={{ maxWidth: "700px" }}>
              Trade Options Smarter — Not Harder
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Typography variant="h6" sx={{ maxWidth: "600px", mb: 4 }}>
              Backtest, optimize, and deploy your strategies — all in one platform.
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              size="large"
              sx={{
                bgcolor: yellow[400],
                color: "black",
                fontWeight: 600,
                px: 3,
                "&:hover": { bgcolor: yellow[300] }
              }}
              onClick={handleGetStarted}
            >
              Start Free Backtest →
            </Button>
          </motion.div>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Box component="section" sx={{ py: 15 }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h4" fontWeight="700" align="center" gutterBottom>
              Why Traders Choose Us
            </Typography>
          </motion.div>

          <Grid container spacing={4} sx={{ mt: 6 }}>
            {features.map((feature, idx) => (
              <Grid size={{ xs:12, md:6, lg:4 }} key={idx}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <Card
                    elevation={3}
                    sx={{
                      transition: "box-shadow 0.3s",
                      "&:hover": { boxShadow: 6 }
                    }}
                  >
                    <CardContent sx={{ p: 4, display: "flex", flexDirection: "column" }}>
                      <feature.icon size={40} color="#4F46E5" style={{ marginBottom: "1rem" }} />
                      <Typography variant="h6" fontWeight="600" gutterBottom>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {feature.desc}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Story Pitch Section */}
      <Box component="section" sx={{ bgcolor: "white", py: 15, borderTop: "1px solid #e5e7eb" }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h4" fontWeight="700" gutterBottom>
              Your Complete Options Trading Companion
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Typography
              variant="body1"
              sx={{ maxWidth: "800px", color: "grey.700", mb: 4, lineHeight: 1.7 }}
            >
              Most traders spend their day glued to screens, worrying about market moves, or
              repeating the same tasks — entering and reversing positions, tweaking strategies,
              and hoping they don’t miss an opportunity. Our platform changes that. With our
              proprietary strategy input method, you can describe your trading logic intuitively
              — define your positions, set entry & exit rules, and let the system handle both
              historical testing and live execution with unmatched accuracy.
            </Typography>
          </motion.div>
          <Button
            size="large"
            sx={{
              bgcolor: indigo[600],
              color: "white",
              fontWeight: 600,
              px: 3,
              "&:hover": { bgcolor: indigo[500] }
            }}
            onClick={handleGetStarted}
          >
            Get Started — Trade Without the Stress →
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
