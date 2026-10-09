import type { BandMember, Show, SocialLink } from '@/types'

/** Central place to edit the band's static content. */

export const band = {
  name: 'La Diferenzzia',
  tagline: 'EL GRANDE DEL NORTE DE QUERÉTARO',
  genre: 'Grupo norteño',
  since: 2019,
  city: 'Arroyo Seco, Querétaro',
  bioShort:
    'Diferenzzia es una banda de rock alternativo que fusiona guitarras potentes, letras viscerales y una energía de escenario imposible de ignorar.',
  bioLong: [
    'Nacida en 2019 en la escena underground, Diferenzzia se formó con una idea clara: hacer rock que conecte de verdad con la gente. Desde entonces han recorrido escenarios de todo el país, compartiendo cartel con bandas nacionales e internacionales.',
    'Su sonido mezcla riffs contundentes, atmósferas densas y melodías que se quedan pegadas. Cada show es una experiencia distinta, pensada para que el público sea parte de la banda.',
    'Hoy Diferenzzia trabaja en nueva música y sigue sumando fechas en su gira. Si buscas una banda que llene el escenario y haga vibrar al público, esta es.',
  ],
  email: 'booking@diferenzzia.com',
  whatsapp: '+5215512345678',
  whatsappDisplay: '+52 155 1234 5678',
} as const

export const members: BandMember[] = [
  { name: 'Alex Rivera', role: 'Voz y guitarra' },
  { name: 'Dani Torres', role: 'Guitarra líder' },
  { name: 'Sofía Méndez', role: 'Bajo' },
  { name: 'Cris Navarro', role: 'Batería' },
]

/** Upcoming and past shows. Dates are ISO (YYYY-MM-DD). */
export const shows: Show[] = [
  {
    id: 's1',
    date: '2026-11-15',
    venue: 'Foro Sol',
    city: 'Ciudad de México',
    ticketUrl: 'https://example.com/boletos',
  },
  {
    id: 's2',
    date: '2026-11-28',
    venue: 'C3 Stage',
    city: 'Guadalajara',
    ticketUrl: 'https://example.com/boletos',
  },
  {
    id: 's3',
    date: '2026-12-10',
    venue: 'Café Iguana',
    city: 'Monterrey',
    soldOut: true,
  },
  {
    id: 's4',
    date: '2026-10-02',
    venue: 'Salón Bombay',
    city: 'Puebla',
  },
  {
    id: 's5',
    date: '2026-09-12',
    venue: 'Teatro Metro',
    city: 'Querétaro',
  },
]

export const socials: SocialLink[] = [
  { label: 'WhatsApp', href: 'https://wa.me/5215512345678', icon: 'whatsapp' },
  { label: 'Instagram', href: 'https://instagram.com/diferenzzia', icon: 'instagram' },
  { label: 'Facebook', href: 'https://facebook.com/diferenzzia', icon: 'facebook' },
  { label: 'YouTube', href: 'https://youtube.com/@diferenzzia', icon: 'youtube' },
  { label: 'Spotify', href: 'https://open.spotify.com/artist/2bRScmGjcvDUe1EClIq6kc', icon: 'spotify' },
  { label: 'TikTok', href: 'https://tiktok.com/@diferenzzia', icon: 'tiktok' },
]

export const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Grupo', href: '#bio' },
  { label: 'Éxitos', href: '#top-tracks' },
  { label: 'Eventos', href: '#shows' },
  { label: 'Contacto', href: '#contacto' },
] as const
