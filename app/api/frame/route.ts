export async function GET() {
  return new Response(
    `<!DOCTYPE html>
    <html>
      <head>
        <title>MADHAT Daily Bounties</title>
        <meta property="og:title" content="MADHAT Daily Bounties" />
        <meta property="og:description" content="Complete daily challenges, earn ETH + $MADHAT" />
        <meta property="og:image" content="${process.env.NEXT_PUBLIC_API_BASE_URL}/api/frame/image" />
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_API_BASE_URL}/api/frame/image" />
        <meta property="fc:frame:button:1" content="Submit Proof" />
        <meta property="fc:frame:button:1:action" content="post_redirect" />
        <meta property="fc:frame:post_url" content="${process.env.NEXT_PUBLIC_API_BASE_URL}/api/frame" />
      </head>
    </html>`,
    {
      headers: {
        "Content-Type": "text/html",
      },
    }
  );
}

export async function POST() {
  try {
    // Fetch current bounty from your Express backend
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/current-bounty`
    );
    const { bounty } = await response.json();

    // Get POIDH URL for the current bounty
    const submitUrl = `https://poidh.xyz/degen/bounty/${bounty.id}`;

    // Redirect to POIDH
    return Response.redirect(submitUrl, 302);
  } catch (error) {
    console.error("Error handling frame interaction:", error);
    return Response.json(
      { error: "Failed to process frame interaction" },
      { status: 500 }
    );
  }
}
