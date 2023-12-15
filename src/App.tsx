import Header from './components/layout/Header.tsx';
import { Outlet, useLocation } from 'react-router-dom';
import WelcomePage from './pages/welcomPage/WelcomePage.tsx';
import Footer from './components/layout/Footer.tsx';
import { ThemeProvider } from '@emotion/react';
import { theme } from './providers/MuiThemeProvider.ts';

function App() {
  const { pathname } = useLocation();

  return (
    <ThemeProvider theme={theme}>
      <div className="wrapper">
        <Header />
        <main>{pathname !== '/' ? <Outlet /> : <WelcomePage />}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
