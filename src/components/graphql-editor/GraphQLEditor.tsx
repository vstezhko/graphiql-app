import { useEffect, useState } from 'react';
import { makeRequest } from '../../api/api';
import { setQueryBody } from '../../store/slices/editorsSlice';
import Editor from '../editor/Editor';

const GraphQLEditor = () => {
  const [requestData, setRequestData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await makeRequest();
      setRequestData(data);
    };

    fetchData();
  }, []);

  console.log(requestData);

  return (
    <Editor
      stateValueName="queryBody"
      action={setQueryBody}
      className="graphql-editor"
    />
  );
};

export default GraphQLEditor;
