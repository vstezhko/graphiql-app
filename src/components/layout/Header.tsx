import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import Localization from '../localizationComponent/Localization.tsx';
import { logout } from '../../firebase/firebase.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import { LanguageContext } from '../../context/LanguageContext.tsx';
// import { Button } from '@mui/material';

const Navigation = ({
  scroll,
  onClick,
  isBurger,
}: {
  scroll: boolean;
  onClick: () => void;
  isBurger?: boolean;
}) => {
  const { dictionary } = useContext(LanguageContext);
  const { status } = useSelector((state: RootState) => state.isLoggedIn);
  return (
    <div className={isBurger ? 'burger__menu' : 'navigation'}>
      <NavLink to={'/'}>{dictionary.welcomePage}</NavLink>
      <NavLink to={'/main'}>{dictionary.mainPage}</NavLink>
      <div className="links__container">
        <Localization status={status} />
        {status ? (
          <button
            className={scroll ? 'sticky__link' : 'header__link'}
            onClick={onClick}
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
    </div>
  );
};

const Header = () => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [scroll, setScroll] = useState(false);
  const navigate = useNavigate();
  // const [isVisible, setIsVisible] = useState<boolean>(false);

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

  const handleLogout = async () => {
    await logout();
    navigate('/signIn');
  };

  return (
    <header className={scroll ? 'sticky' : 'header'} ref={headerRef}>
      <Navigation scroll={scroll} onClick={handleLogout} />
      {/*<div className="burger">*/}
      {/*  <Button*/}
      {/*    variant="contained"*/}
      {/*    className="burger__btn"*/}
      {/*    onClick={() => setIsVisible(true)}*/}
      {/*  >*/}
      {/*    Menu*/}
      {/*  </Button>*/}
      {/*  {isVisible && (*/}
      {/*    <>*/}
      {/*      <Navigation scroll={scroll} onClick={handleLogout} isBurger />*/}
      {/*      <button*/}
      {/*        className="burger__close"*/}
      {/*        onClick={() => setIsVisible(false)}*/}
      {/*      >*/}
      {/*        X*/}
      {/*      </button>*/}
      {/*    </>*/}
      {/*  )}*/}
      {/*</div>*/}
    </header>
  );
};

export default Header;
