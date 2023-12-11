import GraphQLEditor from '../graphqlEditor/GraphQLEditor';
import EditorTabs from '../editorTabs/EditorTabs';
import ResponseViewer from '../responseViewer/ResponseViewer';

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
