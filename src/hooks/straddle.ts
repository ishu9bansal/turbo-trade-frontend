import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addSnapshots, selectData } from "../store/straddleSlice";
import { StraddleDataSimulator } from "../utils/apiServiceSimulator";

const today = new Date();
const defaultStartTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 30, 0, 0);
const defaultSimulator = new StraddleDataSimulator(defaultStartTime);

export function useStraddleFetch() {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectData);
  const lastTimestamp = data.length > 0 ? data[data.length - 1].timestamp : null;
  const fetcher = useCallback(async () => {
    const newData = await defaultSimulator.fetchDeltaData(lastTimestamp);
    dispatch(addSnapshots(newData));
  }, [lastTimestamp]);
  return fetcher;
}
