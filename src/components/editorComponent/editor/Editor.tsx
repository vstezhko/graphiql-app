import { useDispatch, useSelector } from 'react-redux';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { useCallback } from 'react';
import { PayloadAction } from '@reduxjs/toolkit';
import { graphql } from 'cm6-graphql';
import { tomorrowNightBlue } from '@uiw/codemirror-theme-tomorrow-night-blue';
import { RootState } from '../../../store/store.ts';

type StateValueName = 'queryBody' | 'queryVariables' | 'queryHeaders';

interface EditorProps {
  stateValueName: StateValueName;
  action: (value: string) => PayloadAction<string>;
  className?: string;
  isJson?: boolean;
}

const Editor = ({
  stateValueName,
  action,
  className,
  isJson = false,
}: EditorProps) => {
  const dispatch = useDispatch();
  const value = useSelector(
    (state: RootState) => state.editors[stateValueName]
  );

  const onChange = useCallback(
    (val: string) => {
      dispatch(action(val));
    },
    [dispatch, action]
  );

  return (
    <CodeMirror
      value={value}
      extensions={isJson ? [json()] : [graphql()]}
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
    />
  );
};

export default Editor;