import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { PremiumSnapshot } from '../types/straddle';

interface StraddleState {
  data: PremiumSnapshot[];
}

const initialState: StraddleState = {
  data: [],
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
  },
});

export const { setData, addSnapshots, clearData } = straddleSlice.actions;
export default straddleSlice.reducer;
export const selectData = (state: { straddle: StraddleState }) => state.straddle.data;
