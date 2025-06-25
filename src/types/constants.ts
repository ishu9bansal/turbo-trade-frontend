export const DEFAULT_FORM_DATA = {
    start_date: "2022-06-01",
    end_date: "2022-06-09",
    capital: 100000,
    lot_size: 50,
    position: {
        entry: { time: "09:17" },
        exit: { time: "15:00", movement: 100 },
        per_day_positions_threshold: 5,
        focus: {
            symbol: "NIFTY" as const,
            step: 50,
            expiry: {
                weekday: 3, // 3 for Thursday
                frequency: "WEEKLY" as const,
            },
        },
        legs: [
            {
                strike: { offset: 0 },
                type: "CE" as const,
                transaction: "SELL" as const,
            },
            {
                strike: { offset: 0 },
                type: "PE" as const,
                transaction: "SELL" as const,
            },
        ],
    },
}