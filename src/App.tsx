import { Outlet, useLocation } from 'react-router-dom';
import WelcomePage from './pages/welcomPage/WelcomePage.tsx';
import Layout from './components/layout/Layout';

import { useFetchAndSetFirebaseStatus } from './hooks/fetchFirebaseStatus.ts';

function App() {
  const { pathname } = useLocation();
  useFetchAndSetFirebaseStatus();

  return <Layout>{pathname !== '/' ? <Outlet /> : <WelcomePage />}</Layout>;
}

export default App;
