import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import EditorContainer from './components/editorComponent/editor-container/EditorContainer.tsx';
import MainPage from './pages/mainPage/MainPage.tsx';
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
        path: '/editor',
        element: <EditorContainer />,
      },
      {
        path: '/signIn',
        element: <EditorContainer />,
      },
      {
        path: '/signUp',
        element: <EditorContainer />,
      },
    ],
  },
]);
import './index.scss';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
