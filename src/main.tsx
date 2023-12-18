import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import GQLRouterProvider from './components/GQLRouterProvider.tsx';
import LanguageProvider from './context/LanguageContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <LanguageProvider>
        <GQLRouterProvider />
      </LanguageProvider>
    </Provider>
  </React.StrictMode>
);
