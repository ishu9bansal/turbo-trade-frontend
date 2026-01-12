import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addSnapshots, selectData, selectFetcher } from "../store/straddleSlice";

export function useStraddleFetch() {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectData);
  const fetchDeltaData = useAppSelector(selectFetcher);
  const lastTimestamp = data.length > 0 ? data[data.length - 1].timestamp : null;
  const fetcher = useCallback(async () => {
    const newData = await fetchDeltaData(lastTimestamp);
    dispatch(addSnapshots(newData));
  }, [fetchDeltaData, lastTimestamp]);
  return fetcher;
}
