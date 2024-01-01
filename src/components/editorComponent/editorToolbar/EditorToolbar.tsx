import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, useEffect, useContext } from 'react';
import { Button, IconButton } from '@mui/material';
import { fetchData, getSchema } from '../../../store/slices/graphQLThunk.ts';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import { AppDispatch, RootState } from '../../../store/store.ts';
import {
  DictionaryKey,
  LanguageContext,
} from '../../../context/LanguageContext.tsx';
import {
  setDocumentation,
  setEndpoint,
  setQueryBody,
  setQueryHeaders,
  setQueryVariables,
  setPrettifyError,
} from '../../../store/slices/editorsSlice.ts';
import { formatGraphQL, formatJSON } from '../../../utils/prettify.ts';

const EditorToolbar = () => {
  const dispatch: AppDispatch = useDispatch();
  const endpointValue = useSelector(
    (state: RootState) => state.editors.endpoint
  );
  const requestError = useSelector(
    (state: RootState) => state.editors.requestError
  );
  const queryBody = useSelector((state: RootState) => state.editors.queryBody);
  const isFetching = useSelector(
    (state: RootState) => state.editors.isFetchingQuery
  );

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
    dispatch(fetchData());
  };

  const handlePrettify = () => {
    dispatch(setPrettifyError(null));
    try {
      dispatch(setQueryBody(formatGraphQL(queryBody)));
      if (queryVariables)
        dispatch(setQueryVariables(formatJSON(queryVariables, 'Variables')));
      if (queryHeaders)
        dispatch(setQueryHeaders(formatJSON(queryHeaders, 'Headers')));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setPrettifyError(error.message as DictionaryKey));
      }
    }
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
          {isFetching === 'loading' ? (
            <PauseCircleFilledIcon />
          ) : (
            <PlayCircleFilledWhiteIcon />
          )}
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
      {requestError && (
        <p className="editor-toolbar__error">{dictionary[requestError]}</p>
      )}
    </div>
  );
};

export default EditorToolbar;
