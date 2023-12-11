import Editor from '../editor/Editor';

const ResponseViewer = () => {
  return (
    <Editor
      stateValueName="response"
      className="variable-editor"
      isJson
      isReadOnly
    />
  );
};

export default ResponseViewer;
