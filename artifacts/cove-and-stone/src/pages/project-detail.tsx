import { useParams, Link } from 'wouter';
import { CASE_STUDIES } from './projects';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = CASE_STUDIES.find(p => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-[60dvh] flex flex-col items-center justify-center pt-20">
        <h1 className="text-4xl font-serif mb-4">Project Not Found</h1>
        <Link href="/projects" className="text-secondary hover:underline">Return to Portfolio</Link>
      </div>
    );
  }

  const isCompletedProject = project.status === "Completed project";

  return (
    <div className="w-full pt-20 bg-background">
      {/* Hero Image */}
      <div className="w-full h-[60dvh] relative">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-8 left-8">
          <Link href="/projects" className="inline-flex items-center gap-2 bg-background/80 backdrop-blur px-4 py-2 text-sm uppercase tracking-widest text-primary hover:bg-secondary hover:text-secondary-foreground transition-colors">
            <ArrowLeft size={16} /> Back to Projects
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl -mt-20 relative z-10 pb-24">
        {/* Project Header Card */}
        <div className="bg-card border border-border p-10 md:p-16 shadow-xl flex flex-col lg:flex-row gap-12 lg:gap-24 mb-24">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-serif text-primary mb-6">{project.title}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8 font-light">
              {project.desc}
            </p>
            <div className="inline-block bg-secondary/10 text-secondary px-4 py-2 text-xs font-bold uppercase tracking-widest">
              {project.status}
            </div>
          </div>
          
          <div className="w-full lg:w-1/3 space-y-6 text-sm">
            <div className="border-b border-border pb-4">
              <div className="text-muted-foreground uppercase tracking-widest mb-1 text-xs">Location</div>
              <div className="font-medium text-primary text-base">{project.location}</div>
            </div>
            <div className="border-b border-border pb-4">
              <div className="text-muted-foreground uppercase tracking-widest mb-1 text-xs">Scope</div>
              <div className="font-medium text-primary text-base">{project.type}</div>
            </div>
            <div className="border-b border-border pb-4">
              <div className="text-muted-foreground uppercase tracking-widest mb-1 text-xs">Materials</div>
              <div className="font-medium text-primary text-base">{project.materials}</div>
            </div>
            <div>
              <div className="text-muted-foreground uppercase tracking-widest mb-1 text-xs">Status</div>
              <div className="font-medium text-primary text-base">{project.status}</div>
            </div>
          </div>
        </div>

        {/* Transformation / Photography Section */}
        {isCompletedProject ? (
          <div className="mb-24">
            <h2 className="text-3xl font-serif text-primary mb-4 text-center">Completed project photography</h2>
            <p className="text-sm text-muted-foreground text-center max-w-2xl mx-auto mb-10">
              Approved photography of the completed Ponte Vedra Modern environment, including the Jacksonville skyline and riverfront setting.
            </p>
            <div className="shadow-2xl max-w-5xl mx-auto">
              <img src={project.image} alt={`Completed photography of ${project.title}`} className="w-full aspect-[16/9] object-cover" />
            </div>
          </div>
        ) : (
          <div className="mb-24">
            <h2 className="text-3xl font-serif text-primary mb-4 text-center">The Design Direction</h2>
            <p className="text-sm text-muted-foreground text-center max-w-2xl mx-auto mb-10">
              This visual is an illustrative concept direction. It is not presented as a completed Cove & Stone project or a same-property before-and-after comparison.
            </p>
            <div className="shadow-2xl max-w-5xl mx-auto">
              <img src={project.image} alt={`Concept visualization for ${project.title}`} className="w-full aspect-[16/9] object-cover" />
            </div>
          </div>
        )}

        {/* Features list */}
        <div className="max-w-3xl mx-auto bg-card border border-border p-12">
          <h3 className="text-2xl font-serif text-primary mb-8">Design Highlights</h3>
          <ul className="space-y-4">
            {project.features.split(', ').map((feature, i) => (
              <li key={i} className="flex items-center gap-4 text-muted-foreground">
                <CheckCircle2 className="text-secondary w-5 h-5 flex-shrink-0" />
                <span className="text-lg">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Next Project CTA */}
        <div className="mt-24 text-center border-t border-border pt-16">
          <p className="text-muted-foreground uppercase tracking-widest text-sm mb-4">Start your own transformation</p>
          <Link href="/contact" className="text-3xl font-serif text-primary hover:text-secondary transition-colors inline-block border-b-2 border-transparent hover:border-secondary pb-2">
            Inquire about a project like this →
          </Link>
        </div>
      </div>
    </div>
  );
}
