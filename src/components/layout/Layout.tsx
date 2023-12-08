// import { NavLink } from 'react-router-dom';
import { ReactNode } from 'react';
import Header from './Header.tsx';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="wrapper">
      <Header />
      <main>{children}</main>
      <footer className="footer">Footer</footer>
    </div>
  );
};

export default Layout;
