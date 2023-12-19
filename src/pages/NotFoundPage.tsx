import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import Layout from './../components/layout/Layout';

const NotFoundPage = () => {
  const { dictionary } = useContext(LanguageContext);
  return (
    <Layout>
      <div className="container__img">
        <img src="../../public/404.png" alt="404" />
        <p>{dictionary.notFoundText}</p>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
