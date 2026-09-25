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
        src="/brand/appointment-cta-reference.png"
        alt=""
        aria-hidden="true"
      />
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
              x1="12"
              y1="12"
              x2="40"
              y2="44"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#fff6a8" />
              <stop offset="0.32" stopColor="#ffe05b" />
              <stop offset="0.72" stopColor="#ffc12b" />
              <stop offset="1" stopColor="#e99d0a" />
            </linearGradient>
            <linearGradient
              id={wingGradientId}
              x1="14"
              y1="29"
              x2="23"
              y2="36"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#fff3a9" />
              <stop offset="1" stopColor="#f0b51d" />
            </linearGradient>
            <linearGradient
              id={beakGradientId}
              x1="43"
              y1="18"
              x2="47"
              y2="23"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#ffd474" />
              <stop offset="1" stopColor="#e96e20" />
            </linearGradient>
          </defs>
          <path
            d="M6.5 29.1c0-6.1 5.1-10.5 12.7-10.5 3.3 0 6.2 1 8.1 2.8.8-5.8 4.4-9.7 9-9.7 5.2 0 8.5 4 8.5 9.2 0 2.5-.9 4.7-2.5 6.3 3.4 1.4 5.2 4 5.2 7.2 0 5.4-5.1 8.9-11.9 8.9H20.1c-7.9 0-13.6-5.1-13.6-12.4 0-.6 0-1.2.1-1.8Z"
            fill={`url(#${bodyGradientId})`}
            stroke="#fff8e9"
            strokeWidth="2.1"
            strokeLinejoin="round"
          />
          <path
            d="M11.5 28.1c.2-5.4 4.5-9.2 10-9.5 2.5-.1 4.8.4 6.7 1.5-2.3-3.9-5.3-5.7-9.3-5.5-5.8.3-9.8 5-9.8 10.6 0 1.2.3 2.4.8 3.5.4-.2 1-.4 1.6-.6Z"
            fill="#fff9d1"
            opacity="0.58"
          />
          <path
            d="M13.2 30.6c2.3-2.7 6.1-3.3 9-1.5-1.3 3.2-4.2 4.9-8.1 4.2"
            fill={`url(#${wingGradientId})`}
            stroke="#e9b933"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
          <path
            d="M15.2 30.2c2.1-1.8 4.9-2.1 6.9-1.1"
            fill="none"
            stroke="#fff8cb"
            strokeWidth="1.35"
            strokeLinecap="round"
            opacity="0.9"
          />
          <path
            d="m43.2 18.8 4.1 1.8-4.1 2"
            fill={`url(#${beakGradientId})`}
            stroke="#fff1d8"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
          <g transform="rotate(-8 35.8 16.5)">
            <path
              d="M27.2 14.5c.2-1 1-1.5 2.1-1.5h4.2c1.2 0 1.8.7 1.9 1.8l.2 2.5c.1 1.4-.7 2-2 2h-3.3c-1.1 0-1.7-.7-1.9-1.8l-1.2-3Z"
              fill="#080c10"
              stroke="#030507"
              strokeWidth="0.9"
              strokeLinejoin="round"
            />
            <path
              d="M36.3 14.6c.2-1 1-1.6 2-1.6h3.1c1.1 0 1.7.7 1.5 1.8l-.4 2.6c-.2 1.1-.9 1.7-2 1.7h-2.7c-1.1 0-1.6-.7-1.6-1.8v-2.7Z"
              fill="#080c10"
              stroke="#030507"
              strokeWidth="0.9"
              strokeLinejoin="round"
            />
            <path
              d="M35.3 14.5c.6-.5 1.1-.5 1.8 0"
              fill="none"
              stroke="#030507"
              strokeWidth="1.35"
              strokeLinecap="round"
            />
            <path
              d="m27.4 14.5-1.8-.6"
              fill="none"
              stroke="#030507"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
            <path
              d="M29 14.1h3.4m5.3.1h2.3"
              fill="none"
              stroke="#8297a0"
              strokeWidth="0.65"
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