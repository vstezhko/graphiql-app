import { SyntheticEvent } from 'react';
import { Tabs, Tab, IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useDispatch, useSelector } from 'react-redux';
import TabPanel from './TabPanel';
import VariableEditor from '../variable-editor/VariableEditor.tsx';
import HeadersEditor from '../headers-editor/HeadersEditor.tsx';
import { RootState } from '../../../store/store.ts';
import {
  setActiveTab,
  setIsPanelOpen,
} from '../../../store/slices/editorsSlice.ts';

const EditorTabs = () => {
  const dispatch = useDispatch();
  const value = useSelector((state: RootState) => state.editors.activeTab);
  const isPanelOpen = useSelector(
    (state: RootState) => state.editors.isPanelOpen
  );

  const handleTabChange = (_: SyntheticEvent, newValue: number) => {
    dispatch(setIsPanelOpen(true));
    dispatch(setActiveTab(newValue));
  };

  const handleClosePanel = () => {
    dispatch(setIsPanelOpen(false));
  };

  const handleOpenPanel = () => {
    dispatch(setIsPanelOpen(true));
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
      {isPanelOpen && (
        <div className="editor-tabs__tab-panels">
          <TabPanel value={value} index={0}>
            <VariableEditor />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <HeadersEditor />
          </TabPanel>
        </div>
      )}
    </div>
  );
};

export default EditorTabs;
