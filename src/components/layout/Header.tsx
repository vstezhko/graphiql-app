import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import Localization from '../localizationComponent/Localization.tsx';
import { logout } from '../../firebase/firebase.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import { LanguageContext } from '../../context/LanguageContext.tsx';
import { Button } from '@mui/material';

const Navigation = ({
  scroll,
  onClick,
  isBurger,
  handleCloseMenu,
}: {
  scroll: boolean;
  onClick: () => void;
  handleCloseMenu?: () => void;
  isBurger: boolean;
}) => {
  const { dictionary } = useContext(LanguageContext);
  const { status } = useSelector((state: RootState) => state.isLoggedIn);
  return (
    <div className={isBurger ? 'burger__menu' : 'navigation'}>
      <NavLink to={'/'} onClick={handleCloseMenu}>
        {dictionary.welcomePage}
      </NavLink>
      <NavLink to={'/main'} onClick={handleCloseMenu}>
        {dictionary.mainPage}
      </NavLink>
      <div className="links__container">
        <Localization status={status} isBurger={isBurger} />
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
              onClick={handleCloseMenu}
            >
              {dictionary.signIn}
            </Link>
            <Link
              className={scroll ? 'sticky__link' : 'header__link'}
              to={'/signUp'}
              onClick={handleCloseMenu}
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
  const [isVisible, setIsVisible] = useState<boolean>(false);

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
    handleCloseMenu();
    navigate('/signIn');
  };

  const handleOpenMenu = () => {
    setIsVisible(true);
    document.body.classList.add('no-scroll');
  };

  const handleCloseMenu = () => {
    setIsVisible(false);
    document.body.classList.remove('no-scroll');
  };

  return (
    <header className={scroll ? 'sticky' : 'header'} ref={headerRef}>
      <Navigation scroll={scroll} onClick={handleLogout} isBurger={false} />
      <div className="burger">
        <Button
          variant="contained"
          className="burger__btn"
          onClick={handleOpenMenu}
        >
          Menu
        </Button>
        {isVisible && (
          <>
            <Navigation
              scroll={scroll}
              onClick={handleLogout}
              handleCloseMenu={handleCloseMenu}
              isBurger={true}
            />
            <button className="burger__close" onClick={handleCloseMenu}>
              X
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
