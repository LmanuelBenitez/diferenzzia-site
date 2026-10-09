import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  title?: string
  eyebrow?: string
  backgroundImage?: string
  children: ReactNode
  className?: string
}

/** Consistent, responsive section wrapper with an optional heading. */
export function Section({
  id,
  title,
  eyebrow,
  backgroundImage,
  children,
  className = '',
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative isolate scroll-mt-20 px-5 py-20 sm:px-8 sm:py-24 ${
        backgroundImage ? 'min-h-[600px] sm:min-h-[700px]' : ''
      } ${className}`}
    >
      {backgroundImage && (
        <>
          <img
            src={backgroundImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-contain -z-10"
          />
          <div className="absolute inset-0 bg-black/85 -z-10" />
        </>
      )}

      <div className="relative mx-auto max-w-6xl">
        {(eyebrow || title) && (
          <header className="mb-10 sm:mb-14">
            {eyebrow && (
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                {title}
              </h2>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}