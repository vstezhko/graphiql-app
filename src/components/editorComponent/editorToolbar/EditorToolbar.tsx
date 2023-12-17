import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, useEffect, useContext } from 'react';
import { Button, IconButton } from '@mui/material';
import { fetchData, getSchema } from '../../../store/slices/graphQLThunk.ts';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { AppDispatch, RootState } from '../../../store/store.ts';
import {
  DictionaryKey,
  LanguageContext,
} from '../../../context/LanguageContext.tsx';
import {
  setDocumentation,
  setEndpoint,
  setError,
  setQueryBody,
  setQueryHeaders,
  setQueryVariables,
} from '../../../store/slices/editorsSlice.ts';
import { formatGraphQL, formatJSON } from '../../../utils/prettify.ts';

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
    dispatch(setError(null));
    try {
      dispatch(setQueryBody(formatGraphQL(queryBody)));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(error.message as DictionaryKey));
      }
    }
    if (queryVariables) dispatch(setQueryVariables(formatJSON(queryVariables)));
    if (queryHeaders) dispatch(setQueryHeaders(formatJSON(queryHeaders)));
  };

  useEffect(() => {
    if (endpointValue) {
      dispatch(getSchema());
    } else {
      dispatch(setDocumentation());
    }
  }, [endpointValue, queryHeaders]);

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
          disabled={!queryBody}
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
