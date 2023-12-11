import EditorToolbar from '../../components/editorToolbar/EditorToolbar.tsx';
import EditorContainer from '../../components/editorComponent/editorContainer/EditorContainer.tsx';

const MainPage = () => {
  return (
    <div className="editor-page">
      <EditorToolbar />
      <EditorContainer />
    </div>
  );
};

export default MainPage;
