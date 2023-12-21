import { ReactNode, Suspense } from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import App from '../App.tsx';
import WelcomePage from '../pages/welcomPage/WelcomePage.tsx';
import SignIn from '../pages/SignIn.tsx';
import SignUp from '../pages/SignUp.tsx';

import MainPage from '../pages/mainPage/MainPage.tsx';
import ErrorPage from '../pages/ErrorPage.tsx';
import ErrorBoundary from './ErrorBoundary.tsx';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const auth = localStorage.getItem('isLoggedIn') === 'true';

  if (!auth) {
    return <Navigate to={'/signIn'} replace />;
  }

  return children;
};

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
            <Suspense fallback={<h2>LOADING SUSPENSE</h2>}>
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
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
