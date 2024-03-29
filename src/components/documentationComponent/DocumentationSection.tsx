import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import TypesList from './TypesList.tsx';
import { Button, CircularProgress } from '@mui/material';
import { LanguageContext } from '../../context/LanguageContext.tsx';

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
    (state: RootState) => state.editors.isFetchingSchema
  );
  const { dictionary } = useContext(LanguageContext);
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
  }, [schema, schemaTypes.queryType]);

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

  const isDisabled = !schema || schema?.length === 0;

  return (
    <div
      data-testid="docSection"
      className={`${isDisabled && 'doc-section_disabled'}
          ${isOpen ? 'doc-section' : 'doc-section doc-section_close'}`}
    >
      {selectedType && rootQuery ? (
        <>
          <Button
            className="doc-section__back-btn"
            data-testid="backBtn"
            onClick={handleBackClick}
          >
            {dictionary.backButton}
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
              <h3>{dictionary.rootType}</h3>
              <div
                className="doc-section__item"
                data-testid="link"
                onClick={() => handleTypeClick(rootQuery)}
              >
                {rootQuery?.name}
              </div>
            </>
          )}
          {allSchemaTypes && allSchemaTypes.length > 0 && (
            <>
              <h3>{dictionary.schemaTypes}</h3>
              {allSchemaTypes?.map((type) => (
                <div
                  className="doc-section__item"
                  data-testid="link"
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
        data-testid="openBtn"
        onClick={handleCloseOpenSection}
        disabled={isDisabled}
      >
        {isFetching !== 'loading' ? (
          dictionary.schema
        ) : (
          <CircularProgress
            data-testid="сircularProgress"
            className="doc-section__progress"
          />
        )}
      </Button>
    </div>
  );
};

export default DocumentationSection;
