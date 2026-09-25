import { Link } from 'wouter';
import p2 from '@assets/generated_images/project-2.jpg';
import p2Mobile from '@assets/generated_images/project-2-mobile.jpg';
import stJohnsRiverRetreat from '@assets/generated_images/st-johns-river-retreat-entertaining.webp';
import stJohnsRiverRetreatMobile from '@assets/generated_images/st-johns-river-retreat-entertaining-mobile.jpg';
import ponteVedraRetreat from '@assets/generated_images/ponte-vedra-private-retreat.png';
import ponteVedraRetreatMobile from '@assets/generated_images/ponte-vedra-private-retreat-mobile.jpg';
import conceptNight from '@assets/BB1FECAD-0F80-4070-9FF4-3B414EE0C66A_1790113686673_nocatee-enclosed.png';
import conceptNightMobile from '@assets/BB1FECAD-0F80-4070-9FF4-3B414EE0C66A_1790113686673_nocatee-enclosed-mobile.jpg';
import ongoingConstructionImage from '@assets/generated_images/current-pool-build/september-overview.jpg';
import ongoingConstructionImageMobile from '@assets/generated_images/current-pool-build/september-overview-mobile.jpg';
import mandarinConstruction01 from '@assets/generated_images/mandarin-pool-project/construction-01.jpg';
import mandarinConstruction01Mobile from '@assets/generated_images/mandarin-pool-project/construction-01-mobile.jpg';
import mandarinConstruction02 from '@assets/generated_images/mandarin-pool-project/construction-02.jpg';
import mandarinConstruction02Mobile from '@assets/generated_images/mandarin-pool-project/construction-02-mobile.jpg';
import mandarinConstruction03 from '@assets/generated_images/mandarin-pool-project/construction-03.jpg';
import mandarinConstruction03Mobile from '@assets/generated_images/mandarin-pool-project/construction-03-mobile.jpg';
import mandarinRendering01 from '@assets/generated_images/mandarin-pool-project/rendering-01.jpg';
import mandarinRendering01Mobile from '@assets/generated_images/mandarin-pool-project/rendering-01-mobile.jpg';
import mandarinRendering02 from '@assets/generated_images/mandarin-pool-project/rendering-02.jpg';
import mandarinRendering02Mobile from '@assets/generated_images/mandarin-pool-project/rendering-02-mobile.jpg';
import mandarinRendering03 from '@assets/generated_images/mandarin-pool-project/rendering-03.jpg';
import mandarinRendering03Mobile from '@assets/generated_images/mandarin-pool-project/rendering-03-mobile.jpg';
import mandarinRendering04 from '@assets/generated_images/mandarin-pool-project/rendering-04.jpg';
import mandarinRendering04Mobile from '@assets/generated_images/mandarin-pool-project/rendering-04-mobile.jpg';
import mandarinRendering05 from '@assets/generated_images/mandarin-pool-project/rendering-05.jpg';
import mandarinRendering05Mobile from '@assets/generated_images/mandarin-pool-project/rendering-05-mobile.jpg';
import mandarinConstructionVideo from '@assets/generated_images/mandarin-pool-project/construction-progress.mp4';
import mandarinConstructionVideoMobile from '@assets/generated_images/mandarin-pool-project/construction-progress-mobile.mp4';
import mandarinConstructionVideoPoster from '@assets/generated_images/mandarin-pool-project/construction-progress-poster.jpg';
import orlandoConstructionShell from '@assets/generated_images/orlando-pool-project/construction-shell.jpg';
import orlandoConstructionShellMobile from '@assets/generated_images/orlando-pool-project/construction-shell-mobile.jpg';
import orlandoCompletedPool01 from '@assets/generated_images/orlando-pool-project/completed-pool-01.jpg';
import orlandoCompletedPool01Mobile from '@assets/generated_images/orlando-pool-project/completed-pool-01-mobile.jpg';
import orlandoCompletedPool02 from '@assets/generated_images/orlando-pool-project/completed-pool-02.jpg';
import orlandoCompletedPool02Mobile from '@assets/generated_images/orlando-pool-project/completed-pool-02-mobile.jpg';

export interface CaseStudyAsset {
  src: string;
  mobileSrc: string;
  alt: string;
  label: string;
  heroFit?: "cover" | "contain";
}

