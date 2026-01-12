import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { PremiumSnapshot } from '../types/straddle';
import { StraddleDataSimulator } from '../utils/apiServiceSimulator';

interface StraddleState {
  data: PremiumSnapshot[];
  fetchDeltData: (lastTimestamp: number | null) => Promise<PremiumSnapshot[]>;
}

const today = new Date();
const defaultStartTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 30, 0, 0);
const defaultSimulator = new StraddleDataSimulator(defaultStartTime);
const fetchDeltData = defaultSimulator.fetchDeltaData.bind(defaultSimulator);
const initialState: StraddleState = {
  data: [],
  fetchDeltData,
};

const straddleSlice = createSlice({
  name: 'straddle',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<PremiumSnapshot[]>) => {
      state.data = action.payload;
    },
    addSnapshots: (state, action: PayloadAction<PremiumSnapshot[]>) => {
      state.data = state.data.concat(action.payload);
    },
    clearData: (state) => {
      state.data = [];
    },
    setFetcher: (state, action: PayloadAction<() => Promise<PremiumSnapshot[]>>) => {
      state.fetchDeltData = action.payload;
    },
  },
});

export const { setData, addSnapshots, clearData, setFetcher } = straddleSlice.actions;
export default straddleSlice.reducer;
export const selectData = (state: { straddle: StraddleState }) => state.straddle.data;
export const selectFetcher = (state: { straddle: StraddleState }) => state.straddle.fetchDeltData;
