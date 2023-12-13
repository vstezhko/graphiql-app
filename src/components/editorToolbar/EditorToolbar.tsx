import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { ChangeEvent, useContext } from 'react';
import { setEndpoint, setError } from '../../store/slices/editorsSlice';
import { IconButton } from '@mui/material';
import { fetchData } from '../../store/slices/graphQLThunk';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { LanguageContext } from '../../context/LanguageContext';

const EditorToolbar = () => {
  const dispatch: AppDispatch = useDispatch();
  const endpointValue = useSelector(
    (state: RootState) => state.editors.endpoint
  );
  const error = useSelector((state: RootState) => state.editors.error);
  const queryBody = useSelector((state: RootState) => state.editors.queryBody);
  const { dictionary } = useContext(LanguageContext);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEndpoint(event.target.value));
  };

  const handleRun = () => {
    queryBody ? dispatch(fetchData()) : dispatch(setError('enterQuery'));
  };

  return (
    <div className="editor-toolbar">
      <div className="editor-toolbar__controls">
        <input
          className="editor-toolbar__input"
          value={endpointValue}
          type="text"
          placeholder={dictionary.enterEndpoint}
          onChange={handleChange}
        ></input>
        <IconButton
          className="editor-toolbar__run-button"
          size="large"
          aria-label="run-request"
          onClick={handleRun}
        >
          <PlayCircleFilledWhiteIcon />
        </IconButton>
      </div>
      {error && <p className="editor-toolbar__error">{dictionary[error]}</p>}
    </div>
  );
};

export default EditorToolbar;
