import { ArrowRight, MapPin, Clock, Building, Eye, PencilRuler, WalletCards, Hammer } from 'lucide-react';
import { THEME_CONFIG } from '@/config/theme';
import { Link } from 'wouter';
import showroomPhotoDesktop from '@assets/IMG_8065_1790307659407-showroom-desktop.jpg';
import showroomPhotoMobile from '@assets/IMG_8065_1790307659407-showroom-mobile.jpg';
import showroomLoungeDisplay from '@assets/IMG_8053_1790304907299-sharpened.jpg';
import showroomEquipmentDisplay from '@assets/IMG_8054_1790304907300-sharpened.jpg';
import showroomOutdoorKitchen from '@assets/IMG_8055_1790304907300-sharpened.jpg';

type ShowroomGalleryItem = {
  src: string;
  alt: string;
  title: string;
  credit?: string;
};

const showroomLoungeFeature: ShowroomGalleryItem = {
  src: showroomLoungeDisplay,
  alt: 'Showroom pool-finish display with a lounge area and water feature',
  title: 'Pool finishes and lounge display',
};

const showroomGallery: ShowroomGalleryItem[] = [
  showroomLoungeFeature,
  {
    src: showroomEquipmentDisplay,
    alt: 'Pool filtration, pumps, and plumbing equipment on display in the showroom',
    title: 'Pool equipment and plumbing',
    credit: 'Equipment supplier: Gorman Company',
  },
  {
    src: showroomOutdoorKitchen,
    alt: 'Outdoor kitchen display with grills, counters, and storage cabinets',
    title: 'Outdoor kitchen displays',
  },
];

function ShowroomGalleryCard({ image }: { image: ShowroomGalleryItem }) {
  return (
    <figure className="overflow-hidden border border-border bg-card shadow-sm">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image.src}
          alt={image.alt}
          width={676}
          height={506}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
      <figcaption className="border-t border-border p-5">
        <h3 className="font-serif text-lg text-primary">{image.title}</h3>
        {image.credit && (
          <p className="mt-2 text-xs uppercase tracking-[0.12em] text-muted-foreground">
            {image.credit}
          </p>
        )}
      </figcaption>
    </figure>
  );
}

