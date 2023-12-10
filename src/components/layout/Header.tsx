import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const Header = () => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [scroll, setScroll] = useState(false);
  const [token, setToken] = useState(true);
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
    navigate('/');
    setToken(false);
  };

  return (
    <header className={scroll ? 'sticky' : 'header'} ref={headerRef}>
      <NavLink to={'/'}>Welcome Page</NavLink>
      <NavLink to={'/main'}>Main Page</NavLink>
      <div className="links__container">
        {!token ? (
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
              className={
                scroll
                  ? 'sticky__link sticky__link_outlined'
                  : 'header__link header__link_outlined'
              }
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
