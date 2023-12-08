import Header from './components/layout/Header.tsx';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <main>
        <Outlet />
      </main>
      <footer className="footer">Footer</footer>
    </div>
  );
}

export default App;
