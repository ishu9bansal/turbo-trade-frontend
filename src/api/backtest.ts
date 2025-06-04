import axios from "axios";
import { type BacktestFormData } from "../types/orchestrator";

// Define the shape of the API response
export interface BacktestResponse {
  status: "success";
  data: Record<string, any>; // You can narrow this further once format stabilizes
  initial_capital: number;
}

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export async function postBacktest(config: BacktestFormData): Promise<BacktestResponse> {
  try {
    const url = `${BASE_URL}/backtest`;
    const response = await axios.post<BacktestResponse>(url, config);
    return response.data;
  } catch (error: any) {
    console.error("Error during backtest:", error);
    throw new Error(error?.response?.data?.detail || "Unknown error");
  }
}
