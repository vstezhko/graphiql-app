import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__links">
        <div className="link">
          <img src="./../../../public/github-mark.svg" alt="github" />
          <Link to="https://github.com/vstezhko">Vika</Link>
        </div>
        <div className="link">
          <img src="./../../../public/github-mark.svg" alt="github" />
          <Link to="https://github.com/BiarezKseniya">Kseniya</Link>
        </div>
        <div className="link">
          <img src="./../../../public/github-mark.svg" alt="github" />
          <Link to="https://github.com/khaleeva">Jenya</Link>
        </div>
      </div>
      <Link to="https://rs.school/react/">
        <img src="./../../../public/rs_school_js.svg" alt="rs-logo" />
      </Link>
      <div className="footer__date">2023</div>
    </footer>
  );
};

export default Footer;
