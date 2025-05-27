import axios from 'axios';

export const runBacktest = async (config: any) => {
  const res = await axios.post('http://localhost:8000/backtest', config);
  return res.data;
};
