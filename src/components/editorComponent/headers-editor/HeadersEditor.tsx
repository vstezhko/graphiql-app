import Editor from '../editor/Editor';
import { setQueryHeaders } from '../../../store/slices/editorsSlice.ts';

const HeadersEditor = () => {
  return (
    <Editor
      stateValueName="queryHeaders"
      action={setQueryHeaders}
      className="headers-editor"
      isJson
    />
  );
};

export default HeadersEditor;
