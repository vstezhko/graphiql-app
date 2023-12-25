import { useDispatch, useSelector } from 'react-redux';
import CodeMirror from '@uiw/react-codemirror';
import { useCallback } from 'react';
import { PayloadAction } from '@reduxjs/toolkit';
import { tomorrowNightBlue } from '@uiw/codemirror-theme-tomorrow-night-blue';
import { RootState } from '../../../store/store.ts';
import { json } from '@codemirror/lang-json';
import { graphql } from 'cm6-graphql';

type StateValueName =
  | 'queryBody'
  | 'queryVariables'
  | 'queryHeaders'
  | 'response';

interface EditorProps {
  stateValueName: StateValueName;
  action?: (value: string) => PayloadAction<string>;
  className?: string;
  isJson?: boolean;
  isReadOnly?: boolean;
}

const Editor = ({
  stateValueName,
  action,
  className,
  isJson = false,
  isReadOnly = false,
}: EditorProps) => {
  const dispatch = useDispatch();
  const value = useSelector(
    (state: RootState) => state.editors[stateValueName]
  );

  const onChange = useCallback(
    (val: string) => {
      if (action) {
        dispatch(action(val));
      }
    },
    [dispatch, action]
  );

  let extensions;

  if (process.env.NODE_ENV !== 'test') {
    extensions = isJson ? [json()] : [graphql()];
  }

  return (
    <CodeMirror
      value={value}
      extensions={extensions}
      onChange={onChange}
      className={`editor ${className}`}
      basicSetup={{
        syntaxHighlighting: true,
        autocompletion: true,
        bracketMatching: true,
        highlightActiveLine: false,
        highlightActiveLineGutter: false,
      }}
      theme={tomorrowNightBlue}
      readOnly={isReadOnly}
      editable={!isReadOnly}
      data-testid={stateValueName}
    />
  );
};

export default Editor;
