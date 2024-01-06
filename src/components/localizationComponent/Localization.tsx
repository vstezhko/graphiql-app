import {
  ListItemText,
  MenuList,
  MenuItem,
  ListItemButton,
  Button,
  Popover,
} from '@mui/material';
import { useContext, useState } from 'react';
import { LanguageContext, LanguageKeys } from '../../context/LanguageContext';

type LangArrayObject = {
  id: string;
  name: string;
  abbr: string;
};

const Localization = ({ isBurger }: { isBurger: boolean }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { dictionary, language, setLanguage } = useContext(LanguageContext);

  const langArray: LangArrayObject[] = [
    { id: 'en', name: dictionary.english, abbr: dictionary.en },
    { id: 'ru', name: dictionary.russian, abbr: dictionary.ru },
  ];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleListItemClick = (lang: LanguageKeys) => {
    localStorage.setItem('lang', lang);
    setLanguage(lang);
    handleClose();
  };

  const id = Boolean(anchorEl) ? 'simple-popover' : undefined;

  return isBurger ? (
    <MenuList className="lang__menu">
      {langArray.map(({ id, abbr }) => (
        <MenuItem key={id}>
          <ListItemButton
            disableRipple
            selected={language === id}
            onClick={() => handleListItemClick(id as LanguageKeys)}
          >
            <ListItemText primary={abbr} />
          </ListItemButton>
        </MenuItem>
      ))}
    </MenuList>
  ) : (
    <>
      <Button
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        className="language__button"
      >
        {langArray.find(({ id }) => id === language)?.abbr}
      </Button>
      <Popover
        disableScrollLock
        id={id}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorReference={'anchorPosition'}
        anchorPosition={{
          left: window.innerWidth - 100,
          top: 80,
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <MenuList>
          {langArray.map(({ id, name }) => (
            <MenuItem key={id}>
              <ListItemButton
                disableRipple
                selected={language === id}
                onClick={() => handleListItemClick(id as LanguageKeys)}
              >
                <ListItemText primary={name} />
              </ListItemButton>
            </MenuItem>
          ))}
        </MenuList>
      </Popover>
    </>
  );
};

export default Localization;
