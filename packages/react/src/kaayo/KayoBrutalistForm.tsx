import { FormEvent, ReactNode, CSSProperties } from 'react'

export type KayoFormLayout = 'vertical' | 'horizontal' | 'inline'

export interface KayoBrutalistFormProps {
  layout?: KayoFormLayout
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void
  children: ReactNode
  style?: CSSProperties
}

export interface KayoBrutalistFormFieldProps {
  label: string
  htmlFor?: string
  error?: string
  hint?: string
  required?: boolean
  children: ReactNode
  layout?: 'vertical' | 'horizontal'
}

export interface KayoBrutalistFormDividerProps {
  label?: string
}

export function KayoBrutalistFormField({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
  layout = 'vertical',
}: KayoBrutalistFormFieldProps) {
  const labelEl = (
    <label
      htmlFor={htmlFor}
      style={{
        fontSize: 12,
        fontWeight: 600,
        color: 'var(--kayo-color-foreground, #3b3d3f)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        lineHeight: '1.4',
        whiteSpace: 'nowrap',
      } as CSSProperties}
    >
      {label}
      {required && (
        <span style={{ color: 'var(--kayo-color-primary, #970103)', marginLeft: 3 }}>*</span>
      )}
    </label>
  )

  if (layout === 'horizontal') {
    return (
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
        <div style={{ flexShrink: 0, width: 140, paddingTop: 14 }}>{labelEl}</div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {children}
          {error && <span style={{ fontSize: 12, color: 'var(--kayo-color-negative, #dc2626)' }}>{error}</span>}
          {!error && hint && <span style={{ fontSize: 12, color: '#166534' }}>{hint}</span>}
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {labelEl}
      {children}
      {error && <span style={{ fontSize: 12, color: 'var(--kayo-color-negative, #dc2626)' }}>{error}</span>}
      {!error && hint && <span style={{ fontSize: 12, color: '#166534' }}>{hint}</span>}
    </div>
  )
}

export function KayoBrutalistFormDivider({ label }: KayoBrutalistFormDividerProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '4px 0', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {label && (
        <span style={{
          fontSize: 12,
          fontWeight: 600,
          color: 'var(--kayo-color-foreground, #3b3d3f)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        } as CSSProperties}>
          {label}
        </span>
      )}
      <div style={{ flex: 1, height: 2, backgroundColor: 'var(--kayo-color-border, #3b3d3f)' }} />
    </div>
  )
}

export function KayoBrutalistForm({
  layout = 'vertical',
  onSubmit,
  children,
  style,
}: KayoBrutalistFormProps) {
  const containerStyle: CSSProperties =
    layout === 'inline'
      ? { display: 'flex', flexDirection: 'row', gap: 12, alignItems: 'flex-end' }
      : { display: 'flex', flexDirection: 'column', gap: 16 }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit?.(e) }}
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif", ...containerStyle, ...style }}
    >
      {children}
    </form>
  )
}
