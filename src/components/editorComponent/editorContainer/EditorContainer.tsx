import { setQueryBody } from '../../../store/slices/editorsSlice';
import Editor from '../editor/Editor';
import EditorTabs from '../editorTabs/EditorTabs';

const EditorContainer = () => {
  return (
    <div className="editor-container">
      <section className="editor-container__request-section">
        <Editor
          stateValueName="queryBody"
          action={setQueryBody}
          className="graphql-editor"
        />
        <EditorTabs />
      </section>
      <section className="editor-container__response-section">
        <Editor
          stateValueName="response"
          className="variable-editor"
          isJson
          isReadOnly
        />
      </section>
    </div>
  );
};

export default EditorContainer;
