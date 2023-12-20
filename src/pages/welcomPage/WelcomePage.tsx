import TeemMembers from '../../components/teemMembers/TeemMembers.tsx';

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

const TeamMembersData: TeamMemberParams[] = [
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
    photo: '../teem/ksusha.jpg',
    githubLink: 'https://github.com/BiarezKseniya',
    linkedinLink: 'https://www.linkedin.com/in/kseniya-biarezina/',
    skills: [
      ['requeriment analysis', 95],
      ['learning', 100],
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
    photo: '../teem/zhenya.jpg',
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
    photo: '../teem/vika.jpg',
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

const WelcomePage = () => {
  return (
    <section className="welcomePage">
      <h1 className="welcomePage__title">About us</h1>
      <div className="welcomePage_content">
        <div className="welcomePage__item">
          {TeamMembersData.map((member, index) => (
            <TeemMembers
              key={index}
              teamMemberData={member}
              isEven={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WelcomePage;
