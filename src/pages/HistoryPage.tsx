import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import StrategyCard from "../components/StrategyCard";
import { getBacktestHistory } from "../api/backtest"
import { useAuth } from "@clerk/clerk-react";
import ProtectedRoute from "../components/ProtectedRoute";

const HistoryPage = () => {
    const [strategies, setStrategies] = useState([]);
    const { getToken } = useAuth()

    useEffect(() => {
        const fetchStrategies = async () => {
            const freshToken = await getToken();
            if (!freshToken) throw new Error("Unable to get authentication token.");

            const data = await getBacktestHistory(freshToken);
            setStrategies(data);
        };

        fetchStrategies();
    }, [getToken]);

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

export default ProtectedRoute(HistoryPage);
