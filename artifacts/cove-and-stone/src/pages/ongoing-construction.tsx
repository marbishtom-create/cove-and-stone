import { Link } from 'wouter';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  CircleDot,
  Clock3,
  HardHat,
  Info,
  Ruler,
  ShieldCheck,
  Waves,
} from 'lucide-react';
import may14ExcavationMobile from '@assets/generated_images/current-pool-build/may14-excavation-mobile.mp4';
import may14ExcavationPoster from '@assets/generated_images/current-pool-build/may14-excavation-poster.jpg';
import may14SteelAndShellMobile from '@assets/generated_images/current-pool-build/may14-steel-and-shell-mobile.mp4';
import may14SteelAndShellPoster from '@assets/generated_images/current-pool-build/may14-steel-and-shell-poster.jpg';
import may26Shell from '@assets/generated_images/current-pool-build/may26-shell.jpg';
import may26ShellMobile from '@assets/generated_images/current-pool-build/may26-shell-mobile.jpg';
import may26Steps from '@assets/generated_images/current-pool-build/may26-steps.jpg';
import may26StepsMobile from '@assets/generated_images/current-pool-build/may26-steps-mobile.jpg';
import septemberShellDetail from '@assets/generated_images/current-pool-build/september-shell-detail.jpg';
import septemberShellDetailMobile from '@assets/generated_images/current-pool-build/september-shell-detail-mobile.jpg';
import septemberOverview from '@assets/generated_images/current-pool-build/september-overview.jpg';
import septemberOverviewMobile from '@assets/generated_images/current-pool-build/september-overview-mobile.jpg';
import septemberShellPortrait from '@assets/generated_images/current-pool-build/september-shell-portrait.jpg';
import septemberShellPortraitMobile from '@assets/generated_images/current-pool-build/september-shell-portrait-mobile.jpg';
import septemberSiteGrading from '@assets/generated_images/current-pool-build/september-site-grading.jpg';
import septemberSiteGradingMobile from '@assets/generated_images/current-pool-build/september-site-grading-mobile.jpg';

type PhotoProgressCardProps = {
  index: string;
  title: string;
  note: string;
  desktopSrc: string;
  mobileSrc: string;
  alt: string;
  aspectClass?: string;
  time?: string;
};

type VideoProgressCardProps = {
  index: string;
  title: string;
  note: string;
  mobileSrc: string;
  poster: string;
  alt: string;
};

const guideStages = [
  {
    number: '01',
    title: 'Planning & permits',
    copy: 'The scope, property information, design direction, engineering coordination and permit requirements are brought into one clear plan before work begins.',
    icon: ClipboardMark,
  },
  {
    number: '02',
    title: 'Layout & excavation',
    copy: 'The pool is located on the property, then the excavation establishes the shape, elevations and working room for the structure.',
    icon: Ruler,
  },
  {
    number: '03',
    title: 'Reinforcement, plumbing & electrical',
    copy: 'Steel reinforcement and the working systems are installed. Required inspections occur as the work reaches each applicable checkpoint.',
    icon: HardHat,
  },
  {
    number: '04',
    title: 'Shell & cure',
    copy: 'The structural shell is formed and allowed to cure before finish work continues. The shell is still a work surface at this point, not a finished pool.',
    icon: Waves,
  },
  {
    number: '05',
    title: 'Tile & coping',
    copy: 'Waterline tile and the edge treatment are installed once the structure is ready to receive those finish materials.',
    icon: Check,
  },
  {
    number: '06',
    title: 'Decking',
    copy: 'The surrounding walking and entertaining surfaces are built after the pool edge and adjacent grades can be coordinated.',
    icon: CircleDot,
  },
  {
    number: '07',
    title: 'Equipment startup & handoff',
    copy: 'Equipment is started, the system is reviewed and the completed environment is prepared for handoff and care instructions.',
    icon: ShieldCheck,
  },
];

function ClipboardMark() {
  return <span className="relative block h-5 w-5 rounded-[2px] border border-current"><span className="absolute -top-1 left-1/2 h-1.5 w-2 -translate-x-1/2 border border-current bg-background" /></span>;
}

