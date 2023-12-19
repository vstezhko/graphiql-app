import Header from './components/layout/Header.tsx';
import { Outlet, useLocation } from 'react-router-dom';
import WelcomePage from './pages/welcomPage/WelcomePage.tsx';
import Footer from './components/layout/Footer.tsx';
import { ThemeProvider } from '@emotion/react';
import { theme } from './providers/MuiThemeProvider.ts';
import { useEffect } from 'react';

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    throw new Error('Test error inside MainPage component');
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="wrapper">
        <Header />
        <main>
          <div className="container">
            {pathname !== '/' ? <Outlet /> : <WelcomePage />}
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
