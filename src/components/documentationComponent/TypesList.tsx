import { findFirstNonNullName } from '../../helpers/findFirstNonNullName.ts';
import { Documentation, Field } from './DocumentationSection.tsx';

interface TypesListProps {
  list: Documentation;
  level?: string | undefined;
  title: string;
  getTypes?: (type: string | null, level: string) => void;
}

const TypesList: React.FC<TypesListProps> = ({
  list,
  getTypes,
  level,
  title,
}) => {
  return (
    <div className="doc-section__list">
      <p className="doc-section__title">
        {title} {title !== 'QUERY' && list?.name}
      </p>
      {list?.fields?.map((field: Field) => (
        <div
          className="doc-section__item"
          key={field.name}
          onClick={() =>
            getTypes
              ? getTypes(
                  field?.type?.name || findFirstNonNullName(field?.type),
                  level ? level : ''
                )
              : null
          }
        >
          {field.name} :
          <span>{field?.type?.name || findFirstNonNullName(field?.type)}</span>
          <p className="doc-section__description">
            {<span>{field?.description}</span>}
          </p>
        </div>
      ))}
      <p>{list?.description}</p>
    </div>
  );
};

export default TypesList;
