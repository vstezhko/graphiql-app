import { findFirstNonNullName } from '../../helpers/findFirstNonNullName.ts';
import { Documentation, Field, Type } from './DocumentationSection.tsx';
import { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../../context/LanguageContext.tsx';

interface TypesListProps {
  list: Documentation;
  handleTypeClick: (type: Documentation) => void;
  schema: Documentation[];
  root: Documentation;
}

const TypesList: React.FC<TypesListProps> = ({
  list,
  schema,
  handleTypeClick,
  root,
}) => {
  const renderList = list?.fields || list?.inputFields;

  const [argumentData, setArgumentData] = useState<{
    type: string;
    args: Field[];
  }>({ type: '', args: [] });

  const { dictionary } = useContext(LanguageContext);

  useEffect(() => {
    const gatheredArgs =
      root?.fields?.map((field) => ({
        type: field?.type?.name || findFirstNonNullName(field?.type) || '',
        args: field.args || [],
      })) || [];

    const arg = gatheredArgs.find((data) => data.type === list?.name);
    if (arg) {
      setArgumentData(arg);
    } else setArgumentData({ type: '', args: [] });
  }, [list?.name, root?.fields]);

  const findSchemaType = (name: string | null, type: Type) => {
    return schema.find(
      (l) => l.name === name || l.name === findFirstNonNullName(type)
    ) as Documentation;
  };

  return (
    <div className="doc-section__list">
      {argumentData && argumentData?.args?.length > 0 && (
        <>
          <span className="doc-section__line" />
          <div className="doc-section__args">
            <h4>{dictionary.arguments}</h4>
            {argumentData.args.map((arg) => {
              const res = findSchemaType(arg?.type?.name, arg.type);

              return (
                <p
                  className="doc-section__item"
                  data-testid="link"
                  onClick={() => handleTypeClick(res)}
                  key={arg.name}
                >{`{ ${arg.name} : ${findFirstNonNullName(arg?.type)} }`}</p>
              );
            })}
          </div>
          <span className="doc-section__line" />
        </>
      )}
      <p className="doc-section__title">{list?.name}</p>
      <p className="doc-section__description-item">{list?.description}</p>
      {renderList?.map((field: Field) => {
        const res = findSchemaType(field?.type?.name, field?.type);

        return (
          <div
            className="doc-section__item"
            data-testid="link"
            key={field.name}
            onClick={() => handleTypeClick(res)}
          >
            {field.name}:
            <span>
              {field?.type?.name || findFirstNonNullName(field?.type)}
            </span>
            <p className="doc-section__description">
              {<span>{field?.description}</span>}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default TypesList;
