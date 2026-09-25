import { ReactNode, useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { Logo } from '@/components/ui/logo';
import { THEME_CONFIG } from '@/config/theme';
import { Menu, X, ChevronRight } from 'lucide-react';
import './appointment-cta.css';
import { AppointmentCtaArrow, AppointmentCtaSurface } from './appointment-cta-elements';

export default function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerLogoVariant =
    isScrolled || mobileMenuOpen
      ? "light"
      : "default";
  const mobileMenuToggleRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const wasMobileMenuOpenRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setIsScrolled(false);
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    if (!mobileMenuOpen) {
      if (wasMobileMenuOpenRef.current) {
        mobileMenuToggleRef.current?.focus({ preventScroll: true });
      }
      wasMobileMenuOpenRef.current = false;
      return;
    }

    wasMobileMenuOpenRef.current = true;
    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstMobileLinkRef.current?.focus({ preventScroll: true });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground">
      {/* Header */}
      <header
        data-testid="site-header"
        data-header-state={isScrolled ? 'scrolled' : 'hero'}
        data-mobile-menu-state={mobileMenuOpen ? 'open' : 'closed'}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          mobileMenuOpen || isScrolled
            ? 'bg-background/90 backdrop-blur-md border-b border-border py-2'
            : 'bg-background/95 backdrop-blur-md border-b border-border py-1 lg:bg-transparent lg:backdrop-blur-none lg:border-transparent lg:py-2'
        }`}
      >
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
           <div className="relative shrink-0 lg:mr-8">
              <Logo variant={headerLogoVariant} imageClassName="w-[127px] md:w-[169px]" />
           </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {THEME_CONFIG.navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`text-sm tracking-widest uppercase transition-colors duration-300 hover:text-secondary ${
                  location === link.href ? 'text-secondary font-medium' : 'text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-primary hover:text-secondary transition-colors"
            type="button"
            data-testid="mobile-menu-toggle"
             ref={mobileMenuToggleRef}
            aria-controls="mobile-navigation"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {!location.startsWith("/projects/") && (
        <div className="layout-appointment-cta__dock fixed z-50 hidden drop-shadow-[0_8px_18px_rgba(0,0,0,0.25)] lg:flex">
          <Link
            href="/appointments/"
            className="layout-appointment-cta min-h-[4.1rem] w-full"
            data-testid="link-desktop-appointment-cta"
          >
            <AppointmentCtaSurface />
            <span className="layout-appointment-cta__copy">
              <span className="layout-appointment-cta__eyebrow">Design consultation</span>
              <span className="layout-appointment-cta__title">Start your project today</span>
            </span>
            <AppointmentCtaArrow />
          </Link>
        </div>
      )}

      {!location.startsWith("/projects/") && !mobileMenuOpen && (
        <div className="layout-appointment-cta__dock layout-appointment-cta__dock--mobile fixed z-50 drop-shadow-[0_8px_18px_rgba(0,0,0,0.25)] lg:hidden">
          <Link
            href="/appointments/"
            className="layout-appointment-cta min-h-[4.1rem] w-full"
            data-testid="link-mobile-sticky-appointment-cta"
          >
            <AppointmentCtaSurface />
            <span className="layout-appointment-cta__copy">
              <span className="layout-appointment-cta__eyebrow">Design consultation</span>
              <span className="layout-appointment-cta__title">Start your project today</span>
            </span>
            <AppointmentCtaArrow />
          </Link>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      <div 
        id="mobile-navigation"
        data-testid="mobile-menu-overlay"
        data-mobile-menu-state={mobileMenuOpen ? 'open' : 'closed'}
        role="dialog"
        aria-modal={mobileMenuOpen}
        aria-label="Mobile navigation"
        aria-hidden={!mobileMenuOpen}
        className={`fixed inset-0 bg-background/95 backdrop-blur-lg z-40 lg:hidden flex flex-col pt-28 px-6 transition-all duration-500 ease-in-out ${
          mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        }`}
      >
        <nav className="flex flex-col gap-6 text-xl font-serif">
          {THEME_CONFIG.navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              ref={link === THEME_CONFIG.navLinks[0] ? firstMobileLinkRef : undefined}
              tabIndex={mobileMenuOpen ? 0 : -1}
              className={`flex items-center justify-between border-b border-border pb-4 ${
                location === link.href ? 'text-secondary' : 'text-primary'
              }`}
            >
              {link.name}
              <ChevronRight size={20} className="text-muted-foreground" />
            </Link>
          ))}
        </nav>
        <div className="mt-auto pb-12">
          <Link
            href="/appointments/"
            tabIndex={mobileMenuOpen ? 0 : -1}
            className="layout-appointment-cta mx-auto min-h-[4.1rem] w-full"
            data-testid="link-mobile-appointment-cta"
          >
            <AppointmentCtaSurface />
            <span className="layout-appointment-cta__copy">
              <span className="layout-appointment-cta__eyebrow">Design consultation</span>
              <span className="layout-appointment-cta__title">Start your project today</span>
            </span>
            <AppointmentCtaArrow />
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full relative">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground pt-24 pb-12 border-t border-primary/20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 mb-16">
            <div className="flex flex-col gap-6">
              <Logo variant="dark" />
              <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mt-4">
                COVE & STONE is a Jacksonville design-build brand for modern pools and complete outdoor environments across Northeast Florida.
              </p>
            </div>
            
            <div>
              <h4 className="font-serif text-lg mb-6 uppercase tracking-widest text-secondary">Explore</h4>
              <nav className="flex flex-col gap-4 text-sm">
                {THEME_CONFIG.navLinks.slice(0, 5).map(link => (
                  <Link key={link.href} href={link.href} className="text-muted-foreground hover:text-white transition-colors">
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <h4 className="font-serif text-lg mb-6 uppercase tracking-widest text-secondary">Service Areas</h4>
              <nav className="flex flex-col gap-4 text-sm">
                {THEME_CONFIG.locations.map(loc => (
                  <Link key={loc.slug} href={`/locations/${loc.slug}/`} className="text-muted-foreground hover:text-white transition-colors">
                    {loc.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <h4 className="font-serif text-lg mb-6 uppercase tracking-widest text-secondary">Showroom</h4>
              <address className="not-italic text-muted-foreground text-sm flex flex-col gap-2">
                <p>{THEME_CONFIG.showroom.address}</p>
                <p>{THEME_CONFIG.showroom.city}, {THEME_CONFIG.showroom.state} {THEME_CONFIG.showroom.zip}</p>
                <p className="mt-4">{THEME_CONFIG.showroom.hours}</p>
                <a
                  href={`mailto:${THEME_CONFIG.contact.email}`}
                  className="mt-2 text-secondary transition-colors hover:text-white"
                >
                  {THEME_CONFIG.contact.email}
                </a>
              </address>
              <div className="mt-8 flex flex-col gap-2 text-sm text-muted-foreground">
                <p>Construction support: Urban Green Energy, LLC</p>
                <p>Flexible financing options, including Lyon Financial and other partners</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Cove & Stone. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy/" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms/" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}