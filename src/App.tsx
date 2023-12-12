import Header from './components/layout/Header.tsx';
import { Outlet, useLocation } from 'react-router-dom';
import WelcomePage from './pages/welcomPage/WelcomePage.tsx';
import Footer from './components/layout/Footer.tsx';

function App() {
  const { pathname } = useLocation();

  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="container">
          {pathname !== '/' ? <Outlet /> : <WelcomePage />}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
