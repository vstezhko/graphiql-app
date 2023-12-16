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
        element: <EditorPage />,
      },
      {
        path: '/signIn',
        element: <SignIn />,
      },
      {
        path: '/signUp',
        element: <SignUp />,
      },
    ],
  },
]);
import './index.scss';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import EditorPage from './pages/editorPage/EditorPage.tsx';
import SignIn from './pages/SignIn.tsx';
import SignUp from './pages/SignUp.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
