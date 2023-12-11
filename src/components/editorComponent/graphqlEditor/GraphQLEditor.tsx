import { setQueryBody } from '../../../store/slices/editorsSlice';
import Editor from '../editor/Editor';

const GraphQLEditor = () => {
  return (
    <Editor
      stateValueName="queryBody"
      action={setQueryBody}
      className="graphql-editor"
    />
  );
};

export default GraphQLEditor;
