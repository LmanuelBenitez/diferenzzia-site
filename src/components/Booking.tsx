import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Section } from './Section'
import { submitBooking } from '@/services/api'
import type { BookingPayload } from '@/types'

type FormValues = BookingPayload

const EVENT_TYPES = ['Festival', 'Bar / Foro', 'Evento privado', 'Corporativo', 'Otro']

export function Booking() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [serverMessage, setServerMessage] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ mode: 'onBlur' })

  const onSubmit = async (values: FormValues) => {
    setStatus('idle')
    try {
      const res = await submitBooking(values)
      setStatus('success')
      setServerMessage(res.message)
      reset()
    } catch (err) {
      setStatus('error')
      setServerMessage(err instanceof Error ? err.message : 'Error inesperado.')
    }
  }

  return (
    <Section
      id="booking"
      eyebrow="Contrátanos"
      title="Agenda"
      className="bg-neutral-900/40"
    >
      <div className="grid gap-10 lg:grid-cols-5">
        <p className="text-neutral-300 lg:col-span-2">
          ¿Quieres a La Diferenzzia en tu evento? Llena el formulario y te contactaremos
          con disponibilidad y detalles. Respondemos en menos de 48 horas.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="grid gap-5 lg:col-span-3 sm:grid-cols-2"
        >
          <Field label="Nombre*" error={errors.name?.message}>
            <input
              type="text"
              autoComplete="name"
              className={inputClass(errors.name)}
              {...register('name', { required: 'Tu nombre es obligatorio.' })}
            />
          </Field>

          <Field label="Correo" error={errors.email?.message}>
            <input
              type="email"
              autoComplete="email"
              className={inputClass(errors.email)}
              {...register('email', {
                required: 'El correo es obligatorio.',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Ingresa un correo válido.',
                },
              })}
            />
          </Field>

          <Field label="Teléfono*" error={errors.phone?.message}>
            <input
              type="tel"
              autoComplete="tel"
              className={inputClass(errors.phone)}
              {...register('phone', { required: 'El teléfono es obligatorio.' })}
            />
          </Field>

          <Field label="Fecha del evento*" error={errors.eventDate?.message}>
            <input
              type="date"
              className={inputClass(errors.eventDate)}
              {...register('eventDate', { required: 'Selecciona una fecha.' })}
            />
          </Field>

          <Field label="Ubicación*" error={errors.city?.message}>
            <input
              type="text"
              className={inputClass(errors.city)}
              {...register('city', { required: 'La ciudad es obligatoria.' })}
            />
          </Field>

          <Field label="Tipo de evento*" error={errors.eventType?.message}>
            <select
              className={inputClass(errors.eventType)}
              defaultValue=""
              {...register('eventType', { required: 'Selecciona un tipo de evento.' })}
            >
              <option value="" disabled>
                Selecciona…
              </option>
              {EVENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </Field>

          <div className="sm:col-span-2">
            <Field label="Mensaje" error={errors.message?.message}>
              <textarea
                rows={4}
                className={inputClass(errors.message)}
                placeholder="Cuéntanos sobre el evento, aforo, horarios, etc."
                {...register('message', {
                  required: 'Cuéntanos un poco más.',
                  minLength: { value: 10, message: 'Mínimo 10 caracteres.' },
                })}
              />
            </Field>
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-brand px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {isSubmitting ? 'Enviando…' : 'Agendar'}
            </button>

            {status === 'success' && (
              <p role="status" className="mt-4 text-sm font-medium text-green-400">
                {serverMessage}
              </p>
            )}
            {status === 'error' && (
              <p role="alert" className="mt-4 text-sm font-medium text-red-400">
                {serverMessage}
              </p>
            )}
          </div>
        </form>
      </div>
    </Section>
  )
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-neutral-300">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-400">{error}</span>}
    </label>
  )
}

function inputClass(hasError?: unknown) {
  const base =
    'w-full rounded-lg border bg-neutral-950/60 px-4 py-2.5 text-white placeholder-neutral-600 outline-none transition-colors focus:border-brand'
  return `${base} ${hasError ? 'border-red-500/60' : 'border-white/15'}`
}
