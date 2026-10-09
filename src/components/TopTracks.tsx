import { Section } from './Section'
import { Icon } from './Icon'
import { useTopTracks } from '@/hooks/useTopTracks'
import { formatDuration } from '@/utils/format'
import { socials } from '@/utils/siteData'

export function TopTracks() {
  const { data: tracks, isLoading, isError } = useTopTracks(10)

  return (
    <Section
      id="top-tracks"
      eyebrow="Lo más escuchado"
      title="Éxitos"
      className="bg-neutral-900/40"
    >
      {isLoading && <TrackSkeleton />}

      {isError && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-6 text-center text-neutral-300">
          <p className="font-medium text-white">No se pudieron cargar las canciones.</p>
          <p className="mt-1 text-sm text-neutral-400">
            Intenta de nuevo más tarde o escúchanos directo en Spotify.
          </p>
        </div>
      )}

      {!isLoading && !isError && tracks && tracks.length > 0 && (
        <ol className="grid gap-4 sm:grid-cols-2">
          {tracks.map((track, index) => (
            <li key={track.id}>
              <a
                href={track.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-3 transition-colors hover:border-brand/60 hover:bg-white/[0.06]"
              >
                <span className="w-6 text-center text-lg font-bold text-neutral-500">
                  {index + 1}
                </span>
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-neutral-800">
                  {track.image ? (
                    <img
                      src={track.image}
                      alt={`Portada de ${track.name}`}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                  <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <Icon name="play" className="h-6 w-6 text-white" />
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-white group-hover:text-brand">
                    {track.name}
                  </p>
                  <p className="truncate text-sm text-neutral-400">
                    {track.artists.join(', ')}
                  </p>
                </div>
                {track.durationMs ? (
                  <span className="shrink-0 text-sm tabular-nums text-neutral-500">
                    {formatDuration(track.durationMs)}
                  </span>
                ) : null}
              </a>
            </li>
          ))}
        </ol>
      )}

      {!isLoading && !isError && (!tracks || tracks.length === 0) && (
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 text-center text-neutral-400">
          Aún no hay canciones para mostrar. Síguenos en Spotify para no perderte los estrenos.
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <a
          href={socials.find((s) => s.icon === 'spotify')?.href ?? '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-brand hover:text-brand"
        >
          <Icon name="spotify" className="h-5 w-5" />
          Ver perfil completo en Spotify
        </a>
      </div>
    </Section>
  )
}

function TrackSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2" aria-hidden>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex animate-pulse items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-3"
        >
          <span className="h-6 w-6 rounded bg-white/10" />
          <span className="h-14 w-14 rounded-lg bg-white/10" />
          <span className="flex-1 space-y-2">
            <span className="block h-4 w-3/4 rounded bg-white/10" />
            <span className="block h-3 w-1/2 rounded bg-white/10" />
          </span>
        </div>
      ))}
    </div>
  )
}
