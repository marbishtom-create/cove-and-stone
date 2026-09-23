import { renderToString } from 'react-dom/server';

import { ErrorBoundary } from '@/components/error-boundary';
import App from './App';

export function renderApp(pathname: string) {
  return renderToString(
    <ErrorBoundary>
      <App ssrPath={pathname} />
    </ErrorBoundary>,
  );
}