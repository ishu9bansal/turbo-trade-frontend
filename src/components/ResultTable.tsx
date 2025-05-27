import { type Order } from '../types/models';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const ResultTable = ({ orders }: { orders: Order[] }) => (
  <Table size="small">
    <TableHead>
      <TableRow>
        <TableCell>Entry Time</TableCell>
        <TableCell>Price</TableCell>
        <TableCell>Symbol</TableCell>
        <TableCell>Strike</TableCell>
        <TableCell>Option Type</TableCell>
        <TableCell>Transaction</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {orders.map((o, i) => (
        <TableRow key={i}>
          <TableCell>{new Date(o.entry_time).toLocaleString()}</TableCell>
          <TableCell>{o.entry_price}</TableCell>
          <TableCell>{o.contract.symbol}</TableCell>
          <TableCell>{o.contract.strike}</TableCell>
          <TableCell>{o.contract.type}</TableCell>
          <TableCell>{o.transaction_type}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default ResultTable;