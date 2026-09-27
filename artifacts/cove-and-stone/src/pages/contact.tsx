import { useState } from 'react';
import { useSubmitContactInquiry } from '@workspace/api-client-react';
import { CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';
import { THEME_CONFIG } from '@/config/theme';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const mutation = useSubmitContactInquiry();
  const [values, setValues] = useState({
    fullName: '', phone: '', email: '', projectCity: '',
    projectType: 'New Custom Pool', budget: 'Exploring the right scope',
    vision: '', interestedInFinancing: false, requestShowroomAppointment: false,
    honeypot: '',
  });
  const update = (field: keyof typeof values, value: string | boolean) =>
    setValues((current) => ({ ...current, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ data: values }, {
      onSuccess: () => {
        trackEvent('contact_inquiry_submitted', { source: 'contact_page' });
        setSubmitted(true);
      },
    });
  };

  return (
    <div className="w-full pt-24 lg:pt-40 bg-background min-h-[100dvh]">
      <div className="container mx-auto px-6 max-w-7xl py-24">
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Info Side */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif mb-6 text-primary">Start the conversation.</h1>
              <p className="text-muted-foreground leading-relaxed">
                Whether you have complete architectural plans or just a blank backyard, our design team is ready to shape your space.
              </p>
            </div>

            <div className="space-y-8">
              <a
                href={THEME_CONFIG.contact.phoneHref}
                onClick={() => trackEvent('contact_phone_clicked', { page: 'contact' })}
                aria-label={`Call Cove & Stone at ${THEME_CONFIG.contact.phone}`}
                className="flex items-center gap-4 group"
              >
                <div aria-hidden="true" className="w-12 h-12 bg-card border border-border flex items-center justify-center shrink-0">
                  <Phone className="text-secondary w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Call Us</div>
                  <div className="font-serif text-xl text-primary transition-colors group-hover:text-secondary">
                    {THEME_CONFIG.contact.phone}
                  </div>
                </div>
              </a>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-card border border-border flex items-center justify-center shrink-0">
                  <Mail className="text-secondary w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Email</div>
                  <a
                    href={`mailto:${THEME_CONFIG.contact.email}`}
                    onClick={() => trackEvent('contact_email_clicked', { page: 'contact' })}
                    className="font-serif text-xl text-primary transition-colors hover:text-secondary"
                  >
                    {THEME_CONFIG.contact.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-card border border-border flex items-center justify-center shrink-0">
                  <MapPin className="text-secondary w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Showroom</div>
                  <div className="font-serif text-lg text-primary">{THEME_CONFIG.showroom.address}</div>
                  <div className="text-sm text-muted-foreground">{THEME_CONFIG.showroom.city}, {THEME_CONFIG.showroom.state}</div>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-card border border-border">
              <h4 className="font-bold uppercase tracking-widest text-sm text-primary mb-3">Consultation Modes</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>• In-Home Property Assessment</li>
                <li>• Showroom Material Walkthrough</li>
                <li>• Virtual Video Consultation</li>
              </ul>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-3">
            <div className="bg-card border border-border p-8 md:p-12 shadow-xl">
              {submitted ? (
                <div className="text-center py-20 animate-in fade-in zoom-in">
                  <CheckCircle2 className="w-20 h-20 text-secondary mx-auto mb-6" />
                  <h3 className="text-3xl font-serif text-primary mb-4">Inquiry Received</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                     Thank you for reaching out to Cove & Stone. A design specialist will follow up to discuss your project and next steps.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-2xl font-serif text-primary mb-8 border-b border-border pb-4">Project Inquiry</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Full Name *</label>
                      <input required type="text" value={values.fullName} onChange={(e) => update('fullName', e.target.value)} className="w-full bg-background border border-border p-3 focus:outline-none focus:border-secondary transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Phone Number *</label>
                      <input required type="tel" value={values.phone} onChange={(e) => update('phone', e.target.value)} className="w-full bg-background border border-border p-3 focus:outline-none focus:border-secondary transition-colors" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Email Address *</label>
                      <input required type="email" value={values.email} onChange={(e) => update('email', e.target.value)} className="w-full bg-background border border-border p-3 focus:outline-none focus:border-secondary transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Project City / Zip Code *</label>
                      <input required type="text" value={values.projectCity} onChange={(e) => update('projectCity', e.target.value)} className="w-full bg-background border border-border p-3 focus:outline-none focus:border-secondary transition-colors" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Project Type</label>
                      <select value={values.projectType} onChange={(e) => update('projectType', e.target.value)} className="w-full bg-background border border-border p-3 focus:outline-none focus:border-secondary text-primary">
                        <option>New Custom Pool</option>
                        <option>Pool Renovation</option>
                        <option>Complete Backyard (Pool + Living)</option>
                        <option>Outdoor Living Only</option>
                        <option>Commercial</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Approximate Budget</label>
                      <select value={values.budget} onChange={(e) => update('budget', e.target.value)} className="w-full bg-background border border-border p-3 focus:outline-none focus:border-secondary text-primary">
                         <option>Exploring the right scope</option>
                         <option>I have a working investment range</option>
                         <option>Let’s discuss the full transformation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Tell us about your vision</label>
                    <textarea rows={4} value={values.vision} onChange={(e) => update('vision', e.target.value)} className="w-full bg-background border border-border p-3 focus:outline-none focus:border-secondary transition-colors"></textarea>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-border">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={values.interestedInFinancing} onChange={(e) => update('interestedInFinancing', e.target.checked)} className="accent-secondary" />
                      <span className="text-sm text-muted-foreground">Interested in financing</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={values.requestShowroomAppointment} onChange={(e) => update('requestShowroomAppointment', e.target.checked)} className="accent-secondary" />
                      <span className="text-sm text-muted-foreground">Request showroom appointment</span>
                    </label>
                  </div>

                  <input aria-hidden="true" tabIndex={-1} autoComplete="off" value={values.honeypot} onChange={(e) => update('honeypot', e.target.value)} className="absolute -left-[9999px]" />
                  {mutation.isError && (
                    <div role="alert" className="text-sm text-destructive" data-testid="status-contact-error">
                      We couldn&apos;t send your inquiry right now. Please try again in a moment.
                    </div>
                  )}
                  <Button type="submit" disabled={mutation.isPending} className="w-full bg-primary text-primary-foreground py-6 uppercase tracking-widest text-sm hover:bg-secondary transition-colors rounded-none mt-6">
                    {mutation.isPending ? 'Sending inquiry…' : 'Submit Inquiry'}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
