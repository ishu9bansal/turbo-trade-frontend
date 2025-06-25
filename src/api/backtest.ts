import axios from "axios";
import { type BacktestFormData } from "../types/orchestrator";
import type { Contract, RawOrder } from "../types/types";
import { DEFAULT_FORM_DATA } from "../types/constants";

// Define the shape of the API response
export interface BacktestResponse {
  status: "success";
  data: RawOrder[]; // You can narrow this further once format stabilizes
  initial_capital: number;
}

interface FullResponse {
  message: string;
  backtestId: BacktestResponse;
}

const BASE_URL_2 = import.meta.env.VITE_BACKEND_NODE_URL;


export async function postBacktest(config: BacktestFormData, token: string): Promise<BacktestResponse> {
  try {
    const url_2 = `${BASE_URL_2}/backtests/create`;
    const response = await axios.post<FullResponse>(url_2, config, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    console.log(response.data);
    return response.data.backtestId;
  } catch (error: any) {
    console.error("Error during backtest:", error);
    throw new Error(error?.response?.data?.detail || "Unknown error");
  }
}

export async function getContracts(token:string): Promise<Contract[]> {
  try {
    const url = `${BASE_URL_2}/python/contracts`;
    const response = await axios.get<Contract[]>(url, 
      {
        headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching contracts:", error);
    throw new Error(error?.response?.data?.detail || "Unknown error");
  }
}

export async function getConfig(token:string): Promise<BacktestFormData> {
  try {
    const url = `${BASE_URL_2}/python/config`;
    const response = await axios.get<BacktestFormData>(url,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching config:", error);
    // throw new Error(error?.response?.data?.detail || "Unknown error");
    return DEFAULT_FORM_DATA;
  }
}

export async function getBacktestHistory(token: string) {
  try {
    const url = `${BASE_URL_2}/backtests/user`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const backtests = response.data.backtests; // comes from backend response

    const formatted = backtests.map((item: any) => ({
      id: item._id,
      date: new Date(item.created_at).toISOString().split("T")[0],
      symbol: item.strategy?.position?.focus?.symbol || "N/A",
      type: "Backtest",
      capital: item.strategy?.capital || 0,
      status: item.status || "Unknown"
    }));

    return formatted;

  } catch (error: any) {
    console.error("Failed to fetch strategy history:", error.message);
    return [];
  }
}
