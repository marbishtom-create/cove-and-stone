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

export interface CaseStudyAsset {
  src: string;
  mobileSrc: string;
  alt: string;
  label: string;
}

export interface CaseStudyMedia {
  before?: CaseStudyAsset;
  render: CaseStudyAsset;
  completedDay?: CaseStudyAsset;
  completedNight?: CaseStudyAsset;
  video?: {
    src: string;
    poster?: string;
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
  status: "concept" | "completed";
  statusLabel?: string;
  media: CaseStudyMedia;
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
  }
];

export default function Projects() {
  const completedProjectCount = CASE_STUDIES.filter(project => project.status === "completed").length;

  return (
    <div className="w-full pt-24 lg:pt-40">
      <header className="bg-card py-20 text-center border-b border-border">
        <div className="container mx-auto px-6 max-w-4xl">
           <span className="text-secondary uppercase tracking-[0.3em] text-sm mb-6 block">Northeast Florida pool & backyard portfolio</span>
           <h1 className="text-4xl md:text-6xl font-serif mb-8 text-primary">Pool & Backyard Design</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore pool and backyard design directions across Northeast Florida. Approved completed projects are identified separately from design studies that are not presented as completed builds.
          </p>
          <div className="mt-6 inline-block bg-muted text-muted-foreground px-4 py-2 text-xs uppercase tracking-widest border border-border">
             {completedProjectCount > 0
                ? `${completedProjectCount} approved completed case study · other entries show design directions`
                : "Design directions shown · completed builds are labeled when approved"}
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
              const cardMedia = project.status === "completed" && project.media.completedDay
                ? project.media.completedDay
                : project.media.render;

              return (
              <Link key={project.slug} href={`/projects/${project.slug}/`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted mb-6">
                  <picture>
                    <source media="(max-width: 767px)" srcSet={cardMedia.mobileSrc} />
                    <img
                      src={cardMedia.src}
                      alt={cardMedia.alt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
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
