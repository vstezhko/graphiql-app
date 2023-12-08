import Editor from '../editor/Editor';
import { setQueryVariables } from '../../../store/slices/editorsSlice.ts';

const VariableEditor = () => {
  return (
    <Editor
      stateValueName="queryVariables"
      action={setQueryVariables}
      className="variable-editor"
      isJson
    />
  );
};

export default VariableEditor;
