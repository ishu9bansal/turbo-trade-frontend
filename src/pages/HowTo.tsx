import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from "@mui/material";
import { HOW_TO_USE_DATA, TIPS_AND_TRICKS } from "../types/landingPageData";
import ContainerLayout from "../components/Layout/ContainerLayout";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

function HowToUse() {
  const [activeSection, setActiveSection] = useState(0); // Expand the first section by default
  const [activeTip, setActiveTip] = useState(-1);
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography
          variant="h4"
          gutterBottom
          fontWeight="bold"
          align="center"
          sx={{ mb: 4 }}
        >
          {HOW_TO_USE_DATA.title}
        </Typography>

        {HOW_TO_USE_DATA.sections.map((section, idx) => (
          <StepperSection
            key={idx}
            title={section.title}
            steps={section.steps}
            IconElement={section.icon}
            expanded={activeSection===idx}
            onChange={() => setActiveSection(activeSection === idx ? -1 : idx)}
            />
        ))}
      </Paper>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography
          variant="h4"
          gutterBottom
          fontWeight="bold"
          align="center"
          sx={{ mb: 4 }}
        >
          {TIPS_AND_TRICKS.title}
        </Typography>

        {TIPS_AND_TRICKS.sections.map((section, idx) => (
          <Section
            key={idx}
            title={section.title}
            items={section.items}
            IconElement={section.icon}
            expanded={activeTip===idx}
            onChange={() => setActiveTip(activeTip === idx ? -1 : idx)}
            />
        ))}
      </Paper>
    </Container>
  );
}

interface StepperSectionProps {
    title: string;
    steps: {
        title: string;
        items: string[];
    }[];
    expanded: boolean;
    IconElement: React.ElementType;
    onChange: () => void;
}

function StepperSection({ title, steps, IconElement, expanded, onChange }: StepperSectionProps) {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <Accordion expanded={expanded} onChange={onChange}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box display="flex" alignItems="center" gap={1}>
          <IconElement color="primary" />
          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {/* Stepper for sequential steps */}
        <Stepper orientation="vertical" sx={{ mb: 2 }} activeStep={activeStep}>
          {steps.map((step, stepIdx) => (
            <Step key={stepIdx} onClick={() => setActiveStep(stepIdx)}>
              <StepLabel onClick={() => setActiveStep(stepIdx)}>{step.title || ""}</StepLabel>
              <StepContent>
                  <Box sx={{ ml: 4, mt: 1 }}>
                      <SimpleList items={step.items} />
                  </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </AccordionDetails>
    </Accordion>
  );
}

interface SectionProps {
    title: string;
    expanded: boolean;
    IconElement: React.ElementType;
    onChange: () => void;
    items: string[];
}

function Section({ title, items, IconElement, expanded, onChange }: SectionProps) {
  return (
    <Accordion expanded={expanded} onChange={onChange}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box display="flex" alignItems="center" gap={1}>
          <IconElement color="primary" />
          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ ml: 4, mt: 1 }}>
            <SimpleList items={items} />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

/* Helper list component */
function SimpleList({ items }: { items: string[] }) {
  return (
    <List dense disablePadding>
      {items.map((item, idx) => (
        <ListItem key={idx} sx={{ pl: 1 }}>
          <ListItemText primary={item} />
        </ListItem>
      ))}
    </List>
  );
}

export default function WithContainerLayout() {
  return (
    <ContainerLayout>
      <HowToUse />
    </ContainerLayout>
  );
}