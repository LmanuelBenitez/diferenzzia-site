// Shared domain types for the Diferenzzia site.

export interface Track {
  id: string
  name: string
  /** Album/cover image URL (largest available). */
  image: string
  /** Spotify external link. */
  url: string
  /** Duration in milliseconds, when available. */
  durationMs?: number
  /** Spotify popularity score (0-100), when available. */
  popularity?: number
  artists: string[]
}

export interface Show {
  id: string
  /** ISO date string. */
  date: string
  venue: string
  city: string
  /** Optional ticket / event link. */
  ticketUrl?: string
  /** Sold out flag. */
  soldOut?: boolean
}

export interface BandMember {
  name: string
  role: string
  /** Optional image URL. */
  image?: string
}

export interface BookingPayload {
  name: string
  email: string
  phone: string
  eventDate: string
  city: string
  eventType: string
  message: string
}

export interface BookingResponse {
  ok: boolean
  message: string
}

export interface SocialLink {
  label: string
  href: string
  /** Icon key matched in the Contact/Footer components. */
  icon: 'whatsapp' | 'instagram' | 'facebook' | 'youtube' | 'spotify' | 'tiktok' | 'mail'
}
