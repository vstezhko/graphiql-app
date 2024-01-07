import { useContext } from 'react';
import { DictionaryKey, LanguageContext } from '../context/LanguageContext';

const ErrorPage = ({ title, text }: { title: string; text: string }) => {
  const { dictionary } = useContext(LanguageContext);
  return (
    <div className="container__img">
      <img src="/img/error.png" alt="404" />
      <h1>{dictionary[title as DictionaryKey]}</h1>
      <p>{dictionary[text as DictionaryKey]}</p>
    </div>
  );
};

export default ErrorPage;
