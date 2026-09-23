import { useParams, Link } from 'wouter';
import { THEME_CONFIG } from '@/config/theme';
import { MapPin, ArrowRight } from 'lucide-react';
import heroImg from '@assets/generated_images/hero-pool.jpg';

export default function LocationPage() {
  const { slug } = useParams();
  const locationInfo = THEME_CONFIG.locations.find(l => l.slug === slug);

  if (!locationInfo) {
    return (
      <div className="min-h-[60dvh] flex flex-col items-center justify-center pt-24 lg:pt-40">
        <h1 className="text-4xl font-serif mb-4">Location Not Found</h1>
        <Link href="/" className="text-secondary hover:underline">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="w-full pt-24 lg:pt-40">
      <header className="relative h-[50dvh] min-h-[400px] flex items-center bg-primary">
        <div className="absolute inset-0">
          <img 
            src={heroImg} 
            alt={`Custom pools in ${locationInfo.name}`} 
            className="w-full h-full object-cover opacity-40 grayscale-[30%]"
          />
        </div>
        <div className="container mx-auto px-6 max-w-7xl relative z-10 text-white text-center">
          <MapPin className="w-12 h-12 text-secondary mx-auto mb-6" />
          <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight drop-shadow-lg">
            {locationInfo.name} <br/> Pool Builder
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto font-light drop-shadow-md">
            Luxury custom pools, spas, and outdoor living environments designed exclusively for {locationInfo.name} properties.
          </p>
        </div>
      </header>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl font-serif text-primary mb-8">Elevating {locationInfo.name} Backyards</h2>
          <div className="space-y-6 text-muted-foreground leading-relaxed text-lg mb-12 text-left">
            <p>
              As a premier design-build house serving {locationInfo.name}, Cove & Stone understands the specific architectural nuances and environmental requirements of the area. We design outdoor living spaces that complement the local aesthetic—whether it's a coastal modern retreat or a classic resort-style estate.
            </p>
            <p>
              From initial 3D visualization tailored to your {locationInfo.name} lot through material selection, engineering, permitting and construction coordination, Cove & Stone keeps the experience organized around one design direction. Urban Green Energy, LLC supports the in-house GC and construction structure, while regulated pool work is coordinated with the appropriately licensed pool contractor or qualifier for the applicable scope.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/projects" className="bg-card text-primary border border-border px-8 py-4 uppercase tracking-widest text-sm hover:border-secondary transition-colors inline-flex items-center justify-center gap-2">
              View Case Studies
            </Link>
            <Link href="/contact" className="bg-primary text-primary-foreground px-8 py-4 uppercase tracking-widest text-sm hover:bg-secondary transition-colors inline-flex items-center justify-center gap-2">
              Schedule {locationInfo.name} Consultation <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
