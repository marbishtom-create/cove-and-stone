import { useParams, Link } from 'wouter';
import { THEME_CONFIG } from '@/config/theme';
import { getRouteSeo } from '@/config/seo-routes';
import { MapPin, ArrowRight } from 'lucide-react';
import heroImg from '@assets/generated_images/hero-pool.jpg';

type LowerLocationContent = {
  h1: string;
  hero: string;
  introHeading: string;
  intro: string[];
  cards: { title: string; text: string }[];
};

const LOWER_LOCATION_CONTENT: Record<string, LowerLocationContent> = {
  'queens-harbour': {
    h1: 'Queens Harbour Pool & Outdoor Living Design',
    hero: 'Waterfront-oriented outdoor living concepts shaped around the harbour and lagoon setting associated with Queens Harbour in Jacksonville.',
    introHeading: 'Let the setting guide the outdoor room.',
    intro: [
      'Queens Harbour is associated with a yacht and country-club community and a harbour and lagoon lock setting. That context can inform how a backyard is composed: where views are held, how circulation moves between the home and pool, and how shade and gathering areas frame the water-oriented experience.',
      'Cove & Stone can explore a custom pool and spa, outdoor kitchen, pergola, fire feature and material palette as one design direction. The imagery and language on this page are design guidance, not a claim of completed work in Queens Harbour.',
    ],
    cards: [
      { title: 'View-led geometry', text: 'Pool proportions, spa placement and sight lines can be considered around the home, outdoor rooms and available views.' },
      { title: 'Harbour-side atmosphere', text: 'Shade, seating, lighting and fire features can shape a comfortable setting for gathering near the water.' },
      { title: 'Material continuity', text: 'Pavers, porcelain, marble, natural stone and artificial turf can be reviewed as one palette for pool edges, paths and living areas.' },
      { title: 'Connected entertaining', text: 'An outdoor kitchen, pergola or cabana can be coordinated with the pool, spa and movement through the backyard.' },
    ],
  },
  'deerwood': {
    h1: 'Refined Pool & Outdoor Living Design for Deerwood',
    hero: 'Estate-style pool and outdoor-living concepts considered for Deerwood’s established, gated Jacksonville setting and mature residential character.',
    introHeading: 'A composed setting for established homes.',
    intro: [
      'Deerwood is an established gated Jacksonville community associated with Deerwood Country Club, mature residential character and larger homes. Those facts provide general design context for an outdoor environment that should feel proportional to the architecture and settled into its surroundings.',
      'The direction can bring together a custom pool, spa, stone or porcelain decking, turf, an outdoor kitchen, pergola, cabana, fire feature and lighting. Each element is reviewed for the specific property; this page does not claim completed work or local project history.',
    ],
    cards: [
      { title: 'Estate-scale proportions', text: 'Pool geometry, spa placement and outdoor rooms can be composed to relate to a larger home and its existing landscape.' },
      { title: 'Mature landscape setting', text: 'Paths, planting areas, shade and lighting can be coordinated so new work sits comfortably within the established backyard.' },
      { title: 'Layered materials', text: 'Marble, porcelain, natural stone and pavers can be reviewed with coping, tile and artificial turf for a measured palette.' },
      { title: 'Entertaining with restraint', text: 'Kitchens, pergolas, cabanas and fire features can support gatherings while keeping the pool environment visually cohesive.' },
    ],
  },
  'e-town': {
    h1: 'Clean Contemporary Pool Design for eTown',
    hero: 'Contemporary pool and outdoor-living concepts shaped around eTown’s modern master-planned Jacksonville setting and emphasis on thoughtful design.',
    introHeading: 'A clean direction for connected outdoor living.',
    intro: [
      'eTown is associated with a modern master-planned Jacksonville community that emphasizes thoughtful design, technology, convenience and sustainability. Those public characteristics can provide a general lens for a backyard with clear geometry, useful circulation and a deliberate relationship between the home and landscape.',
      'A custom pool and spa can be planned with outdoor kitchens, pergolas, pavers, porcelain, marble, turf, fire features and lighting. The final scope depends on the property and priorities, and this page describes a design approach rather than completed local work.',
    ],
    cards: [
      { title: 'Clean geometry', text: 'Pool, spa and sun-shelf proportions can be organized around the home, sight lines and the way the backyard will be used.' },
      { title: 'Practical connections', text: 'Paths, shade, seating and outdoor kitchens can support an easy transition between indoor and outdoor spaces.' },
      { title: 'Material discipline', text: 'Porcelain, pavers, marble, natural stone and artificial turf can be compared for a consistent contemporary palette.' },
      { title: 'Lighting and landscape', text: 'Lighting and planting direction can be considered with the pool and outdoor rooms instead of treated as late additions.' },
    ],
  },
  'tamaya': {
    h1: 'Tamaya Pool & Outdoor Living Design',
    hero: 'Cohesive pool and outdoor-living concepts for Tamaya’s gated Jacksonville setting, with material direction shaped by its Spanish, Tuscan and Mediterranean-influenced architecture.',
    introHeading: 'Let the architecture carry outside.',
    intro: [
      'Tamaya is a gated and master-planned Jacksonville community known for Spanish, Tuscan and Mediterranean-influenced residential architecture and a location between the city and the beaches. That architectural context can guide the relationship between pool geometry, shade, materials and the home.',
      'Cove & Stone can develop a complete direction around a custom pool or renovation, spa, pavers, porcelain, marble, turf, outdoor kitchen, pergola, fire feature and lighting. The concepts shown here are general design guidance and do not represent completed Tamaya projects.',
    ],
    cards: [
      { title: 'Architectural alignment', text: 'Pool edges, coping, shade structures and outdoor rooms can echo the home’s proportions and material language.' },
      { title: 'Warm material palette', text: 'Pavers, porcelain, marble and natural stone can be reviewed with tile and turf to balance texture, tone and use.' },
      { title: 'Pool and spa composition', text: 'A custom pool, integrated or raised spa and sun shelf can be planned as one connected architectural element.' },
      { title: 'Outdoor rooms', text: 'Kitchens, pergolas, cabanas, fire features and lighting can extend the home’s living pattern into the backyard.' },
    ],
  },
  'julington-creek': {
    h1: 'Julington Creek Pool & Outdoor Living Design',
    hero: 'Family-focused pool and outdoor-living concepts shaped around the lakes, nature-preserve and recreation setting associated with Julington Creek Plantation.',
    introHeading: 'A backyard that supports everyday life.',
    intro: [
      'Julington Creek Plantation is a large community in northwest St. Johns County associated with lakes, nature-preserve areas and recreation. That broader setting can inform a family-focused backyard with clear zones for swimming, gathering, shade, play and connection to the landscape.',
      'A custom pool or renovation can be coordinated with a spa, pavers, porcelain, marble, artificial turf, outdoor kitchen, pergola, fire feature and lighting. The property and intended use determine the final direction; this page makes no claim of completed work in the community.',
    ],
    cards: [
      { title: 'Family flow', text: 'Pool geometry, sun shelves and seating can be arranged around the ways the backyard will support everyday use and gatherings.' },
      { title: 'Landscape relationship', text: 'Paths, planting areas, shade and lighting can connect the pool environment to the broader landscape setting.' },
      { title: 'Durable visual rhythm', text: 'Pavers, porcelain, marble, natural stone and artificial turf can distinguish activity areas while keeping the palette unified.' },
      { title: 'Flexible gathering', text: 'Outdoor kitchens, pergolas, cabanas and fire features can create spaces for meals, shade and evening use.' },
    ],
  },
};

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

  const isPonteVedraBeach = locationInfo.slug === 'ponte-vedra-beach';
  const isStJohns = locationInfo.slug === 'st-johns';
  const isJacksonvilleBeaches = locationInfo.slug === 'jacksonville-beaches';
  const ponteSeo = getRouteSeo('/locations/ponte-vedra-beach');
  const stJohnsSeo = getRouteSeo('/locations/st-johns');
  const jacksonvilleBeachesSeo = getRouteSeo('/locations/jacksonville-beaches');
  const lowerLocationContent = LOWER_LOCATION_CONTENT[locationInfo.slug];
  const lowerLocationSeo = lowerLocationContent
    ? getRouteSeo(`/locations/${locationInfo.slug}`)
    : undefined;

  return (
    <div className="w-full pt-24 lg:pt-40">
      <header className="relative h-[50dvh] min-h-[400px] flex items-center bg-primary">
        <div className="absolute inset-0">
          <img 
            src={heroImg} 
            alt={isPonteVedraBeach || isStJohns || isJacksonvilleBeaches || lowerLocationContent
              ? 'Concept visualization of a modern pool and outdoor-living environment'
              : `Custom pools in ${locationInfo.name}`} 
            className="w-full h-full object-cover opacity-40 grayscale-[30%]"
            width={1600}
            height={900}
            fetchPriority="high"
          />
        </div>
        <div className="container mx-auto px-6 max-w-7xl relative z-10 text-white text-center">
          <MapPin className="w-12 h-12 text-secondary mx-auto mb-6" />
          <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight drop-shadow-lg">
            {isPonteVedraBeach
              ? 'Ponte Vedra Beach Pool Builder'
              : isStJohns
                ? 'St. Johns Pool Builder'
                : isJacksonvilleBeaches
                  ? 'Custom Pools & Outdoor Living for the Jacksonville Beaches'
                : lowerLocationContent
                  ? lowerLocationContent.h1
                : <>{locationInfo.name} <br/> Pool Builder</>}
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto font-light drop-shadow-md">
            {isPonteVedraBeach
              ? 'Luxury custom pools, spas and complete outdoor living environments shaped around the architecture and everyday life of Ponte Vedra Beach homes.'
              : isStJohns
                ? 'Luxury custom pools, spas and complete outdoor living environments shaped around St. Johns, Florida homes.'
                : isJacksonvilleBeaches
                  ? 'Coastal-style outdoor living can be designed as one connected environment for Atlantic Beach, Jacksonville Beach, Neptune Beach, nearby Ponte Vedra Beach and the surrounding Jacksonville Beaches.'
                : lowerLocationContent
                  ? lowerLocationContent.hero
              : `Luxury custom pools, spas, and outdoor living environments designed exclusively for ${locationInfo.name} properties.`}
          </p>
        </div>
      </header>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          {isPonteVedraBeach ? (
            <>
              <div className="max-w-4xl mx-auto text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-serif text-primary mb-8">A quieter kind of coastal luxury.</h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed text-lg text-left">
                  <p>
                    Ponte Vedra Beach homes call for outdoor spaces that feel composed rather than overworked. Cove & Stone develops clean-lined pool geometry, integrated spas and sun shelves, and complete outdoor environments that connect the architecture to the way the property is lived in.
                  </p>
                  <p>
                    The direction can be restrained and modern or layered like a private resort: a geometric pool, a shaded pergola, an outdoor kitchen, a fire feature and a considered path of stone or porcelain. The palette is selected as a whole so the pool, deck, planting areas and home read as one environment.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                {[
                  {
                    title: 'Pool geometry',
                    text: 'Clean-lined geometric pools and resort-style compositions are shaped around the home, property layout and intended use.',
                  },
                  {
                    title: 'Spa and sun shelf',
                    text: 'Integrated or raised spas, shallow lounging areas and water details can be coordinated into the pool design.',
                  },
                  {
                    title: 'Material continuity',
                    text: 'Stone, porcelain and marble decks are reviewed alongside coping, tile and the architecture of the home.',
                  },
                  {
                    title: 'Outdoor rooms',
                    text: 'Kitchens, pergolas, cabanas, fire features and lighting extend the design beyond the waterline.',
                  },
                ].map((item) => (
                  <div key={item.title} className="bg-card border border-border p-8">
                    <h3 className="text-xl font-serif text-primary mb-4">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16 pt-12 border-t border-border">
                <div>
                  <h3 className="text-2xl md:text-3xl font-serif text-primary mb-5">See the whole environment before it is built.</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    A photorealistic 3D visualization gives the design studio and homeowner a shared view of the pool, outdoor rooms, materials and relationship to the home before construction begins.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Material selections can be reviewed at the Cove & Stone Design Studio & Showroom, 7662 Philips Hwy, Unit 32, Jacksonville, FL 32256.
                  </p>
                </div>
                <div className="bg-card border border-border p-8">
                  <h3 className="text-2xl font-serif text-primary mb-5">Coordinated from concept to scope.</h3>
                  <p className="text-muted-foreground leading-relaxed mb-5">
                    Engineering coordination and permitting requirements are reviewed where applicable. The specific path depends on the property, scope and applicable local jurisdiction.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Financing options may be available through current lender programs and financing partners, subject to credit approval, lender terms and program requirements.
                  </p>
                </div>
              </div>

              <nav aria-label="Continue exploring Ponte Vedra Beach pool and outdoor-living services" className="mt-16 pt-8 border-t border-border">
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-5">Continue exploring</p>
                <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
                  <Link href="/pools" className="text-primary hover:text-secondary transition-colors">Custom pools & spas</Link>
                  <Link href="/renovations" className="text-primary hover:text-secondary transition-colors">Pool renovations</Link>
                  <Link href="/outdoor-living" className="text-primary hover:text-secondary transition-colors">Outdoor living</Link>
                  <Link href="/design" className="text-primary hover:text-secondary transition-colors">Design your backyard</Link>
                  <Link href="/showroom" className="text-primary hover:text-secondary transition-colors">Visit the showroom</Link>
                  <Link href="/financing" className="text-primary hover:text-secondary transition-colors">Explore financing</Link>
                  <Link href="/projects" className="text-primary hover:text-secondary transition-colors">View projects</Link>
                  <Link href="/about" className="text-primary hover:text-secondary transition-colors">About Cove & Stone</Link>
                  <Link href="/contact" className="text-primary hover:text-secondary transition-colors">Start a consultation</Link>
                </div>
              </nav>
            </>
          ) : isStJohns ? (
            <>
              <div className="max-w-4xl mx-auto text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-serif text-primary mb-8">A complete backyard, carefully composed.</h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed text-lg text-left">
                  <p>
                    For St. Johns and northern St. Johns County homeowners, the backyard can be designed as a sequence of connected spaces: a pool and spa, a shaded place to gather, an outdoor kitchen and a material palette that carries the architecture outside.
                  </p>
                  <p>
                    Cove & Stone develops the direction around the property and the way it will be used. Clean-lined geometry, sun shelves, porcelain or stone decks, artificial turf, pergolas, fire features and lighting can be considered together instead of as separate additions.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                {[
                  {
                    title: 'Pool and spa design',
                    text: 'Pool geometry, integrated or raised spas and sun shelves are shaped around the home, property layout and intended use.',
                  },
                  {
                    title: 'Outdoor gathering',
                    text: 'Kitchens, pergolas, cabanas, seating areas and fire features extend the usable outdoor environment beyond the water.',
                  },
                  {
                    title: 'Material planning',
                    text: 'Porcelain, marble, natural stone, pavers and artificial turf are considered as one coordinated palette for the backyard.',
                  },
                  {
                    title: 'A shared visual plan',
                    text: '3D visualization and organized selections make the relationship between the pool, outdoor rooms and home easier to review.',
                  },
                ].map((item) => (
                  <div key={item.title} className="bg-card border border-border p-8">
                    <h3 className="text-xl font-serif text-primary mb-4">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16 pt-12 border-t border-border">
                <div>
                  <h3 className="text-2xl md:text-3xl font-serif text-primary mb-5">Review the design before the build.</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    A photorealistic 3D visualization gives the design studio and homeowner a shared view of the pool, spa, outdoor rooms, materials and relationship to the home before construction begins.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Material selections can be reviewed at the Cove & Stone Design Studio & Showroom, 7662 Philips Hwy, Unit 32, Jacksonville, FL 32256.
                  </p>
                </div>
                <div className="bg-card border border-border p-8">
                  <h3 className="text-2xl font-serif text-primary mb-5">Plan the scope with clarity.</h3>
                  <p className="text-muted-foreground leading-relaxed mb-5">
                    Engineering coordination and permitting requirements are reviewed where applicable. The specific path depends on the property, scope and applicable local jurisdiction.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Financing options may be available through current lender programs and financing partners, subject to credit approval, lender terms and program requirements.
                  </p>
                </div>
              </div>

              <nav aria-label="Continue exploring St. Johns pool and outdoor-living services" className="mt-16 pt-8 border-t border-border">
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-5">Continue exploring</p>
                <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
                  <Link href="/pools" className="text-primary hover:text-secondary transition-colors">Custom pools & spas</Link>
                  <Link href="/renovations" className="text-primary hover:text-secondary transition-colors">Pool renovations</Link>
                  <Link href="/outdoor-living" className="text-primary hover:text-secondary transition-colors">Outdoor living</Link>
                  <Link href="/design" className="text-primary hover:text-secondary transition-colors">Design your backyard</Link>
                  <Link href="/showroom" className="text-primary hover:text-secondary transition-colors">Visit the showroom</Link>
                  <Link href="/financing" className="text-primary hover:text-secondary transition-colors">Explore financing</Link>
                  <Link href="/projects" className="text-primary hover:text-secondary transition-colors">View projects</Link>
                  <Link href="/contact" className="text-primary hover:text-secondary transition-colors">Start a consultation</Link>
                </div>
              </nav>
            </>
          ) : isJacksonvilleBeaches ? (
            <>
              <div className="max-w-4xl mx-auto text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-serif text-primary mb-8">One connected idea for the Jacksonville Beaches.</h2>
                <div className="space-y-6 text-muted-foreground leading-relaxed text-lg text-left">
                  <p>
                    Across Atlantic Beach, Jacksonville Beach, Neptune Beach, nearby Ponte Vedra Beach and the surrounding Jacksonville Beaches, outdoor living can be planned as more than a collection of separate features. A pool, spa, kitchen, shade structure and material palette can share one clear architectural direction.
                  </p>
                  <p>
                    Coastal-style design is considered in general terms: how sun, shade, movement between the home and pool, and the visual weight of pavers, porcelain, marble, stone and turf shape the experience. The final selections are reviewed for the specific property and intended application.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                {[
                  {
                    title: 'Pool and spa',
                    text: 'Custom pool geometry, integrated or raised spas and sun shelves can anchor a complete outdoor-living plan.',
                  },
                  {
                    title: 'Outdoor rooms',
                    text: 'Kitchens, pergolas, cabanas, seating areas and fire features extend the backyard beyond the waterline.',
                  },
                  {
                    title: 'Material continuity',
                    text: 'Pavers, porcelain, marble, natural stone and artificial turf are coordinated around the architecture and use of each area.',
                  },
                  {
                    title: 'Light after sunset',
                    text: 'Landscape and architectural lighting can be planned with paths, kitchens, water and fire features as part of the whole environment.',
                  },
                ].map((item) => (
                  <div key={item.title} className="bg-card border border-border p-8">
                    <h3 className="text-xl font-serif text-primary mb-4">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16 pt-12 border-t border-border">
                <div>
                  <h3 className="text-2xl md:text-3xl font-serif text-primary mb-5">Review the environment before the build.</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    A photorealistic 3D visualization gives the design studio and homeowner a shared view of pool geometry, outdoor rooms, materials and lighting before construction begins.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Material selections can be reviewed at the Cove & Stone Design Studio & Showroom, 7662 Philips Hwy, Unit 32, Jacksonville, FL 32256.
                  </p>
                </div>
                <div className="bg-card border border-border p-8">
                  <h3 className="text-2xl font-serif text-primary mb-5">Coordinate the practical scope.</h3>
                  <p className="text-muted-foreground leading-relaxed mb-5">
                    Engineering coordination and permitting requirements are reviewed where applicable. Specific requirements depend on the property, scope and applicable local jurisdiction.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Financing options may be available through current lender programs and financing partners, subject to credit approval, lender terms and program requirements.
                  </p>
                </div>
              </div>

              <nav aria-label="Explore Jacksonville Beaches locations and services" className="mt-16 pt-8 border-t border-border">
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-5">Explore the region</p>
                <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
                  <Link href="/locations/atlantic-beach" className="text-primary hover:text-secondary transition-colors">Atlantic Beach</Link>
                  <Link href="/locations/jacksonville-beach" className="text-primary hover:text-secondary transition-colors">Jacksonville Beach</Link>
                  <Link href="/locations/neptune-beach" className="text-primary hover:text-secondary transition-colors">Neptune Beach</Link>
                  <Link href="/locations/ponte-vedra-beach" className="text-primary hover:text-secondary transition-colors">Ponte Vedra Beach</Link>
                  <Link href="/pools" className="text-primary hover:text-secondary transition-colors">Custom pools & spas</Link>
                  <Link href="/renovations" className="text-primary hover:text-secondary transition-colors">Pool renovations</Link>
                  <Link href="/outdoor-living" className="text-primary hover:text-secondary transition-colors">Outdoor living</Link>
                  <Link href="/design" className="text-primary hover:text-secondary transition-colors">Design your backyard</Link>
                  <Link href="/showroom" className="text-primary hover:text-secondary transition-colors">Visit the showroom</Link>
                  <Link href="/financing" className="text-primary hover:text-secondary transition-colors">Explore financing</Link>
                  <Link href="/projects" className="text-primary hover:text-secondary transition-colors">View projects</Link>
                  <Link href="/contact" className="text-primary hover:text-secondary transition-colors">Start a consultation</Link>
                </div>
              </nav>
            </>
          ) : (
            <div className="max-w-4xl mx-auto text-center">
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
          )}
        </div>
      </section>

      {isPonteVedraBeach && (
        <section className="py-24 bg-card border-t border-border">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="mb-12">
              <span className="text-secondary uppercase tracking-[0.3em] text-sm mb-4 block">Ponte Vedra Beach, considered</span>
              <h2 className="text-3xl md:text-5xl font-serif text-primary mb-5">Questions before the first line is drawn.</h2>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">
                A strong outdoor environment begins with the property, the architecture and the way you want to live outside. These are the practical questions that help define the direction.
              </p>
            </div>
            <div className="border-t border-border">
              {ponteSeo.faqs?.map(({ question, answer }) => (
                <details key={question} className="group border-b border-border">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-lg font-serif text-primary marker:hidden">
                    {question}
                    <span className="text-secondary text-2xl font-light transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="max-w-3xl pb-6 pr-10 text-muted-foreground leading-relaxed">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {isStJohns && (
        <section className="py-24 bg-card border-t border-border">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="mb-12">
              <span className="text-secondary uppercase tracking-[0.3em] text-sm mb-4 block">St. Johns, considered</span>
              <h2 className="text-3xl md:text-5xl font-serif text-primary mb-5">Questions before the first line is drawn.</h2>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">
                A strong outdoor environment begins with the property, the architecture and the way you want to live outside. These are the practical questions that help define the direction.
              </p>
            </div>
            <div className="border-t border-border">
              {stJohnsSeo.faqs?.map(({ question, answer }) => (
                <details key={question} className="group border-b border-border">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-lg font-serif text-primary marker:hidden">
                    {question}
                    <span className="text-secondary text-2xl font-light transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="max-w-3xl pb-6 pr-10 text-muted-foreground leading-relaxed">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {isJacksonvilleBeaches && (
        <section className="py-24 bg-card border-t border-border">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="mb-12">
              <span className="text-secondary uppercase tracking-[0.3em] text-sm mb-4 block">The beaches, considered</span>
              <h2 className="text-3xl md:text-5xl font-serif text-primary mb-5">Questions before the first line is drawn.</h2>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">
                A thoughtful outdoor environment begins with the property, the architecture and the way you want to live outside. These are the practical questions that help define the direction.
              </p>
            </div>
            <div className="border-t border-border">
              {jacksonvilleBeachesSeo.faqs?.map(({ question, answer }) => (
                <details key={question} className="group border-b border-border">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-lg font-serif text-primary marker:hidden">
                    {question}
                    <span className="text-secondary text-2xl font-light transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="max-w-3xl pb-6 pr-10 text-muted-foreground leading-relaxed">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