export interface CaseStudyMedia {
  before?: CaseStudyAsset;
  render?: CaseStudyAsset;
  renderings?: CaseStudyAsset[];
  construction?: CaseStudyAsset[];
  completedDay?: CaseStudyAsset;
  completedNight?: CaseStudyAsset;
  completedGallery?: CaseStudyAsset[];
  video?: {
    desktopSrc: string;
    mobileSrc: string;
    poster: string;
    alt: string;
    label: string;
  };
}

export interface CaseStudy {
  slug: string;
  title: string;
  location: string;
  type: string;
  size: string;
  materials: string;
  features: string;
  timeline: string;
  image: string;
  desc: string;
  status: "concept" | "in-progress" | "completed";
  statusLabel?: string;
  media: CaseStudyMedia;
}

export function getCaseStudyHeroMedia(project: CaseStudy): CaseStudyAsset {
  const heroMedia = project.status === "completed"
    ? project.media.completedDay
      ?? project.media.completedGallery?.[0]
      ?? project.media.render
      ?? project.media.construction?.[0]
    : project.media.render
      ?? project.media.construction?.[0]
      ?? project.media.completedDay
      ?? project.media.completedGallery?.[0];

  if (!heroMedia) {
    throw new Error(`Case study "${project.slug}" is missing its primary image.`);
  }

  return heroMedia;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "ponte-vedra-modern",
    title: "Ponte Vedra Modern",
    location: "Ponte Vedra Beach, FL",
    type: "Enclosed pool & outdoor living",
    size: "800 sq ft pool",
    materials: "Light limestone, deep-blue waterline tile and native coastal planting",
    features: "Linear pool, Integrated spa, Private cabana",
    timeline: "Design development",
    image: ponteVedraRetreat,
    desc: "A private Ponte Vedra retreat with a fully enclosed pool, integrated spa and covered outdoor living pavilion—planned to make the most of a compact lot.",
    status: "concept",
    statusLabel: "Private backyard design",
    media: {
      render: {
        src: ponteVedraRetreat,
        mobileSrc: ponteVedraRetreatMobile,
        alt: "Fully enclosed Ponte Vedra pool setting with a privacy wall, palms and live oak",
        label: "Fully Enclosed · Smart Use of Space",
      },
    },
  },
  {
    slug: "jacksonville-waterfront",
    title: "Jacksonville Waterfront",
    location: "Jacksonville, FL",
    type: "Design direction",
    size: "1,200 sq ft pool",
    materials: "Illustrative travertine and dark-water palette",
    features: "Raised Spa, Fire Bowls, River Views",
    timeline: "20 Weeks",
    image: p2,
    desc: "An illustrative waterfront direction with a curved pool, raised spa and fire elements inspired by the calm waters of the St. Johns River."
    ,
    status: "concept",
    media: {
      render: {
        src: p2,
        mobileSrc: p2Mobile,
        alt: "Illustrative curved pool design with a raised spa and fire features",
        label: "Design rendering",
      },
    },
  },
  {
    slug: "nocatee-resort",
    title: "Nocatee Resort Backyard",
    location: "Nocatee, FL",
    type: "Design direction",
    size: "950 sq ft pool",
    materials: "Illustrative porcelain, quartz and architectural shade palette",
    features: "Built-in Cabana, Summer Kitchen, Tanning Ledge",
    timeline: "18 Weeks",
    image: conceptNight,
    desc: "An illustrative total-backyard direction pairing a resort-style pool with a cabana, outdoor kitchen and connected living areas."
    ,
    status: "concept",
    media: {
      render: {
        src: conceptNight,
        mobileSrc: conceptNightMobile,
        alt: "Illustrative resort-style backyard design with a cabana and pool",
        label: "Design rendering",
      },
    },
  },
  {
    slug: "atlantic-beach-minimalist",
    title: "St. Johns River Retreat",
    location: "St. Johns River, Northeast Florida",
    type: "Riverfront pool & outdoor living",
    size: "Spacious riverfront backyard",
    materials: "Smooth dark-gray stone decking, charcoal porcelain coping, river-blue tile and native Florida planting",
    features: "Pool, Raised Spa, Smooth Dark-Gray Stone Deck, Pergola, Gourmet Outdoor Kitchen, Oversized TV Showing a Jacksonville Jaguars Game, Small Bar, Expanded Lawn, Private Dock",
    timeline: "To be confirmed",
    image: stJohnsRiverRetreat,
    desc: "An illustrative St. Johns River retreat designed for entertaining, with a pool and raised spa, expansive smooth dark-gray stone decking, a pergola-covered gourmet kitchen and bar, an oversized TV showing a Jacksonville Jaguars game, generous lawn and private dock.",
    status: "concept",
    statusLabel: "Riverfront design",
    media: {
      render: {
        src: stJohnsRiverRetreat,
        mobileSrc: stJohnsRiverRetreatMobile,
        alt: "Illustrative St. Johns River pool and raised spa with an expanded dark-gray stone deck, pergola-covered gourmet kitchen and bar, large TV showing a Jacksonville Jaguars game, open lawn and private dock",
        label: "Design visualization",
      },
    },
  },
  {
    slug: "mandarin-pool-outdoor-living",
    title: "Mandarin Pool & Outdoor Living",
    location: "Mandarin, Jacksonville, FL",
    type: "Pool and outdoor-living project",
    size: "Details not provided",
    materials: "Paver walkways, gravel paths and a light-toned pool surround in the renderings",
    features: "Rectangular pool, wide entry steps, paved outdoor areas",
    timeline: "Construction in progress",
    image: mandarinRendering01,
    desc: "An active backyard project in Mandarin. Site photos and video document construction, while the separate design renderings show the planned pool and hardscape.",
    status: "in-progress",
    statusLabel: "Construction in progress",
    media: {
      render: {
        src: mandarinRendering01,
        mobileSrc: mandarinRendering01Mobile,
        alt: "Design rendering of a rectangular pool with wide entry steps and a light-toned deck for the Mandarin project.",
        label: "Design rendering · planned pool and deck",
        heroFit: "contain",
      },
      renderings: [
        {
          src: mandarinRendering02,
          mobileSrc: mandarinRendering02Mobile,
          alt: "Top-down design rendering of the proposed rectangular pool and entry steps in Mandarin.",
          label: "Design rendering · overhead view",
        },
        {
          src: mandarinRendering03,
          mobileSrc: mandarinRendering03Mobile,
          alt: "Angled design rendering of the planned Mandarin pool, broad entry steps and surrounding deck.",
          label: "Design rendering · angled view",
        },
        {
          src: mandarinRendering04,
          mobileSrc: mandarinRendering04Mobile,
          alt: "Front-facing design rendering of the planned Mandarin pool and surrounding deck.",
          label: "Design rendering · front view",
        },
        {
          src: mandarinRendering05,
          mobileSrc: mandarinRendering05Mobile,
          alt: "Low-angle design rendering showing the long side of the proposed Mandarin pool and entry steps.",
          label: "Design rendering · side view",
        },
      ],
      construction: [
        {
          src: mandarinConstruction01,
          mobileSrc: mandarinConstruction01Mobile,
          alt: "Construction progress photo of a paver walkway leading across the Mandarin backyard.",
          label: "Construction progress · backyard walkway",
        },
        {
          src: mandarinConstruction02,
          mobileSrc: mandarinConstruction02Mobile,
          alt: "Closer view of pavers and gravel being installed along the Mandarin home's side yard.",
          label: "Construction progress · paver installation",
        },
        {
          src: mandarinConstruction03,
          mobileSrc: mandarinConstruction03Mobile,
          alt: "View along the in-progress paver path and gravel work at the Mandarin outdoor-living project.",
          label: "Construction progress · path and gravel",
        },
      ],
      video: {
        desktopSrc: mandarinConstructionVideo,
        mobileSrc: mandarinConstructionVideoMobile,
        poster: mandarinConstructionVideoPoster,
        alt: "Portrait video documenting construction at the Mandarin pool and outdoor-living project.",
        label: "Construction progress video",
      },
    },
  },
  {
    slug: "orlando-geometric-pool",
    title: "Orlando Geometric Pool",
    location: "Orlando, FL",
    type: "Geometric pool project",
    size: "Details not provided",
    materials: "Blue pool tile and light-toned paver decking, as shown in supplied photography",
    features: "Geometric pool, blue tile interior, light paver deck",
    timeline: "Completed",
    image: orlandoCompletedPool01,
    desc: "A completed Orlando pool project with a geometric layout, blue tile interior and light-toned decking. The gallery keeps the construction-stage image separate from the finished pool photography.",
    status: "completed",
    statusLabel: "Completed pool project",
    media: {
      construction: [
        {
          src: orlandoConstructionShell,
          mobileSrc: orlandoConstructionShellMobile,
          alt: "Orlando pool during construction, showing the unfinished pool shell and blue-tiled spa or step area.",
          label: "Construction progress · pool shell",
        },
      ],
      completedDay: {
        src: orlandoCompletedPool01,
        mobileSrc: orlandoCompletedPool01Mobile,
        alt: "Completed geometric Orlando pool with blue tile, light deck, lawn and a screened safety fence.",
        label: "Completed pool · full view",
        heroFit: "contain",
      },
      completedGallery: [
        {
          src: orlandoCompletedPool02,
          mobileSrc: orlandoCompletedPool02Mobile,
          alt: "Closer view of the completed Orlando pool beside the home, showing blue waterline tile and light pavers.",
          label: "Completed pool · detail view",
        },
      ],
    },
  }
];

