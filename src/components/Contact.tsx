import { Section } from './Section'
import { Icon } from './Icon'
import { band, socials } from '@/utils/siteData'
import { whatsappLink } from '@/utils/format'

export function Contact() {
  return (
    <Section id="contacto" eyebrow="Hablemos" title="Contacto">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <a
          href={whatsappLink(band.whatsapp, `Hola ${band.name}, quiero información para un evento.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-green-500/60"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/15 text-green-400">
            <Icon name="whatsapp" className="h-6 w-6" />
          </span>
          <div>
            <p className="text-sm text-neutral-400">WhatsApp</p>
            <p className="font-semibold text-white group-hover:text-green-400">
              {band.whatsappDisplay}
            </p>
          </div>
        </a>

        <a
          href={`mailto:${band.email}`}
          className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-brand/60"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/15 text-brand">
            <Icon name="mail" className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <p className="text-sm text-neutral-400">Correo</p>
            <p className="truncate font-semibold text-white group-hover:text-brand">
              {band.email}
            </p>
          </div>
        </a>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 sm:col-span-2 lg:col-span-1">
          <p className="mb-4 text-sm text-neutral-400">Redes sociales</p>
          <div className="flex flex-wrap gap-3">
            {socials
              .filter((s) => s.icon !== 'whatsapp' && s.icon !== 'mail')
              .map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-neutral-300 transition-colors hover:border-brand hover:text-brand"
                >
                  <Icon name={social.icon} className="h-5 w-5" />
                </a>
              ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
