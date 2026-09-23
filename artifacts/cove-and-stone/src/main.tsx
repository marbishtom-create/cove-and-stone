import { createRoot } from 'react-dom/client';

import App from './App';
import { ErrorBoundary } from '@/components/error-boundary';

import './index.css';

function normalizeBrowserPath() {
  const currentUrl = new URL(window.location.href);
  if (currentUrl.pathname !== '/' && !currentUrl.pathname.endsWith('/')) {
    currentUrl.pathname = `${currentUrl.pathname}/`;
    window.history.replaceState({}, '', currentUrl);
  }
}

if (
  typeof window !== 'undefined' &&
  window.location.hostname === 'www.coveandstonepools.com'
) {
  const canonicalUrl = new URL(window.location.href);
  canonicalUrl.hostname = 'coveandstonepools.com';
  canonicalUrl.protocol = 'https:';
  window.location.replace(canonicalUrl.toString());
} else if (typeof window !== 'undefined') {
  normalizeBrowserPath();
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
