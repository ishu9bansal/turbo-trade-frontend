import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import StrategyCard from "../components/StrategyCard";
import { getStrategyHistory } from "../api/backtest" // ✅ Adjust path if needed

const HistoryPage = () => {
    const [strategies, setStrategies] = useState([]);

    useEffect(() => {
        const fetchStrategies = async () => {
            const data = await getStrategyHistory();
            setStrategies(data);
        };

        fetchStrategies();
    }, []);

    console.log(strategies)

    return (
        <Box p={4}>
            <Typography variant="h4" gutterBottom>
                Your Strategy History
            </Typography>
            <Grid container spacing={2}>
                {strategies.map((strategy) => (
                    <Grid item xs={12} sm={6} md={4} key={strategy?.id}>
                        <StrategyCard strategy={strategy} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default HistoryPage;
