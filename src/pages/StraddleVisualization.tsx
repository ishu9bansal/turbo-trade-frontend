import React, { useEffect, useRef } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setData, addSnapshot, setSimulating } from '../store/straddleSlice';
import { loadStraddleData, saveStraddleData, clearStraddleData } from '../utils/localStorage';
import { StraddleDataSimulator } from '../utils/dataSimulator';
import ContainerLayout from '../components/Layout/ContainerLayout';
import { Box, Button, Typography, Paper } from '@mui/material';

const StraddleVisualization: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, isSimulating } = useAppSelector((state) => state.straddle);
  const simulatorRef = useRef<StraddleDataSimulator | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = loadStraddleData();
    if (savedData.length > 0) {
      dispatch(setData(savedData));
    }
  }, [dispatch]);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (data.length > 0) {
      saveStraddleData(data);
    }
  }, [data]);

  // Initialize simulator and start simulation
  const startSimulation = () => {
    if (!simulatorRef.current) {
      simulatorRef.current = new StraddleDataSimulator(19750);
      
      // Generate initial historical data
      const initialData = simulatorRef.current.generateInitialData(360);
      dispatch(setData(initialData));
    }

    dispatch(setSimulating(true));

    // Start polling every 5 seconds to add new data points
    intervalRef.current = setInterval(() => {
      if (simulatorRef.current) {
        const newSnapshot = simulatorRef.current.generateNextSnapshot();
        dispatch(addSnapshot(newSnapshot));
      }
    }, 5000);
  };

  // Stop simulation
  const stopSimulation = () => {
    dispatch(setSimulating(false));
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Reset and clear all data
  const resetData = () => {
    stopSimulation();
    dispatch(setData([]));
    clearStraddleData();
    simulatorRef.current = null;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Transform data for Recharts
  const chartData = data.map((snapshot) => ({
    time: snapshot.timestamp,
    spotPrice: snapshot.spotPrice,
    'Strike -3': snapshot.premiums['-3'],
    'Strike -2': snapshot.premiums['-2'],
    'Strike -1': snapshot.premiums['-1'],
    'Strike 0 (ATM)': snapshot.premiums['0'],
    'Strike +1': snapshot.premiums['1'],
    'Strike +2': snapshot.premiums['2'],
    'Strike +3': snapshot.premiums['3'],
  }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{name: string; value: number; color: string; payload?: {time: string}}>}) => {
    if (active && payload && payload.length) {
      return (
        <Paper
          sx={{
            padding: 2,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <Typography variant="body2" sx={{ color: '#fff', marginBottom: 1 }}>
            Time: {payload[0]?.payload?.time}
          </Typography>
          {payload.map((entry, index: number) => (
            <Typography
              key={index}
              variant="body2"
              sx={{ color: entry.color, fontSize: '0.85rem' }}
            >
              {entry.name}: {entry.name === 'Spot Price' ? '₹' : '₹'}
              {entry.value.toFixed(2)}
            </Typography>
          ))}
        </Paper>
      );
    }
    return null;
  };

  return (
    <ContainerLayout>
      <Box sx={{ padding: 3 }}>
        {/* Header */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h4" sx={{ color: '#fff', marginBottom: 1 }}>
            Intraday Straddle Premium Visualization
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Monitor combined option premiums (Call + Put) across nearby strikes with spot price context
          </Typography>
        </Box>

        {/* Controls */}
        <Box sx={{ marginBottom: 3, display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={startSimulation}
            disabled={isSimulating}
          >
            {data.length === 0 ? 'Start Simulation' : 'Resume Simulation'}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={stopSimulation}
            disabled={!isSimulating}
          >
            Pause Simulation
          </Button>
          <Button variant="outlined" color="error" onClick={resetData}>
            Reset Data
          </Button>
        </Box>

        {/* Chart */}
        <Paper
          sx={{
            padding: 3,
            backgroundColor: '#1a1a1a',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {data.length === 0 ? (
            <Box
              sx={{
                height: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                Click "Start Simulation" to begin monitoring
              </Typography>
            </Box>
          ) : (
            <ResponsiveContainer width="100%" height={600}>
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 80, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                
                {/* X-axis: Time */}
                <XAxis
                  dataKey="time"
                  stroke="rgba(255, 255, 255, 0.6)"
                  tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 12 }}
                  tickFormatter={(value) => {
                    // Show only HH:MM for cleaner display
                    return value.substring(0, 5);
                  }}
                  interval="preserveStartEnd"
                />
                
                {/* Left Y-axis: Premium (₹) */}
                <YAxis
                  yAxisId="left"
                  stroke="rgba(255, 255, 255, 0.6)"
                  tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 12 }}
                  label={{
                    value: 'Combined Premium (₹)',
                    angle: -90,
                    position: 'insideLeft',
                    style: { fill: 'rgba(255, 255, 255, 0.6)' },
                  }}
                />
                
                {/* Right Y-axis: Spot Price */}
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="rgba(255, 255, 255, 0.4)"
                  tick={{ fill: 'rgba(255, 255, 255, 0.4)', fontSize: 12 }}
                  label={{
                    value: 'Spot Price (₹)',
                    angle: 90,
                    position: 'insideRight',
                    style: { fill: 'rgba(255, 255, 255, 0.4)' },
                  }}
                />
                
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ color: '#fff' }}
                  iconType="line"
                />
                
                {/* Premium Lines - Same color family, varying opacity */}
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="Strike -3"
                  stroke="rgba(99, 179, 237, 0.4)"
                  strokeWidth={1.5}
                  dot={false}
                  name="Strike -3"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="Strike -2"
                  stroke="rgba(99, 179, 237, 0.5)"
                  strokeWidth={1.5}
                  dot={false}
                  name="Strike -2"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="Strike -1"
                  stroke="rgba(99, 179, 237, 0.7)"
                  strokeWidth={2}
                  dot={false}
                  name="Strike -1"
                />
                
                {/* ATM Line - Emphasized */}
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="Strike 0 (ATM)"
                  stroke="rgba(99, 179, 237, 1)"
                  strokeWidth={3}
                  dot={false}
                  name="Strike 0 (ATM)"
                />
                
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="Strike +1"
                  stroke="rgba(99, 179, 237, 0.7)"
                  strokeWidth={2}
                  dot={false}
                  name="Strike +1"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="Strike +2"
                  stroke="rgba(99, 179, 237, 0.5)"
                  strokeWidth={1.5}
                  dot={false}
                  name="Strike +2"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="Strike +3"
                  stroke="rgba(99, 179, 237, 0.4)"
                  strokeWidth={1.5}
                  dot={false}
                  name="Strike +3"
                />
                
                {/* Spot Price Line - Lighter, on right axis */}
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="spotPrice"
                  stroke="rgba(200, 200, 200, 0.5)"
                  strokeWidth={1.5}
                  dot={false}
                  name="Spot Price"
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Paper>

        {/* Info */}
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            <strong>Data Points:</strong> {data.length} | <strong>Status:</strong>{' '}
            {isSimulating ? 'Updating live (every 5s)' : 'Paused'}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: 'rgba(255, 255, 255, 0.5)', display: 'block', marginTop: 1 }}
          >
            Note: This is a simulation with dummy data for prototype purposes. Each strike represents
            combined Call + Put premium. Strike offsets are relative to ATM (±50 points per strike).
          </Typography>
        </Box>
      </Box>
    </ContainerLayout>
  );
};

export default StraddleVisualization;
