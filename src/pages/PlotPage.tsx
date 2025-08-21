import React, { useEffect, useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import { getContracts } from "../api/backtest"; // adjust path if needed
import type { Contract } from "../types/types";
import ContainerLayout from "../components/Layout/ContainerLayout";

const ContractScatterPlot: React.FC = () => {
  const [data, setData] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const contracts = await getContracts();
        setData(contracts);
      } catch (error) {
        console.error("Failed to load contracts", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Map contract data to chart format
  const ceData = data
    .filter((c) => c.type === "CE")
    .map((c) => ({
      x: dayjs(c.expiry).valueOf(),
      y: c.strike,
      id: c.id,
    }));

  const peData = data
    .filter((c) => c.type === "PE")
    .map((c) => ({
      x: dayjs(c.expiry).valueOf(),
      y: c.strike,
      id: c.id,
    }));

  if (loading) return <div>Loading contracts...</div>;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
        <CartesianGrid />
        <XAxis
          type="number"
          dataKey="x"
          name="Expiry"
          domain={["auto", "auto"]}
          tickFormatter={(ts) => dayjs(ts).format("YY MMM")}
          tick={{ fontSize: 12 }}
        />
        <YAxis
          type="number"
          dataKey="y"
          name="Strike"
          domain={["auto", "auto"]}
          tick={{ fontSize: 12 }}
        />
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          formatter={(value, name) =>
            name === "Expiry" ? dayjs(value as number).format("YYYY-MM-DD") : value
          }
          labelFormatter={() => ""}
        />
        <Legend />
        <Scatter name="Call (CE)" data={ceData} fill="#8884d8" fillOpacity={0.2} />
        <Scatter name="Put (PE)" data={peData} fill="#82ca9d" fillOpacity={0.2} />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default function WithContainerLayout() {
  return (
    <ContainerLayout>
      <ContractScatterPlot />
    </ContainerLayout>
  );
}
