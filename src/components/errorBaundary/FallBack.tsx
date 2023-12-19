import { ThemeProvider } from '@emotion/react';
import { theme } from '../../providers/MuiThemeProvider';
import Header from '../layout/Header';

import Footer from '../layout/Footer';

const FallBack = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="wrapper">
        <Header />
        <main>
          <div className="container">
            <div>
              <p>ERROR</p>
              <p>Something went wrong...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default FallBack;
