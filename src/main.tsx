import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import MainPage from './pages/mainPage/MainPage.tsx';
import App from './App.tsx';
import LanguageProvider from './context/LanguageContext.tsx';
import ErrorBoundary from './components/errorBaundary/ErrorBoundary';
import FallBack from './components/errorBaundary/FallBack';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary fallback={<FallBack />}>
        <App />
      </ErrorBoundary>
    ),
    children: [
      {
        path: '/main',
        element: (
          <Suspense
            fallback={
              <div style={{ color: '#fff', zIndex: '100' }}>Loading...</div>
            }
          >
            <MainPage />
          </Suspense>
        ),
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
  {
    path: '*',
    element: <NotFoundPage title="notFoundTitle" text="notFoundText" />,
  },
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <LanguageProvider>
        <RouterProvider router={router} />
      </LanguageProvider>
    </Provider>
  </React.StrictMode>
);
