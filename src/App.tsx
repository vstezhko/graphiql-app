import Header from './components/layout/Header.tsx';
import { Outlet } from 'react-router-dom';
import Footer from './components/layout/Footer.tsx';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
