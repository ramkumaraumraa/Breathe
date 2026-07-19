import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'

export interface KayoBrutalistDateNavProps {
  currentDateText: string
  onPrev: () => void
  onNext: () => void
  onOpenPicker?: () => void
}

export function KayoBrutalistDateNav({
  currentDateText,
  onPrev,
  onNext,
  onOpenPicker,
}: KayoBrutalistDateNavProps) {
  const btnBase: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: 'var(--kayo-radius-default, 8px)',
    border: '2px solid var(--kayo-color-border, #191b1f)',
    background: '#ffffff',
    color: '#14161a',
    boxShadow: 'var(--kayo-shadow-sm, 2px 2px 0 #191b1f)',
    cursor: 'pointer',
    userSelect: 'none',
  }

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      <button type="button" onClick={onPrev} style={btnBase} aria-label="Previous date">
        <ChevronLeft size={18} strokeWidth={2.5} />
      </button>

      <button
        type="button"
        onClick={onOpenPicker}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '0 16px',
          height: '36px',
          borderRadius: 'var(--kayo-radius-default, 8px)',
          border: '2px solid var(--kayo-color-border, #191b1f)',
          background: '#ffffff',
          color: '#14161a',
          fontSize: '13px',
          fontWeight: 700,
          boxShadow: 'var(--kayo-shadow-sm, 2px 2px 0 #191b1f)',
          cursor: onOpenPicker ? 'pointer' : 'default',
          userSelect: 'none',
        }}
      >
        <Calendar size={15} strokeWidth={2.25} color="var(--kayo-color-primary, #970103)" />
        <span>{currentDateText}</span>
      </button>

      <button type="button" onClick={onNext} style={btnBase} aria-label="Next date">
        <ChevronRight size={18} strokeWidth={2.5} />
      </button>
    </div>
  )
}