export default function Showroom() {
  return (
    <div className="w-full pt-24 lg:pt-40 bg-background">
      <div className="container mx-auto px-6 max-w-7xl py-24">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-secondary uppercase tracking-[0.3em] text-sm mb-4 block">Jacksonville Design Studio & Showroom</span>
          <h1 className="text-4xl md:text-6xl font-serif mb-6 text-primary">Pool & Outdoor Living Showroom in Jacksonville, FL</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our in-house design showroom at 7662 Philips Hwy, Unit 32 brings the whole backyard into view. Compare materials at full scale, build a cohesive palette and review photorealistic concepts before construction begins.
          </p>
        </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-16 items-start">
            <div className="space-y-6">
              <div className="relative aspect-[4/3] w-full shadow-2xl border border-border">
                <picture>
                  <source media="(max-width: 767px)" srcSet={showroomPhotoMobile} />
                  <img
                    src={showroomPhotoDesktop}
                    alt="Cove & Stone Jacksonville showroom display with a central pool, stone finish walls and lounge seating"
                    className="w-full h-full object-cover"
                    width={1440}
                    height={1078}
                    fetchPriority="high"
                  />
                </picture>
                <div className="absolute bottom-4 left-4 border border-border bg-background/90 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Cove & Stone Jacksonville showroom
                </div>
              </div>
              <ShowroomGalleryCard image={showroomLoungeFeature} />
            </div>

            <div className="space-y-12">
            <div className="bg-card border border-border p-10">
              <h2 className="text-2xl font-serif text-primary mb-8 border-b border-border pb-4">{THEME_CONFIG.showroom.name}</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="text-secondary w-6 h-6 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-primary uppercase tracking-widest text-sm mb-1">Location</h4>
                    <p className="text-muted-foreground">
                      {THEME_CONFIG.showroom.address}<br />
                      {THEME_CONFIG.showroom.city}, {THEME_CONFIG.showroom.state} {THEME_CONFIG.showroom.zip}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="text-secondary w-6 h-6 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-primary uppercase tracking-widest text-sm mb-1">Hours</h4>
                    <p className="text-muted-foreground">
                      {THEME_CONFIG.showroom.hours}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Building className="text-secondary w-6 h-6 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-primary uppercase tracking-widest text-sm mb-1">Consultations</h4>
                    <p className="text-muted-foreground mb-3">Showroom visits, virtual reviews and private home consultations are available.</p>
                    <Link href="/contact/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-primary hover:text-secondary transition-colors">
                      Request a time <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-serif text-primary mb-4">What's inside?</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <Building className="w-4 h-4 text-secondary" />
                  Pool finishes and waterline tile
                </li>
                <li className="flex items-center gap-3">
                  <Building className="w-4 h-4 text-secondary" />
                  Marble, porcelain, travertine, pavers and coping
                </li>
                <li className="flex items-center gap-3">
                  <Building className="w-4 h-4 text-secondary" />
                  Artificial turf, oversized pavers and landscape materials
                </li>
                <li className="flex items-center gap-3">
                  <Building className="w-4 h-4 text-secondary" />
                  Outdoor kitchens, fire/water features and architectural lighting
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              {[
                { icon: Eye, title: "See it", copy: "Experience finishes, textures and proportions at full scale." },
                { icon: PencilRuler, title: "Design it", copy: "Shape a cohesive pool and whole-backyard concept." },
                { icon: WalletCards, title: "Finance it", copy: "Explore current options for your project scope." },
                { icon: Hammer, title: "Build it", copy: "Move from approved design to coordinated construction." },
              ].map((item) => (
                <div key={item.title} className="bg-card border border-border p-5">
                  <item.icon className="w-5 h-5 text-secondary mb-3" />
                  <h3 className="font-serif text-lg text-primary mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.copy}</p>
                </div>
              ))}
            </div>

            <Link href="/contact/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold hover:text-secondary transition-colors">
              Schedule a design consultation <ArrowRight size={14} />
            </Link>
            </div>
        </div>

        <section className="mt-24 border-t border-border pt-16" aria-labelledby="showroom-gallery-title">
          <div className="mx-auto mb-12 max-w-4xl text-center">
            <span className="text-secondary uppercase tracking-[0.3em] text-sm mb-4 block">Explore the showroom</span>
            <h2 id="showroom-gallery-title" className="text-3xl md:text-5xl font-serif text-primary mb-5">
              See pool and outdoor-living displays up close.
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground leading-relaxed">
              Compare pool finishes, equipment and outdoor-kitchen details in the Jacksonville design studio.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {showroomGallery.slice(1).map((image) => (
              <ShowroomGalleryCard key={image.title} image={image} />
            ))}
          </div>
        </section>

        <section className="mt-24 pt-16 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <span className="text-secondary uppercase tracking-[0.3em] text-sm mb-4 block">From selection to scope</span>
              <h2 className="text-3xl md:text-5xl font-serif text-primary mb-5">A material decision is part of the larger design.</h2>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">
                Showroom selections help connect the pool, outdoor rooms, hardscape, lighting and the architecture of the home. Review the design direction, compare finishes and carry the chosen palette into the project scope.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card border border-border p-8">
                <h3 className="text-xl font-serif text-primary mb-4">Start with the property</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Bring property photos, inspiration, measurements or a survey if available, and the way you want to use the space. The design studio can use that context when reviewing pools, spas, outdoor kitchens and materials.
                </p>
              </div>
              <div className="bg-card border border-border p-8">
                <h3 className="text-xl font-serif text-primary mb-4">Carry the palette forward</h3>
                <p className="text-muted-foreground leading-relaxed">
                  A cohesive selection can inform the pool and spa, outdoor living, renovation scope, available financing conversations and the coordinated proposal.
                </p>
              </div>
            </div>
            <nav aria-label="Continue planning your pool and outdoor-living project" className="mt-12 pt-8 border-t border-border">
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-5">Continue planning</p>
              <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
                <Link href="/design/" className="text-primary hover:text-secondary transition-colors">Design your backyard</Link>
                <Link href="/pools/" className="text-primary hover:text-secondary transition-colors">Custom pools & spas</Link>
                <Link href="/outdoor-living/" className="text-primary hover:text-secondary transition-colors">Outdoor living</Link>
                <Link href="/financing/" className="text-primary hover:text-secondary transition-colors">Explore financing</Link>
                <Link href="/contact/" className="text-primary hover:text-secondary transition-colors">Start a consultation</Link>
              </div>
            </nav>
          </div>
        </section>

        <section className="mt-24 pt-16 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <span className="text-secondary uppercase tracking-[0.3em] text-sm mb-4 block">Showroom questions</span>
              <h2 className="text-3xl md:text-5xl font-serif text-primary mb-5">Before you make a selection.</h2>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">
                The showroom is one part of a larger design conversation. These practical questions help clarify how to prepare and what the visit can support.
              </p>
            </div>
            <div className="border-t border-border">
              {[
                {
                  question: "What should I bring to a showroom visit?",
                  answer: "Bring property photos, inspiration images, measurements or a survey if available, and the priorities you want the outdoor space to support. These details help connect material selections to the property and project scope.",
                },
                {
                  question: "What can I review or select at the showroom?",
                  answer: "You can review pool finishes, waterline tile, marble, porcelain, travertine, pavers, coping, artificial turf, outdoor kitchen finishes, fire and water features, and lighting.",
                },
                {
                  question: "Can I review a design or 3D visualization at the showroom?",
                  answer: "Showroom visits and virtual reviews are available as part of the design process. A photorealistic 3D visualization can help connect the selected materials to the pool, home and complete outdoor environment.",
                },
                {
                  question: "How does a showroom visit fit with a consultation?",
                  answer: "Showroom selections can follow an initial conversation about the property and help shape a coordinated proposal. Visits, virtual reviews and private home consultations are available.",
                },
              ].map(({ question, answer }) => (
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
      </div>
    </div>
  );
}
