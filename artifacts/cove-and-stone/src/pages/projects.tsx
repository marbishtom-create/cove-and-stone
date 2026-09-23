import { Link } from 'wouter';
import beforePool from '@assets/generated_images/before-pool.jpg';
import p2 from '@assets/generated_images/project-2.jpg';
import p4 from '@assets/generated_images/project-4.jpg';
import completedPonteVedraDay from '@assets/0A80F847-1F10-44B6-A3D8-67A48A65457B_1790113686673.png';
import conceptModernDay from '@assets/7A3E70EF-56DC-4766-A259-B49AF0985941_1790113686673.png';
import conceptNight from '@assets/BB1FECAD-0F80-4070-9FF4-3B414EE0C66A_1790113686673_nocatee-enclosed.png';
import ponteVedraVideo from '@assets/ponte-vedra-modern-walkthrough.mp4';

export interface CaseStudyAsset {
  src: string;
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
  media: CaseStudyMedia;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "ponte-vedra-modern",
    title: "Ponte Vedra Modern",
    location: "Ponte Vedra Beach, FL",
    type: "Completed project",
    size: "800 sq ft pool",
    materials: "Stone deck, dark waterline detailing and integrated landscape",
    features: "Zero edge, Sun shelf, modern pergola",
    timeline: "14 Weeks",
    image: conceptModernDay,
    desc: "A completed Ponte Vedra outdoor environment photographed with the Jacksonville skyline and riverfront in the background.",
    status: "completed",
    media: {
      before: {
        src: beforePool,
        alt: "Ponte Vedra Modern backyard before construction",
        label: "Before photo",
      },
      render: {
        src: conceptModernDay,
        alt: "Concept visualization of the Ponte Vedra Modern pool",
        label: "Concept rendering",
      },
      completedDay: {
        src: completedPonteVedraDay,
        alt: "Completed Ponte Vedra Modern pool and riverfront view during the day",
        label: "Completed · day",
      },
      completedNight: {
        src: conceptNight,
        alt: "Completed Ponte Vedra Modern pool and outdoor living space at night",
        label: "Completed · night",
      },
      video: {
        src: ponteVedraVideo,
        poster: completedPonteVedraDay,
        alt: "Ponte Vedra Modern completed project walkthrough video",
        label: "Project walkthrough video",
      },
    },
  },
  {
    slug: "jacksonville-waterfront",
    title: "Jacksonville Waterfront",
    location: "Jacksonville, FL",
    type: "Concept direction",
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
        alt: "Concept visualization of the Jacksonville Waterfront pool",
        label: "Concept rendering",
      },
    },
  },
  {
    slug: "nocatee-resort",
    title: "Nocatee Resort Backyard",
    location: "Nocatee, FL",
    type: "Concept direction",
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
        alt: "Concept visualization of the Nocatee Resort Backyard",
        label: "Concept rendering",
      },
    },
  },
  {
    slug: "atlantic-beach-minimalist",
    title: "Atlantic Beach Minimalist",
    location: "Atlantic Beach, FL",
    type: "Concept direction",
    size: "450 sq ft pool",
    materials: "Illustrative polished concrete and aqua mosaic palette",
    features: "Plunge Pool, Linear Fire Pit",
    timeline: "12 Weeks",
    image: p4,
    desc: "An illustrative small-footprint direction that maximizes a tight coastal lot with a sleek plunge pool and integrated entertaining space.",
    status: "concept",
    media: {
      render: {
        src: p4,
        alt: "Concept visualization of the Atlantic Beach Minimalist pool",
        label: "Concept rendering",
      },
    },
  }
];

export default function Projects() {
  const completedProjectCount = CASE_STUDIES.filter(project => project.status === "completed").length;

  return (
    <div className="w-full pt-24 lg:pt-20">
      <header className="bg-card py-20 text-center border-b border-border">
        <div className="container mx-auto px-6 max-w-4xl">
          <span className="text-secondary uppercase tracking-[0.3em] text-sm mb-6 block">Case Studies</span>
          <h1 className="text-4xl md:text-6xl font-serif mb-8 text-primary">Selected Works</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore completed outdoor environments and illustrative concept directions for pools across Northeast Florida.
          </p>
          <div className="mt-6 inline-block bg-muted text-muted-foreground px-4 py-2 text-xs uppercase tracking-widest border border-border">
            {completedProjectCount} completed case study · concept directions also included
          </div>
        </div>
      </header>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {CASE_STUDIES.map((project, i) => (
              <Link key={project.slug} href={`/projects/${project.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted mb-6">
                  <img
                    src={project.status === "completed" && project.media.completedDay
                      ? project.media.completedDay.src
                      : project.media.render.src}
                    alt={project.status === "completed" && project.media.completedDay
                      ? project.media.completedDay.alt
                      : project.media.render.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  <div className="absolute bottom-4 left-4 border border-white/30 bg-black/35 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm">
                    {project.status === "completed" ? "Completed photography" : "Concept rendering"}
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
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
