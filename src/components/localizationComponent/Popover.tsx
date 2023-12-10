import * as React from 'react';
import {
  ListItemText,
  MenuList,
  MenuItem,
  ListItemButton,
  Button,
  Popover,
} from '@mui/material';
import { useState } from 'react';

interface Props {
  selectedLang: string;
  setSelectedLang: (lang: string) => void;
}

const langArray = [
  { id: 1, name: 'English', abbr: 'en' },
  { id: 2, name: 'Russian', abbr: 'ru' },
];

export default function LocalizationPopover({
  selectedLang,
  setSelectedLang,
}: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleListItemClick = (lang: string) => {
    setSelectedLang(lang);
    handleClose();
  };

  const id = Boolean(anchorEl) ? 'simple-popover' : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        className="language__button"
      >
        {selectedLang}
      </Button>
      <Popover
        disableScrollLock
        id={id}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <MenuList>
          {langArray.map(({ id, name, abbr }) => (
            <MenuItem key={id}>
              <ListItemButton
                disableRipple
                selected={selectedLang === abbr}
                onClick={() => handleListItemClick(abbr)}
              >
                <ListItemText primary={name} />
              </ListItemButton>
            </MenuItem>
          ))}
        </MenuList>
      </Popover>
    </div>
  );
}
