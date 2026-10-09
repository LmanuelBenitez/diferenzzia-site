import type { Handler, HandlerEvent } from '@netlify/functions'

/**
 * Receives booking form submissions.
 *
 * For now it validates and logs the payload, returning success. To actually
 * deliver the request, wire in an email provider (Resend, SendGrid, etc.) or
 * a store (Airtable, @netlify/blobs) using the env vars below.
 *
 * Optional env vars:
 *   BOOKING_WEBHOOK_URL  - if set, the payload is POSTed there (Slack/Zapier/...)
 *   BOOKING_NOTIFY_EMAIL - informational only
 */

interface BookingPayload {
  name?: string
  email?: string
  phone?: string
  eventDate?: string
  city?: string
  eventType?: string
  message?: string
}

function headers() {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  }
}

function fail(statusCode: number, message: string) {
  return { statusCode, headers: headers(), body: JSON.stringify({ ok: false, message }) }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(p: BookingPayload): string | null {
  if (!p.name || p.name.trim().length < 2) return 'El nombre es obligatorio.'
  if (!p.email || !EMAIL_RE.test(p.email)) return 'El correo no es válido.'
  if (!p.phone || p.phone.trim().length < 7) return 'El teléfono es obligatorio.'
  if (!p.eventDate) return 'La fecha del evento es obligatoria.'
  if (!p.city || p.city.trim().length < 2) return 'La ciudad es obligatoria.'
  if (!p.eventType) return 'El tipo de evento es obligatorio.'
  if (!p.message || p.message.trim().length < 10) return 'Cuéntanos un poco más (mínimo 10 caracteres).'
  return null
}

export const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: headers(), body: '' }
  }
  if (event.httpMethod !== 'POST') {
    return fail(405, 'Method not allowed')
  }

  let payload: BookingPayload
  try {
    payload = event.body ? (JSON.parse(event.body) as BookingPayload) : {}
  } catch {
    return fail(400, 'JSON inválido.')
  }

  const error = validate(payload)
  if (error) return fail(422, error)

  const record = {
    ...payload,
    receivedAt: new Date().toISOString(),
    source: 'diferenzzia-site',
  }

  // Optionally forward to a webhook (Slack, Zapier, Make, etc.).
  const webhook = process.env.BOOKING_WEBHOOK_URL
  if (webhook) {
    try {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      })
    } catch (err) {
      console.error('[booking] webhook delivery failed:', err)
      // Don't fail the user request just because the webhook failed.
    }
  }

  console.log('[booking] nueva solicitud:', record)

  return {
    statusCode: 200,
    headers: headers(),
    body: JSON.stringify({
      ok: true,
      message: '¡Gracias! Recibimos tu solicitud y te contactaremos pronto.',
    }),
  }
}
