import {
  Typography,
  Grid,
  TextField,
  MenuItem,
  Divider,
  IconButton,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {Controller } from "react-hook-form";
import {
  SYMBOLS,
  DAYS,
  FREQS,
  OPTION_TYPES,
  TRANSACTION_TYPES,
} from "../types/orchestrator";

type BacktestConfigProps = {
  control: any;
  errors: any;
  dateRange: { start: string; end: string };
  disabledDates: boolean;
};

export function BacktestConfig({ control, errors, dateRange, disabledDates }: BacktestConfigProps) {
  return (
    <>
      <Grid size={12}>
        <Typography variant="h6" gutterBottom>
          Backtest Configuration
        </Typography>
      </Grid>
      
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
      <Grid size={2}>
        <Controller
          name="capital"
          control={control}
          render={({ field }) => (
            <TextField label="Capital" type="number" fullWidth error={!!errors.capital} helperText={errors.capital?.message} {...field} />
          )}
        />
      </Grid>
      <Grid size={2}>
        <Controller
          name="lot_size"
          control={control}
          render={({ field }) => (
            <TextField label="Lot Size" type="number" fullWidth error={!!errors.lot_size} helperText={errors.lot_size?.message} {...field} />
          )}
        />
      </Grid>
    </>
  );
}

type PositionSettingsProps = {
  control: any;
  errors: any;
};

export function PositionSettings({ control, errors }: PositionSettingsProps) {
  return (
    <>
      <Divider sx={{ my: 2 }} />
      <Grid size={12}>
        <Typography variant="h6">Position Settings</Typography>
      </Grid>
        <Grid size={2.5}>
          <Controller
            name="position.entry.time"
            control={control}
            render={({ field }) => (
              <TextField label="Entry Time" type="time" fullWidth error={!!errors.position?.entry?.time} helperText={errors.position?.entry?.time?.message} {...field} />
            )}
          />
        </Grid>
        <Grid size={2.5}>
          <Controller
            name="position.exit.time"
            control={control}
            render={({ field }) => (
              <TextField label="Exit Time" type="time" fullWidth error={!!errors.position?.exit?.time} helperText={errors.position?.exit?.time?.message} {...field} />
            )}
          />
        </Grid>
        <Grid size={2.5}>
          <Controller
            name="position.exit.movement"
            control={control}
            render={({ field }) => (
              <TextField label="Exit Movement" type="number" fullWidth {...field} />
            )}
          />
        </Grid>
        <Grid size={2.5}>
          <Controller
            name="position.per_day_positions_threshold"
            control={control}
            render={({ field }) => (
              <TextField label="Max Positions per day" type="number" fullWidth {...field} />
            )}
          />
        </Grid>
    </>
  );
}

export function FocusSettings({ control } : { control: any }) {
  return (
    <>
      <Divider sx={{ my: 2 }} />
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
                  <MenuItem key={s} value={s}>{s}</MenuItem>
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
                  <MenuItem key={d} value={i}>{d}</MenuItem>
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
                  <MenuItem key={f} value={f}>{f}</MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
    </>
  );
}

type LegsSectionProps = {
  control: any;
  fields: any[];
  append: (value: any) => void;
  remove: (index: number) => void;
};

export function LegsSection({ control, fields, append, remove }: LegsSectionProps) {
  return (
    <>
      <Divider sx={{ my: 2 }} />
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
                  {OPTION_TYPES.map((t) => (
                    <MenuItem key={t} value={t}>{t}</MenuItem>
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
                  {TRANSACTION_TYPES.map((t) => (
                    <MenuItem key={t} value={t}>{t}</MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid size={2} display="flex" justifyContent="center">
            <IconButton onClick={() => remove(index)}><DeleteIcon /></IconButton>
          </Grid>
        </Grid>
      ))}
      <Grid size={12} sx={{ mt: 2 }}>
        <Button variant="outlined" onClick={() => append({ strike: { offset: 0 }, type: "CE", transaction: "SELL" })}>
          Add Leg
        </Button>
      </Grid>
    </>
  );
}

export function SubmitControls({ loading, reset }: { loading: boolean; reset: () => void }) {
  return (
    <Grid size={12} display="flex" justifyContent="flex-end" sx={{ mt: 4 }}>
      <Button type="submit" variant="contained" disabled={loading}>
        {loading ? "Running..." : "Run Backtest"}
      </Button>
      <Button onClick={() => reset()} sx={{ ml: 2 }}>
        Reset
      </Button>
    </Grid>
  );
}



