import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import Localization from '../localizationComponent/Localization.tsx';
import { LanguageContext } from '../../context/LanguageContext.tsx';

const Header = () => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [scroll, setScroll] = useState(false);
  const [token, setToken] = useState(true);
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
    navigate('/');
    setToken(false);
  };

  return (
    <header className={scroll ? 'sticky' : 'header'} ref={headerRef}>
      <NavLink to={'/'}>{dictionary.welcomePage}</NavLink>
      <NavLink to={'/main'}>{dictionary.mainPage}</NavLink>
      <div className="links__container">
        <Localization scroll={scroll} />
        {!token ? (
          <button
            className={scroll ? 'sticky__link' : 'header__link'}
            onClick={handleLogout}
          >
            {dictionary.logOut}
          </button>
        ) : (
          <Link
            className={scroll ? 'sticky__link' : 'header__link'}
            to={'/signIn'}
          >
            {dictionary.signIn}
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
