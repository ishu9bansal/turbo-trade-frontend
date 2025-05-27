// src/components/FormRenderer.tsx
import React from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export type Schema = {
  [key: string]:
    | { type: 'number' | 'date' | 'time'; optional?: boolean }
    | { type: 'select'; options: string[]; optional?: boolean }
    | { type: 'group'; label?: string; fields: Schema }
    | { type: 'array'; label?: string; itemFields: Schema };
};

export interface FormRendererProps {
  schema: Schema;
  value: any;
  onChange: (val: any) => void;
  path?: string;
}

const FormRenderer: React.FC<FormRendererProps> = ({ schema, value, onChange, path = '' }) => {
  const updateField = (fieldPath: string, newValue: any) => {
    const keys = fieldPath.split('.');
    const updated = { ...value };
    let obj = updated;
    keys.slice(0, -1).forEach((k) => {
      if (!obj[k]) obj[k] = {};
      obj = obj[k];
    });
    obj[keys.at(-1)!] = newValue;
    onChange(updated);
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {Object.entries(schema).map(([key, field]) => {
        const fieldPath = path ? `${path}.${key}` : key;
        const val = value?.[key];

        if (field.type === 'number' || field.type === 'date' || field.type === 'time') {
          return (
            <TextField
              key={fieldPath}
              label={key}
              type={field.type === 'number' ? 'number' : field.type}
              value={val || ''}
              onChange={(e) => updateField(fieldPath, e.target.value)}
              InputLabelProps={field.type !== 'number' ? { shrink: true } : undefined}
            />
          );
        }

        if (field.type === 'select') {
          return (
            <TextField
              key={fieldPath}
              select
              label={key}
              value={val || ''}
              onChange={(e) => updateField(fieldPath, e.target.value)}
            >
              {field.options.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </TextField>
          );
        }

        if (field.type === 'group') {
          return (
            <Accordion key={fieldPath} defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{field.label || key}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormRenderer
                  schema={field.fields}
                  value={val || {}}
                  onChange={(newVal) => updateField(fieldPath, newVal)}
                  path={fieldPath}
                />
              </AccordionDetails>
            </Accordion>
          );
        }

        if (field.type === 'array') {
          return (
            <Accordion key={fieldPath} defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{field.label || key}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box display="flex" flexDirection="column" gap={2}>
                  {(val || []).map((item: any, idx: number) => (
                    <Box key={idx} border={1} p={2} borderRadius={2} position="relative">
                      <FormRenderer
                        schema={field.itemFields}
                        value={item}
                        onChange={(itemVal) => {
                          const updatedArr = [...val];
                          updatedArr[idx] = itemVal;
                          updateField(fieldPath, updatedArr);
                        }}
                        path={`${fieldPath}.${idx}`}
                      />
                      <IconButton
                        size="small"
                        onClick={() => {
                          const updatedArr = [...val];
                          updatedArr.splice(idx, 1);
                          updateField(fieldPath, updatedArr);
                        }}
                        sx={{ position: 'absolute', top: 0, right: 0 }}
                      >
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    </Box>
                  ))}
                  <Button
                    variant="outlined"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={() => updateField(fieldPath, [...(val || []), {}])}
                  >
                    Add Item
                  </Button>
                </Box>
              </AccordionDetails>
            </Accordion>
          );
        }

        return null;
      })}
    </Box>
  );
};

export default FormRenderer;
