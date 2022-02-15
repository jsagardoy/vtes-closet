import { Box, CircularProgress } from '@mui/material';

export const Spinner = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <CircularProgress variant='indeterminate'/>
  </Box>
);
