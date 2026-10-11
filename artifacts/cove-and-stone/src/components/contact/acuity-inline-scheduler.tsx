import { useEffect, useRef, useState } from 'react';
import { THEME_CONFIG } from '@/config/theme';
import { resolveAcuitySchedulingUrl } from '@/lib/acuity-scheduling';

const ACUITY_EMBED_SCRIPT = 'https://embed.acuityscheduling.com/js/embed.js';

/**
 * Acuity's inline embed: an iframe of the scheduling page, plus embed.js,
 * which listens for sizing messages and grows the frame. Both load only
 * after the section nears the viewport.
 */
export function AcuityConsultationBooking() {
  const schedulingUrl = resolveAcuitySchedulingUrl(THEME_CONFIG.acuitySchedulingUrl);
  const sectionRef = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!schedulingUrl || ready) return;
    const section = sectionRef.current;
    if (!section) return;

    if (typeof IntersectionObserver === 'undefined') {
      setReady(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: '480px 0px' },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [ready, schedulingUrl]);

  useEffect(() => {
    if (!ready) return;

    const script = document.createElement('script');
    script.src = ACUITY_EMBED_SCRIPT;
    script.async = true;
    script.type = 'text/javascript';
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, [ready]);

  if (!schedulingUrl) return null;

  return (
    <section
      ref={sectionRef}
      className="mt-20 border-t border-border pt-16"
      aria-labelledby="rendering-consultation-heading"
      data-testid="section-rendering-consultation"
    >
      <h2
        id="rendering-consultation-heading"
        className="mb-4 max-w-3xl text-3xl text-primary md:text-4xl"
      >
        Book a free rendering consultation
      </h2>
      <p className="mb-10 max-w-2xl leading-relaxed text-muted-foreground">
        Consultations are 30 minutes, virtual or at the partner showroom by appointment.
      </p>
      {ready ? (
        <div className="border border-border bg-card">
          <iframe
            src={schedulingUrl}
            title="Book a free rendering consultation"
            width="100%"
            height={800}
            frameBorder={0}
            className="block w-full bg-card"
            data-testid="iframe-acuity-scheduler"
          />
        </div>
      ) : null}
    </section>
  );
}
