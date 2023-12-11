import { RootState } from '../store/store';

export const makeRequest = async (state: RootState) => {
  const queryBody = state.editors.queryBody;
  const variablesString = state.editors.queryVariables;
  const headersString = state.editors.queryHeaders;

  let variables = {};
  if (variablesString) {
    try {
      variables = JSON.parse(variablesString);
    } catch (error) {
      console.error('An error occurred while parsing variables:', error);
    }
  }

  let headers = {};
  if (headersString) {
    try {
      headers = JSON.parse(headersString);
    } catch (error) {
      console.error('An error occurred while parsing headers:', error);
    }
  }

  return fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify({ query: queryBody, variables }),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error('An error occurred while making the request:', error);
    });
};
