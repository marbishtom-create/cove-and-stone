import { useState } from 'react';
import { Upload, Check, Monitor, Image as ImageIcon, Camera } from 'lucide-react';
import { THEME_CONFIG } from '@/config/theme';
import designImage from '@assets/generated_images/design-3d.jpg';
import { Button } from '@/components/ui/button';

export default function Design() {
  const [step, setStep] = useState(1);
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [preferences, setPreferences] = useState({ style: '', budget: '' });

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhotoUploaded(true);
    }
  };

  const submitLead = () => {
    // In a real app, send data to backend
    setStep(4);
  };

  return (
    <div className="w-full pt-20">
      <header className="bg-card py-20 border-b border-border">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <span className="text-secondary uppercase tracking-[0.3em] text-sm mb-4 block">Design Process</span>
              <h1 className="text-4xl md:text-6xl font-serif mb-6 text-primary leading-tight">
                See it before <br/>we build it.
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our in-house design studio uses photorealistic 3D rendering to bring your concepts to life. Walk through your new backyard digitally before any ground is broken.
              </p>
            </div>
            <div className="flex-1 relative aspect-video w-full">
              <img src={designImage} alt="3D Pool Design" className="w-full h-full object-cover shadow-2xl" />
            </div>
          </div>
        </div>
      </header>

      {/* The Process */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-3xl md:text-5xl font-serif mb-16 text-primary text-center">How We Work</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {THEME_CONFIG.process.map((stepName, i) => (
              <div key={i} className="p-6 bg-card border border-border relative">
                <div className="text-4xl font-serif text-secondary mb-4 opacity-50">
                  {(i + 1).toString().padStart(2, '0')}
                </div>
                <h4 className="font-medium text-primary text-sm uppercase tracking-widest">{stepName}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive "Design Your Backyard" Tool */}
      <section className="py-24 bg-card border-t border-border" id="app">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-background border border-border shadow-2xl p-8 md:p-12">
            <div className="text-center mb-10">
              <Monitor className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h2 className="text-3xl font-serif text-primary mb-4">Design Your Backyard</h2>
              <p className="text-muted-foreground">Share your space and preferences to start your custom 3D visualization.</p>
            </div>

            {/* Stepper */}
            <div className="flex justify-between mb-12 relative">
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
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {!photoUploaded ? (
                    <>
                      <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h4 className="text-lg font-medium text-primary mb-2">Upload a photo of your backyard</h4>
                      <p className="text-sm text-muted-foreground">Drag and drop or click to browse (JPG, PNG)</p>
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-12 h-12 text-secondary mx-auto mb-4" />
                      <h4 className="text-lg font-medium text-primary mb-2">Photo attached successfully</h4>
                      <p className="text-sm text-secondary">Ready for analysis</p>
                    </>
                  )}
                </div>
                <div className="flex justify-end">
                  <Button 
                    className="bg-primary text-primary-foreground hover:bg-secondary rounded-none px-8 py-6 uppercase tracking-widest"
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
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-widest text-primary mb-4">Preferred Aesthetic</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {['Geometric Modern', 'Freeform Coastal', 'Resort Classic'].map(style => (
                        <div 
                          key={style}
                          onClick={() => setPreferences({...preferences, style})}
                          className={`p-4 border cursor-pointer transition-colors text-center ${
                            preferences.style === style ? 'border-secondary bg-secondary/5 text-secondary' : 'border-border text-muted-foreground hover:border-primary'
                          }`}
                        >
                          {style}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-widest text-primary mb-4">Project Budget</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {['$100k - $150k', '$150k - $250k', '$250k+'].map(budget => (
                        <div 
                          key={budget}
                          onClick={() => setPreferences({...preferences, budget})}
                          className={`p-4 border cursor-pointer transition-colors text-center ${
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
                  <Button variant="outline" className="rounded-none px-8 py-6 uppercase tracking-widest" onClick={() => setStep(1)}>Back</Button>
                  <Button 
                    className="bg-primary text-primary-foreground hover:bg-secondary rounded-none px-8 py-6 uppercase tracking-widest"
                    disabled={!preferences.style || !preferences.budget}
                    onClick={() => setStep(3)}
                  >
                    Next Step
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Contact Info */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Name</label>
                    <input type="text" className="w-full bg-background border border-border p-4 text-primary focus:outline-none focus:border-secondary" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Email</label>
                    <input type="email" className="w-full bg-background border border-border p-4 text-primary focus:outline-none focus:border-secondary" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Project Address (Jacksonville/Ponte Vedra area)</label>
                    <input type="text" className="w-full bg-background border border-border p-4 text-primary focus:outline-none focus:border-secondary" />
                  </div>
                </div>
                <div className="flex justify-between mt-8">
                  <Button variant="outline" className="rounded-none px-8 py-6 uppercase tracking-widest" onClick={() => setStep(2)}>Back</Button>
                  <Button 
                    className="bg-secondary text-secondary-foreground hover:bg-primary rounded-none px-8 py-6 uppercase tracking-widest"
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
                  Thank you. Our design team is reviewing your photo and preferences. We will contact you within 24 hours to schedule your initial consultation.
                </p>
              </div>
            )}

          </div>
        </div>
      </section>
    </div>
  );
}
