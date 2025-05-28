import axios from "axios";
import { type BacktestFormData } from "../types/orchestrator";

// Define the shape of the API response
export interface BacktestResponse {
  status: "success";
  data: Record<string, any>; // You can narrow this further once format stabilizes
  initial_capital: number;
}

export async function postBacktest(config: BacktestFormData): Promise<BacktestResponse> {
  try {
    const response = await axios.post<BacktestResponse>(
      "https://turbo-trade.onrender.com/backtest",
      config
    );
    return response.data;
  } catch (error: any) {
    console.error("Error during backtest:", error);
    throw new Error(error?.response?.data?.detail || "Unknown error");
  }
}
