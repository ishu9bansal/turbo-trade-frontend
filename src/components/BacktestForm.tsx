import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type BacktestFormData,
  backtestSchema,
  SYMBOLS,
  DAYS,
  FREQS,
  OPTION_TYPES,
  TRANSACTION_TYPES,
} from "../types/orchestrator";
import { getConfig, getContracts, postBacktest } from "../api/backtest";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ProtectedRoute from "./ProtectedRoute";
import { DEFAULT_FORM_DATA } from "../types/constants";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function BacktestForm() {
  const [loading, setLoading] = useState(false);
  const [disabledDates, setDisabledDates] = useState(false);
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState<{ start: string, end:string }>({ start: "2022-06-01", end: "2022-06-01" });
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
      // show alert and then navigate to history
      alert(`Backtest started with ID: ${response.backtestId}`);
      navigate("/history");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
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
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        Backtest Configuration
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container spacing={2} columns={12}>
          {/* Start & End Date */}
          <Grid size={3}>
            <Controller
              name="start_date"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Start Date"
                  type="date"
                  inputProps={{ min: dateRange.start, max: dateRange.end }}
                  disabled={disabledDates}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  error={!!errors.start_date}
                  helperText={errors.start_date?.message}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid size={3}>
            <Controller
              name="end_date"
              control={control}
              render={({ field }) => (
                <TextField
                  label="End Date"
                  type="date"
                  inputProps={{ min: dateRange.start, max: dateRange.end }}
                  disabled={disabledDates}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  error={!!errors.end_date}
                  helperText={errors.end_date?.message}
                  {...field}
                />
              )}
            />
          </Grid>

          {/* Capital & Lot size */}
          <Grid size={2}>
            <Controller
              name="capital"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Capital"
                  type="number"
                  fullWidth
                  error={!!errors.capital}
                  helperText={errors.capital?.message}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid size={2}>
            <Controller
              name="lot_size"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Lot Size"
                  type="number"
                  fullWidth
                  error={!!errors.lot_size}
                  helperText={errors.lot_size?.message}
                  {...field}
                />
              )}
            />
          </Grid>
          <Divider />
          <Grid size={12}>
            <Typography variant="h6">Position Settings</Typography>
          </Grid>

          {/* Entry Time */}
          <Grid size={2.5}>
            <Controller
              name="position.entry.time"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Entry Time"
                  type="time"
                  fullWidth
                  error={!!errors.position?.entry?.time}
                  helperText={errors.position?.entry?.time?.message}
                  {...field}
                />
              )}
            />
          </Grid>

          {/* Exit Time & Movement */}
          <Grid size={2.5}>
            <Controller
              name="position.exit.time"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Exit Time"
                  type="time"
                  fullWidth
                  error={!!errors.position?.exit?.time}
                  helperText={errors.position?.exit?.time?.message}
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid size={2.5}>
            <Controller
              name="position.exit.movement"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Exit Movement"
                  type="number"
                  fullWidth
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid size={2.5}>
            <Controller
              name="position.per_day_positions_threshold"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Max Positions per day"
                  type="number"
                  fullWidth
                  {...field}
                />
              )}
            />
          </Grid>

          {/* Focus */}
          <Divider />
          <Grid size={12}>
            <Typography variant="h6">Focus Settings</Typography>
          </Grid>
          <Grid size={2}>
            <Controller
              name="position.focus.symbol"
              control={control}
              render={({ field }) => (
                <TextField label="Symbol" select fullWidth {...field}>
                  {SYMBOLS.map((s) => (
                    <MenuItem key={s} value={s}>
                      {s}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid size={2}>
            <Controller
              name="position.focus.step"
              control={control}
              render={({ field }) => (
                <TextField label="Step" type="number" fullWidth {...field} />
              )}
            />
          </Grid>
          <Grid size={3}>
            <Controller
              name="position.focus.expiry.weekday"
              control={control}
              render={({ field }) => (
                <TextField label="Expiry Weekday" select fullWidth {...field}>
                  {DAYS.map((d, i) => (
                    <MenuItem key={d} value={i}>
                      {d}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid size={3}>
            <Controller
              name="position.focus.expiry.frequency"
              control={control}
              render={({ field }) => (
                <TextField label="Expiry Frequency" select fullWidth {...field}>
                  {FREQS.map((f) => (
                    <MenuItem key={f} value={f}>
                      {f}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>

          {/* Legs */}
          <Divider />
          <Grid size={12}>
            <Typography variant="h6">Legs</Typography>
          </Grid>
          {fields.map((leg, index) => (
            <Grid container spacing={2} key={leg.id} alignItems="center" size={12}>
              <Grid size={2}>
                <Controller
                  name={`position.legs.${index}.strike.offset`}
                  control={control}
                  render={({ field }) => (
                    <TextField label="Strike Offset" type="number" fullWidth {...field} />
                  )}
                />
              </Grid>
              <Grid size={3}>
                <Controller
                  name={`position.legs.${index}.type`}
                  control={control}
                  render={({ field }) => (
                    <TextField label="Option Type" select fullWidth {...field}>
                      {OPTION_TYPES.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid size={3}>
                <Controller
                  name={`position.legs.${index}.transaction`}
                  control={control}
                  render={({ field }) => (
                    <TextField label="Transaction" select fullWidth {...field}>
                      {TRANSACTION_TYPES.map((tx) => (
                        <MenuItem key={tx} value={tx}>
                          {tx}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid size={2} display="flex" justifyContent="center">
                <IconButton onClick={() => remove(index)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <Grid size={12}>
            <Button variant="outlined" onClick={() => append({ strike: { offset: 0 }, type: "CE", transaction: "SELL" })}>
              Add Leg
            </Button>
          </Grid>


          <Grid size={12} display="flex" justifyContent="flex-end" style={{ marginTop: "3rem" }}>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? "Running..." : "Run Backtest"}
            </Button>
            <Button onClick={() => reset()} style={{ marginLeft: "1rem" }}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>

    </Box>
  );
}


async function getDateRange(): Promise<{ start: string, end: string }> {
  // TODO: placeholder method, needs to be optimized alot
  const contracts = await getContracts();
  const dates = contracts.map(c => new Date(c.expiry).toISOString().split("T")[0]).sort();
  const range = {
    start: sixDaysAgo(dates[0]),
    end: dates[dates.length -1],
  };
  // console.log("range: ", range);
  return range;
}

function sixDaysAgo(dateStr: string): string {
  const date = new Date(dateStr);
  date.setDate(date.getDate() - 6);
  return date.toISOString().split("T")[0];
}

export default ProtectedRoute(BacktestForm);