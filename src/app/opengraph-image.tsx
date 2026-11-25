import { ImageResponse } from "next/og";

export const alt = "Coverza — iPhone & Samsung mobile covers in Pakistan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const cases = [
  { color: "#93A8BF", left: 40, top: 150, h: 380 },
  { color: "#E4ECF2", left: 300, top: 160, h: 360 },
  { color: "#C7D9E8", left: 165, top: 90, h: 420 },
];

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#18181b", color: "white", padding: 72 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, gap: 22 }}>
          <div style={{ fontSize: 30, letterSpacing: 8, fontWeight: 700 }}>COVERZA</div>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.08 }}>{"iPhone & Samsung Covers in Pakistan"}</div>
          <div style={{ fontSize: 32, color: "#d4d4d8" }}>Cash on Delivery · 2–4 day delivery · 7-day returns</div>
        </div>
        <div style={{ width: 460, position: "relative", display: "flex" }}>
          {cases.map((c) => (
            <div
              key={c.color}
              style={{
                position: "absolute",
                left: c.left,
                top: c.top - 60,
                width: c.h / 2.05,
                height: c.h,
                borderRadius: c.h * 0.107,
                background: c.color,
                display: "flex",
                padding: c.h * 0.05,
              }}
            >
              <div style={{ width: c.h * 0.2, height: c.h * 0.2, borderRadius: c.h * 0.06, background: "rgba(0,0,0,0.16)" }} />
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
