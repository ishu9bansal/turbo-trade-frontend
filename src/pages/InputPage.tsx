import {
  Box,
  Grid,
} from "@mui/material";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import ProtectedRoute from "./ProtectedRoute";
import {
  type BacktestFormData,
  backtestSchema,
} from "../types/orchestrator";
import { DEFAULT_FORM_DATA } from "../types/constants";
import { getConfig, getContracts, postBacktest } from "../api/backtest";
import { BacktestConfig, FocusSettings, LegsSection, PositionSettings, SubmitControls } from "../components/BacktestForm";


function BacktestForm() {
  const [loading, setLoading] = useState(false);
  const [disabledDates, setDisabledDates] = useState(false);
  const [dateRange, setDateRange] = useState({ start: "2022-06-01", end: "2022-06-01" });

  const { getToken } = useAuth();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BacktestFormData>({
    resolver: zodResolver(backtestSchema),
    defaultValues: DEFAULT_FORM_DATA,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "position.legs",
  });

  const onSubmit = async (data: BacktestFormData) => {
    setLoading(true);
    try {
      const token = await getToken();
      const response = await postBacktest(data, token);
      alert(`Backtest started with ID: ${response.backtestId}`);
      navigate("/history");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const onError = (errors: any) => {
    console.error("Form errors:", errors);
    alert("Please fix the errors in the form.");
  };

  const onInit = async () => {
    setDisabledDates(true);
    try {
      const defaultValues = await getConfig();
      reset(defaultValues);
      const range = await getDateRange();
      setDateRange(range);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setDisabledDates(false);
    }
  };

  useEffect(() => {
    onInit();
  }, []);

  return (
    <Box p={4} maxWidth="md" mx="auto">
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container spacing={2}>
          <BacktestConfig control={control} errors={errors} dateRange={dateRange} disabledDates={disabledDates} />
          <PositionSettings control={control} errors={errors} />
          <FocusSettings control={control} />
          <LegsSection control={control} fields={fields} append={append} remove={remove} />
          <SubmitControls loading={loading} reset={reset} />
        </Grid>
      </form>
    </Box>
  );
}

async function getDateRange(): Promise<{ start: string; end: string }> {
  const contracts = await getContracts();
  const dates = contracts.map(c => new Date(c.expiry).toISOString().split("T")[0]).sort();
  return {
    start: sixDaysAgo(dates[0]),
    end: dates[dates.length - 1],
  };
}

function sixDaysAgo(dateStr: string): string {
  const date = new Date(dateStr);
  date.setDate(date.getDate() - 6);
  return date.toISOString().split("T")[0];
}

export default ProtectedRoute(BacktestForm);
