import { PropsWithChildren, Suspense, useMemo } from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import App from '../App.tsx';
import WelcomePage from '../pages/welcomPage/WelcomePage.tsx';
import SignIn from '../pages/SignIn.tsx';
import SignUp from '../pages/SignUp.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store.ts';
import MainPage from '../pages/mainPage/MainPage.tsx';

const ProtectedRoute = ({
  isAllowed,
  children,
}: PropsWithChildren<{
  isAllowed: boolean;
}>) => {
  if (!isAllowed) {
    return <Navigate to={'/'} replace />;
  }
  return children;
};
const GQLRouterProvider = () => {
  const { isLoading, status } = useSelector(
    (state: RootState) => state.isLoggedIn
  );

  const isAllowed = useMemo(() => !isLoading && !status, [isLoading, status]);
  const isLoggedIn = useMemo(() => status, [status]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Suspense fallback={<h2>LOADING SUSPENSE</h2>}>
          <App />
        </Suspense>
      ),
      children: [
        {
          path: '/',
          element: <WelcomePage />,
        },
        {
          path: '/main',
          element: (
            <ProtectedRoute isAllowed={isLoggedIn}>
              <MainPage />
            </ProtectedRoute>
          ),
        },
        {
          path: '/signIn',
          element: (
            <ProtectedRoute isAllowed={isAllowed}>
              <SignIn />
            </ProtectedRoute>
          ),
        },
        {
          path: '/signUp',
          element: (
            <ProtectedRoute isAllowed={isAllowed}>
              <SignUp />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
export default GQLRouterProvider;
