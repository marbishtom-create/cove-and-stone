import { useParams, Link } from 'wouter';
import { CASE_STUDIES } from './projects';
import { ArrowLeft, ArrowRight, CheckCircle2, Image as ImageIcon, Moon, Sun, Video } from 'lucide-react';
import { BeforeAfter } from '@/components/ui/before-after';
import { AppointmentCtaSurface } from '@/components/layout/appointment-cta-elements';
import NotFound from '@/pages/not-found';

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = CASE_STUDIES.find(p => p.slug === slug);

  if (!project) {
    return <NotFound />;
  }

  const isCompletedProject = project.status === "completed";
  const heroMedia = isCompletedProject && project.media.completedDay
    ? project.media.completedDay
    : project.media.render;

  return (
    <div className="w-full pt-24 lg:pt-40 bg-background">
      {/* Hero Image */}
      <div className="w-full h-[52dvh] min-h-[420px] lg:h-[60dvh] relative">
        <picture>
          <source media="(max-width: 767px)" srcSet={heroMedia.mobileSrc} />
          <img src={heroMedia.src} alt={heroMedia.alt} className="w-full h-full object-cover" />
        </picture>
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-4 right-4 lg:bottom-8 lg:right-8 max-w-[calc(100%-2rem)] border border-white/30 bg-black/35 px-3 py-2 text-[9px] lg:text-[10px] uppercase tracking-[0.14em] lg:tracking-[0.2em] text-white/90 backdrop-blur-sm">
          {heroMedia.label}
        </div>
        <div className="absolute top-4 left-4 lg:top-8 lg:left-8">
          <Link href="/projects/" className="inline-flex items-center gap-2 bg-background/80 backdrop-blur px-4 py-2 text-sm uppercase tracking-widest text-primary hover:bg-secondary hover:text-secondary-foreground transition-colors">
            <ArrowLeft size={16} /> Back to Projects
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl mt-0 lg:-mt-20 relative z-10 pb-16 lg:pb-24">
        {/* Project Header Card */}
        <div className="bg-card border border-border p-6 sm:p-10 md:p-16 shadow-xl flex flex-col lg:flex-row gap-10 lg:gap-24 mb-20 lg:mb-24">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-serif text-primary mb-6">{project.title}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8 font-light">
              {project.desc}
            </p>
            <Link
              href="/appointments/"
              className="layout-appointment-cta layout-appointment-cta--compact-mobile mx-auto mb-8 w-full max-w-[18.27rem] sm:max-w-[24.948rem]"
              data-testid="link-project-detail-appointment-cta"
            >
              <AppointmentCtaSurface />
              <span className="layout-appointment-cta__copy">
                <span className="layout-appointment-cta__eyebrow">Design consultation</span>
                <span className="layout-appointment-cta__title">Start your project today</span>
              </span>
            </Link>
            <div className="inline-block bg-secondary/10 text-secondary px-4 py-2 text-xs font-bold uppercase tracking-widest">
              {isCompletedProject
                ? "Completed project · approved photography"
                 : "Project direction · details to be confirmed · not completed photography"}
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
              <div className="font-medium text-primary text-base">
                {project.statusLabel || (isCompletedProject ? "Completed project" : "Illustrative concept direction")}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground uppercase tracking-widest mb-1 text-xs">Timeline</div>
              <div className="font-medium text-primary text-base">{project.timeline}</div>
            </div>
          </div>
        </div>

        {/* Transformation Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-serif text-primary mb-10 text-center">
            {isCompletedProject ? "The Transformation" : "The Design Direction"}
          </h2>
          <div className="shadow-2xl max-w-5xl mx-auto">
            {project.media.before ? (
              <BeforeAfter
                beforeImage={project.media.before.src}
                beforeMobileImage={project.media.before.mobileSrc}
                afterImage={isCompletedProject && project.media.completedDay
                  ? project.media.completedDay.src
                  : project.media.render.src}
                afterMobileImage={isCompletedProject && project.media.completedDay
                  ? project.media.completedDay.mobileSrc
                  : project.media.render.mobileSrc}
                beforeAlt={project.media.before.alt}
                afterAlt={isCompletedProject && project.media.completedDay
                  ? project.media.completedDay.alt
                  : project.media.render.alt}
                beforeLabel={project.media.before.label}
                afterLabel={isCompletedProject && project.media.completedDay
                  ? project.media.completedDay.label
                  : project.media.render.label}
              />
            ) : (
              <div className="border border-border bg-card p-10 text-center text-muted-foreground">
                {isCompletedProject
                  ? "A project-specific before photo will be added when supplied."
                  : "A matched before-and-after set will be added when real project photography is supplied."}
              </div>
            )}
          </div>
          <p className="max-w-3xl mx-auto mt-5 text-center text-xs uppercase tracking-widest text-muted-foreground">
            {isCompletedProject
              ? "Approved before photo paired with completed project photography"
               : "Design preview · this visual does not represent a completed Cove & Stone project"}
          </p>
        </div>

        {/* Case study media slots */}
        <section className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-secondary uppercase tracking-[0.25em] text-xs mb-3 block">Project media</span>
              <h2 className="text-3xl font-serif text-primary">Design and project media</h2>
            </div>
            <p className="max-w-md text-sm text-muted-foreground">
              {isCompletedProject
                ? "Approved photography and a project walkthrough document the completed environment."
                : "This design preview is shown on its own until an approved, same-property before-and-after set is available."}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MediaCard
              icon={<ImageIcon className="w-5 h-5" />}
              title={project.media.render.label}
                copy={isCompletedProject ? "Original design visualization" : project.desc}
              src={project.media.render.src}
               mobileSrc={project.media.render.mobileSrc}
              alt={project.media.render.alt}
            />
            {project.media.before ? (
              <MediaCard
                icon={<ImageIcon className="w-5 h-5" />}
                title={project.media.before.label}
                copy={isCompletedProject
                  ? "Approved before photography"
                  : "Reference image · not a project completion photo"}
                src={project.media.before.src}
                 mobileSrc={project.media.before.mobileSrc}
                alt={project.media.before.alt}
              />
            ) : isCompletedProject ? (
              <PendingMediaCard icon={<ImageIcon className="w-5 h-5" />} title="Before photo" />
            ) : null}
            {project.media.completedDay ? (
              <MediaCard
                icon={<Sun className="w-5 h-5" />}
                title="Completed · day"
                copy="Approved completed photography"
                src={project.media.completedDay.src}
                 mobileSrc={project.media.completedDay.mobileSrc}
                alt={project.media.completedDay.alt}
              />
            ) : isCompletedProject ? (
              <PendingMediaCard icon={<Sun className="w-5 h-5" />} title="Completed · day" />
            ) : null}
            {project.media.completedNight ? (
              <MediaCard
                icon={<Moon className="w-5 h-5" />}
                title="Completed · night"
                copy="Approved completed photography"
                src={project.media.completedNight.src}
                 mobileSrc={project.media.completedNight.mobileSrc}
                alt={project.media.completedNight.alt}
              />
            ) : isCompletedProject ? (
              <PendingMediaCard icon={<Moon className="w-5 h-5" />} title="Completed · night" />
            ) : null}
            {project.media.video ? (
              <div className="md:col-span-2 border border-border bg-card overflow-hidden">
                <video
                  className="w-full aspect-video object-cover"
                  controls
                  poster={project.media.video.poster}
                  aria-label={project.media.video.alt}
                >
                  <source src={project.media.video.src} />
                </video>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-primary">
                    <Video className="w-5 h-5 text-secondary" />
                    <span className="font-serif text-lg">{project.media.video.label}</span>
                  </div>
                </div>
              </div>
            ) : isCompletedProject ? (
              <div className="md:col-span-2">
                <PendingMediaCard icon={<Video className="w-5 h-5" />} title="Project video" />
              </div>
            ) : null}
          </div>
        </section>

        {/* Features list */}
        <div className="max-w-3xl mx-auto bg-card border border-border p-6 sm:p-12">
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
          <Link href="/contact/" className="text-3xl font-serif text-primary hover:text-secondary transition-colors inline-block border-b-2 border-transparent hover:border-secondary pb-2">
            Inquire about a project like this →
          </Link>
        </div>
      </div>
    </div>
  );
}

function MediaCard({
  icon,
  title,
  copy,
  src,
  mobileSrc,
  alt,
}: {
  icon: React.ReactNode;
  title: string;
  copy: string;
  src: string;
  mobileSrc: string;
  alt: string;
}) {
  return (
    <div className="border border-border bg-card overflow-hidden">
      <div className="aspect-[4/3] bg-muted">
        <picture>
          <source media="(max-width: 767px)" srcSet={mobileSrc} />
          <img src={src} alt={alt} loading="lazy" className="w-full h-full object-cover" />
        </picture>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 text-primary">
          <span className="text-secondary">{icon}</span>
          <span className="font-serif text-lg">{title}</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{copy}</p>
      </div>
    </div>
  );
}

function PendingMediaCard({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="min-h-48 border border-dashed border-border bg-card/50 p-8 flex flex-col justify-center">
      <div className="flex items-center gap-3 text-primary">
        <span className="text-secondary">{icon}</span>
        <span className="font-serif text-lg">{title}</span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Approved asset not supplied yet.
      </p>
    </div>
  );
}
