import { Accordion } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { StyledEngineProvider } from '@mui/material/styles';
import styles from './StyledAccordeon.module.css';
import { ReactNode, useState } from 'react';
import clsx from 'clsx';

interface StyledAccordeonProps {
  summary: string;
  details: ReactNode;
}

export const StyledAccordeon: React.FC<StyledAccordeonProps> = ({ summary, details }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <StyledEngineProvider injectFirst>
      <Accordion
        disableGutters
        className={clsx(styles.accordeon, isExpanded && styles.accordeon_expanded)}
        onChange={(event, expanded) => setIsExpanded(expanded)}
      >
        <AccordionSummary className={styles.summary}>{summary}</AccordionSummary>
        <AccordionDetails>{details}</AccordionDetails>
      </Accordion>
    </StyledEngineProvider>
  );
};
