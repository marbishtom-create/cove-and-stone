import { useId } from 'react';

export function AppointmentCtaSurface() {
  const gradientId = `appointment-duck-${useId().replace(/:/g, '')}`;
  const bodyGradientId = `${gradientId}-body`;
  const wingGradientId = `${gradientId}-wing`;
  const beakGradientId = `${gradientId}-beak`;

  return (
    <>
      <img
        className="layout-appointment-cta__reference-art"
        src="/__mockup/images/appointment-cta-reference-arrow-small.png"
        alt=""
        aria-hidden="true"
      />
      <span
        className="layout-appointment-cta__sparkle-layer"
        aria-hidden="true"
      >
        <span className="layout-appointment-cta__sparkle layout-appointment-cta__sparkle--one" />
        <span className="layout-appointment-cta__sparkle layout-appointment-cta__sparkle--two" />
      </span>
      <span
        className="layout-appointment-cta__duck-medallion"
        aria-hidden="true"
      >
        <svg
          className="layout-appointment-cta__duck-art"
          viewBox="0 0 48 48"
          focusable="false"
        >
          <defs>
            <linearGradient
              id={bodyGradientId}
              x1="13"
              y1="4"
              x2="35"
              y2="45"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#fff6a8" />
              <stop offset="0.32" stopColor="#ffe05b" />
              <stop offset="0.72" stopColor="#ffc12b" />
              <stop offset="1" stopColor="#e99d0a" />
            </linearGradient>
            <linearGradient
              id={wingGradientId}
              x1="7"
              y1="27"
              x2="18"
              y2="41"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#fff3a9" />
              <stop offset="1" stopColor="#f0b51d" />
            </linearGradient>
            <linearGradient
              id={beakGradientId}
              x1="16"
              y1="21"
              x2="32"
              y2="30"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#ffd474" />
              <stop offset="1" stopColor="#e96e20" />
            </linearGradient>
          </defs>
          <path
            d="M24 3.8c-7.3 0-12 5.5-12 12.5v4C7.3 23.2 4.5 27.8 4.5 33.3c0 7.6 6.2 12.2 15.1 12.2h8.8c8.9 0 15.1-4.6 15.1-12.2 0-5.5-2.8-10.1-7.5-13v-4c0-7-4.7-12.5-12-12.5Z"
            fill={`url(#${bodyGradientId})`}
            stroke="#fff8e9"
            strokeWidth="2.1"
            strokeLinejoin="round"
          />
          <path
            d="M14.2 17.9c0-6 3.7-10.2 9-10.7"
            fill="none"
            stroke="#fffbe1"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.82"
          />
          <path
            d="M11.6 26.2c-3 1.5-4.8 4.3-4.3 7.5.3 1.9 1.5 3.5 3.4 4.3 1.3-2.5 1.9-5.2 2-8.3"
            fill={`url(#${wingGradientId})`}
            stroke="#e9b933"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
          <path
            d="M36.4 26.2c3 1.5 4.8 4.3 4.3 7.5-.3 1.9-1.5 3.5-3.4 4.3-1.3-2.5-1.9-5.2-2-8.3"
            fill={`url(#${wingGradientId})`}
            stroke="#e9b933"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
          <ellipse
            cx="24"
            cy="35"
            rx="10.5"
            ry="8"
            fill="#fff1a3"
            opacity="0.38"
          />
          <path
            d="M8.8 33.5c.4-1.5 1.2-2.8 2.5-3.7m27.9 3.7c-.4-1.5-1.2-2.8-2.5-3.7"
            fill="none"
            stroke="#fff8cb"
            strokeWidth="1.25"
            strokeLinecap="round"
            opacity="0.88"
          />
          <path
            d="M18.7 22.4c1.3-1.2 3.2-1.8 5.3-1.8s4 .6 5.3 1.8l4.5 3.7c1.1.9.5 2.8-.9 2.8H15.1c-1.4 0-2-1.9-.9-2.8Z"
            fill={`url(#${beakGradientId})`}
            stroke="#fff1d8"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          <path
            d="M19.3 27.3c2.5 1.3 6.9 1.3 9.4 0"
            fill="none"
            stroke="#bd5a17"
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity="0.72"
          />
          <g>
            <path
              d="M9.2 15.4c0-1.4.8-2.2 2.2-2.2h6.9c1.6 0 2.5.9 2.7 2.5l.2 2.2c.1 1.7-.8 2.7-2.5 2.7h-6.5c-1.6 0-2.5-.8-2.7-2.4Z"
              fill="#080c10"
              stroke="#030507"
              strokeWidth="0.9"
              strokeLinejoin="round"
            />
            <path
              d="M27 15.7c.1-1.6 1-2.5 2.7-2.5h6.9c1.4 0 2.2.8 2.2 2.2l-.3 2.8c-.2 1.6-1.1 2.4-2.7 2.4h-6.5c-1.7 0-2.6-1-2.5-2.7Z"
              fill="#080c10"
              stroke="#030507"
              strokeWidth="0.9"
              strokeLinejoin="round"
            />
            <path
              d="M20.9 15.3c1.8-1.1 4.4-1.1 6.2 0"
              fill="none"
              stroke="#030507"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
            <path
              d="m9.4 14.8-2.6-1m31.8 1 2.6-1"
              fill="none"
              stroke="#030507"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
            <path
              d="M11.2 14.5h4.2m14.6 0h4.2"
              fill="none"
              stroke="#8297a0"
              strokeWidth="0.7"
              strokeLinecap="round"
              opacity="0.75"
            />
          </g>
        </svg>
      </span>
      <span
        className="layout-appointment-cta__copy-backdrop"
        aria-hidden="true"
      />
    </>
  );
}