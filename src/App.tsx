import Header from './components/layout/Header.tsx';
import { Outlet, useLocation } from 'react-router-dom';
import WelcomePage from './pages/welcomPage/WelcomePage.tsx';
import Footer from './components/layout/Footer.tsx';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from './firebase/firebase.ts';

function App() {
  const { pathname } = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedStateLoading, setIsLoggedStateLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLoggedStateLoading(true);
      if (user) {
        const uid = user.uid;
        console.log('uid', uid);
        setIsLoggedIn(true);
      } else {
        console.log('user is logged out');
        setIsLoggedIn(false);
      }
      setIsLoggedStateLoading(false);
    });
  }, []);

  return (
    <div className="wrapper">
      <Header
        isLoggedIn={isLoggedIn}
        isLoggedStateLoading={isLoggedStateLoading}
      />
      <main>{pathname !== '/' ? <Outlet /> : <WelcomePage />}</main>
      <Footer />
    </div>
  );
}

export default App;
