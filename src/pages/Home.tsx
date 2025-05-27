import { useState } from 'react';
import ConfigForm from '../components/ConfigForm';
import ResultTable from '../components/ResultTable';
import ResultGraph from '../components/ResultGraph';
import ViewToggle from '../components/ViewToggle';
import { runBacktest } from '../api/backtest';
import { type Order } from '../types/models';
import Container from '@mui/material/Container';

const Home = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [initialCapital, setInitialCapital] = useState<number>(0);
  const [view, setView] = useState<'table' | 'graph'>('table');

  const handleSubmit = async (config: any) => {
    const response = await runBacktest(config);
    if (response.status === 'success') {
      setOrders(Object.values(response.data));
      setInitialCapital(response.initial_capital);
    }
  };

  return (
    <Container maxWidth="md">
      <h1>Turbo Trade Backtest</h1>
      <ConfigForm onSubmit={handleSubmit} />
      <ViewToggle view={view} setView={setView} />
      {view === 'table' ? (
        <ResultTable orders={orders} />
      ) : (
        <ResultGraph orders={orders} initialCapital={initialCapital} />
      )}
    </Container>
  );
};

export default Home;
