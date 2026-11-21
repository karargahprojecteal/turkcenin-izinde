import React from "react";

/**
 * Vector SVG representations of Old Turkic (Orkhon) runiform epigraphy
 * so key museum specimens render crisply regardless of local OS Unicode font support.
 */
export function OrkhonEmblemSvg({ className = "h-5 w-5" }: { className?: string }) {
  // Stylized Orkhon t² (𐱅) / runiform museum monogram
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 5v22" />
      <path d="M8 11l8-6 8 6" />
      <path d="M10 21l6-5 6 5" />
    </svg>
  );
}

export function OrkhonTengriTegSvg({ className = "h-10 w-full" }: { className?: string }) {
  // Authentic right-to-left Orkhon runiform strokes for: 𐱅𐰭𐰼𐰃 𐱅𐰀𐰏 (Teŋri teg)
  return (
    <svg
      viewBox="0 0 280 44"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label="Orkhon Runiform: Teŋri teg (𐱅𐰭𐰼𐰃 𐱅𐰀𐰏)"
    >
      {/* Right-to-left: t² (𐱅) */}
      <g transform="translate(242, 6)">
        <path d="M12 2v28" />
        <path d="M4 10l8-8 8 8" />
        <path d="M5 22l7-6 7 6" />
      </g>
      {/* ŋ (𐰭) */}
      <g transform="translate(208, 6)">
        <path d="M4 4v24" />
        <path d="M4 16h14" />
        <path d="M18 4v24" />
      </g>
      {/* r² (𐰼) */}
      <g transform="translate(174, 6)">
        <path d="M12 2v28" />
        <path d="M12 8l9-5-9 10" />
        <path d="M12 20l-8 6" />
      </g>
      {/* i (𐰃) */}
      <g transform="translate(144, 6)">
        <path d="M10 3v26" />
        <path d="M10 12l7-5" />
      </g>
      {/* Word divider colon (:) */}
      <g fill="currentColor" stroke="none">
        <circle cx="128" cy="15" r="2" />
        <circle cx="128" cy="27" r="2" />
      </g>
      {/* t² (𐱅) */}
      <g transform="translate(92, 6)">
        <path d="M12 2v28" />
        <path d="M4 10l8-8 8 8" />
        <path d="M5 22l7-6 7 6" />
      </g>
      {/* a/e (𐰀) */}
      <g transform="translate(60, 6)">
        <path d="M6 28L14 4l8 24" />
        <path d="M9 19h10" />
      </g>
      {/* g² (𐰏) */}
      <g transform="translate(24, 6)">
        <path d="M6 6v20l14-10L6 6z" />
        <path d="M20 6v20" />
      </g>
    </svg>
  );
}
