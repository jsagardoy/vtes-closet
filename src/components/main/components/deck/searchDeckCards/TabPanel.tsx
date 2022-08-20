import React from 'react';

interface TabPanelProps {
    children?: React.ReactNode;
    value: number;
    index: number;
}
const TabPanel = (props: TabPanelProps) => {
    const { children, value, index} = props;

    return (
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
          {children}
      </div>
    );
}
export default TabPanel;