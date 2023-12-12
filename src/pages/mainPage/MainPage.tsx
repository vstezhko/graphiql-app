import EditorToolbar from '../../components/editorComponent/editorToolbar/EditorToolbar.tsx';
import EditorContainer from '../../components/editorComponent/editorContainer/EditorContainer.tsx';
import DocumentationSection from '../../components/documentationComponent/DocumentationSection.tsx';

const MainPage = () => {
  return (
    <div className="editor-page">
      <DocumentationSection />
      <EditorToolbar />
      <EditorContainer />
    </div>
  );
};

export default MainPage;
