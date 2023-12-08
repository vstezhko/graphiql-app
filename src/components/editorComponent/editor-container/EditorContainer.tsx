import GraphQLEditor from '../graphql-editor/GraphQLEditor';
import EditorTabs from '../editor-tabs/EditorTabs';
import { IconButton } from '@mui/material';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { makeRequest } from '../../../api/api';

const EditorContainer = () => {
  const handleRun = async () => {
    const data = await makeRequest();
    console.log(data);
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
      <section className="editor-container__response-section"></section>
    </div>
  );
};

export default EditorContainer;
