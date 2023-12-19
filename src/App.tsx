import { Outlet, useLocation } from 'react-router-dom';
import WelcomePage from './pages/welcomPage/WelcomePage.tsx';
import Layout from './components/layout/Layout';

function App() {
  const { pathname } = useLocation();

  return <Layout>{pathname !== '/' ? <Outlet /> : <WelcomePage />}</Layout>;
}

export default App;
