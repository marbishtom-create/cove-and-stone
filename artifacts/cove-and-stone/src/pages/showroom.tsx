import { MapPin, Clock, Phone, Building } from 'lucide-react';
import showroomImg from '@assets/generated_images/showroom.jpg';
import { THEME_CONFIG } from '@/config/theme';

export default function Showroom() {
  return (
    <div className="w-full pt-20 bg-background">
      <div className="container mx-auto px-6 max-w-7xl py-24">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-secondary uppercase tracking-[0.3em] text-sm mb-4 block">Design Center</span>
          <h1 className="text-4xl md:text-6xl font-serif mb-6 text-primary">Touch the materials.</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Selecting finishes from a tiny catalog square is a gamble. Our dedicated showroom allows you to experience full-scale material layouts, tile textures, and stone coping before making a commitment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="relative aspect-[4/3] w-full shadow-2xl border border-border">
            <img 
              src={showroomImg} 
              alt="Luxury Pool Design Showroom in Jacksonville" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-12">
            <div className="bg-card border border-border p-10">
              <h2 className="text-2xl font-serif text-primary mb-8 border-b border-border pb-4">Visit Us</h2>
              
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
                  <Phone className="text-secondary w-6 h-6 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-primary uppercase tracking-widest text-sm mb-1">Contact</h4>
                    <p className="text-muted-foreground">
                      (904) 555-0199<br />
                      hello@coveandstone.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-serif text-primary mb-4">What's inside?</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <Building className="w-4 h-4 text-secondary" />
                  Extensive displays of natural stone pavers and coping
                </li>
                <li className="flex items-center gap-3">
                  <Building className="w-4 h-4 text-secondary" />
                  Glass and porcelain mosaic tile collections
                </li>
                <li className="flex items-center gap-3">
                  <Building className="w-4 h-4 text-secondary" />
                  Plaster finish water-color demonstrations
                </li>
                <li className="flex items-center gap-3">
                  <Building className="w-4 h-4 text-secondary" />
                  Outdoor kitchen cabinetry and appliance examples
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
