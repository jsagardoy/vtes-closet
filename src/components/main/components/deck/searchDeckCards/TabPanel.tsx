import { Box } from '@mui/material';
import React from 'react';

interface TabPanelProps {
    children?: React.ReactNode;
    value: number;
    index: number;
}
const TabPanel = (props: TabPanelProps) => {
    const { children, value, index} = props;

    return (
      <Box
        role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
          {children}
      </Box>
    );
}
export default TabPanel;