export default function OngoingConstruction() {
  return (
    <div className="w-full overflow-hidden bg-background pt-24 text-foreground lg:pt-36">
      <section className="relative border-b border-border bg-card">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_18%,hsl(var(--secondary)/0.13),transparent_34%),linear-gradient(120deg,transparent_0%,hsl(var(--muted)/0.2)_100%)]" aria-hidden="true" />
        <div className="container relative mx-auto max-w-7xl px-6 pb-20 pt-12 lg:pb-28 lg:pt-20">
          <div className="grid items-end gap-14 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-24">
            <div className="max-w-4xl">
              <Link
                href="/projects/"
                data-testid="link-back-projects"
                className="mb-14 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary lg:mb-20"
              >
                <ArrowLeft size={14} strokeWidth={1.5} />
                Back to projects
              </Link>
              <div className="mb-7 flex flex-wrap items-center gap-3">
                <span
                  data-testid="status-ongoing-construction"
                  className="inline-flex items-center gap-2 border border-secondary/40 bg-secondary/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-secondary"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary" aria-hidden="true" />
                  In progress
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Residential pool build</span>
              </div>
              <h1 className="max-w-4xl text-[clamp(3rem,7vw,6.5rem)] font-serif leading-[0.96] tracking-[-0.045em] text-primary">
                Ongoing Construction
              </h1>
              <p className="mt-4 max-w-2xl font-serif text-2xl text-primary sm:text-3xl">
                A pool, in the making.
              </p>
              <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground sm:text-xl">
                A dated field record of one residential pool build—from the first cut into the ground to a formed shell and the next layer of site work.
              </p>
            </div>

            <aside className="border-l border-secondary/45 pl-6 lg:mb-2" aria-label="Project status summary">
              <div className="mb-5 flex items-center gap-3 text-secondary">
                <Clock3 size={18} strokeWidth={1.4} />
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em]">Status note</span>
              </div>
              <p className="text-base leading-relaxed text-primary">
                These photographs document work underway. They do not show a finished pool or establish a promised completion date.
              </p>
              <div className="mt-7 flex items-center gap-3 border-t border-border pt-5 text-xs text-muted-foreground">
                <CalendarDays size={15} className="text-secondary" strokeWidth={1.5} />
                <span>Progress recorded May–September 2026</span>
              </div>
            </aside>
          </div>
        </div>
        <div className="container relative mx-auto max-w-7xl px-6 pb-5">
          <a
            href="#progress-log"
            data-testid="link-view-progress-log"
            className="group inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
          >
            View the progress log
            <ChevronDown size={15} className="transition-transform duration-300 group-hover:translate-y-1 motion-reduce:transition-none" />
          </a>
        </div>
      </section>

      <section id="progress-log" className="container mx-auto max-w-7xl px-6 py-20 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-secondary">The field record</p>
            <h2 className="max-w-xs text-3xl font-serif leading-tight text-primary sm:text-4xl">What the work looked like, when it happened.</h2>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Each update appears in the order the work was recorded, from the first excavation through the latest site photos.
            </p>
            <div className="mt-8 hidden h-px w-20 bg-secondary lg:block" aria-hidden="true" />
          </div>

          <div className="relative">
            <div className="absolute bottom-3 left-[0.65rem] top-3 w-px bg-border lg:left-[1.15rem]" aria-hidden="true" />

            <div className="relative mb-20 pl-10 lg:pl-20">
              <TimelineDate date="May 14, 2026" detail="Excavation day" />
              <div className="mt-8 space-y-10">
                <VideoProgressCard
                  index="01"
                  title="Excavation begins"
                  note="The first cut establishes the pool footprint and opens the site for the work that follows."
                  mobileSrc={may14ExcavationMobile}
                  poster={may14ExcavationPoster}
                  alt="Excavation equipment and a freshly opened residential pool work area"
                />
                <VideoProgressCard
                  index="02"
                  title="Steel, forms & shell work"
                  note="The next record shows reinforcing steel, forms and concrete work taking shape in the excavation."
                  mobileSrc={may14SteelAndShellMobile}
                  poster={may14SteelAndShellPoster}
                  alt="Steel reinforcement, wood forms and concrete shell work inside a residential pool excavation"
                />
              </div>
            </div>

            <div className="relative mb-20 pl-10 lg:pl-20">
              <TimelineDate date="May 26, 2026" detail="Shell and step work" />
              <div className="mt-8 grid gap-10 md:grid-cols-[1.18fr_0.82fr] md:items-start">
                <PhotoProgressCard
                  index="03"
                  title="The pool shell"
                  note="An overall view of the formed shell, with plumbing penetrations visible and the structure still unfinished."
                  desktopSrc={may26Shell}
                  mobileSrc={may26ShellMobile}
                  alt="Overall view of the unfinished concrete pool shell with plumbing penetrations"
                  aspectClass="aspect-[4/3]"
                />
                <PhotoProgressCard
                  index="04"
                  title="Steps in detail"
                  note="The built-in steps are visible at the edge of the shell, before tile, coping or decking."
                  desktopSrc={may26Steps}
                  mobileSrc={may26StepsMobile}
                  alt="Close view of unfinished concrete pool steps beside the pool shell"
                  aspectClass="aspect-[3/4]"
                />
              </div>
            </div>

            <div className="relative pl-10 lg:pl-20">
              <TimelineDate date="September 24, 2026" detail="Shell and site review" />
              <div className="mt-8 grid gap-10 sm:grid-cols-2">
                <PhotoProgressCard
                  index="05"
                  title="Shell & steps, close view"
                  note="Captured at 10:53. The shell and stepping elements remain visible as construction surfaces."
                  desktopSrc={septemberShellDetail}
                  mobileSrc={septemberShellDetailMobile}
                  alt="Close view of the unfinished pool shell and broad concrete steps beside the home"
                  aspectClass="aspect-[4/3]"
                  time="10:53"
                />
                <PhotoProgressCard
                  index="06"
                  title="Shell overview"
                  note="Captured at 10:53. A wider frame shows the pool footprint in relation to the backyard."
                  desktopSrc={septemberOverview}
                  mobileSrc={septemberOverviewMobile}
                  alt="Wide overview of the unfinished pool shell and backyard work area"
                  aspectClass="aspect-[4/3]"
                  time="10:53"
                />
                <PhotoProgressCard
                  index="07"
                  title="Pool edge, from the side"
                  note="Captured at 14:24. The vertical view follows the pool edge and the graded soil around it."
                  desktopSrc={septemberShellPortrait}
                  mobileSrc={septemberShellPortraitMobile}
                  alt="Vertical view of the unfinished pool edge set into a residential backyard"
                  aspectClass="aspect-[3/4]"
                  time="14:24"
                />
                <PhotoProgressCard
                  index="08"
                  title="Site grading underway"
                  note="Captured at 14:24. The broader site is being worked around the shell; finish surfaces are not shown."
                  desktopSrc={septemberSiteGrading}
                  mobileSrc={septemberSiteGradingMobile}
                  alt="Wide residential backyard view with the unfinished pool shell and site grading underway"
                  aspectClass="aspect-[4/3]"
                  time="14:24"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/40">
        <div className="container mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
            <div>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-secondary">A useful primer</p>
              <h2 className="max-w-md text-4xl font-serif leading-tight text-primary sm:text-5xl">The usual path from plan to handoff.</h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
                Every property has its own conditions, but a residential pool build commonly moves through these broad stages.
              </p>
              <div className="mt-9 flex gap-4 border border-secondary/35 bg-background/65 p-5">
                <Info size={18} className="mt-0.5 shrink-0 text-secondary" strokeWidth={1.5} />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Actual sequence and timing vary with property conditions, permits and inspections, trade coordination and weather.
                </p>
              </div>
            </div>

            <ol className="grid gap-x-10 gap-y-0 sm:grid-cols-2">
              {guideStages.map((stage) => {
                const StageIcon = stage.icon;
                return (
                  <li key={stage.number} data-testid={`guide-stage-${stage.number}`} className="group border-t border-border py-6 first:border-t-0 sm:first:border-t-0">
                    <div className="flex items-start gap-4">
                      <span className="pt-1 font-mono text-[10px] tracking-[0.18em] text-secondary">{stage.number}</span>
                      <div>
                        <div className="mb-3 flex items-center gap-3">
                          <StageIcon size={17} className="text-secondary transition-transform duration-300 group-hover:-translate-y-0.5 motion-reduce:transition-none" strokeWidth={1.5} />
                          <h3 className="text-lg font-serif text-primary">{stage.title}</h3>
                        </div>
                        <p className="text-sm leading-relaxed text-muted-foreground">{stage.copy}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="relative overflow-hidden border border-border bg-primary px-7 py-12 text-primary-foreground sm:px-12 lg:px-16 lg:py-16">
          <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border border-secondary/25" aria-hidden="true" />
          <div className="absolute -right-3 -top-7 h-40 w-40 rounded-full border border-secondary/20" aria-hidden="true" />
          <div className="relative grid items-end gap-10 lg:grid-cols-[1fr_auto]">
            <div className="max-w-2xl">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-secondary">For your own build</p>
              <h2 className="max-w-xl text-4xl font-serif leading-tight sm:text-5xl">Good projects begin with an honest conversation.</h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/70">
                Bring your property, priorities and questions. We can talk through the design-build process, the site and what a thoughtful next step might look like.
              </p>
            </div>
            <Link
              href="/contact/"
              data-testid="link-contact-about-your-project"
              className="inline-flex items-center justify-center gap-4 border border-secondary bg-secondary px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary-foreground transition-colors hover:bg-background hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              Talk about your project
              <ArrowRight size={16} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function TimelineDate({ date, detail }: { date: string; detail: string }) {
  return (
    <div className="relative">
      <span className="absolute -left-[2.15rem] top-1.5 h-3 w-3 rounded-full border-2 border-background bg-secondary ring-1 ring-secondary/50 lg:-left-[4.8rem]" aria-hidden="true" />
      <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-secondary">{date}</p>
      <p className="mt-2 text-2xl font-serif text-primary">{detail}</p>
    </div>
  );
}

function PhotoProgressCard({
  index,
  title,
  note,
  desktopSrc,
  mobileSrc,
  alt,
  aspectClass = 'aspect-[4/3]',
  time,
}: PhotoProgressCardProps) {
  return (
    <figure data-testid={`progress-photo-${index}`} className="group overflow-hidden border border-border bg-card">
      <div className={`relative overflow-hidden bg-muted ${aspectClass}`}>
        <picture>
          <source media="(max-width: 767px)" srcSet={mobileSrc} />
          <img
            src={desktopSrc}
            alt={alt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            data-testid={`img-progress-${index}`}
          />
        </picture>
        <span className="absolute left-3 top-3 border border-white/40 bg-primary/75 px-2 py-1 font-mono text-[10px] tracking-[0.16em] text-primary-foreground backdrop-blur-sm">{index}</span>
      </div>
      <figcaption className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-serif leading-tight text-primary">{title}</h3>
          {time ? <span className="shrink-0 pt-1 font-mono text-[10px] tracking-[0.1em] text-muted-foreground">{time}</span> : null}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{note}</p>
      </figcaption>
    </figure>
  );
}

function VideoProgressCard({
  index,
  title,
  note,
  mobileSrc,
  poster,
  alt,
}: VideoProgressCardProps) {
  return (
    <figure data-testid={`progress-video-${index}`} className="overflow-hidden border border-border bg-card">
      <div className="relative mx-auto w-full max-w-[28rem] bg-black">
        <video
          className="aspect-[9/16] w-full bg-black object-contain"
          controls
          playsInline
          preload="none"
          poster={poster}
          aria-label={alt}
          data-testid={`video-progress-${index}`}
          src={mobileSrc}
        >
          Your browser does not support the progress video.
        </video>
        <span className="pointer-events-none absolute left-3 top-3 border border-white/40 bg-primary/75 px-2 py-1 font-mono text-[10px] tracking-[0.16em] text-primary-foreground backdrop-blur-sm">{index}</span>
      </div>
      <figcaption className="p-5 sm:p-6">
        <h3 className="text-xl font-serif leading-tight text-primary">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{note}</p>
      </figcaption>
    </figure>
  );
}