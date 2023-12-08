import { NavLink } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const Header = () => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [scroll, setScroll] = useState(false);

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

  return (
    <header className={scroll ? 'sticky' : 'header'} ref={headerRef}>
      <NavLink to={'/main'}>Main Page</NavLink>
      <NavLink to={'/logout'}>Log Out</NavLink>
      <NavLink to={'/editor'}>GraphQL Editor</NavLink>
    </header>
  );
};

export default Header;
