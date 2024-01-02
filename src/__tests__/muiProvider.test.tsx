import { render } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { theme } from '../providers/MuiThemeProvider';

describe('MuiButton', () => {
  it('should have the correct font size', () => {
    const { getByRole } = render(
      <ThemeProvider theme={theme}>
        <Button>Test Button</Button>
      </ThemeProvider>
    );

    const button = getByRole('button');
    const buttonFontSize = window.getComputedStyle(button).fontSize;
    expect(buttonFontSize).toBe('1.5rem');
  });
});
