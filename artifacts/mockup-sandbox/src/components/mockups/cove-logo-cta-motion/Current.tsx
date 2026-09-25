import "./_group.css";
import "./appointment-cta.css";

import { AppointmentCtaSurface } from "./appointment-cta-elements";
import { Logo } from "./logo";

export function Current() {
  return (
    <main className="cove-logo-cta-preview">
      <header className="cove-logo-cta-preview__header">
        <Logo
          variant="default"
          imageClassName="w-[165px] md:w-[220px]"
        />
        <span className="cove-logo-cta-preview__context">
          Pools · Spas · Outdoor living
        </span>
      </header>

      <section
        className="cove-logo-cta-preview__cta-area"
        aria-label="Design consultation"
      >
        <a
          href="#"
          onClick={(event) => event.preventDefault()}
          className="layout-appointment-cta cove-logo-cta-preview__button"
          aria-label="Start your project today"
        >
          <AppointmentCtaSurface />
          <span className="layout-appointment-cta__copy">
            <span className="layout-appointment-cta__eyebrow">
              Design consultation
            </span>
            <span className="layout-appointment-cta__title">
              Start your project today
            </span>
          </span>
        </a>
      </section>
    </main>
  );
}