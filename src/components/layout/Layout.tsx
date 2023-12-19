import Header from './Header';
import Footer from './Footer';
import { ThemeProvider } from '@emotion/react';
import { theme } from './../../providers/MuiThemeProvider';
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <div className="wrapper">
        <Header />
        <main>
          <div className="container">{children}</div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
