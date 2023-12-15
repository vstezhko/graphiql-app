import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { ChangeEvent, useContext } from 'react';
import {
  setEndpoint,
  setError,
  setQueryBody,
  setQueryHeaders,
  setQueryVariables,
} from '../../store/slices/editorsSlice';
import { Button, IconButton } from '@mui/material';
import { fetchData } from '../../store/slices/graphQLThunk';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { LanguageContext } from '../../context/LanguageContext';
import { formatGraphQL, formatJSON } from '../../utils/prettify';

const EditorToolbar = () => {
  const dispatch: AppDispatch = useDispatch();
  const endpointValue = useSelector(
    (state: RootState) => state.editors.endpoint
  );
  const error = useSelector((state: RootState) => state.editors.error);
  const queryBody = useSelector((state: RootState) => state.editors.queryBody);
  const queryVariables = useSelector(
    (state: RootState) => state.editors.queryVariables
  );
  const queryHeaders = useSelector(
    (state: RootState) => state.editors.queryHeaders
  );
  const { dictionary } = useContext(LanguageContext);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEndpoint(event.target.value));
  };

  const handleRun = () => {
    queryBody ? dispatch(fetchData()) : dispatch(setError('enterQuery'));
  };

  const handlePrettify = () => {
    dispatch(setQueryBody(formatGraphQL(queryBody)));
    if (queryVariables) dispatch(setQueryVariables(formatJSON(queryVariables)));
    if (queryHeaders) dispatch(setQueryHeaders(formatJSON(queryHeaders)));
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
        <Button
          className="editor-toolbar__prettify-button"
          size="large"
          aria-label="prettify-request"
          onClick={handlePrettify}
          disabled={!queryBody}
        >
          {dictionary.prettify}
        </Button>
      </div>
      {error && <p className="editor-toolbar__error">{dictionary[error]}</p>}
    </div>
  );
};

export default EditorToolbar;
