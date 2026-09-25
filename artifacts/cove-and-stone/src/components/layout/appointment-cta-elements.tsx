import { ArrowRight } from "lucide-react";

export function AppointmentCtaSurface() {
  return (
    <>
      <span className="layout-appointment-cta__surface" aria-hidden="true" />
      <svg
        className="layout-appointment-cta__waterline"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M 0 40 C 15 39, 28 72, 44 86 C 56 96, 68 88, 79 65 C 84 54, 95 72, 100 83"
          fill="none"
          stroke="rgba(255,255,255,.78)"
          strokeWidth="0.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </>
  );
}

export function AppointmentCtaArrow() {
  return (
    <span className="layout-appointment-cta__arrow-shell" aria-hidden="true">
      <ArrowRight
        className="layout-appointment-cta__arrow"
        size={22}
        strokeWidth={1.8}
      />
      <svg
        className="layout-appointment-cta__duck"
        viewBox="0 0 48 42"
        role="presentation"
        focusable="false"
      >
        <path
          d="M4.8 29.4c0-7.3 6.1-13 15.8-13.6.7-7.2 4.7-11.5 10.4-11.5 5.5 0 9.3 4.4 9.3 10.3v1.6c3 .5 4.9 1.9 4.9 3.6 0 1.7-2.2 2.9-5.7 3.2-2.3 8.3-10.2 13.7-19.8 13.7-8.9 0-14.9-2.9-14.9-7.3Z"
          fill="#f4c64b"
          stroke="#c58d2c"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d="M10.4 27.9c1.8-5 6.6-7.9 12.4-8-1.4 5.3-5.4 8.5-11.5 9.4"
          fill="#f9dc82"
          stroke="#d6a43c"
          strokeWidth="1"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d="M39 16.3c4.7.2 7.7 1.5 7.7 3.2 0 1.8-3.3 3.1-7.7 3.2"
          fill="#ef9138"
          stroke="#c96d2c"
          strokeWidth="1.2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path d="M40.4 19.5c2.1.1 4 .1 5.6-.1" fill="none" stroke="#bd6428" strokeWidth=".7" strokeLinecap="round" />
        <path d="M27.3 8.3c1-1.2 2.2-1.8 3.7-1.8" fill="none" stroke="#fff7d8" strokeWidth="1" strokeLinecap="round" opacity=".85" />
        <circle cx="33.2" cy="12.1" r="1.25" fill="#173943" />
        <circle cx="32.8" cy="11.7" r=".38" fill="#fff" />
      </svg>
    </span>
  );
}