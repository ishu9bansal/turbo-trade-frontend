import axios from "axios";
import { type BacktestFormData } from "../types/orchestrator";
import { DEFAULT_FORM_DATA } from "../types/constants";
import type { BacktestResult, Contract } from "../types/types";

// Define the shape of the API response
export interface BacktestResponse {
  message: string;
  backtestId: string;
}

export interface BacktestHistoryResponse {
  message: string;
  backtests: BacktestResult[];
}

const NODE_BASE_URL = import.meta.env.VITE_NODE_BACKEND_URL;

export async function postBacktest(config: BacktestFormData, token: string | null): Promise<BacktestResponse> {
  try {
    const url = `${NODE_BASE_URL}/backtests/create`;
    const response = await axios.post<BacktestResponse>(url, config, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error during backtest:", error);
    throw new Error(error?.response?.data?.detail || "Unknown error");
  }
}

export async function getContracts(): Promise<Contract[]> {
  try {
    const url = `${NODE_BASE_URL}/python/contracts`;
    const response = await axios.get<Contract[]>(url);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching contracts:", error);
    throw new Error(error?.response?.data?.detail || "Unknown error");
  }
}

export async function getConfig(): Promise<BacktestFormData> {
  try {
    const url = `${NODE_BASE_URL}/python/config`;
    const response = await axios.get<BacktestFormData>(url);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching config:", error);
    // throw new Error(error?.response?.data?.detail || "Unknown error");
    return DEFAULT_FORM_DATA;
  }
}

export async function fetchHistory(token: string | null): Promise<BacktestHistoryResponse> {
  try {
    const url = `${NODE_BASE_URL}/backtests/user`;
    const response = await axios.get<BacktestHistoryResponse>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching contracts:", error);
    throw new Error(error?.response?.data?.detail || "Unknown error");
  }
}
