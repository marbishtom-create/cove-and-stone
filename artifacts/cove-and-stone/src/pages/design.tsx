import { THEME_CONFIG } from '@/config/theme';
import designImage from '@assets/generated_images/design-3d.jpg';
import designWalkthrough from '@assets/design-walkthrough-mobile.mp4';
import designWalkthroughPoster from '@assets/design-walkthrough-poster.jpg';
import { PoolVisualizer } from '@/components/pool-visualizer/pool-visualizer';
import { Link } from 'wouter';

export default function Design() {
  return (
    <div className="w-full pt-24 lg:pt-40">
      <header className="bg-card py-20 border-b border-border">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <span className="text-secondary uppercase tracking-[0.3em] text-sm mb-4 block">Design Process</span>
              <h1 className="text-4xl md:text-6xl font-serif mb-6 text-primary leading-tight">
                3D Pool & Backyard Design in Jacksonville, FL
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our in-house design studio uses photorealistic 3D rendering to bring your concepts to life. Walk through your new backyard digitally before any ground is broken.
              </p>
            </div>
            <div className="flex-1 relative w-full">
              <img src={designImage} alt="3D Pool Design" className="hidden aspect-video w-full object-cover shadow-2xl md:block" />
              <video
                className="block aspect-[9/16] w-full object-cover shadow-2xl md:hidden"
                src={designWalkthrough}
                poster={designWalkthroughPoster}
                autoPlay
                muted
                loop
                playsInline
                controls
                preload="metadata"
                aria-label="3D pool and backyard design walkthrough showing a future pool concept in a backyard"
              />
            </div>
          </div>
        </div>
      </header>

      <section className="border-t border-border bg-primary py-24 text-primary-foreground" aria-labelledby="design-walkthrough-title">
        <div className="container mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <div className="order-2 lg:order-1">
            <span className="mb-4 block text-sm uppercase tracking-[0.3em] text-secondary">See the service in motion</span>
            <h2 id="design-walkthrough-title" className="mb-6 text-3xl font-serif leading-tight md:text-5xl">
              See your future backyard before construction begins.
            </h2>
            <p className="mb-8 max-w-xl text-lg leading-relaxed text-primary-foreground/75">
              Our 3D design process turns the property, pool, materials and outdoor-living details into a visual direction you can review together. This concept walkthrough shows how the finished environment can be explored before the build begins.
            </p>
            <div className="grid max-w-xl grid-cols-1 gap-4 border-t border-primary-foreground/20 pt-6 sm:grid-cols-3">
              {[
                ['01', 'Place the pool', 'Review proportion and placement in the backyard.'],
                ['02', 'Shape the details', 'Coordinate water, materials, lighting and outdoor rooms.'],
                ['03', 'Walk the direction', 'Use the visual concept to make decisions with confidence.'],
              ].map(([number, title, copy]) => (
                <div key={number}>
                  <span className="mb-3 block font-mono text-xs tracking-[0.2em] text-secondary">{number}</span>
                  <h3 className="mb-2 text-sm font-medium uppercase tracking-widest">{title}</h3>
                  <p className="text-sm leading-relaxed text-primary-foreground/60">{copy}</p>
                </div>
              ))}
            </div>
          </div>
          <figure className="order-1 flex w-full flex-col items-center lg:order-2">
            <div className="mx-auto w-full max-w-sm overflow-hidden border border-primary-foreground/20 bg-black shadow-2xl">
              <video
                className="block h-auto max-h-[72svh] w-full object-contain"
                src={designWalkthrough}
                poster={designWalkthroughPoster}
                autoPlay
                muted
                loop
                playsInline
                controls
                preload="metadata"
                aria-label="3D pool and backyard design walkthrough showing a future pool concept in a backyard"
              />
            </div>
            <figcaption className="mt-4 text-center text-xs uppercase tracking-[0.18em] text-primary-foreground/55">
              Illustrative 3D design walkthrough · concept study
            </figcaption>
          </figure>
        </div>
      </section>

      {/* The Process */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-3xl md:text-5xl font-serif mb-16 text-primary text-center">How We Work</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {THEME_CONFIG.process.map((stepName, i) => (
              <div key={i} className="p-6 bg-card border border-border relative">
                <div className="text-4xl font-serif text-secondary mb-4 opacity-50">
                  {(i + 1).toString().padStart(2, '0')}
                </div>
                <h4 className="font-medium text-primary text-sm uppercase tracking-widest">{stepName}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background border-t border-border">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="max-w-4xl mx-auto text-center mb-14">
            <span className="text-secondary uppercase tracking-[0.3em] text-sm mb-4 block">A shared visual direction</span>
            <h2 className="text-3xl md:text-5xl font-serif text-primary mb-6">Bring the property into the conversation.</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Property photos, a survey if available, inspiration and the priorities you want the backyard to support give the design studio useful starting context. The direction can then coordinate pool and spa geometry, outdoor kitchens, pergolas, decking, stone, turf, lighting and landscape relationships.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              ['Share the inputs', 'Upload property photos and describe the way you want to use the space. A survey is useful when available.'],
              ['Shape the environment', 'Review how the pool, spa, outdoor rooms, materials, lighting and landscape direction can work together.'],
              ['Review the scope', 'Showroom selections and proposal development follow as the property, priorities and design direction become clearer.'],
            ].map(([title, copy]) => (
              <div key={title} className="bg-card border border-border p-8 text-left">
                <h3 className="text-xl font-serif text-primary mb-4">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border" id="app">
        <PoolVisualizer />
      </section>

      <section className="py-24 bg-background border-t border-border">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="mb-12">
            <span className="text-secondary uppercase tracking-[0.3em] text-sm mb-4 block">Design questions</span>
            <h2 className="text-3xl md:text-5xl font-serif text-primary mb-5">Before the first line is drawn.</h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              A useful design conversation starts with the property, the intended use and the decisions that still need to be made.
            </p>
          </div>
          <div className="border-t border-border">
            {[
              ['What information helps begin a custom 3D pool design?', 'Property photos, a survey if available, inspiration images and the priorities you want the backyard to support can help establish the initial design direction.'],
              ['Can a pool design be revised as the direction develops?', 'The design direction can be reviewed and refined as the property, priorities, materials and intended use become clearer. The appropriate scope is confirmed during the design conversation.'],
              ['How does the design connect to pricing and material selections?', 'The pool, spa, outdoor rooms, hardscape and material palette help define the project scope. Showroom selections and an organized proposal can then support a more specific conversation about the work.'],
              ['Is a property survey useful for 3D pool design?', 'A survey can be useful when available because it provides additional property information for reviewing layout, setbacks and the relationship between the home and outdoor environment.'],
            ].map(([question, answer]) => (
              <details key={question} className="group border-b border-border">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-lg font-serif text-primary marker:hidden">
                  {question}
                  <span className="text-secondary text-2xl font-light transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="max-w-3xl pb-6 pr-10 text-muted-foreground leading-relaxed">{answer}</p>
              </details>
            ))}
          </div>
          <nav aria-label="Continue planning your 3D pool and backyard design" className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <Link href="/pools/" className="text-primary hover:text-secondary transition-colors">Custom pools & spas</Link>
              <Link href="/outdoor-living/" className="text-primary hover:text-secondary transition-colors">Outdoor living</Link>
              <Link href="/showroom/" className="text-primary hover:text-secondary transition-colors">Visit the showroom</Link>
              <Link href="/financing/" className="text-primary hover:text-secondary transition-colors">Explore financing</Link>
              <Link href="/projects/" className="text-primary hover:text-secondary transition-colors">View concepts</Link>
              <Link href="/contact/" className="text-primary hover:text-secondary transition-colors">Start a consultation</Link>
            </div>
          </nav>
        </div>
      </section>
    </div>
  );
}
