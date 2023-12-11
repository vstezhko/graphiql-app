import Popover from './Popover.tsx';
import { useState } from 'react';

const Localization = ({ scroll }: { scroll: boolean }) => {
  const [selectedLang, setSelectedLang] = useState('en');

  return (
    <Popover
      selectedLang={selectedLang}
      setSelectedLang={setSelectedLang}
      scroll={scroll}
    />
  );
};

export default Localization;
