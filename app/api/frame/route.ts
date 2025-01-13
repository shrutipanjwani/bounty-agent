export async function GET() {
  const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>MadHat Daily Bounties</title>
          <meta property="og:title" content="MadHat Daily Bounties" />
          <meta property="og:description" content="Daily challenges for Degen + $MAD" />
          <meta property="og:image" content="${process.env.NEXT_PUBLIC_API_BASE_URL}/api/frame/image" />
          
          <!-- Required Frame meta tags -->
          <meta property="fc:frame" content="vNext" />
          <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_API_BASE_URL}/api/frame/image" />
          <meta property="fc:frame:button:1" content="View Current Bounty" />
          <meta property="fc:frame:button:1:action" content="post_redirect" />
          <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_API_BASE_URL}/api/frame" />
        </head>
        <body>
          <p>MadHat Daily Bounties</p>
        </body>
      </html>
    `;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}

export async function POST() {
  try {
    // Get current bounty and redirect to it
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/current-bounty`
    );
    const { bounty } = await response.json();
    return Response.redirect(
      `https://poidh.xyz/degen/bounty/${bounty.id}`,
      302
    );
  } catch (error) {
    console.error("Error:", error);
    return Response.json(
      { error: "Failed to process frame interaction" },
      { status: 500 }
    );
  }
}
