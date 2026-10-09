import axios from 'axios'
import type { BookingPayload, BookingResponse, Track } from '@/types'

/**
 * Base axios instance. In dev, `/api/*` calls hit the Netlify functions
 * proxied by Vite (see vite.config.ts). In prod they hit the deployed
 * Netlify functions at the same path.
 */
export const api = axios.create({
  baseURL: '/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

/** Raw shape returned by the Spotify proxy function. */
interface SpotifyTracksResponse {
  tracks: Track[]
}

/**
 * Fetch the band's top tracks from the Spotify-backed Netlify function.
 * Falls back to an empty list if the endpoint is unavailable so the UI
 * can still render gracefully.
 */
export async function fetchTopTracks(limit = 10): Promise<Track[]> {
  try {
    const { data } = await api.get<SpotifyTracksResponse>('/spotify-top-tracks', {
      params: { limit },
    })
    return Array.isArray(data?.tracks) ? data.tracks : []
  } catch (error) {
    console.error('[api] fetchTopTracks failed:', error)
    throw new Error('No se pudieron cargar las canciones. Intenta de nuevo más tarde.')
  }
}

/** Submit a booking request. */
export async function submitBooking(payload: BookingPayload): Promise<BookingResponse> {
  try {
    const { data } = await api.post<BookingResponse>('/booking', payload)
    return data
  } catch (error) {
    console.error('[api] submitBooking failed:', error)
    throw new Error('No se pudo enviar tu solicitud. Intenta de nuevo más tarde.')
  }
}
