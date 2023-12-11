import Header from './components/layout/Header.tsx';
import { Outlet, useLocation } from 'react-router-dom';
import WelcomePage from './pages/welcomPage/WelcomePage.tsx';

function App() {
  const { pathname } = useLocation();

  return (
    <div className="wrapper">
      <Header />
      <main>{pathname !== '/' ? <Outlet /> : <WelcomePage />}</main>
      <footer className="footer">Footer</footer>
    </div>
  );
}

export default App;
