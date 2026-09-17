import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "SilkCite — Chinese AI Visibility Intelligence";

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
          background: "#0f1116",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "40px",
              height: "20px",
              background: "#e26969",
              borderRadius: "4px",
            }}
          />
          <div style={{ fontSize: "34px", fontWeight: 600 }}>SilkCite</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "60px",
              lineHeight: 1.06,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Is Chinese AI recommending your brand?
          </div>
          <div
            style={{
              marginTop: "24px",
              fontSize: "26px",
              color: "#e26969",
            }}
          >
            Chinese AI visibility intelligence · DeepSeek · Qwen · Kimi · Doubao · Baidu
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
