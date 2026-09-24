import { Flame, Trees, ChefHat, Sofa } from 'lucide-react';
import { Link } from 'wouter';
import heroImage from '@assets/outdoor-living-hero-gourmet-kitchen.webp';
import kitchenImage from '@assets/generated_images/outdoor-living.jpg';
import kitchenLoungeConceptImage from '@assets/generated_images/outdoor-kitchen-turf-screen-concept.jpg';
import kitchenLoungeConceptMobileImage from '@assets/generated_images/outdoor-kitchen-turf-screen-concept-mobile.jpg';
import kitchenReferencePhoto from '@assets/generated_images/outdoor-kitchen-user-photo-clean.jpg';

export default function OutdoorLiving() {
  return (
    <div className="w-full pt-24 lg:pt-40">
      <header className="relative h-[60dvh] min-h-[500px] flex items-center bg-primary">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Concept visualization of a Jacksonville outdoor living environment with a stone-backed gourmet kitchen, pool, fire and water features"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute bottom-6 right-6 border border-border bg-background/80 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur-sm">
            Concept visualization
          </div>
        </div>
        <div className="container mx-auto px-6 max-w-7xl relative z-10 text-foreground pt-32">
          <span className="text-secondary uppercase tracking-[0.3em] text-sm mb-4 block">Rooms without walls.</span>
          <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight text-primary">
            Outdoor Living Design & Build in Jacksonville, FL
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl font-light leading-relaxed">
            Expand your home's footprint. We design and build seamless outdoor environments featuring custom kitchens, architectural pergolas, fire features, and elite hardscaping.
          </p>
        </div>
      </header>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center md:text-left">
            <div className="p-12 bg-card border border-border group hover:border-secondary transition-colors">
              <ChefHat className="w-12 h-12 text-secondary mb-6 mx-auto md:mx-0" />
              <h3 className="text-2xl font-serif text-primary mb-4">Summer Kitchens</h3>
              <p className="text-muted-foreground">
                Professional-grade outdoor culinary spaces with built-in grills, smokers, refrigeration, and weatherproof luxury cabinetry designed to withstand coastal weather.
              </p>
            </div>
            <div className="p-12 bg-card border border-border group hover:border-secondary transition-colors">
              <Sofa className="w-12 h-12 text-secondary mb-6 mx-auto md:mx-0" />
              <h3 className="text-2xl font-serif text-primary mb-4">Cabanas & Pergolas</h3>
              <p className="text-muted-foreground">
                Architectural shade structures ranging from automated louvered pergolas to fully roofed custom cabanas with integrated lighting, audio, and climate control.
              </p>
            </div>
            <div className="p-12 bg-card border border-border group hover:border-secondary transition-colors">
              <Flame className="w-12 h-12 text-secondary mb-6 mx-auto md:mx-0" />
              <h3 className="text-2xl font-serif text-primary mb-4">Fire & Ambiance</h3>
              <p className="text-muted-foreground">
                Custom linear fire pits, architectural fire bowls, and integrated landscape lighting that transforms the environment when the sun goes down.
              </p>
            </div>
            <div className="p-12 bg-card border border-border group hover:border-secondary transition-colors">
              <Trees className="w-12 h-12 text-secondary mb-6 mx-auto md:mx-0" />
              <h3 className="text-2xl font-serif text-primary mb-4">Hardscape & Turf</h3>
              <p className="text-muted-foreground">
                 Flawless installations of porcelain, travertine, marble, natural stone and concrete pavers, contrasted with artificial turf, turf between oversized pavers and putting-green or lifestyle-turf applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="outdoor-kitchens" className="border-y border-border bg-primary py-24 text-primary-foreground md:py-32" data-testid="outdoor-kitchen-section">
        <div className="container mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-20">
          <div className="relative order-2 lg:order-1" data-testid="outdoor-kitchen-visuals">
            <div className="relative overflow-hidden">
              <img
                src={kitchenImage}
                alt="Design visualization of a gourmet outdoor kitchen with a cooking island, bar seating, pergola and lounge area"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
              />
              <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 border-t border-white/30 pt-3 text-[10px] uppercase tracking-[0.2em] text-white/80">
                <span>Gourmet kitchen design</span>
                <span>Outdoor room / 01</span>
              </div>
            </div>
            <div className="relative z-10 ml-auto mt-[-2.5rem] w-[82%] border-8 border-primary bg-primary shadow-2xl sm:mt-[-4rem] sm:w-[68%]">
              <picture className="block">
                <source media="(max-width: 767px)" srcSet={kitchenLoungeConceptMobileImage} />
                <img
                  src={kitchenLoungeConceptImage}
                  alt="Design visualization of a covered outdoor kitchen with a stone island, large mounted television, screened enclosure, and turf lounge seating"
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
              </picture>
              <div className="absolute bottom-3 left-3 border border-white/30 bg-black/35 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-white/85 backdrop-blur-sm">
                Outdoor kitchen + turf lounge / Design visualization
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="mb-5 block text-sm uppercase tracking-[0.3em] text-secondary">The outdoor kitchen</span>
            <h2 className="mb-6 max-w-xl text-4xl font-serif leading-tight md:text-6xl">
              The heart of the backyard, designed for the way you host.
            </h2>
            <p className="max-w-xl text-lg leading-relaxed text-primary-foreground/75">
              Build beyond the grill. We compose gourmet outdoor kitchens with generous islands, comfortable seating, full bars and the equipment, storage and finish details that make entertaining feel effortless.
            </p>

            <div className="my-10 grid max-w-xl grid-cols-2 gap-x-8 gap-y-6 border-y border-primary-foreground/20 py-7 text-sm">
              {[
                ['01', 'Kitchen islands', 'Prep, serve and gather around one generous center.'],
                ['02', 'Full bar moments', 'Refrigeration, spirits and seating built into the room.'],
                ['03', 'Lounge seating', 'Keep the cook in the conversation from first pour to last course.'],
                ['04', 'Limitless options', 'Materials, appliances, shade and lighting shaped to your property.'],
              ].map(([number, title, copy]) => (
                <div key={number}>
                  <span className="mb-2 block font-mono text-xs tracking-[0.2em] text-secondary">{number}</span>
                  <h3 className="mb-1 text-sm font-medium uppercase tracking-widest">{title}</h3>
                  <p className="text-sm leading-relaxed text-primary-foreground/60">{copy}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div>
                <span className="block font-mono text-xs uppercase tracking-[0.18em] text-secondary">Typical investment</span>
                <strong className="mt-1 block text-2xl font-serif">$20,000–$100,000</strong>
                <span className="mt-1 block text-xs text-primary-foreground/55">Scope, materials and equipment determine the final range.</span>
              </div>
              <Link
                href="/contact/"
                className="inline-flex items-center justify-center border border-secondary bg-secondary px-6 py-3 text-center text-sm uppercase tracking-widest text-secondary-foreground transition-colors hover:border-white hover:bg-white hover:text-primary"
              >
                Plan your kitchen
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-card border-t border-border">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-serif mb-8 text-primary">The cohesive approach.</h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
                <p>
                  A great backyard is not a collection of disparate parts. It is a single, cohesive design where the pool, the kitchen, the seating areas, and the landscaping speak the same visual language.
                </p>
                <p>
                  As a true design-build firm, we manage every element of the exterior. You have one designer, one project manager, and one vision from the front gate to the back fence.
                </p>
              </div>
              <Link 
                href="/projects/" 
                className="inline-block mt-10 border-b border-primary text-primary pb-1 uppercase tracking-widest text-sm hover:text-secondary hover:border-secondary transition-colors"
              >
                View our complete environments
              </Link>
            </div>
            <div
              id="outdoor-kitchen-watermarked-reference"
              className="relative aspect-[7/10] overflow-hidden"
              data-testid="outdoor-kitchen-watermarked-reference"
            >
              <img 
                src={kitchenReferencePhoto} 
                alt="Outdoor-kitchen style reference showing a light-stone built-in kitchen with a pizza oven, grill and sink beneath a dark slatted pergola"
                className="w-full h-full object-cover"
              />
              <img
                src="/brand/cove-and-stone-approved.png"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-4 z-10 w-[32%] min-w-[6.6rem] max-w-[10.5rem] select-none opacity-90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.22)]"
              />
              <div className="absolute bottom-4 left-4 border border-white/30 bg-black/25 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm">
                Outdoor kitchen reference
              </div>
            </div>
          </div>

          <nav aria-label="Continue exploring pool and outdoor-living services" className="mt-16 pt-8 border-t border-border">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-5">Continue exploring</p>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <Link href="/pools/" className="text-primary hover:text-secondary transition-colors">Custom pools & spas</Link>
              <Link href="/renovations/" className="text-primary hover:text-secondary transition-colors">Pool renovations</Link>
              <Link href="/design/" className="text-primary hover:text-secondary transition-colors">Design your backyard</Link>
              <Link href="/showroom/" className="text-primary hover:text-secondary transition-colors">Visit the showroom</Link>
              <Link href="/financing/" className="text-primary hover:text-secondary transition-colors">Explore financing</Link>
              <Link href="/projects/" className="text-primary hover:text-secondary transition-colors">View projects</Link>
              <Link href="/contact/" className="text-primary hover:text-secondary transition-colors">Start a consultation</Link>
            </div>
          </nav>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-background border-t border-border">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="mb-12">
            <span className="text-secondary uppercase tracking-[0.3em] text-sm mb-4 block">The details, considered</span>
            <h2 className="text-3xl md:text-5xl font-serif text-primary mb-5">Questions before the doors open.</h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              The best outdoor rooms feel inevitable because every element has been considered together. These are the practical questions that shape the process.
            </p>
          </div>
          <div className="border-t border-border">
            {[
              {
                question: "Can an outdoor kitchen or pergola be integrated with a pool?",
                answer: "Yes. A pool, outdoor kitchen, pergola or cabana can be planned as one cohesive environment so circulation, shade, materials, lighting and views work together around the property.",
              },
              {
                question: "How do I choose between pavers, porcelain, marble and natural stone?",
                answer: "Material selections are coordinated around the architecture, palette, use of each area and the relationship between indoor and outdoor spaces. Pavers, porcelain, marble and natural stone each offer different visual and surface qualities to review during design.",
              },
              {
                question: "Where can artificial turf be used in an outdoor-living design?",
                answer: "Artificial turf can be considered for lawn areas, turf between oversized pavers, putting-green applications and other lifestyle-turf zones when it suits the property and the overall landscape direction.",
              },
              {
                question: "What fire and water features can be included?",
                answer: "Outdoor environments may include linear fire pits, architectural fire bowls, fire-and-water elements, waterfalls or other water features when they fit the design, property and applicable project requirements.",
              },
              {
                question: "How are lighting and ambiance planned?",
                answer: "Lighting is considered as part of the outdoor environment, with the placement of landscape and architectural lighting coordinated with paths, seating, kitchens, water and fire features.",
              },
              {
                question: "Can I review a 3D design of the complete outdoor environment?",
                answer: "The design studio can develop a photorealistic 3D visualization to review the relationship between the pool, outdoor rooms, materials, landscape elements and the home before construction begins.",
              },
              {
                question: "Can I select outdoor-living materials at the Jacksonville showroom?",
                answer: "Yes. The Jacksonville design studio and showroom provides a place to review stone, pavers, pool finishes, outdoor kitchens, fire and water features, turf and lighting selections.",
              },
              {
                question: "How does Cove & Stone coordinate outdoor construction?",
                answer: "The design-build process keeps the pool, kitchen, shade structures, hardscape, lighting and landscape coordination organized around one design direction and one project scope.",
              },
              {
                question: "Does outdoor-living design include engineering and permitting coordination?",
                answer: "Engineering coordination and permitting requirements are reviewed where applicable during project planning. Specific requirements depend on the property, scope and applicable local jurisdiction.",
              },
              {
                question: "Are financing options available for outdoor-living projects?",
                answer: "Financing options may be available through current lender programs and financing partners. Availability is subject to credit approval, lender terms and program requirements; Cove & Stone does not guarantee approval, rates, payments or loan terms.",
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
  );
}
