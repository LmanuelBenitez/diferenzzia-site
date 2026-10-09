import { format, parseISO, isAfter, startOfDay } from 'date-fns'
import { es } from 'date-fns/locale'

/** Format an ISO date as "15 nov 2026" in Spanish. */
export function formatShowDate(iso: string): string {
  try {
    return format(parseISO(iso), "d MMM yyyy", { locale: es })
  } catch {
    return iso
  }
}

/** Long format: "sábado 15 de noviembre, 2026". */
export function formatShowDateLong(iso: string): string {
  try {
    return format(parseISO(iso), "EEEE d 'de' MMMM, yyyy", { locale: es })
  } catch {
    return iso
  }
}

/** True if the ISO date is today or in the future. */
export function isUpcoming(iso: string): boolean {
  try {
    return !isAfter(startOfDay(new Date()), startOfDay(parseISO(iso)))
  } catch {
    return false
  }
}

/** Convert milliseconds to m:ss. */
export function formatDuration(ms?: number): string {
  if (!ms || ms <= 0) return ''
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

/** Build a wa.me link from a phone number and optional prefilled message. */
export function whatsappLink(phone: string, message?: string): string {
  const digits = phone.replace(/[^\d]/g, '')
  const base = `https://wa.me/${digits}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
