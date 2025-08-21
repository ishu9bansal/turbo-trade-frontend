import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
} from "@mui/material";
import { GUIDE } from "../types/landingPageData";
import ContainerLayout from "../components/Layout/ContainerLayout";

function Guide() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          {GUIDE.title}
        </Typography>

        {GUIDE.sections.map((section, idx) => (
          <Box key={idx} sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              {section.title}
            </Typography>

            {section.steps.map((step, stepIdx) => (
              <Box key={stepIdx} sx={{ mb: 3 }}>
                {step.title && (
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    {step.title}
                  </Typography>
                )}
                <SimpleList items={step.items} />
              </Box>
            ))}

            {idx < GUIDE.sections.length - 1 && (
              <Divider sx={{ my: 4 }} />
            )}
          </Box>
        ))}
      </Paper>
    </Container>
  );
}

/* Helper list component */
function SimpleList({ items } : { items: string[] }) {
  return (
    <List dense disablePadding>
      {items.map((item, idx) => (
        <ListItem key={idx} sx={{ pl: 2 }}>
          <ListItemText primary={item} />
        </ListItem>
      ))}
    </List>
  );
}

export default function WithContainerLayout() {
  return (
    <ContainerLayout>
      <Guide />
    </ContainerLayout>
  );
}