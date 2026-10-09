import { useMemo } from 'react'
import { Section } from './Section'
import { Icon } from './Icon'
import { shows } from '@/utils/siteData'
import { formatShowDate, formatShowDateLong, isUpcoming } from '@/utils/format'
import type { Show } from '@/types'

export function Shows() {
  const { upcoming, past } = useMemo(() => {
    const sorted = [...shows].sort((a, b) => a.date.localeCompare(b.date))
    return {
      upcoming: sorted.filter((s) => isUpcoming(s.date)),
      past: sorted.filter((s) => !isUpcoming(s.date)).reverse(),
    }
  }, [])

  return (
    <Section id="shows" eyebrow="En vivo" title="Próximas fechas">
      {upcoming.length > 0 ? (
        <ul className="space-y-3">
          {upcoming.map((show) => (
            <ShowRow key={show.id} show={show} />
          ))}
        </ul>
      ) : (
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 text-center text-neutral-400">
          No hay fechas confirmadas por ahora. ¡Síguenos en redes para enterarte primero!
        </div>
      )}

      {past.length > 0 && (
        <div className="mt-16">
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
            Sitios visitados
          </h3>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {past.map((show) => (
              <li
                key={show.id}
                className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-sm"
              >
                <p className="font-semibold text-neutral-200">{show.venue}</p>
                <p className="text-neutral-500">
                  {show.city} · {formatShowDate(show.date)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  )
}

function ShowRow({ show }: { show: Show }) {
  return (
    <li className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-brand/50 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-5">
        <div className="min-w-[64px] text-center">
          <p className="text-2xl font-black leading-none text-brand">
            {new Date(show.date + 'T00:00:00').getDate()}
          </p>
          <p className="text-xs uppercase tracking-wider text-neutral-500">
            {new Date(show.date + 'T00:00:00').toLocaleDateString('es-MX', { month: 'short' })}
          </p>
        </div>
        <div>
          <p className="font-semibold text-white">{show.venue}</p>
          <p className="text-sm text-neutral-400">{show.city}</p>
          <p className="mt-0.5 text-xs capitalize text-neutral-500">
            {formatShowDateLong(show.date)}
          </p>
        </div>
      </div>

      <div className="shrink-0">
        {show.soldOut ? (
          <span className="inline-flex items-center rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-neutral-500">
            Agotado
          </span>
        ) : show.ticketUrl ? (
          <a
            href={show.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            Boletos
            <Icon name="arrow" className="h-4 w-4" />
          </a>
        ) : (
          <span className="text-sm text-neutral-500">Próximamente</span>
        )}
      </div>
    </li>
  )
}
