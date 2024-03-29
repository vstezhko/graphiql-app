import { RootState } from '../store/store';

export const makeRequest = async (state: RootState) => {
  const queryBody = state.editors.queryBody;
  const variablesString = state.editors.queryVariables;
  const headersString = state.editors.queryHeaders;
  const endpoint = state.editors.endpoint;

  let variables = {};
  if (variablesString) {
    try {
      variables = JSON.parse(variablesString);
    } catch (error) {
      // Api answer is enough to show error
    }
  }

  let headers = {};
  if (headersString) {
    try {
      headers = JSON.parse(headersString);
    } catch (error) {
      // Api answer is enough to show error
    }
  }

  return fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify({ query: queryBody, variables }),
  }).then((res) => res.json());
};

export const makeSchemaRequest = async (state: RootState) => {
  const headersString = state.editors.queryHeaders;
  const endpoint = state.editors.endpoint;

  let headers = {};
  if (headersString) {
    try {
      headers = JSON.parse(headersString);
    } catch (error) {
      // Api answer is enough to show error
    }
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify({
        operationName: 'IntrospectionQuery',
        query:
          'query IntrospectionQuery {__schema { queryType { name } mutationType { name } subscriptionType { name } types {...FullType} directives { name description locations args {...InputValue} } } }  fragment FullType on __Type {kind name description fields(includeDeprecated: true) { name description args { ...InputValue } type { ...TypeRef } isDeprecated deprecationReason } inputFields { ...InputValue } interfaces { ...TypeRef } enumValues(includeDeprecated: true) { name description isDeprecated deprecationReason } possibleTypes { ...TypeRef } }  fragment InputValue on __InputValue {   name   description   type { ...TypeRef }   defaultValue }  fragment TypeRef on __Type {   kind   name   ofType {     kind     name     ofType { kind  name  ofType {  kind name  ofType {  kind  name  ofType { kind name ofType {  kind  name  ofType {  kind  name  } } } } } } } } ',
        variables: {},
      }),
    });
    if (response.status === 401) {
      const responseBody = await response.text();
      const parsedResponse = JSON.parse(responseBody);
      throw new Error(`${parsedResponse.message}`);
    }

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
