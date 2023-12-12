import { ReactNode, createContext, useState } from 'react';
import en from '../languages/en.json';
import ru from '../languages/ru.json';

export const dictionaries = { en, ru };

export type LanguageKeys = keyof typeof dictionaries;
export type DictionaryKey = keyof typeof en;

export const LanguageContext = createContext<{
  language: LanguageKeys;
  dictionary: typeof dictionaries.en;
  setLanguage: (newLanguage: LanguageKeys) => void;
}>({
  language: 'en',
  dictionary: dictionaries.en,
  setLanguage: () => {},
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<LanguageKeys>('en');

  return (
    <LanguageContext.Provider
      value={{ language, dictionary: dictionaries[language], setLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
