import { setQueryHeaders } from '../../store/slices/editorsSlice';
import Editor from '../editor/Editor';

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
