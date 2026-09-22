import { createRoot } from 'react-dom/client';

import App from './App';
import { ErrorBoundary } from '@/components/error-boundary';

import './index.css';

if (
  typeof window !== 'undefined' &&
  window.location.hostname === 'www.coveandstonepools.com'
) {
  const canonicalUrl = new URL(window.location.href);
  canonicalUrl.hostname = 'coveandstonepools.com';
  canonicalUrl.protocol = 'https:';
  window.location.replace(canonicalUrl.toString());
}

createRoot(document.getElementById('root')!, {
  // Keeps caught errors off reportError(), which would raise the dev overlay.
  onCaughtError: (error, errorInfo) => {
    console.error(error, errorInfo.componentStack);
  },
}).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
);
