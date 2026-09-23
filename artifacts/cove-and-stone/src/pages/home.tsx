import { useState } from 'react';
import { Link } from 'wouter';
import beforePool from '@assets/generated_images/matched-before-pool.jpg';
import afterPool from '@assets/generated_images/after-pool.jpg';
import jacksonvilleDayPool from '@assets/0A80F847-1F10-44B6-A3D8-67A48A65457B_1790113686673.png';
import jacksonvilleNightPool from '@assets/BB1FECAD-0F80-4070-9FF4-3B414EE0C66A_1790113686673_nocatee-enclosed.png';
import ponteVedraRetreat from '@assets/generated_images/ponte-vedra-private-retreat.png';
import { BeforeAfter } from '@/components/ui/before-after';
import { THEME_CONFIG } from '@/config/theme';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Star, 
  Droplet, 
  Sun, 
  Wind, 
  Check, 
  Monitor, 
  Camera, 
  Image as ImageIcon,
  Building2,
  Video,
  Home as HomeIcon,
  ShieldCheck
} from 'lucide-react';

export default function Home() {
  const [step, setStep] = useState(1);
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [preferences, setPreferences] = useState({ style: '', budget: '' });

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhotoUploaded(true);
    }
  };

  const submitLead = () => {
    setStep(4);
  };

  return (
    <div className="w-full overflow-hidden">
      {/* 1. Cinematic Hero */}
      <section className="relative min-h-[100dvh] w-full flex items-center justify-center pt-24 lg:h-[100dvh] lg:pt-20">
        <div className="absolute inset-0 z-0">
          <img 
              src={jacksonvilleDayPool} 
              alt="Concept visualization of a modern Jacksonville waterfront pool with infinity edges and raised water features" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 max-w-7xl flex w-full min-h-[calc(100dvh-6rem)] flex-col items-start justify-start pt-12 pb-20 lg:h-full lg:min-h-0 lg:translate-y-8 lg:justify-center lg:pt-0">
          <div className="max-w-3xl animate-in slide-in-from-bottom-8 duration-1000 ease-out fade-in fill-mode-both">
            <span className="text-secondary uppercase tracking-[0.3em] text-sm md:text-base font-medium mb-6 block drop-shadow-sm">
              Jacksonville Outdoor Living, Reimagined.
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[1.1] mb-8">
              Custom Pools. <br />
              <span className="italic font-light opacity-90">Elevated Outdoor Living in Jacksonville.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-12 font-light leading-relaxed">
              Modern custom pools inspired by Los Angeles design, Miami living and European architecture—built for Northeast Florida.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link 
                href="/contact/" 
                className="bg-secondary text-secondary-foreground px-8 py-4 uppercase tracking-widest text-sm hover:bg-white hover:text-primary transition-all duration-300 text-center"
              >
                Design My Backyard
              </Link>
              <Link 
                href="/projects/" 
                className="border border-white/30 text-white px-8 py-4 uppercase tracking-widest text-sm hover:bg-white/10 transition-all duration-300 backdrop-blur-sm text-center"
              >
                Visit the Showroom
              </Link>
              <Link
                href="/financing/"
                className="border border-white/30 text-white px-8 py-4 uppercase tracking-widest text-sm hover:bg-white/10 transition-all duration-300 backdrop-blur-sm text-center"
              >
                Explore Financing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Credibility Content */}
      <section className="py-24 bg-card text-card-foreground">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-serif mb-8 text-primary leading-tight">
                Architectural outdoor living, <br />
                <span className="italic text-muted-foreground">crafted without compromise.</span>
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  At Cove & Stone, we don't just dig holes and pour concrete. We architect 
                  complete environments that blur the line between indoor comfort and outdoor freedom.
                </p>
                <p>
                  Specializing in the coastal aesthetic of Northeast Florida, our in-house team 
                  handles everything from photorealistic 3D visualization to complex engineering 
                  and final luxury finishes. Our in-house GC and construction structure, Urban Green Energy, LLC, supports the work while regulated pool scopes are coordinated with the appropriately licensed pool contractor or qualifier.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-8 mt-12 border-t border-border pt-12">
                <div>
                  <div className="text-4xl font-serif text-primary mb-2">24/7</div>
                  <div className="text-sm uppercase tracking-widest text-muted-foreground">Design Studio Access</div>
                </div>
                <div>
                  <div className="text-4xl font-serif text-primary mb-2">1</div>
                  <div className="text-sm uppercase tracking-widest text-muted-foreground">Coordinated Experience</div>
                </div>
              </div>
            </div>
            
            <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                <img 
                  src={jacksonvilleNightPool} 
                  alt="Concept visualization of a dramatic Jacksonville outdoor living environment with pool, fire and water features" 
                  className="w-full h-full object-cover"
                />
              <div className="absolute -bottom-6 -left-6 w-3/4 h-3/4 border border-secondary -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Before/After Transformation */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-serif mb-6 text-primary">The Art of Transformation</h2>
            <p className="text-muted-foreground">
              See the potential of your property. Drag the slider to reveal how we turn blank canvas backyards into luxury coastal retreats.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto shadow-2xl">
            {beforePool && afterPool ? (
              <BeforeAfter 
                beforeImage={beforePool} 
                afterImage={afterPool} 
                beforeAlt="Reference backyard before a pool transformation"
                afterAlt="Concept visualization of a luxury modern pool transformation"
                beforeLabel="Before reference"
                afterLabel="Concept rendering"
              />
            ) : (
              <div className="aspect-video bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">Loading images...</p>
              </div>
            )}
          </div>
          <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mt-6">
            Illustrative same-property transformation · completed-project photography will be added as approved
          </p>
        </div>
      </section>

      {/* 4. Capabilities */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <span className="text-secondary uppercase tracking-widest text-sm mb-4 block">Our Expertise</span>
              <h2 className="text-3xl md:text-5xl font-serif text-white">Complete Environments</h2>
            </div>
            <Link href="/outdoor-living/" className="hidden md:flex items-center gap-2 text-sm uppercase tracking-widest hover:text-secondary transition-colors mt-6 md:mt-0">
              View All Services <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Custom Pools & Spas",
                desc: "Infinity edges, geometric modernism, and integrated elevated spas. Engineered for perfection.",
                icon: <Droplet className="w-8 h-8 mb-6 text-secondary" />,
                link: "/pools/"
              },
              {
                title: "Outdoor Living",
                desc: "Custom pergolas, summer kitchens, fire features, and extensive hardscaping that expands your home.",
                icon: <Sun className="w-8 h-8 mb-6 text-secondary" />,
                link: "/outdoor-living/"
              },
              {
                title: "Renovations",
                desc: "Complete structural corrections, material updates, and technology modernizations for existing pools.",
                icon: <Wind className="w-8 h-8 mb-6 text-secondary" />,
                link: "/renovations/"
              }
            ].map((service, i) => (
              <div key={i} className="group border-t border-white/20 pt-8">
                {service.icon}
                <h3 className="text-2xl font-serif mb-4 text-white group-hover:text-secondary transition-colors">
                  {service.title}
                </h3>
                <p className="text-white/60 mb-8 leading-relaxed">
                  {service.desc}
                </p>
                <Link href={service.link} className="inline-flex items-center gap-2 text-xs uppercase tracking-widest group-hover:text-secondary transition-colors">
                  Explore <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Featured Demo Case Studies */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-primary">Selected Works</h2>
            <div className="text-sm uppercase tracking-widest text-muted-foreground border border-border px-3 py-1">Concept Gallery</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Link href="/projects/ponte-vedra-modern/" className="group block">
              <div className="relative aspect-[4/3] overflow-hidden bg-muted mb-6">
                <img src={ponteVedraRetreat} alt="Private Ponte Vedra Beach backyard pool concept with a privacy wall, palms and live oak" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-4 left-4 border border-white/30 bg-black/30 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-white/85 backdrop-blur-sm">
                  Concept rendering
                </div>
              </div>
              <h3 className="text-2xl font-serif text-primary mb-2 group-hover:text-secondary transition-colors">Ponte Vedra Modern</h3>
              <p className="text-muted-foreground text-sm uppercase tracking-widest">Ponte Vedra Beach, FL</p>
            </Link>
            
            <Link href="/projects/nocatee-resort/" className="group block">
              <div className="relative aspect-[4/3] overflow-hidden bg-muted mb-6">
                <img src={jacksonvilleNightPool} alt="Concept visualization for Nocatee Resort Backyard" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>
              <h3 className="text-2xl font-serif text-primary mb-2 group-hover:text-secondary transition-colors">Nocatee Resort Backyard</h3>
              <p className="text-muted-foreground text-sm uppercase tracking-widest">Nocatee, FL</p>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Project Levels */}
      <section className="py-24 bg-background border-y border-border">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="max-w-3xl mb-14">
            <span className="text-secondary uppercase tracking-widest text-sm mb-4 block">Project direction</span>
            <h2 className="text-3xl md:text-5xl font-serif text-primary mb-6">Choose the scale of your transformation.</h2>
            <p className="text-muted-foreground leading-relaxed">
              Cove, Stone and Signature are design and sales concepts that help us frame the conversation. Your final scope, materials and proposal are developed around your property and priorities—not a rigid package or fixed price.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {THEME_CONFIG.levels.map((level, i) => (
              <div key={level.name} className={`p-8 border ${i === 1 ? 'border-secondary bg-card' : 'border-border bg-card/50'}`}>
                <div className="text-xs uppercase tracking-[0.3em] text-secondary mb-6">{level.name}</div>
                <h3 className="text-2xl font-serif text-primary mb-4">{level.summary}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{level.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Customer Experience */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
            <div className="max-w-3xl">
              <span className="text-secondary uppercase tracking-widest text-sm mb-4 block">From dream to delivery</span>
              <h2 className="text-3xl md:text-5xl font-serif text-primary mb-6">One clear path from backyard idea to finished environment.</h2>
              <p className="text-muted-foreground leading-relaxed">Every phase is designed to keep the vision, selections, proposal and construction coordinated.</p>
            </div>
              <Link href="/contact/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-primary hover:text-secondary transition-colors whitespace-nowrap">
              Start with your address <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {THEME_CONFIG.salesProcess.map((phase) => (
              <div key={phase.name} className="bg-card p-7 min-h-[190px]">
                <div className="text-3xl font-serif text-secondary/70 mb-5">{phase.label}</div>
                <h3 className="text-lg font-serif text-primary mb-3">{phase.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Interactive Design Your Backyard */}
      <section className="py-32 bg-background border-y border-border relative" id="design">
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <div className="text-center mb-16">
            <Monitor className="w-12 h-12 text-secondary mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-serif mb-4 text-primary">Design Your Backyard</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Upload a photo of your property and share your preferences. Our design studio will build a 3D visualization of your potential oasis.
            </p>
          </div>

          <div className="bg-background border border-border shadow-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Stepper */}
            <div className="flex justify-between mb-12 relative z-10">
              <div className="absolute top-1/2 left-0 w-full h-px bg-border -z-10" />
              {[1, 2, 3].map(num => (
                <div 
                  key={num} 
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 bg-background transition-colors ${
                    step > num ? 'border-secondary text-secondary' : 
                    step === num ? 'border-primary text-primary' : 'border-border text-muted-foreground'
                  }`}
                >
                  {step > num ? <Check size={16} /> : num}
                </div>
              ))}
            </div>

            {/* Step 1: Upload */}
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-secondary transition-colors relative bg-card">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  />
                  {!photoUploaded ? (
                    <>
                      <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h4 className="text-lg font-medium text-primary mb-2">Upload property photo</h4>
                      <p className="text-sm text-muted-foreground">Drag and drop or click to browse</p>
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-12 h-12 text-secondary mx-auto mb-4" />
                      <h4 className="text-lg font-medium text-primary mb-2">Photo attached successfully</h4>
                      <p className="text-sm text-secondary">Ready for design analysis</p>
                    </>
                  )}
                </div>
                <div className="flex justify-end">
                  <Button 
                    className="bg-primary text-primary-foreground hover:bg-secondary rounded-none px-8 py-6 uppercase tracking-widest text-xs"
                    disabled={!photoUploaded}
                    onClick={() => setStep(2)}
                  >
                    Next Step
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Preferences */}
            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                <div className="space-y-8">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-4">Aesthetic</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {['Geometric Modern', 'Freeform Coastal', 'Resort Classic'].map(style => (
                        <div 
                          key={style}
                          onClick={() => setPreferences({...preferences, style})}
                          className={`p-4 border cursor-pointer transition-colors text-center text-sm ${
                            preferences.style === style ? 'border-secondary bg-secondary/5 text-secondary' : 'border-border text-muted-foreground hover:border-primary'
                          }`}
                        >
                          {style}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-4">Budget Scope</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {['Exploring the right scope', 'I have a working investment range', 'Let’s discuss the full transformation'].map(budget => (
                        <div 
                          key={budget}
                          onClick={() => setPreferences({...preferences, budget})}
                          className={`p-4 border cursor-pointer transition-colors text-center text-sm ${
                            preferences.budget === budget ? 'border-secondary bg-secondary/5 text-secondary' : 'border-border text-muted-foreground hover:border-primary'
                          }`}
                        >
                          {budget}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" className="rounded-none px-8 py-6 uppercase tracking-widest text-xs" onClick={() => setStep(1)}>Back</Button>
                  <Button 
                    className="bg-primary text-primary-foreground hover:bg-secondary rounded-none px-8 py-6 uppercase tracking-widest text-xs"
                    disabled={!preferences.style || !preferences.budget}
                    onClick={() => setStep(3)}
                  >
                    Next Step
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation Form */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Name</label>
                    <input type="text" className="w-full bg-card border border-border p-4 text-primary focus:outline-none focus:border-secondary" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Email</label>
                    <input type="email" className="w-full bg-card border border-border p-4 text-primary focus:outline-none focus:border-secondary" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Project Address (Jacksonville area)</label>
                    <input type="text" className="w-full bg-card border border-border p-4 text-primary focus:outline-none focus:border-secondary" />
                  </div>
                </div>
                <div className="flex justify-between mt-8">
                  <Button variant="outline" className="rounded-none px-8 py-6 uppercase tracking-widest text-xs" onClick={() => setStep(2)}>Back</Button>
                  <Button 
                    className="bg-secondary text-secondary-foreground hover:bg-primary rounded-none px-8 py-6 uppercase tracking-widest text-xs"
                    onClick={submitLead}
                  >
                    Request Consultation
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Success */}
            {step === 4 && (
              <div className="text-center py-12 animate-in fade-in zoom-in-95">
                <div className="w-20 h-20 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check size={40} />
                </div>
                <h3 className="text-3xl font-serif text-primary mb-4">Vision Received</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Your property photo and design profile have been securely sent to our studio. We will contact you shortly to schedule an extensive review.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 9. Full Backyard Story & 10. Showroom */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
            <div>
              <span className="text-secondary uppercase tracking-widest text-sm mb-4 block">The Studio Advantage</span>
              <h2 className="text-3xl md:text-5xl font-serif mb-8 text-primary">
                A seamless story from start to splash.
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                When a pool contractor, a landscaper, and a concrete crew all work independently, the result is disjointed. Cove & Stone brings the entire exterior environment under one roof. One cohesive design language, one dedicated project manager, and zero communication gaps.
              </p>
              <Link href="/about/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold hover:text-secondary transition-colors">
                Read Our Story <ArrowRight size={14} />
              </Link>
            </div>
            <div className="bg-card p-12 border border-border flex flex-col justify-center items-center text-center">
               <h3 className="text-2xl font-serif text-primary mb-6">Explore the Materials</h3>
               <p className="text-muted-foreground mb-8 text-sm">
                  Visit our 24/7 Jacksonville Design Studio & Showroom to see pool finishes, waterline tile, marble, porcelain, pavers, coping, turf, outdoor kitchens, fire and water features, and lighting in person.
               </p>
               <div className="text-sm font-medium">
                 {THEME_CONFIG.showroom.address}<br />
                 {THEME_CONFIG.showroom.city}, {THEME_CONFIG.showroom.state} {THEME_CONFIG.showroom.zip}
               </div>
               <Link href="/showroom/" className="mt-8 border border-primary text-primary px-6 py-3 text-xs uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors">
                 Virtual Tour
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Three Consultation Modes & 12. Financing */}
      <section className="py-24 bg-card border-t border-border">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Consult Modes */}
            <div>
              <h2 className="text-3xl font-serif text-primary mb-8">How We Connect</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-background border border-border flex items-center justify-center shrink-0">
                    <HomeIcon className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">In-Home Property Assessment</h4>
                    <p className="text-sm text-muted-foreground">We measure elevations, check access, and discuss the architectural integration on-site.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-background border border-border flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">Showroom Material Walkthrough</h4>
                    <p className="text-sm text-muted-foreground">Meet at our Jacksonville studio to physically select your coping, tiles, and finishes.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-background border border-border flex items-center justify-center shrink-0">
                    <Video className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">Virtual 3D Review</h4>
                    <p className="text-sm text-muted-foreground">Screen-share your photorealistic 3D model with our designers and tweak the layout live.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Financing Disclosure */}
            <div className="bg-background border border-border p-10 flex flex-col justify-center relative overflow-hidden">
              <ShieldCheck className="absolute -bottom-10 -right-10 w-48 h-48 text-secondary/5 z-0" />
              <div className="relative z-10">
                <h3 className="text-2xl font-serif text-primary mb-4">Project Funding</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
                  Flexible financing options may be available for your outdoor project, including programs through Lyon Financial and other financing partners. We can help you explore the path that fits your project and qualifications.
                </p>
                <div className="bg-card p-4 text-xs text-muted-foreground border border-border leading-relaxed mb-6">
                  Financing is subject to credit approval, lender terms, current programs and availability. Cove & Stone does not guarantee approval, rates, monthly payments or loan terms.
                </div>
                <Link href="/financing/" className="text-xs uppercase tracking-widest font-bold hover:text-secondary transition-colors inline-flex items-center gap-2">
                  Learn about financing <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. Trust through process */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-primary mb-4">Trust through process.</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A considered outdoor environment is easier to shape when the decisions stay visible, coordinated and grounded in your property.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Monitor,
                title: "See the direction",
                text: "Share your property, preferences and priorities. Our design studio develops a photorealistic 3D visualization before construction begins.",
              },
              {
                icon: Building2,
                title: "Evaluate the materials",
                text: "Visit the Jacksonville showroom to compare pool finishes, stone, pavers, coping, turf, outdoor kitchens, fire and water features, and lighting.",
              },
              {
                icon: ShieldCheck,
                title: "Keep the scope coordinated",
                text: "Design, selections, proposal scope, engineering and construction coordination stay organized around one clear outdoor-living vision.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-card border border-border p-8">
                <Icon className="w-8 h-8 text-secondary mb-6" />
                <h3 className="text-xl font-serif text-primary mb-4">{title}</h3>
                <p className="text-muted-foreground leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. Commercial Content Teaser */}
      <section className="py-20 bg-primary text-primary-foreground border-b border-primary/20">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-serif text-white mb-2">Commercial Division</h3>
            <p className="text-white/70">Luxury amenity centers for HOAs, developments, and architects.</p>
          </div>
          <Link href="/commercial/" className="border border-white/30 text-white px-6 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-primary transition-colors whitespace-nowrap">
            View Commercial Projects
          </Link>
        </div>
      </section>

      {/* 15. Closing CTA */}
      <section className="py-32 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-serif mb-6 text-white">Don't build another Florida pool.</h2>
          <p className="text-lg text-white/70 mb-10 font-light">
            Build an outdoor experience designed around the way you live in Jacksonville.
          </p>
          <Link 
              href="/contact/" 
            className="inline-flex items-center justify-center bg-secondary text-secondary-foreground px-10 py-5 text-sm uppercase tracking-widest hover:bg-white hover:text-primary transition-all duration-300"
          >
            Design My Backyard
          </Link>
        </div>
      </section>
    </div>
  );
}
