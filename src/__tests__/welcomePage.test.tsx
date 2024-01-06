import { render, waitFor } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import WelcomePage from '../pages/welcomPage/WelcomePage.tsx';
import LanguageProvider from '../context/LanguageContext.tsx';
import { store } from '../store/store';
import { Provider } from 'react-redux';

// vi.mock('../components/editorComponent/editorToolbar/EditorToolbar', () => {
//   return {
//     default: () => <div>EditorToolbar</div>,
//   };
// });

const mockGetItem = vi.fn();
const mockSetItem = vi.fn();
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: (...args: string[]) => mockGetItem(...args),
    setItem: (...args: string[]) => mockSetItem(...args),
  },
});

test('renders welcome page', async () => {
  render(
    <Provider store={store}>
      <LanguageProvider>
        <WelcomePage />
      </LanguageProvider>
    </Provider>
  );

  const welcomePage = screen.getByTestId('welcome-page');

  await waitFor(() => {
    expect(welcomePage).toBeDefined();
  });
});
