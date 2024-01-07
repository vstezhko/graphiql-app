import { createTheme } from '@mui/material';

export const theme = createTheme({
  typography: {
    fontFamily: ['Source Code Pro', 'monospace'].join(','),
    button: {
      fontFamily: ['Source Code Pro', 'monospace'].join(','),
      fontSize: '1.5rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1.5rem',
        },
      },
    },
  },
  palette: {
    action: {
      disabled: 'rgba(0, 0, 0, 0.5)',
    },
  },
});
