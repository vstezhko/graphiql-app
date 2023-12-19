import Header from './components/layout/Header.tsx';
import { Outlet } from 'react-router-dom';
import Footer from './components/layout/Footer.tsx';
import { useFetchAndSetFirebaseStatus } from './hooks/fetchFirebaseStatus.ts';
import { ThemeProvider } from '@emotion/react';
import { theme } from './providers/MuiThemeProvider.ts';

function App() {
  useFetchAndSetFirebaseStatus();

  return (
    <ThemeProvider theme={theme}>
      <div className="wrapper">
        <Header />
        <main>
          <div className="container">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
