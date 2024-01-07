import { SyntheticEvent, useContext } from 'react';
import { Tabs, Tab, IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useDispatch, useSelector } from 'react-redux';
import TabPanel from './TabPanel.tsx';
import { RootState } from '../../../store/store.ts';
import {
  setActiveTab,
  setIsPanelOpen,
  setQueryHeaders,
  setQueryVariables,
} from '../../../store/slices/editorsSlice.ts';
import { LanguageContext } from '../../../context/LanguageContext.tsx';
import Editor from '../editor/Editor.tsx';

const EditorTabs = () => {
  const dispatch = useDispatch();
  const value = useSelector((state: RootState) => state.editors.activeTab);
  const isPanelOpen = useSelector(
    (state: RootState) => state.editors.isPanelOpen
  );
  const { dictionary } = useContext(LanguageContext);

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
      className="editor-tabs__button"
    >
      <KeyboardArrowUpIcon />
    </IconButton>
  );

  const buttonHide = (
    <IconButton
      aria-label="hide-editors-panel"
      onClick={handleClosePanel}
      className="editor-tabs__button"
    >
      <KeyboardArrowDownIcon />
    </IconButton>
  );

  return (
    <div className={`editor-tabs ${isPanelOpen ? 'editor-tabs_open' : ''}`}>
      <div className="editor-tabs__header">
        <Tabs
          value={value}
          onChange={handleTabChange}
          onClick={handleOpenPanel}
        >
          <Tab
            className="editor-tabs__tab-button"
            label={dictionary.variables}
          />
          <Tab className="editor-tabs__tab-button" label={dictionary.headers} />
        </Tabs>
        {isPanelOpen ? buttonHide : buttonShow}
      </div>
      {isPanelOpen && (
        <div className="editor-tabs__tab-panels">
          <TabPanel value={value} index={0}>
            <Editor
              stateValueName="queryVariables"
              action={setQueryVariables}
              className="variable-editor"
              isJson
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Editor
              stateValueName="queryHeaders"
              action={setQueryHeaders}
              className="headers-editor"
              isJson
            />
          </TabPanel>
        </div>
      )}
    </div>
  );
};

export default EditorTabs;
