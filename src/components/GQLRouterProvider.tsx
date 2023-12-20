import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App.tsx';
import MainPage from '../pages/mainPage/MainPage.tsx';
import ErrorPage from '../pages/ErrorPage.tsx';
import ErrorBoundary from './ErrorBoundary.tsx';
import SignIn from '../pages/SignIn.tsx';
import SignUp from '../pages/SignUp.tsx';

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
          element: <SignIn />,
        },
        {
          path: '/signUp',
          element: <SignUp />,
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
