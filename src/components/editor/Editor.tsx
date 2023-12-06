import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { useCallback, useState } from 'react';
import '../../styles/components/Editor.scss';

interface EditorProps {
  className?: string;
  initValue?: string;
  isJson?: boolean;
}

const Editor = ({ className, isJson = false, initValue = '' }: EditorProps) => {
  const [value, setValue] = useState(initValue);
  const onChange = useCallback((val: string) => {
    console.log('val:', val);
    setValue(val);
  }, []);
  return (
    <CodeMirror
      value={value}
      extensions={isJson ? [json()] : []}
      onChange={onChange}
      className={`editor ${className}`}
      basicSetup={{
        syntaxHighlighting: true,
        autocompletion: true,
      }}
    />
  );
};

export default Editor;
