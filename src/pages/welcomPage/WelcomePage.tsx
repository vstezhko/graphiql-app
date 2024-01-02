import { TeamMemberCard } from '../../components/MainPageComponents/TeamMemberCard.tsx';
import { ThanksSection } from '../../components/MainPageComponents/ThankSection.tsx';
import { KeyFeaturesSection } from '../../styles/components/mainPageComponents/KeyFeaturesSection.tsx';
import { useContext, useMemo } from 'react';
import { LanguageContext } from '../../context/LanguageContext.tsx';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';

type SkillItem = [string, number];

export interface TeamMemberParams {
  name: string;
  role: string;
  text: string;
  highlights: string[];
  photo: string;
  githubLink: string;
  linkedinLink: string;
  skills: SkillItem[];
  contribution: string;
}

const TeamMembersDataEn: TeamMemberParams[] = [
  {
    name: 'Kseniya Biarezina',
    role: 'Front-end Dev',
    text: `While working as a financial analyst in the banking sector, I made extensive use of Excel, SQL, and VBA. I transitioned then to web development through courses on LinkedIn Learning and Netology, and RS School's Stage 0. Despite being new to commercial web development, I've been involved in numerous projects during my training. I find web development exciting for its tangible results and constant learning opportunities.`,
    highlights: [
      'Excel, SQL, and VBA',
      'LinkedIn Learning',
      'Netology',
      `RS School's Stage 0`,
      'tangible results',
      'constant learning opportunities',
    ],
    photo: '../../../src/assets/team-members/ksusha.jpg',
    githubLink: 'https://github.com/BiarezKseniya',
    linkedinLink: 'https://www.linkedin.com/in/kseniya-biarezina/',
    skills: [
      ['requeriment analysis', 95],
      ['testing', 100],
      ['outcomes delivery', 90],
    ],
    contribution: 'taking part in coding, realize task requirements, testing',
  },
  {
    name: 'Eugenia Khaleeva',
    role: 'Front-end Dev',
    text: `I'm a React Front-end Developer with over 1 year of commercial development experience. My goal is to become a sought-after IT specialist by continually improving my skills. I'm known for my teamwork and problem-solving abilities. I have a background in account management and certifications in Front-end development, including completion of the JS/FE PRE-SCHOOL program.`,
    highlights: [
      'over 1 year of commercial development experience',
      'become a sought-after IT specialist',
      'my teamwork and problem-solving abilities',
      'certifications in Front-end development',
      'JS/FE PRE-SCHOOL program',
    ],
    photo: '../../../src/assets/team-members/zhenya.jpg',
    githubLink: 'https://github.com/khaleeva',
    linkedinLink: 'https://www.linkedin.com/in/eugenia-khaleeva-b66035157',
    skills: [
      ['creativity', 100],
      ['teamwork', 90],
      ['problem-solving', 95],
    ],
    contribution: 'taking part in coding, realize task requirements, design',
  },
  {
    name: 'Viktoria Stezhko',
    role: 'Team-Lead | Front-end Dev',
    text: `I'm a creative and adaptable professional with excellent communication skills. After gaining valuable experience in management and receiving positive reviews for streamlining business processes, I moved into the IT industry, where I've been working for 1.5 years. My experience includes notable projects such as a website for an online film festival and a web app for B2B sales platform.`,
    highlights: [
      'excellent communication skills',
      'experience in management',
      'streamlining business processes',
      'a website for an online film festival',
      'a web app for B2B sales platform',
    ],
    photo: '../../../src/assets/team-members/vika.jpg',
    githubLink: 'https://github.com/vstezhko',
    linkedinLink: 'https://www.linkedin.com/in/viktoria-stezhko',
    skills: [
      ['communication', 95],
      ['process improvement', 90],
      ['project management', 100],
    ],
    contribution:
      'taking part in coding, realize task requirements, optimization',
  },
];

