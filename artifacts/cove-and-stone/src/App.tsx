import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import Home from '@/pages/home';
import Pools from '@/pages/pools';
import Renovations from '@/pages/renovations';
import OutdoorLiving from '@/pages/outdoor-living';
import Projects from '@/pages/projects';
import ProjectDetail from '@/pages/project-detail';
import Design from '@/pages/design';
import Showroom from '@/pages/showroom';
import Financing from '@/pages/financing';
import Commercial from '@/pages/commercial';
import About from '@/pages/about';
import Contact from '@/pages/contact';
import LocationPage from '@/pages/location';
import Layout from '@/components/layout/layout';
import { SiteMetadata } from '@/components/seo/site-metadata';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Router() {
  return (
    <RoutedErrorBoundary>
      <Layout>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/pools/" component={Pools} />
          <Route path="/renovations/" component={Renovations} />
          <Route path="/outdoor-living/" component={OutdoorLiving} />
          <Route path="/projects/" component={Projects} />
          <Route path="/projects/:slug/" component={ProjectDetail} />
          <Route path="/design/" component={Design} />
          <Route path="/showroom/" component={Showroom} />
          <Route path="/financing/" component={Financing} />
          <Route path="/commercial/" component={Commercial} />
          <Route path="/about/" component={About} />
          <Route path="/contact/" component={Contact} />
          <Route path="/locations/:slug/" component={LocationPage} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

export type AppProps = {
  ssrPath?: string;
};

function App({ ssrPath }: AppProps = {}) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter
          base={import.meta.env.BASE_URL.replace(/\/$/, '')}
          ssrPath={ssrPath}
        >
          <SiteMetadata />
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
