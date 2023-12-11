const EditorToolbar = () => {
  return (
    <div className="editor-toolbar">
      <input
        className="editor-toolbar__input"
        type="text"
        placeholder="Enter a GraphQL endpoint"
      ></input>
    </div>
  );
};

export default EditorToolbar;
