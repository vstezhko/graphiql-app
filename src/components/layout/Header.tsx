import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Localization from '../localizationComponent/Localization.tsx';
import { logout } from '../../firebase/firebase.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';

const Header = () => {
  const { isLoading, status } = useSelector(
    (state: RootState) => state.isLoggedIn
  );
  console.log(isLoading, status);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [scroll, setScroll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const sticky = headerRef.current?.offsetTop;
        if (window.pageYOffset > sticky) {
          setScroll(true);
        } else {
          setScroll(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  //todo replace loading to component
  return (
    <header className={scroll ? 'sticky' : 'header'} ref={headerRef}>
      <NavLink to={'/'}>Welcome Page</NavLink>
      <NavLink to={'/main'}>Main Page</NavLink>
      <div className="links__container">
        <Localization scroll={scroll} />
        {isLoading ? (
          'loading'
        ) : status ? (
          <button
            className={scroll ? 'sticky__link' : 'header__link'}
            onClick={handleLogout}
          >
            Log out
          </button>
        ) : (
          <>
            <Link
              className={scroll ? 'sticky__link' : 'header__link'}
              to={'/signIn'}
            >
              Sign In
            </Link>
            <Link
              className={scroll ? 'sticky__link' : 'header__link'}
              to={'/signUp'}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
