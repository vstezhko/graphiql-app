import { useContext } from 'react';
import { DictionaryKey, LanguageContext } from '../context/LanguageContext';
import Layout from './../components/layout/Layout';

const NotFoundPage = ({ title, text }: { title: string; text: string }) => {
  const { dictionary } = useContext(LanguageContext);
  return (
    <Layout>
      <div className="container__img">
        <img src="../../public/error.png" alt="404" />
        <h1>{dictionary[title as DictionaryKey]}</h1>
        <p>{dictionary[text as DictionaryKey]}</p>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
