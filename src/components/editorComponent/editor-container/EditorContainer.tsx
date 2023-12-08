import GraphQLEditor from '../graphql-editor/GraphQLEditor.tsx';
import EditorTabs from '../editor-tabs/EditorTabs.tsx';

const EditorContainer = () => {
  return (
    <div className="editor-container">
      <GraphQLEditor />
      <EditorTabs />
    </div>
  );
};

export default EditorContainer;
