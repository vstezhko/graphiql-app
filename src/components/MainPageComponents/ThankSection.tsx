import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext.tsx';

export const ThanksSection = () => {
  const { dictionary } = useContext(LanguageContext);
  return (
    <div className="thanks">
      <div className="thanks__image-block">
        <Link className="thanks__link" to="https://rs.school/react/">
          <img src="public/rs_school_js.svg" alt={dictionary.rsLogoAlt} />
        </Link>
      </div>
      <div className="thanks__text-block">
        <p>
          {dictionary.projectJourney}{' '}
          <span className="highlight">{dictionary.rollingScopesCommunity}</span>{' '}
          {dictionary.rsSchoolFoundedYear}
        </p>
        <p>
          {dictionary.foundInspirationAndSkills}{' '}
          <span className="highlight">{dictionary.bringProjectToLife}</span>{' '}
          {dictionary.equippedWithTechnicalKnowHow}{' '}
          <span className="highlight">{dictionary.servedAsMeetingPoint}</span>
        </p>
        <p>
          {dictionary.immenselyGratefulToMentors}{' '}
          <span className="highlight">
            {dictionary.generouslySharedTheirExpertise}
          </span>
        </p>
      </div>
    </div>
  );
};
