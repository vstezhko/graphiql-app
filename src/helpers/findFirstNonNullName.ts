import { Type } from '../components/documentationComponent/DocumentationSection.tsx';

export const findFirstNonNullName = (obj: Type): string | null => {
  if (obj && obj.name !== null) {
    return obj.name as string;
  } else if (obj && obj.ofType) {
    return findFirstNonNullName(obj.ofType);
  } else {
    return null;
  }
};
