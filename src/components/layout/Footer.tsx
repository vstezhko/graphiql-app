import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../../context/LanguageContext';

const Footer = () => {
  const { dictionary } = useContext(LanguageContext);
  return (
    <footer className="footer" data-testid="footer">
      <div className="footer__links">
        <div className="link" data-testid="footerLink">
          <img src="/img/github-mark.svg" alt={dictionary.githubAlt} />
          <Link to="https://github.com/vstezhko">{dictionary.vika}</Link>
        </div>
        <div className="link" data-testid="footerLink">
          <img src="/img/github-mark.svg" alt={dictionary.githubAlt} />
          <Link to="https://github.com/BiarezKseniya">
            {dictionary.kseniya}
          </Link>
        </div>
        <div className="link" data-testid="footerLink">
          <img src="/img/github-mark.svg" alt={dictionary.githubAlt} />
          <Link to="https://github.com/khaleeva">{dictionary.jenya}</Link>
        </div>
      </div>
      <Link to="https://rs.school/react/">
        <img src="/img/rs_school_js.svg" alt={dictionary.rsLogoAlt} />
      </Link>
      <div className="footer__date">2023</div>
    </footer>
  );
};

export default Footer;
