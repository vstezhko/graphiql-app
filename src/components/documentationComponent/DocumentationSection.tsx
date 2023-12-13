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

  console.log(allSchemaTypes);

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
      {selectedType ? (
        <>
          <button onClick={handleBackClick}>Back</button>
          <TypesList
            list={selectedType}
            handleTypeClick={handleTypeClick}
            schema={schema}
          />
        </>
      ) : (
        <div className="doc-section__list">
          <h3>Root Type</h3>
          {rootQuery && (
            <div
              className="doc-section__item"
              onClick={() => handleTypeClick(rootQuery)}
            >
              {rootQuery?.name}
            </div>
          )}
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
        </div>
      )}
      <button className="doc-section__btn" onClick={handleCloseOpenSection}>
        Schema
      </button>
    </div>
  );
};

export default DocumentationSection;
