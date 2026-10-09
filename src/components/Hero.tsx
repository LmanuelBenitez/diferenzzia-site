import { Icon } from './Icon'
import { band } from '@/utils/siteData'
import banner from "@/assets/images/banner.png"

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 pt-24 pb-16 sm:px-8"
    >
      {/* Background: gradient + subtle grid. Swap for a photo/video by adding
          an <img>/<video> layer here with the same absolute positioning. */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-950" />
      <div
        className="absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />
      <div className="absolute -top-24 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-brand/30 blur-[120px]" />

      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-brand">
          {band.genre} · desde {band.since}
        </p>
        <img
          src={banner}
          alt="La Diferenzzia"
          className="w-full max-w-md sm:max-w-lg md:max-w-2xl h-auto"
        />
        <p className="mx-auto mt-6 max-w-xl text-lg text-neutral-300 sm:text-xl">
          {band.tagline}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <a
            href="#booking"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-dark sm:w-auto"
          >
            <Icon name="play" className="h-5 w-5" />
            Contratar a la banda
          </a>
          <a
            href="#top-tracks"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:border-brand hover:text-brand sm:w-auto"
          >
            Escuchar éxitos
            <Icon name="arrow" className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  )
}
