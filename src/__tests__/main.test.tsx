import { render, screen, waitFor } from '@testing-library/react';
import MainPage from '../pages/mainPage/MainPage';
import { store } from '../store/store';
import { Provider } from 'react-redux';

vi.mock('../components/editorComponent/editorToolbar/EditorToolbar', () => {
  return {
    default: () => <div>EditorToolbar</div>,
  };
});
vi.mock('../components/editorComponent/editorContainer/EditorContainer', () => {
  return {
    default: () => <div>EditorContainer</div>,
  };
});
vi.mock('../components/documentationComponent/DocumentationSection', () => {
  return {
    default: () => <div>DocumentationSection</div>,
  };
});

describe('MainPage', () => {
  it('renders without crashing', async () => {
    render(
      <Provider store={store}>
        <MainPage />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('EditorToolbar')).toBeInTheDocument();
      expect(screen.getByText('EditorContainer')).toBeInTheDocument();
      expect(screen.getByText('DocumentationSection')).toBeInTheDocument();
    });
  });
});
