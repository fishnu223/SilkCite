import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "SilkCite — AI visibility intelligence";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#e26969",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "44px",
              height: "22px",
              background: "#ffffff",
              borderRadius: "2px",
            }}
          />
          <div style={{ fontSize: "36px", fontWeight: 600 }}>SilkCite</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "64px", lineHeight: 1.05, fontWeight: 700, letterSpacing: "-0.02em" }}>
            Your customers are asking AI.
          </div>
          <div style={{ fontSize: "64px", lineHeight: 1.05, fontWeight: 700, letterSpacing: "-0.02em", color: "#2a1a18" }}>
            What does AI say about you?
          </div>
        </div>

        <div style={{ fontSize: "28px", opacity: 0.95 }}>
          AI visibility intelligence
        </div>
      </div>
    ),
    { ...size },
  );
}
