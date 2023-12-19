import { Outlet, useLocation } from 'react-router-dom';
import WelcomePage from './pages/welcomPage/WelcomePage.tsx';
import Layout from './components/layout/Layout';
import { useEffect } from 'react';

import { useFetchAndSetFirebaseStatus } from './hooks/fetchFirebaseStatus.ts';

function App() {
  const { pathname } = useLocation();
  console.log('render app');
  useFetchAndSetFirebaseStatus();

  //todo: add error to test and review

  useEffect(() => {
    throw new Error('Test error inside MainPage component');
  }, []);

  return <Layout>{pathname !== '/' ? <Outlet /> : <WelcomePage />}</Layout>;
}

export default App;
