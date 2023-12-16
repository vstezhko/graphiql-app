import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import TypesList from './TypesList.tsx';
import { Button, CircularProgress } from '@mui/material';

export interface Type {
  kind: string;
  name: string | null;
  ofType: Type;
}

export interface Field {
  args: Field[] | null;
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
  const isFetching = useSelector(
    (state: RootState) => state.editors.isFetching
  );
  const [isOpen, setIsOpen] = useState(false);
  const [schema, setSchema] = useState([]);
  const [schemaTypes, setSchemaTypes] = useState({
    queryType: null,
    mutationType: null,
    subscriptionType: null,
  });

  const [allSchemaTypes, setAllSchemaTypes] = useState<
    Documentation[] | undefined
  >(undefined);

  const [rootQuery, setRootQuery] = useState<Documentation | undefined>(
    undefined
  );
  const [selectedType, setSelectedType] = useState<Documentation | null>(null);

  const [history, setHistory] = useState<Documentation[]>([]);

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
    } else {
      setSchema([]);
    }
  }, [doc]);

  useEffect(() => {
    const root = schema?.find(
      (s: Documentation) => s.name === schemaTypes.queryType
    );
    const allTypes = schema?.filter(
      (s: Documentation) =>
        s.name !== schemaTypes.queryType && !s.name.startsWith('_')
    );
    setRootQuery(root);
    setAllSchemaTypes(allTypes);
  }, [schema, doc]);

  useEffect(() => {
    if (schema && schema?.length > 0) {
      setIsOpen(true);
    } else setIsOpen(false);
  }, [schema]);

  const handleCloseOpenSection = () => {
    setIsOpen(!isOpen);
  };

  const handleTypeClick = (type: Documentation) => {
    setHistory([...history, type]);
    setSelectedType(type);
  };

  const handleBackClick = () => {
    const newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory);
    setSelectedType(newHistory[newHistory.length - 1] || null);
  };

  return (
    <div className={isOpen ? 'doc-section' : 'doc-section doc-section_close'}>
      {selectedType && rootQuery ? (
        <>
          <Button className="doc-section__back-btn" onClick={handleBackClick}>
            Back
          </Button>
          <TypesList
            list={selectedType}
            handleTypeClick={handleTypeClick}
            schema={schema}
            root={rootQuery}
          />
        </>
      ) : (
        <div className="doc-section__list">
          {rootQuery && (
            <>
              <h3>Root Type</h3>
              <div
                className="doc-section__item"
                onClick={() => handleTypeClick(rootQuery)}
              >
                {rootQuery?.name}
              </div>
            </>
          )}
          {allSchemaTypes && allSchemaTypes.length > 0 && (
            <>
              <h3>All Schema Types</h3>
              {allSchemaTypes?.map((type) => (
                <div
                  className="doc-section__item"
                  key={type.name}
                  onClick={() => handleTypeClick(type)}
                >
                  {type.name}
                </div>
              ))}
            </>
          )}
        </div>
      )}

      <Button
        className="doc-section__btn"
        onClick={handleCloseOpenSection}
        disabled={!schema || schema?.length === 0}
      >
        {isFetching !== 'loading' ? (
          'Schema'
        ) : (
          <CircularProgress className="doc-section__progress" />
        )}
      </Button>
    </div>
  );
};

export default DocumentationSection;
