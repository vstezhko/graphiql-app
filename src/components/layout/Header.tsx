import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import Localization from '../localizationComponent/Localization.tsx';
import { logout } from '../../firebase/firebase.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import { LanguageContext } from '../../context/LanguageContext.tsx';

const Header = () => {
  const { status } = useSelector((state: RootState) => state.isLoggedIn);

  const headerRef = useRef<HTMLDivElement | null>(null);
  const [scroll, setScroll] = useState(false);
  const navigate = useNavigate();
  const { dictionary } = useContext(LanguageContext);

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
    navigate('/signIn');
  };

  //todo replace loading to component
  return (
    <header className={scroll ? 'sticky' : 'header'} ref={headerRef}>
      <NavLink to={'/'}>{dictionary.welcomePage}</NavLink>
      <NavLink to={'/main'}>{dictionary.mainPage}</NavLink>
      <div className="links__container">
        <Localization status={status} />
        {status ? (
          <button
            className={scroll ? 'sticky__link' : 'header__link'}
            onClick={handleLogout}
          >
            {dictionary.logOut}
          </button>
        ) : (
          <>
            <Link
              className={scroll ? 'sticky__link' : 'header__link'}
              to={'/signIn'}
            >
              {dictionary.signIn}
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
