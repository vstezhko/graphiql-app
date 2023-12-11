import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/main',
        element: <MainPage />,
      },
      {
        path: '/signIn',
        element: <div>sign in</div>,
      },
      {
        path: '/signUp',
        element: <div>sign up</div>,
      },
    ],
  },
]);
import './index.scss';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import MainPage from './pages/mainPage/MainPage.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
