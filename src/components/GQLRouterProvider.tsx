import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App.tsx';
import MainPage from '../pages/mainPage/MainPage.tsx';
import ErrorPage from '../pages/ErrorPage.tsx';
import ErrorBoundary from './ErrorBoundary.tsx';

const GQLRouterProvider = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ErrorBoundary
          fallback={<ErrorPage title="errorTitle" text="errorText" />}
        >
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
      element: <ErrorPage title="notFoundTitle" text="notFoundText" />,
    },
  ]);

  return <RouterProvider router={router} />;
};
export default GQLRouterProvider;
