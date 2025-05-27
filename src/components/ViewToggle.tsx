import { ToggleButtonGroup, ToggleButton } from '@mui/material';

const ViewToggle = ({ view, setView }: { view: 'table' | 'graph', setView: (v: 'table' | 'graph') => void }) => (
  <ToggleButtonGroup value={view} exclusive onChange={(_, val) => val && setView(val)} sx={{ my: 2 }}>
    <ToggleButton value="table">Table View</ToggleButton>
    <ToggleButton value="graph">Graph View</ToggleButton>
  </ToggleButtonGroup>
);

export default ViewToggle;
