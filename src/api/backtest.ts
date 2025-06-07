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

export async function getConfig(): Promise<BacktestFormData> {
  try {
    const url = `${BASE_URL}/config`;
    const response = await axios.get<BacktestFormData>(url);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching config:", error);
    // throw new Error(error?.response?.data?.detail || "Unknown error");
    return DEFAULT_FORM_DATA;
  }
}
