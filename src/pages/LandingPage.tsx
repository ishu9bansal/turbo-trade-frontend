import { Box } from '@mui/material';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import StrategyBuilder from '../components/StrategyBuilder';

const LandingPage = () => {
    return (
        <Box bgcolor="#white" minHeight="100vh">
            <HeroSection />
            <FeaturesSection />
            <Box display="flex" justifyContent="center" mt={4}>
                <StrategyBuilder />
            </Box>
        </Box>
    );
};

export default LandingPage;