import { ImageResponse } from "next/og";

// Branded favicon — mirrors the navbar "AGENCY 1776" identity:
// crimson "1776" on a near-black field, replacing the default Next
// starter icon. Generated at request/build time via next/og so it
// stays a single source of truth with the brand accent (#bf0a30).
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#bf0a30",
          fontSize: 30,
          fontWeight: 800,
          letterSpacing: "-2px",
          fontFamily: "sans-serif",
        }}
      >
        1776
      </div>
    ),
    { ...size }
  );
}
