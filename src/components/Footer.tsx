import { Icon } from './Icon'
import { band, navLinks, socials } from '@/utils/siteData'
import banner from "@/assets/images/banner.png"


export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-neutral-950 px-5 py-12 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <a href="#inicio" className="text-xl font-extrabold uppercase tracking-widest">
              <img
                src={banner}
                alt="Diferenzzia"
                className="h-20 w-auto"
              />
            </a>
            <p className="mt-4 max-w-sm text-sm text-neutral-400">
              {band.bioShort}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-neutral-400 transition-colors hover:border-brand hover:text-brand"
                >
                  <Icon name={social.icon} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Enlaces del sitio">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-300">
              Navegación
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-neutral-400 transition-colors hover:text-brand"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-300">
              Contacto
            </h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <a href={`mailto:${band.email}`} className="transition-colors hover:text-brand">
                  {band.email}
                </a>
              </li>
              <li>{band.whatsappDisplay}</li>
              <li>{band.city}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-neutral-500 sm:flex-row">
          <p>
            © {year} {band.name}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
