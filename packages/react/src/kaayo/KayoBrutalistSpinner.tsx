const STYLE_ID = 'kayo-brutalist-spinner-styles'

const CSS = `
@keyframes kayo-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
.kayo-spinner {
  display: inline-block;
  border-style: solid;
  border-color: #e5e7eb;
  border-top-color: var(--kayo-color-primary, #970103);
  border-radius: 50%;
  animation: kayo-spin 0.7s linear infinite;
}
.kayo-spinner-sm  { width: 16px; height: 16px; border-width: 2px; }
.kayo-spinner-md  { width: 24px; height: 24px; border-width: 3px; }
.kayo-spinner-lg  { width: 36px; height: 36px; border-width: 4px; }
`

function injectStyles() {
  if (typeof document === 'undefined') return
  if (document.getElementById(STYLE_ID)) return
  const el = document.createElement('style')
  el.id = STYLE_ID
  el.textContent = CSS
  document.head.appendChild(el)
}

export type KayoSpinnerSize = 'sm' | 'md' | 'lg'

export interface KayoBrutalistSpinnerProps {
  size?: KayoSpinnerSize
  label?: string
  className?: string
}

export function KayoBrutalistSpinner({
  size = 'md',
  label,
}: KayoBrutalistSpinnerProps) {
  injectStyles()

  return (
    <span
      role="status"
      aria-label={label ?? 'Loading'}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      <span className={`kayo-spinner kayo-spinner-${size}`} />
      {label && (
        <span style={{ fontSize: 12, fontWeight: 600, color: '#6c6d70' }}>
          {label}
        </span>
      )}
    </span>
  )
}
