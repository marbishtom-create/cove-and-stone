export function AppointmentCtaSurface() {
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
          <path
            d="M6.5 29.1c0-6.1 5.1-10.5 12.7-10.5 3.3 0 6.2 1 8.1 2.8.8-5.8 4.4-9.7 9-9.7 5.2 0 8.5 4 8.5 9.2 0 2.5-.9 4.7-2.5 6.3 3.4 1.4 5.2 4 5.2 7.2 0 5.4-5.1 8.9-11.9 8.9H20.1c-7.9 0-13.6-5.1-13.6-12.4 0-.6 0-1.2.1-1.8Z"
            fill="#ffd34e"
            stroke="#fff8e9"
            strokeWidth="2.1"
            strokeLinejoin="round"
          />
          <path
            d="M13.2 30.6c2.3-2.7 6.1-3.3 9-1.5-1.3 3.2-4.2 4.9-8.1 4.2"
            fill="#ffe783"
            stroke="#e9b933"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
          <path
            d="m43.2 18.8 4.1 1.8-4.1 2"
            fill="#f08d3d"
            stroke="#fff1d8"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
          <circle cx="36.1" cy="16.4" r="1.15" fill="#19323b" />
        </svg>
      </span>
      <span
        className="layout-appointment-cta__copy-backdrop"
        aria-hidden="true"
      />
    </>
  );
}