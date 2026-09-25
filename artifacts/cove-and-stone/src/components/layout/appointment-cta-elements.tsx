import { ArrowRight } from "lucide-react";

const waterlinePoints =
  "0,40 2,40 4,41 6,42 8,44 10,47 12,50 14,54 16,59 18,64 20,69 22,73 24,77 26,81 28,84 30,87 32,89 34,91 36,93 38,94 40,95 42,95 44,94 46,93 48,93 50,94 52,94 54,93 56,92 58,90 60,87 62,84 64,80 66,76 68,72 70,68 72,65 74,63 76,61 78,60 80,60 82,61 84,62 86,64 88,66 90,69 92,72 94,75 96,78 98,81 100,83";

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
        <polyline
          points={waterlinePoints}
          fill="none"
          stroke="rgba(255,255,255,.78)"
          strokeWidth="1.15"
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