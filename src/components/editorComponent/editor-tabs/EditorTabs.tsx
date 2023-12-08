import { SyntheticEvent, useState } from 'react';
import { Tabs, Tab, IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import HeadersEditor from '../headers-editor/HeadersEditor.tsx';
import VariableEditor from '../variable-editor/VariableEditor.tsx';
import TabPanel from './TabPanel.tsx';

const EditorTabs = () => {
  const [value, setValue] = useState(0);
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  const handleTabChange = (_: SyntheticEvent, newValue: number) => {
    setIsPanelOpen(true);
    setValue(newValue);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
  };

  const handleOpenPanel = () => {
    setIsPanelOpen(true);
  };

  const buttonShow = (
    <IconButton
      aria-label="show-editors-panel"
      onClick={handleOpenPanel}
      sx={{ color: '#50b5ff', width: '48px' }}
    >
      <KeyboardArrowUpIcon />
    </IconButton>
  );

  const buttonHide = (
    <IconButton
      aria-label="hide-editors-panel"
      onClick={handleClosePanel}
      sx={{ color: '#50b5ff', width: '48px' }}
    >
      <KeyboardArrowDownIcon />
    </IconButton>
  );

  return (
    <div className={`editor-tabs ${isPanelOpen ? 'editor-tabs_open' : ''}`}>
      <div className="editor-tabs__header">
        <Tabs value={value} onChange={handleTabChange}>
          <Tab label="Variables" sx={{ color: '#8c91b6' }} />
          <Tab label="Headers" sx={{ color: '#8c91b6' }} />
        </Tabs>
        {isPanelOpen ? buttonHide : buttonShow}
      </div>
      {isPanelOpen ? (
        <div className="editor-tabs__tab-panels">
          <TabPanel value={value} index={0}>
            <VariableEditor />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <HeadersEditor />
          </TabPanel>
        </div>
      ) : (
        <div style={{ height: '200px' }}></div> //заглушка, тк дергается контент при скролле, если панель закрыта
      )}
    </div>
  );
};

export default EditorTabs;
