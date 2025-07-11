import { Box, Typography, Button, Paper } from '@mui/material';

const StrategyBuilder = () => {
    return (
        <Paper sx={{ bgcolor: 'white', color: 'black', p: 4, mx: 'auto', maxWidth: 500, border: '1px solid orange', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>Strategy Builder</Typography>
            <Box mb={2}>Log Configuration: <Typography component="span">BUY CE</Typography></Box>
            <Button variant="contained" sx={{ background: 'linear-gradient(to right, #f857a6, #ff5858)', mt: 2 }}>Run Backtest</Button>
        </Paper>
    );
};

export default StrategyBuilder;