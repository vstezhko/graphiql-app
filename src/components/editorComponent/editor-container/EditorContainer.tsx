import GraphQLEditor from '../graphql-editor/GraphQLEditor';
import EditorTabs from '../editor-tabs/EditorTabs';
import ResponseViewer from '../response-viewer/ResponseViewer';

const EditorContainer = () => {
  return (
    <div className="editor-container">
      <section className="editor-container__request-section">
        <GraphQLEditor />
        <EditorTabs />
      </section>
      <section className="editor-container__response-section">
        <ResponseViewer />
      </section>
    </div>
  );
};

export default EditorContainer;
