import { configureStore } from '@reduxjs/toolkit';
import straddleReducer from './straddleSlice';

export const store = configureStore({
  reducer: {
    straddle: straddleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
