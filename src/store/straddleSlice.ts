import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { StraddleState, PremiumSnapshot } from '../types/straddle';

const initialState: StraddleState = {
  data: [],
  isSimulating: false,
};

const straddleSlice = createSlice({
  name: 'straddle',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<PremiumSnapshot[]>) => {
      state.data = action.payload;
    },
    addSnapshot: (state, action: PayloadAction<PremiumSnapshot>) => {
      state.data.push(action.payload);
    },
    clearData: (state) => {
      state.data = [];
    },
    setSimulating: (state, action: PayloadAction<boolean>) => {
      state.isSimulating = action.payload;
    },
  },
});

export const { setData, addSnapshot, clearData, setSimulating } = straddleSlice.actions;
export default straddleSlice.reducer;
