import { setQueryVariables } from '../../store/slices/editorsSlice';
import Editor from '../editor/Editor';

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
