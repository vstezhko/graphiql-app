import Popover from './Popover.tsx';
import { useState } from 'react';

const Localization = () => {
  const [selectedLang, setSelectedLang] = useState('en');

  return (
    <Popover selectedLang={selectedLang} setSelectedLang={setSelectedLang} />
  );
};

export default Localization;
