import { renderToString } from 'react-dom/server';
import { memoryLocation } from 'wouter/memory-location';

import { ErrorBoundary } from '@/components/error-boundary';
import App from './App';

export function renderApp(pathname: string) {
  const { hook } = memoryLocation({
    path: pathname,
    static: true,
  });

  return renderToString(
    <ErrorBoundary>
      <App locationHook={hook} />
    </ErrorBoundary>,
  );
}