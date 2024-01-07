import { render } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary.tsx';

const FallbackComponent = () => <div>Fallback Component</div>;

const ChildComponent = () => <div>Child Component</div>;
const ChildComponentWithError = () => {
  throw new Error('Custom error');
};

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    const { getByText, queryByText } = render(
      <ErrorBoundary fallback={<FallbackComponent />}>
        <ChildComponent />
      </ErrorBoundary>
    );

    expect(getByText('Child Component')).toBeInTheDocument();
    expect(queryByText('Fallback Component')).not.toBeInTheDocument();
  });
  it('renders children when there is no error', () => {
    const { queryByText } = render(
      <ErrorBoundary fallback={<FallbackComponent />}>
        <ChildComponentWithError />
      </ErrorBoundary>
    );

    expect(queryByText('Fallback Component')).toBeInTheDocument();
  });
});
