import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { useCallback, useState } from 'react';
import '../../styles/components/Editor.scss';

interface EditorProps {
  isJson?: boolean;
}

const Editor = ({ isJson = false }: EditorProps) => {
  const [value, setValue] = useState('{ "name": "Иван", "age": 30 }');
  const onChange = useCallback((val: string) => {
    console.log('val:', val);
    setValue(val);
  }, []);
  return (
    <CodeMirror
      value={value}
      height="200px"
      width="500px"
      extensions={isJson ? [json()] : []}
      onChange={onChange}
      className="editor"
      basicSetup={{
        syntaxHighlighting: true,
        autocompletion: true,
      }}
    />
  );
};

export default Editor;
