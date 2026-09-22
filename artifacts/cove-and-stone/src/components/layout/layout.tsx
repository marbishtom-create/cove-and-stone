import { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Logo } from '@/components/ui/logo';
import { THEME_CONFIG } from '@/config/theme';
import { Menu, X, ChevronRight, Phone } from 'lucide-react';

export default function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-background/90 backdrop-blur-md border-b border-border py-4' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
          <Logo />
          
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

          <div className="hidden lg:flex items-center gap-6">
            <a href="tel:904-555-0199" className="text-sm font-medium flex items-center gap-2 hover:text-secondary transition-colors">
              <Phone size={16} />
              (904) 555-0199
            </a>
            <Link 
              href="/contact" 
              className="bg-primary text-primary-foreground px-6 py-3 text-sm tracking-widest uppercase hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
            >
              Start Your Project
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-primary hover:text-secondary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-background/95 backdrop-blur-lg z-40 lg:hidden flex flex-col pt-28 px-6 transition-all duration-500 ease-in-out ${
          mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        }`}
      >
        <nav className="flex flex-col gap-6 text-xl font-serif">
          {THEME_CONFIG.navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={`flex items-center justify-between border-b border-border pb-4 ${
                location === link.href ? 'text-secondary' : 'text-primary'
              }`}
            >
              {link.name}
              <ChevronRight size={20} className="text-muted-foreground" />
            </Link>
          ))}
        </nav>
        <div className="mt-auto pb-12 flex flex-col gap-6">
          <Link 
            href="/contact" 
            className="bg-primary text-primary-foreground text-center py-4 text-sm tracking-widest uppercase w-full"
          >
            Start Your Project
          </Link>
          <a href="tel:904-555-0199" className="text-center font-medium flex items-center justify-center gap-2">
            <Phone size={18} />
            (904) 555-0199
          </a>
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
              <Logo className="invert brightness-0" />
              <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mt-4">
                Jacksonville and Ponte Vedra's premier architectural outdoor-living design-build house. We create custom pools, spas, and complete backyard environments that elevate coastal living.
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
                  <Link key={loc.slug} href={`/locations/${loc.slug}`} className="text-muted-foreground hover:text-white transition-colors">
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
              </address>
              <div className="mt-8 flex flex-col gap-2 text-sm text-muted-foreground">
                <p>Construction: In-house GC Urban Green Energy LLC</p>
                <p>Financing through Lyon Financial (Subject to lender approval)</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Cove & Stone. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
