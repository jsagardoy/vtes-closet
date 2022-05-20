import { Box, CircularProgress } from '@mui/material';

export const Spinner = () => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <CircularProgress size={40} thickness={4} variant='indeterminate' />
  </Box>
);
