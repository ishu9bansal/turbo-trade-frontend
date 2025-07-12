import { Box } from '@mui/material';
import { FeaturesSection, HeroSection, StrategyBuilder } from '../components/LandingComponents';


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