import GraphQLEditor from '../graphql-editor/GraphQLEditor';
import '../../styles/components/EditorContainer.scss';
import EditorTabs from '../editor-tabs/EditorTabs';

const EditorContainer = () => {
  return (
    <div className="editor-container">
      <GraphQLEditor />
      <EditorTabs />
    </div>
  );
};

export default EditorContainer;
