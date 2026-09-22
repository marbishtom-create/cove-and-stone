import { Link } from 'wouter';
import p1 from '@assets/generated_images/project-1.jpg';
import p2 from '@assets/generated_images/project-2.jpg';
import p3 from '@assets/generated_images/project-3.jpg';
import p4 from '@assets/generated_images/project-4.jpg';

export const CASE_STUDIES = [
  {
    slug: "ponte-vedra-modern",
    title: "Ponte Vedra Modern",
    location: "Ponte Vedra Beach, FL",
    type: "New Construction",
    size: "800 sq ft pool",
    materials: "Imported Limestone, Glass Tile",
    features: "Zero Edge, Sun Shelf, Modern Pergola",
    timeline: "14 Weeks",
    image: p1,
    desc: "A minimalist coastal modern pool with clean lines, charcoal tile details, and lush turf accents designed for a contemporary architectural home."
  },
  {
    slug: "jacksonville-waterfront",
    title: "Jacksonville Waterfront",
    location: "Jacksonville, FL",
    type: "Estate Backyard",
    size: "1,200 sq ft pool",
    materials: "Travertine, Dark Plaster",
    features: "Raised Spa, Fire Bowls, River Views",
    timeline: "20 Weeks",
    image: p2,
    desc: "An expansive curved custom pool with a raised spa and fire elements, designed to reflect the calm waters of the St. Johns River."
  },
  {
    slug: "nocatee-resort",
    title: "Nocatee Resort Backyard",
    location: "Nocatee, FL",
    type: "Complete Environment",
    size: "950 sq ft pool",
    materials: "Porcelain Pavers, Quartz Finish",
    features: "Built-in Cabana, Summer Kitchen, Tanning Ledge",
    timeline: "18 Weeks",
    image: p3,
    desc: "A total backyard transformation featuring a massive resort-style pool paired with a fully equipped cabana and outdoor kitchen."
  },
  {
    slug: "atlantic-beach-minimalist",
    title: "Atlantic Beach Minimalist",
    location: "Atlantic Beach, FL",
    type: "Courtyard Pool",
    size: "450 sq ft pool",
    materials: "Polished Concrete, Aqua Mosaics",
    features: "Plunge Pool, Linear Fire Pit",
    timeline: "12 Weeks",
    image: p4,
    desc: "A small-footprint masterpiece that maximizes a tight coastal lot with a sleek plunge pool and integrated entertaining space."
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
            Explore our portfolio of concept and completed environments across Northeast Florida. Each project represents our commitment to architectural integrity.
          </p>
          <div className="mt-6 inline-block bg-muted text-muted-foreground px-4 py-2 text-xs uppercase tracking-widest border border-border">
            Concept / Demo Gallery
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
