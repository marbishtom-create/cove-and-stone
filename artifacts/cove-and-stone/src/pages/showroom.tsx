import { ArrowRight, MapPin, Clock, Building, Eye, PencilRuler, WalletCards, Hammer } from 'lucide-react';
import { THEME_CONFIG } from '@/config/theme';
import { Link } from 'wouter';

export default function Showroom() {
  return (
    <div className="w-full pt-20 bg-background">
      <div className="container mx-auto px-6 max-w-7xl py-24">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-secondary uppercase tracking-[0.3em] text-sm mb-4 block">Jacksonville Design Studio & Showroom</span>
          <h1 className="text-4xl md:text-6xl font-serif mb-6 text-primary">See it. Design it. Finance it. Build it.</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our in-house design showroom on Philips Highway brings the whole backyard into view. Explore materials at full scale, build a cohesive palette and review photorealistic concepts before construction begins.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="relative aspect-[4/3] w-full shadow-2xl border border-border">
            <div className="w-full h-full bg-card flex flex-col items-center justify-center text-center p-10">
              <Building className="w-12 h-12 text-secondary mb-6" />
              <span className="text-secondary uppercase tracking-[0.25em] text-xs mb-4">Jacksonville Design Studio & Showroom</span>
              <h2 className="text-2xl md:text-3xl font-serif text-primary mb-4">Original showroom photography coming soon</h2>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                This space is reserved for the original Jacksonville showroom photo. No concept or unrelated stock image is being presented as the Cove & Stone studio.
              </p>
            </div>
            <div className="absolute bottom-4 left-4 border border-border bg-background/90 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Original photo not supplied
            </div>
          </div>

          <div className="space-y-12">
            <div className="bg-card border border-border p-10">
              <h2 className="text-2xl font-serif text-primary mb-8 border-b border-border pb-4">{THEME_CONFIG.showroom.name}</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="text-secondary w-6 h-6 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-primary uppercase tracking-widest text-sm mb-1">Location</h4>
                    <p className="text-muted-foreground">
                      {THEME_CONFIG.showroom.address}<br />
                      {THEME_CONFIG.showroom.city}, {THEME_CONFIG.showroom.state} {THEME_CONFIG.showroom.zip}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="text-secondary w-6 h-6 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-primary uppercase tracking-widest text-sm mb-1">Hours</h4>
                    <p className="text-muted-foreground">
                      {THEME_CONFIG.showroom.hours}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Building className="text-secondary w-6 h-6 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-primary uppercase tracking-widest text-sm mb-1">Consultations</h4>
                    <p className="text-muted-foreground mb-3">Showroom visits, virtual reviews and private home consultations are available.</p>
                    <Link href="/contact" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-primary hover:text-secondary transition-colors">
                      Request a time <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-serif text-primary mb-4">What's inside?</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <Building className="w-4 h-4 text-secondary" />
                  Pool finishes and waterline tile
                </li>
                <li className="flex items-center gap-3">
                  <Building className="w-4 h-4 text-secondary" />
                  Marble, porcelain, travertine, pavers and coping
                </li>
                <li className="flex items-center gap-3">
                  <Building className="w-4 h-4 text-secondary" />
                  Artificial turf, oversized pavers and landscape materials
                </li>
                <li className="flex items-center gap-3">
                  <Building className="w-4 h-4 text-secondary" />
                  Outdoor kitchens, fire/water features and architectural lighting
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              {[
                { icon: Eye, title: "See it", copy: "Experience finishes, textures and proportions at full scale." },
                { icon: PencilRuler, title: "Design it", copy: "Shape a cohesive pool and whole-backyard concept." },
                { icon: WalletCards, title: "Finance it", copy: "Explore current options for your project scope." },
                { icon: Hammer, title: "Build it", copy: "Move from approved design to coordinated construction." },
              ].map((item) => (
                <div key={item.title} className="bg-card border border-border p-5">
                  <item.icon className="w-5 h-5 text-secondary mb-3" />
                  <h3 className="font-serif text-lg text-primary mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.copy}</p>
                </div>
              ))}
            </div>

            <Link href="/contact" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold hover:text-secondary transition-colors">
              Schedule a design consultation <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
