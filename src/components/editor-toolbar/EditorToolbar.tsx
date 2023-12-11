import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { ChangeEvent } from 'react';
import { setEndpoint } from '../../store/slices/editorsSlice';

const EditorToolbar = () => {
  const dispatch = useDispatch();
  const endpointValue = useSelector(
    (state: RootState) => state.editors.endpoint
  );
  const error = useSelector((state: RootState) => state.editors.error);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEndpoint(event.target.value));
  };

  return (
    <div className="editor-toolbar">
      <input
        className="editor-toolbar__input"
        value={endpointValue}
        type="text"
        placeholder="Enter a GraphQL endpoint"
        onChange={handleChange}
      ></input>
      {error && <p className="editor-toolbar__error">{error}</p>}
    </div>
  );
};

export default EditorToolbar;