const TeamMembersDataRu: TeamMemberParams[] = [
  {
    name: 'Ксения Березина',
    role: 'Front-end Dev',
    text: `Работая финансовым аналитиком в банковском секторе, я широко использовала Excel, SQL и VBA. Перешла затем в веб-разработку через курсы на LinkedIn Learning и Netology, а также через Stage 0 школы RS School. Несмотря на новизну в коммерческой веб-разработке, я участвовала во многих проектах во время обучения. Мне нравится веб-разработка за ее осязаемые результаты и постоянные возможности обучения.`,
    highlights: [
      'Excel, SQL и VBA',
      'LinkedIn Learning',
      'Netology',
      `Stage 0 школы RS School`,
      'осязаемые результаты',
      'постоянные возможности обучения',
    ],
    photo: '../../../src/assets/team-members/ksusha.jpg',
    githubLink: 'https://github.com/BiarezKseniya',
    linkedinLink: 'https://www.linkedin.com/in/kseniya-biarezina/',
    skills: [
      ['анализ требований', 95],
      ['тестирование', 100],
      ['выполнение результатов', 90],
    ],
    contribution:
      'участие в кодировании, реализация требований задачи, тестирование',
  },
  {
    name: 'Евгения Халеева',
    role: 'Front-end Dev',
    text: `Я React Front-end Developer с опытом коммерческой разработки более 1 года. Моя цель - стать востребованным специалистом в IT, постоянно совершенствуя свои навыки. Меня отличают командная работа и способность решать проблемы. У меня есть опыт в управлении учетными записями и сертификаты по Front-end разработке, включая завершение программы JS/FE PRE-SCHOOL.`,
    highlights: [
      'более 1 года опыта коммерческой разработки',
      'стать востребованным специалистом в IT',
      'моя командная работа и способность решать проблемы',
      'сертификаты по Front-end разработке',
      'программа JS/FE PRE-SCHOOL',
    ],
    photo: '../../../src/assets/team-members/zhenya.jpg',
    githubLink: 'https://github.com/khaleeva',
    linkedinLink: 'https://www.linkedin.com/in/eugenia-khaleeva-b66035157',
    skills: [
      ['креативность', 100],
      ['командная работа', 90],
      ['решение проблем', 95],
    ],
    contribution: 'участие в кодировании, реализация требований задачи, дизайн',
  },
  {
    name: 'Виктория Стежко',
    role: 'Team-Lead | Front-end Dev',
    text: `Я креативный человек, открытый ко всему новому. После получения ценного опыта в управлении и положительных отзывов за оптимизацию бизнес-процессов я перешла в IT-индустрию, где работаю уже 1,5 года. Мой опыт включает в себя такие проекты, как сайт для онлайн-кинофестиваля и веб-приложение для B2B платформы продаж.`,
    highlights: [
      'отличные навыки коммуникации',
      'опыт в управлении',
      'оптимизация бизнес-процессов',
      'сайт для онлайн-кинофестиваля',
      'веб-приложение для B2B платформы продаж',
    ],
    photo: '../../../src/assets/team-members/vika.jpg',
    githubLink: 'https://github.com/vstezhko',
    linkedinLink: 'https://www.linkedin.com/in/viktoria-stezhko',
    skills: [
      ['коммуникация', 95],
      ['улучшение процессов', 90],
      ['управление проектами', 100],
    ],
    contribution:
      'участие в кодировании, реализация требований задачи, оптимизация',
  },
];

const WelcomePage = () => {
  const { language, dictionary } = useContext(LanguageContext);
  const { status } = useSelector((state: RootState) => state.isLoggedIn);
  const data = useMemo(
    () => (language === 'en' ? TeamMembersDataEn : TeamMembersDataRu),
    [language]
  );
  return (
    <div className="page__content welcome-page">
      <div className="welcome-page__main-info links">
        <h2>
          {!status
            ? dictionary.pleaseRegisterOrSignIn
            : dictionary.ifAlreadySignedIn}
        </h2>
        <div className="welcome-page__links">
          {!status ? (
            <>
              <Link className="header__link" to={'/signIn'}>
                {dictionary.signIn}
              </Link>
              <Link className="header__link" to={'/signUp'}>
                {dictionary.signUp}
              </Link>
            </>
          ) : (
            <Link className="header__link" to={'/main'}>
              {dictionary.mainPage}
            </Link>
          )}
        </div>
      </div>
      <div className="welcome-page__main-info">
        <h3>{dictionary.rootsInRschool}</h3>
        <ThanksSection />
      </div>
      <div className="welcome-page__main-info">
        <h3>{dictionary.aboutProject}</h3>
        <p>{dictionary.reactAndGraphQLWebApp}</p>
        <KeyFeaturesSection />
      </div>
      <div className="welcome-page__item">
        <div className="welcome-page__main-info">
          <h3>{dictionary.meetOurTeam}</h3>
          <p>{dictionary.ourTeamExcellence}</p>
        </div>
        <div className="welcome-page__team-members">
          {data.map((member, index) => (
            <TeamMemberCard
              key={index}
              teamMemberData={member}
              isEven={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
