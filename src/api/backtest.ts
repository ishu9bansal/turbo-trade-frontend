import axios from "axios";
import { type BacktestFormData } from "../types/orchestrator";
import type { Contract, RawOrder } from "../types/types";

// Define the shape of the API response
export interface BacktestResponse {
  status: "success";
  data: RawOrder[]; // You can narrow this further once format stabilizes
  initial_capital: number;
}

interface FullResponse {
  message: string;
  tradeResult: BacktestResponse;
}

const BASE_URL = import.meta.env.VITE_BACKEND_PYTHON_URL;
// const BASE_URL_2 = import.meta.env.VITE_BACKEND_NODE_URL;
const BASE_URL_3 = import.meta.env.VITE_API_BASE_URL


export async function postBacktest(config: BacktestFormData, token: string): Promise<BacktestResponse> {
  try {
    const url_1 = `${BASE_URL_3}/backtests?response=success`;
    // const url_2 = `${BASE_URL_3}/api/strategy/add-strategy`;
    const response = await axios.post<FullResponse>(url_1, config, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    console.log(response.data);
    return response.data.tradeResult;
  } catch (error: any) {
    console.error("Error during backtest:", error);
    throw new Error(error?.response?.data?.detail || "Unknown error");
  }
}

export async function getContracts(): Promise<Contract[]> {
  try {
    const url = `${BASE_URL}/contracts/NIFTY`;
    const response = await axios.get<Contract[]>(url);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching contracts:", error);
    throw new Error(error?.response?.data?.detail || "Unknown error");
  }
}

export const getStrategyHistory = async () => {
  try {
    const response = await fetch(`${BASE_URL_3}/backtests`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Transform data into simplified strategy cards
    const formatted = data.history.map((item) => {
      console.log(item);
      const firstOrder = item.results?.orders?.[0] || {};
      console.log(firstOrder)
      return {
        id: item.id,
        date: new Date(item.created_at).toISOString().split("T")[0],
        symbol: firstOrder.contract?.symbol || "N/A",
        type: item?.config?.strategy_name || "Strategy", // fallback if not present
        capital: item?.config?.capital || 0,
        status: item.status || "Unknown",
      };
    });

    return formatted;
  } catch (error) {
    console.error("Failed to fetch strategy history:", error.message);
    return [];
  }
};
