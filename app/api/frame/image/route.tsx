import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  try {
    // Fetch current bounty from your Express backend
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/current-bounty`
    );
    const { bounty } = await response.json();

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            padding: "40px 20px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 60,
              fontWeight: "bold",
              marginBottom: "20px",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {/* You can add your MADHAT logo here */}
            Go Mad, Get $MADHAT
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "20px",
            }}
          >
            <div style={{ fontSize: 32 }}>
              Day {bounty?.day || "0"}/100 Bounty
            </div>
            <div style={{ fontSize: 24, color: "#666" }}>
              {bounty?.description || "Loading next bounty..."}
            </div>
            <div style={{ fontSize: 28, color: "#0070f3", marginTop: "20px" }}>
              {bounty?.amount} ETH + {bounty?.tokenAmount} $MADHAT
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error("Error generating frame image:", error);

    // Return a fallback image
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <div style={{ fontSize: 60, fontWeight: "bold" }}>
            MADHAT Daily Bounties
          </div>
          <div style={{ fontSize: 32, marginTop: "20px" }}>
            Loading next challenge...
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }
}
