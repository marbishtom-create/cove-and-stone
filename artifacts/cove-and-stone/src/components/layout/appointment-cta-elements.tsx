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
          d="M 0 40 C 16 39, 27 90, 43 95 C 58 100, 68 89, 79 67 C 87 53, 95 72, 100 83"
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
          d="M5.7 28.3c0-5.4 4.4-9.8 10.5-10.7l2.6-6.1c.9-2.2 3.1-3.3 5.3-2.8 2.3.5 3.8 2.3 3.8 4.6 0 1.4-.6 2.7-1.6 3.6 4.4 1 8 3.8 10.2 7.7h5.1c2.5 0 4.4 1.2 4.4 2.8s-1.9 2.8-4.4 2.8h-1.8c-1.7 4.4-6 7-11.2 7H16.8c-6.5 0-11.1-2.6-11.1-6.4Z"
          fill="#fff"
          stroke="#15969a"
          strokeWidth="2.2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d="M36.1 23.5h8.2l-5.2 4.1-3-1.1"
          fill="#15969a"
          stroke="#087d8d"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <circle cx="26.1" cy="13.5" r="1.15" fill="#087d8d" />
      </svg>
    </span>
  );
}