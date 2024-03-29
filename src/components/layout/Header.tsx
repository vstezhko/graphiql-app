import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import Localization from '../localizationComponent/Localization.tsx';
import { logout } from '../../firebase/firebase.ts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import { LanguageContext } from '../../context/LanguageContext.tsx';
import { Button, CircularProgress } from '@mui/material';
import { resetState } from '../../store/slices/editorsSlice.ts';

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
  const { status, isLoading } = useSelector(
    (state: RootState) => state.isLoggedIn
  );
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const lsStatus = JSON.parse(localStorage.getItem('isLoggedIn') || 'false');

    if (!lsStatus && pathname === '/main') {
      navigate('/');
    }
  }, [status, pathname, navigate]);

  const isSticky = scroll ? 'sticky__link' : 'header__link';

  return (
    <div className={isBurger ? 'burger__menu' : 'navigation'}>
      <NavLink to={'/'} onClick={handleCloseMenu} data-testid="headerNavLink">
        {dictionary.welcomePage}
      </NavLink>
      <NavLink
        to={'/main'}
        onClick={handleCloseMenu}
        data-testid="headerNavLink"
      >
        {dictionary.mainPage}
      </NavLink>
      <div className="links__container">
        {status ? (
          <button className={isSticky} onClick={onClick}>
            {dictionary.logOut}
          </button>
        ) : isLoading ? (
          <button className={isSticky}>
            <CircularProgress size="2rem" className="header__progress" />
          </button>
        ) : (
          <>
            <Link
              className={isSticky}
              to={'/signIn'}
              onClick={handleCloseMenu}
              data-testid="signIn"
            >
              {dictionary.signIn}
            </Link>
            <Link className={isSticky} to={'/signUp'} onClick={handleCloseMenu}>
              {dictionary.signUp}
            </Link>
          </>
        )}
        <Localization isBurger={isBurger} />
      </div>
    </div>
  );
};

const Header = () => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [scroll, setScroll] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState<boolean>(false);
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

  const handleLogout = async () => {
    await logout();
    handleCloseMenu();
    dispatch(resetState());
    navigate('/');
  };

  const handleOpenMenu = () => {
    setIsVisible(true);
  };

  const handleCloseMenu = () => {
    setIsVisible(false);
  };

  return (
    <header
      className={scroll ? 'sticky' : 'header'}
      ref={headerRef}
      data-testid="header"
    >
      <Navigation scroll={scroll} onClick={handleLogout} isBurger={false} />
      <div className="burger">
        <Button
          variant="contained"
          className="burger__btn"
          onClick={handleOpenMenu}
        >
          {dictionary.menu}
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
