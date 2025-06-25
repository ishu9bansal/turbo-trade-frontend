import { Card, CardContent, Typography } from "@mui/material";

type Strategy = {
    id: string;
    date: string;
    symbol: string;
    type: string;
    capital: number;
    status: "Completed" | "Failed" | string;
};

const StrategyCard = ({ strategy }: { strategy: Strategy }) => {
    return (
        <Card elevation={3}>
            <CardContent>
                <Typography variant="h6">{strategy.type}</Typography>
                <Typography variant="body2">Date: {strategy.date}</Typography>
                <Typography variant="body2">Symbol: {strategy.symbol}</Typography>
                <Typography variant="body2">Capital: ₹{strategy.capital}</Typography>
                <Typography
                    variant="body2"
                    color={strategy.status === "Completed" ? "green" : "red"}
                >
                    Status: {strategy.status}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default StrategyCard;
