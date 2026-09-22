import { Link } from 'wouter';
import p2 from '@assets/generated_images/project-2.jpg';
import p3 from '@assets/generated_images/project-3.jpg';
import p4 from '@assets/generated_images/project-4.jpg';
import ponteVedraPhoto from '@assets/0A80F847-1F10-44B6-A3D8-67A48A65457B_1790113686673.png';

export const CASE_STUDIES = [
  {
    slug: "ponte-vedra-modern",
    title: "Ponte Vedra Modern",
    location: "Ponte Vedra Beach, FL",
    type: "Completed project",
    status: "Completed project",
    materials: "Stone deck, dark waterline detailing and integrated landscape",
    features: "Zero edge, sun shelf, modern pergola",
    image: ponteVedraPhoto,
    desc: "A completed Ponte Vedra outdoor environment photographed with the Jacksonville skyline and riverfront in the background."
  },
  {
    slug: "jacksonville-waterfront",
    title: "Jacksonville Waterfront",
    location: "Jacksonville, FL",
    type: "Concept direction",
    status: "Concept visualization",
    materials: "Illustrative travertine and dark-water palette",
    features: "Raised spa, fire bowls, river views",
    image: p2,
    desc: "An illustrative waterfront direction with a curved pool, raised spa and fire elements inspired by the calm waters of the St. Johns River."
  },
  {
    slug: "nocatee-resort",
    title: "Nocatee Resort Backyard",
    location: "Nocatee, FL",
    type: "Concept direction",
    status: "Concept visualization",
    materials: "Illustrative porcelain, quartz and architectural shade palette",
    features: "Built-in cabana, summer kitchen, tanning ledge",
    image: p3,
    desc: "An illustrative total-backyard direction pairing a resort-style pool with a cabana, outdoor kitchen and connected living areas."
  },
  {
    slug: "atlantic-beach-minimalist",
    title: "Atlantic Beach Minimalist",
    location: "Atlantic Beach, FL",
    type: "Concept direction",
    status: "Concept visualization",
    materials: "Illustrative polished concrete and aqua mosaic palette",
    features: "Plunge pool, linear fire pit",
    image: p4,
    desc: "An illustrative small-footprint direction that maximizes a tight coastal lot with a sleek plunge pool and integrated entertaining space."
  }
];

export default function Projects() {
  return (
    <div className="w-full pt-20">
      <header className="bg-card py-20 text-center border-b border-border">
        <div className="container mx-auto px-6 max-w-4xl">
          <span className="text-secondary uppercase tracking-[0.3em] text-sm mb-6 block">Case Studies</span>
          <h1 className="text-4xl md:text-6xl font-serif mb-8 text-primary">Selected Works</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore illustrative concept directions for pools and complete outdoor environments across Northeast Florida. Completed case studies will be added as approved project photography and details become available.
          </p>
          <div className="mt-6 inline-block bg-muted text-muted-foreground px-4 py-2 text-xs uppercase tracking-widest border border-border">
             Concept + Completed Gallery
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
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  <div className="absolute bottom-4 left-4 border border-white/30 bg-black/30 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-white/85 backdrop-blur-sm">
                    {project.status}
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
