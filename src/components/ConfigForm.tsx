import { useState } from 'react';
import { Button, TextField, Grid, MenuItem } from '@mui/material';

const days = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
const optionTypes = ['CALL', 'PUT'];
const transactionTypes = ['BUY', 'SELL'];
const frequencies = ['WEEKLY', 'MONTHLY'];

const ConfigForm = ({ onSubmit }: { onSubmit: (config: any) => void }) => {
  const [form, setForm] = useState<any>({});

  const handleChange = (field: string) =>
    (e: any) => setForm({ ...form, [field]: e.target.value });

  const handleNestedChange = (path: string[]) =>
    (e: any) => {
      const newForm = { ...form };
      let ref = newForm;
      for (let i = 0; i < path.length - 1; i++) ref = ref[path[i]] ||= {};
      ref[path[path.length - 1]] = e.target.value;
      setForm(newForm);
    };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={6}><TextField label="Start Date" type="date" fullWidth onChange={handleChange('start_date')} InputLabelProps={{ shrink: true }} /></Grid>
        <Grid item xs={6}><TextField label="End Date" type="date" fullWidth onChange={handleChange('end_date')} InputLabelProps={{ shrink: true }} /></Grid>
        <Grid item xs={6}><TextField label="Capital" type="number" fullWidth onChange={handleChange('capital')} /></Grid>
        <Grid item xs={6}><TextField label="Lot Size" type="number" fullWidth onChange={handleChange('lot_size')} /></Grid>
        <Grid item xs={6}><TextField label="Entry Time" type="time" fullWidth onChange={handleNestedChange(['position', 'entry', 'time'])} /></Grid>
        <Grid item xs={6}><TextField label="Exit Time" type="time" fullWidth onChange={handleNestedChange(['position', 'exit', 'time'])} /></Grid>
        <Grid item xs={6}><TextField label="Exit Movement" type="number" fullWidth onChange={handleNestedChange(['position', 'exit', 'movement'])} /></Grid>
        <Grid item xs={6}><TextField label="Per Day Threshold" type="number" fullWidth onChange={handleNestedChange(['position', 'per_day_positions_threshold'])} /></Grid>
        <Grid item xs={6}><TextField label="Symbol" fullWidth onChange={handleNestedChange(['position', 'focus', 'symbol'])} /></Grid>
        <Grid item xs={6}><TextField label="Step" type="number" fullWidth onChange={handleNestedChange(['position', 'focus', 'step'])} /></Grid>
        <Grid item xs={6}><TextField label="Expiry Day" select fullWidth onChange={handleNestedChange(['position', 'focus', 'expiry', 'weekday'])}>{days.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}</TextField></Grid>
        <Grid item xs={6}><TextField label="Frequency" select fullWidth onChange={handleNestedChange(['position', 'focus', 'expiry', 'frequency'])}>{frequencies.map(f => <MenuItem key={f} value={f}>{f}</MenuItem>)}</TextField></Grid>
        <Grid item xs={6}><TextField label="Strike Offset" type="number" fullWidth onChange={handleNestedChange(['position', 'legs', 0, 'strike', 'offset'])} /></Grid>
        <Grid item xs={6}><TextField label="Option Type" select fullWidth onChange={handleNestedChange(['position', 'legs', 0, 'type'])}>{optionTypes.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}</TextField></Grid>
        <Grid item xs={6}><TextField label="Transaction" select fullWidth onChange={handleNestedChange(['position', 'legs', 0, 'transaction'])}>{transactionTypes.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}</TextField></Grid>
        <Grid item xs={12}><Button type="submit" variant="contained" color="primary">Run Backtest</Button></Grid>
      </Grid>
    </form>
  );
};

export default ConfigForm;
