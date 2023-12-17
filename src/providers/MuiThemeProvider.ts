import { createTheme } from '@mui/material';

export const theme = createTheme({
  typography: {
    button: {
      fontFamily: ['Inconsolata', 'Source Code Pro', 'monospace'].join(','),
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
});