export default function Projects() {
  const completedProjectCount = CASE_STUDIES.filter(project => project.status === "completed").length;
  const inProgressProjectCount = CASE_STUDIES.filter(project => project.status === "in-progress").length;

  return (
    <div className="w-full pt-24 lg:pt-40">
      <header className="bg-card py-20 text-center border-b border-border">
        <div className="container mx-auto px-6 max-w-4xl">
           <span className="text-secondary uppercase tracking-[0.3em] text-sm mb-6 block">Cove & Stone pool and backyard portfolio</span>
           <h1 className="text-4xl md:text-6xl font-serif mb-8 text-primary">Pool & Backyard Design</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
               Explore completed pool projects, active construction and design directions from Cove & Stone. Project photography, construction updates and illustrative renderings are labeled separately.
          </p>
          <div className="mt-6 inline-block bg-muted text-muted-foreground px-4 py-2 text-xs uppercase tracking-widest border border-border">
              {`${completedProjectCount} completed project${completedProjectCount === 1 ? "" : "s"} · ${inProgressProjectCount} active project${inProgressProjectCount === 1 ? "" : "s"} · design studies labeled separately`}
          </div>
        </div>
      </header>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            <Link href="/projects/ongoing-construction/" className="group block">
              <div className="relative aspect-[4/3] overflow-hidden bg-muted mb-6">
                <picture>
                  <source media="(max-width: 767px)" srcSet={ongoingConstructionImageMobile} />
                  <img
                    src={ongoingConstructionImage}
                    alt="Unfinished residential pool shell and built-in steps in an active backyard construction area"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </picture>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                <div className="absolute bottom-4 left-4 border border-white/30 bg-black/35 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm">
                  In progress
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-serif text-primary mb-2 group-hover:text-secondary transition-colors">
                    Ongoing Construction
                  </h3>
                  <p className="text-muted-foreground text-sm uppercase tracking-widest">
                    Updated September 24, 2026
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-primary group-hover:border-secondary group-hover:bg-secondary group-hover:text-secondary-foreground transition-all">
                  →
                </div>
              </div>
            </Link>
            {CASE_STUDIES.map((project) => {
              const cardMedia = getCaseStudyHeroMedia(project);

              return (
              <Link key={project.slug} href={`/projects/${project.slug}/`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted mb-6">
                  <picture>
                    <source media="(max-width: 767px)" srcSet={cardMedia.mobileSrc} />
                    <img
                      src={cardMedia.src}
                      alt={cardMedia.alt}
                      loading="lazy"
                      className={`w-full h-full ${project.status === "in-progress" ? "object-contain" : "object-cover"} transition-transform duration-700 group-hover:scale-105`}
                    />
                  </picture>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  {project.status !== "concept" && (
                    <div className="absolute top-4 left-4 border border-white/30 bg-black/35 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm">
                      {project.statusLabel}
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 border border-white/30 bg-black/35 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm">
                     {cardMedia.label}
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-serif text-primary mb-2 group-hover:text-secondary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm uppercase tracking-widest">
                      {project.location}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-primary group-hover:border-secondary group-hover:bg-secondary group-hover:text-secondary-foreground transition-all">
                    →
                  </div>
                </div>
              </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
