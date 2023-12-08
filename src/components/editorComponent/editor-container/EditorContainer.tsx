import GraphQLEditor from '../graphql-editor/GraphQLEditor';
import EditorTabs from '../editor-tabs/EditorTabs';
import { IconButton } from '@mui/material';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../store/slices/graphQLThunk';
import { AppDispatch, RootState } from '../../../store/store';
import ResponseViewer from '../response-viewer/ResponseViewer';

const EditorContainer = () => {
  const dispatch: AppDispatch = useDispatch();
  const queryBody = useSelector((state: RootState) => state.editors.queryBody);
  const handleRun = () => {
    if (queryBody) {
      dispatch(fetchData());
    }
  };

  return (
    <div className="editor-container">
      <section className="editor-container__request-section">
        <GraphQLEditor />
        <EditorTabs />
        <IconButton
          className="editor-container__run-button"
          size="large"
          aria-label="run-request"
          onClick={handleRun}
        >
          <PlayCircleFilledWhiteIcon />
        </IconButton>
      </section>
      <section className="editor-container__response-section">
        <ResponseViewer />
      </section>
    </div>
  );
};

export default EditorContainer;
