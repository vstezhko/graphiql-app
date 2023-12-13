import { findFirstNonNullName } from '../../helpers/findFirstNonNullName.ts';
import { Documentation, Field } from './DocumentationSection.tsx';

interface TypesListProps {
  list: Documentation;
  title?: string;
  handleTypeClick: (type: Documentation) => void;
  schema: Documentation[];
}

const TypesList: React.FC<TypesListProps> = ({
  list,
  title,
  schema,
  handleTypeClick,
}) => {
  const renderList = list?.fields || list?.inputFields;
  return (
    <div className="doc-section__list">
      <p className="doc-section__title">
        {title} {title !== 'QUERY' && list?.name}
      </p>
      <p className="doc-section__description-item">{list?.description}</p>
      {renderList?.map((field: Field) => {
        const res = schema.find(
          (l) =>
            l.name === field?.type?.name ||
            l.name === findFirstNonNullName(field?.type)
        ) as Documentation;

        return (
          <div
            className="doc-section__item"
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
