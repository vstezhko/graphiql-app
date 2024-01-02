import { Link } from 'react-router-dom';

export const ThanksSection = () => {
  return (
    <div className="thanks">
      <div className="thanks__image-block">
        <Link className="thanks__link" to="https://rs.school/react/">
          <img src="../../../public/rs_school_js.svg" alt="rs-logo" />
        </Link>
      </div>
      <div className="thanks__text-block">
        <p>
          Our project &apos;s journey began within the nurturing confines of RS
          School, a program founded by
          <span className="highlight">
            {' '}
            The Rolling Scopes developer community
          </span>{' '}
          in 2013.
        </p>
        <p>
          It&apos;s at RS School that we found{' '}
          <span className="highlight">the inspiration and skills</span> needed
          to bring this project to life. This school not only equipped us with{' '}
          <span className="highlight">the technical know-how</span> but also
          served as{' '}
          <span className="highlight">the meeting point for our team</span>.
        </p>
        <p>
          We are immensely grateful to the mentors who{' '}
          <span className="highlight">generously shared their expertise</span>,
          making this project possible.
        </p>
      </div>
    </div>
  );
};
