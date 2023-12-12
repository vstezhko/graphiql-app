import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import TypesList from './TypesList.tsx';

export interface Type {
  kind: string;
  name: string | null;
  ofType: Type;
}

export interface Field {
  args?: Field[] | null;
  defaultValue: string | null;
  description: string | null;
  name: string | null;
  type: Type;
}

export interface Documentation {
  description: string | null;
  enumValues: null;
  fields: Field[] | null;
  inputFields: Field[] | null;
  interfaces: [] | null;
  kind: string;
  name: string;
  possibleTypes: null;
}

const DocumentationSection = () => {
  const doc = useSelector((state: RootState) => state.editors.documentation);
  const [isOpen, setIsOpen] = useState(false);
  const [schema, setSchema] = useState([]);
  const [schemaTypes, setSchemaTypes] = useState({
    queryType: null,
    mutationType: null,
    subscriptionType: null,
  });

  const [rootQuery, setRootQuery] = useState<Documentation | undefined>(
    undefined
  );
  const [queryTypes, setQueryTypes] = useState<
    Record<string, Documentation | undefined>
  >({ query: undefined, type: undefined, scalar: undefined });

  useEffect(() => {
    if (doc) {
      setSchema(JSON.parse(doc).data?.__schema?.types);
      setSchemaTypes({
        queryType: JSON.parse(doc).data?.__schema?.queryType?.name,
        mutationType:
          JSON.parse(doc).data?.__schema?.mutationType?.name || null,
        subscriptionType:
          JSON.parse(doc).data?.__schema?.subscriptionType?.name || null,
      });
    }
  }, [doc]);

  useEffect(() => {
    const root = schema?.find(
      (s: Documentation) => s.name === schemaTypes.queryType
    );
    setRootQuery(root);
  }, [schema, doc]);

  const handleCloseOpenSection = () => {
    setIsOpen(!isOpen);
  };

  const getTypes = (type: string | null, level: string) => {
    const dataType = schema?.find((s: Documentation) => s.name === type) as
      | Documentation
      | undefined;
    level === 'query' &&
      setQueryTypes((prev) => ({ ...prev, query: dataType }));
    level === 'types' &&
      setQueryTypes((prev) => ({ ...prev, types: dataType }));
    level === 'scalar' &&
      setQueryTypes((prev) => ({ ...prev, scalar: dataType }));
  };

  return (
    <div className={isOpen ? 'doc-section' : 'doc-section doc-section_close'}>
      {rootQuery && (
        <TypesList
          list={rootQuery}
          getTypes={getTypes}
          level="query"
          title="QUERY"
        />
      )}
      <span className="doc-section__line" />
      {queryTypes.query && (
        <TypesList
          list={queryTypes.query}
          getTypes={getTypes}
          level="types"
          title="TYPE DETAILS"
        />
      )}
      <span className="doc-section__line" />
      {queryTypes.types && (
        <TypesList
          list={queryTypes.types}
          getTypes={getTypes}
          title="TYPE DETAILS"
          level="scalar"
        />
      )}
      <span className="doc-section__line" />
      {queryTypes.scalar && (
        <TypesList
          list={queryTypes.scalar}
          getTypes={getTypes}
          title="TYPE DETAILS"
          level="scalar"
        />
      )}
      <button className="doc-section__btn" onClick={handleCloseOpenSection}>
        Schema
      </button>
    </div>
  );
};

export default DocumentationSection;
