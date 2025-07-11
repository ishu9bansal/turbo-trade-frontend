import { Box, Button, Typography } from '@mui/material';

const HeroSection = () => {
    return (
        <Box p={8} bgcolor="white" color="black">
            <Typography variant="h3" fontWeight="bold">TURBO</Typography>
            <Typography variant="h3" fontWeight="bold">TRADE</Typography>
            <Typography variant="h6" mt={3}>Backtesting Engine</Typography>
            <Typography mt={2} mb={4} maxWidth={400}>
                Take control of your option trading journey on the index with our backtesting solution for strategy development and optimization.
            </Typography>
            <Button variant="contained" sx={{ backgroundColor: 'orange', borderRadius: 2, px: 4, py: 1.5, fontWeight: 'bold' }}>
                ↼ Get started
            </Button>
            <Box mt={3}>
                <Typography variant="caption" display="block">★ Nifty Option Expert</Typography>
                <Typography variant="caption" display="block">★ Full Strategy Control</Typography>
                <Typography variant="caption" display="block">★ Zero Risk</Typography>
            </Box>
        </Box>
    );
};

export default HeroSection; 