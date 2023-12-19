import Header from './components/layout/Header.tsx';
import { Outlet, useLocation } from 'react-router-dom';
import WelcomePage from './pages/welcomPage/WelcomePage.tsx';
import Layout from './components/layout/Layout';
import { useEffect } from 'react';

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    throw new Error('Test error inside MainPage component');
  }, []);

  return <Layout>{pathname !== '/' ? <Outlet /> : <WelcomePage />}</Layout>;
}

export default App;
