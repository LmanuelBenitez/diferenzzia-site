import type { Handler, HandlerEvent } from '@netlify/functions'

/**
 * Server-side proxy to the Spotify Web API.
 *
 * Required environment variables (set in Netlify UI / .env):
 *   SPOTIFY_CLIENT_ID
 *   SPOTIFY_CLIENT_SECRET
 *   SPOTIFY_ARTIST_ID
 *
 * The client credentials flow is used so no user login is required.
 */

const TOKEN_URL = 'https://accounts.spotify.com/api/token'
const API_BASE = 'https://api.spotify.com/v1'

interface TokenResponse {
  access_token: string
  token_type: string
  expires_in: number
}

interface SpotifyImage {
  url: string
  width: number | null
  height: number | null
}

interface SpotifyArtist {
  name: string
}

interface SpotifyTrack {
  id: string
  name: string
  duration_ms: number
  popularity: number
  external_urls: { spotify: string }
  album: { images: SpotifyImage[] }
  artists: SpotifyArtist[]
}

interface TopTracksResponse {
  tracks: SpotifyTrack[]
}

function jsonHeaders() {
  return {
    'Content-Type': 'application/json',
    'Cache-Control': 'public, max-age=600, s-maxage=600',
  }
}

function errorResponse(statusCode: number, message: string) {
  return {
    statusCode,
    headers: jsonHeaders(),
    body: JSON.stringify({ error: message }),
  }
}

let cachedToken: { value: string; expiresAt: number } | null = null

async function getAccessToken(clientId: string, clientSecret: string): Promise<string> {
  // Reuse a still-valid token to avoid hammering the token endpoint.
  if (cachedToken && cachedToken.expiresAt > Date.now() + 30_000) {
    return cachedToken.value
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Spotify token error (${res.status}): ${text}`)
  }

  const data = (await res.json()) as TokenResponse
  cachedToken = {
    value: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  }
  return data.access_token
}

export const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== 'GET') {
    return errorResponse(405, 'Method not allowed')
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  const artistId = process.env.SPOTIFY_ARTIST_ID

  if (!clientId || !clientSecret || !artistId) {
    return errorResponse(
      500,
      'Faltan variables de entorno de Spotify (SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_ARTIST_ID).',
    )
  }

  const rawLimit = Number(event.queryStringParameters?.limit ?? '10')
  const limit = Number.isFinite(rawLimit) ? Math.min(Math.max(rawLimit, 1), 20) : 10

  try {
    const token = await getAccessToken(clientId, clientSecret)

    const url = `${API_BASE}/artists/${encodeURIComponent(artistId)}/top-tracks?market=MX&limit=${limit}`
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (!res.ok) {
      const text = await res.text()
      return errorResponse(502, `Spotify API error (${res.status}): ${text}`)
    }

    const data = (await res.json()) as TopTracksResponse

    const tracks = (data.tracks ?? []).map((t) => ({
      id: t.id,
      name: t.name,
      image: t.album.images?.[0]?.url ?? '',
      url: t.external_urls?.spotify ?? '',
      durationMs: t.duration_ms,
      popularity: t.popularity,
      artists: (t.artists ?? []).map((a) => a.name),
    }))

    return {
      statusCode: 200,
      headers: jsonHeaders(),
      body: JSON.stringify({ tracks }),
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido'
    return errorResponse(500, message)
  }
}
