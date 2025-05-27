import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { type Order } from '../types/models';

const ResultGraph = ({ orders, initialCapital }: { orders: Order[], initialCapital: number }) => {
  const data = orders.map((o, i) => ({
    time: new Date(o.entry_time).toLocaleString(),
    value: initialCapital - orders.slice(0, i + 1).reduce((sum, o) => sum + o.entry_price * o.quantity * (o.transaction_type === 'BUY' ? 1 : -1), 0),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="time" hide={true} />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#8884d8" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ResultGraph;