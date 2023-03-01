import { Accordion } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { StyledEngineProvider } from '@mui/material/styles';
import styles from './StyledAccordeon.module.css';
import { ReactNode } from 'react';

interface StyledAccordeonProps {
  summary: string;
  details: ReactNode;
}

export const StyledAccordeon: React.FC<StyledAccordeonProps> = ({ summary, details }) => {
  return (
    <StyledEngineProvider injectFirst>
      <Accordion disableGutters className={styles.accordeon}>
        <AccordionSummary className={styles.summary}>{summary}</AccordionSummary>
        <AccordionDetails>{details}</AccordionDetails>
      </Accordion>
    </StyledEngineProvider>
  );
};
