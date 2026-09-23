import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal';

const rawPort = process.env.PORT;

if (!rawPort) {
  throw new Error(
    'PORT environment variable is required but was not provided.',
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH;

if (!basePath) {
  throw new Error(
    'BASE_PATH environment variable is required but was not provided.',
  );
}

function canonicalHostRedirect() {
  const redirectIfWww = (req: any, res: any, next: any) => {
    const host = String(req.headers.host ?? '').split(':')[0].toLowerCase();

    if (host !== 'www.coveandstonepools.com') {
      next();
      return;
    }

    const requestUrl = new URL(req.url || '/', 'https://www.coveandstonepools.com');
    const canonicalUrl = new URL('https://coveandstonepools.com');
    canonicalUrl.pathname = requestUrl.pathname;
    canonicalUrl.search = requestUrl.search;

    res.statusCode = 301;
    res.setHeader('Location', canonicalUrl.toString());
    res.end();
  };

  return {
    name: 'canonical-host-redirect',
    configureServer(server: any) {
      server.middlewares.use(redirectIfWww);
    },
    configurePreviewServer(server: any) {
      server.middlewares.use(redirectIfWww);
    },
  };
}

export default defineConfig({
  base: basePath,
  plugins: [
    canonicalHostRedirect(),
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== 'production' &&
    process.env.REPL_ID !== undefined
      ? [
          await import('@replit/vite-plugin-cartographer').then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, '..'),
            }),
          ),
          await import('@replit/vite-plugin-dev-banner').then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      '@assets': path.resolve(
        import.meta.dirname,
        '..',
        '..',
        'attached_assets',
      ),
    },
    dedupe: ['react', 'react-dom'],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, 'dist/public'),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: '0.0.0.0',
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: '0.0.0.0',
    allowedHosts: true,
  },
});
