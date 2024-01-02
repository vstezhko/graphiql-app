import { useSelector } from 'react-redux';
import { setQueryBody } from '../../../store/slices/editorsSlice';
import { RootState } from '../../../store/store';
import Editor from '../editor/Editor';
import EditorTabs from '../editorTabs/EditorTabs';
import { useContext } from 'react';
import { LanguageContext } from '../../../context/LanguageContext';

const EditorContainer = () => {
  const prettifyError = useSelector(
    (state: RootState) => state.editors.prettifyError
  );
  const { dictionary } = useContext(LanguageContext);
  return (
    <div className="editor-container">
      <section className="editor-container__request-section">
        <div className="editor-container__header">
          <h3 className="editor-container__title">Query Editor</h3>
          {prettifyError && <p>{dictionary[prettifyError]}</p>}
        </div>
        <Editor
          stateValueName="queryBody"
          action={setQueryBody}
          className="graphql-editor"
        />
        <EditorTabs />
      </section>
      <section className="editor-container__response-section">
        <h3 className="editor-container__title">Response Viewer</h3>
        <Editor
          stateValueName="response"
          className="response-viewer"
          isJson
          isReadOnly
        />
      </section>
    </div>
  );
};

export default EditorContainer;
