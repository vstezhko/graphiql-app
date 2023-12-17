import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import './index.scss';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import GQLRouterProvider from './components/GQLRouterProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <GQLRouterProvider />
    </Provider>
  </React.StrictMode>
);
