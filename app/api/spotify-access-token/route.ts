import {NextResponse} from "next/server";

export async function GET() {
    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            body: new URLSearchParams({
                'grant_type': 'client_credentials',
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cache-Control': 'no-store',
                'Pragma': 'no-cache',         // For older HTTP/1.0 clients (legacy support)
                'Expires': '0',               // Ensures response is considered expired immediately
                'Authorization': 'Basic ' + (Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')),
            },
            cache: 'no-store'
        });

        const access_token = await response.json();

        return NextResponse.json({ success: true, access_token: access_token.access_token, last_fetched_at: new Date().toISOString()});
    } catch (error) {
        console.error("Failed to set new memory:", error)
        return NextResponse.json({ success: false, error: "Failed to get an access token" }, { status: 500 })
    }
}