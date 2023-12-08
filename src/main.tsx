import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from './pages/mainPage/MainPage.tsx';
import App from './App.tsx';
import Layout from './components/layout/Layout.tsx';

const router = createBrowserRouter([
  {
    path: '/main',
    element: (
      <Layout>
        <MainPage />
      </Layout>
    ),
  },
  {
    path: '/editor',
    element: (
      <Layout>
        <App />
      </Layout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
