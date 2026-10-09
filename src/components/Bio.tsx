import { Section } from './Section'
import { band, members } from '@/utils/siteData'
import people2 from '@/assets/images/people2.jpeg'

export function Bio() {
  const stats = [
    { label: 'Género', value: band.genre },
    { label: 'Desde', value: band.since },
    { label: 'Base', value: band.city },
  ]

  return (
    <Section id="bio" eyebrow="Grupo" title="Nuestra historia">
      {/* Imagen destacada a ancho completo (1024x595 -> aspect 1024/595) */}
      <figure className="relative mb-12 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] sm:mb-16">
        <div
          className="absolute -inset-3 -z-10 rounded-3xl bg-brand/10 blur-2xl"
          aria-hidden="true"
        />
        <img
          src={people2}
          alt="La Diferenzzia en vivo"
          loading="lazy"
          width={1024}
          height={595}
          className="aspect-[1024/595] w-full object-cover"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/30 to-transparent"
          aria-hidden="true"
        />
        <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand sm:text-sm">
            {band.genre}
          </p>
          <p className="mt-1 text-2xl font-bold text-white sm:text-3xl">
            {band.name}
          </p>
          <p className="mt-1 text-sm text-neutral-300 sm:text-base">
            {band.tagline}
          </p>
        </figcaption>
      </figure>

      {/* Texto biográfico + datos */}
      <div className="grid items-start gap-10 lg:grid-cols-5 lg:gap-16">
        <div className="space-y-5 text-neutral-300 lg:col-span-3">
          {band.bioLong.map((paragraph, i) => (
            <p key={i} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-2 lg:grid-cols-1">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-brand/50"
            >
              <dt className="text-xs uppercase tracking-wider text-neutral-500">
                {stat.label}
              </dt>
              <dd className="mt-1 font-semibold text-white">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Integrantes */}
      <div className="mt-16">
        <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
          Integrantes
        </h3>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member) => (
            <li
              key={member.name}
              className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-brand/50"
            >
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand/15 text-lg font-bold text-brand"
                aria-hidden
              >
                {member.name.charAt(0)}
              </span>
              <div>
                <p className="font-semibold text-white">{member.name}</p>
                <p className="text-sm text-neutral-400">{member.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
