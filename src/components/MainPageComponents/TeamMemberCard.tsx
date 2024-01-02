import { useMemo } from 'react';
import Slider from '@mui/material/Slider';
import { TeamMemberParams } from '../../pages/welcomPage/WelcomePage.tsx';

function valuetext(value: number) {
  return `${value}%`;
}

function highlightText(text: string, highlights: string[]) {
  const parts = text.split(
    new RegExp(`(\\b(?:${highlights.join('|')})\\b)`, 'i')
  );

  return parts.map((part, index) => {
    if (highlights.includes(part)) {
      return (
        <span key={index} className="highlight">
          {part}
        </span>
      );
    }
    return part;
  });
}

export const TeamMemberCard = ({
  teamMemberData,
  isEven,
}: {
  teamMemberData: TeamMemberParams;
  isEven: boolean;
}) => {
  const memoizedHighlightText = useMemo(
    () => highlightText(teamMemberData.text, teamMemberData.highlights),
    [teamMemberData.text, teamMemberData.highlights]
  );

  return (
    <div className={`team-member ${isEven ? 'even' : 'odd'}`}>
      <div className="team-member__biography">
        <h4 className="team-member__name">
          {teamMemberData.name} / <span>{teamMemberData.role}</span>
        </h4>
        <div className="team-member__text">{memoizedHighlightText}</div>
        <div className="team-member__contributions">
          Contribution: {teamMemberData.contribution}
        </div>
      </div>
      <div className="team-member__image-block">
        <img
          className="team-member__image"
          src={teamMemberData.photo}
          alt="Team member photo"
        />
      </div>
      <div className="team-member__contributions">
        {teamMemberData.skills.map((skill, index) => (
          <div className="team-member__skill" key={index}>
            <label>{skill[0]}</label>
            <Slider
              className="team-member__contributions-range"
              aria-label={skill[0]}
              value={skill[1]}
              getAriaValueText={valuetext}
              valueLabelDisplay="on"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
