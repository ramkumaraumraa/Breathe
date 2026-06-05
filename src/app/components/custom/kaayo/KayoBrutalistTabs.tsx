import { useState, ReactNode } from 'react'

export type KayoTabSize = 'sm' | 'md' | 'lg'

export interface KayoTab {
  value: string
  label: string
  icon?: ReactNode
  badge?: string | number
  disabled?: boolean
  content: ReactNode
}

export interface KayoBrutalistTabsProps {
  tabs: KayoTab[]
  defaultValue?: string
  size?: KayoTabSize
  fullWidth?: boolean
}

const sizeTokens: Record<KayoTabSize, { fontSize: number; pH: number; pV: number; minH: number }> = {
  sm: { fontSize: 12, pH: 10, pV: 6,  minH: 32 },
  md: { fontSize: 14, pH: 14, pV: 8,  minH: 40 },
  lg: { fontSize: 15, pH: 18, pV: 10, minH: 48 },
}

export function KayoBrutalistTabs({
  tabs,
  defaultValue,
  size = 'md',
  fullWidth = false,
}: KayoBrutalistTabsProps) {
  const [active, setActive] = useState(defaultValue ?? tabs[0]?.value)
  const { fontSize, pH, pV, minH } = sizeTokens[size]

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", width: fullWidth ? '100%' : undefined }}>
      {/* Tab bar */}
      <div style={{
        display: 'flex',
        border: '2px solid var(--kayo-color-border, #3b3d3f)',
        borderRadius: '6px',
        boxShadow: '2px 2px 0 #191b1f',
        background: '#f4f4f4',
        overflow: 'hidden',
      }}>
        {tabs.map((tab, i) => {
          const isActive = tab.value === active
          const isDisabled = !!tab.disabled

          return (
            <button
              key={tab.value}
              disabled={isDisabled}
              onClick={() => !isDisabled && setActive(tab.value)}
              style={{
                flex: fullWidth ? 1 : undefined,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                paddingLeft: pH,
                paddingRight: pH,
                paddingTop: pV,
                paddingBottom: pV,
                minHeight: minH,
                fontSize,
                fontWeight: isActive ? 600 : 400,
                fontFamily: "'DM Sans', system-ui, sans-serif",
                background: isActive
                  ? 'var(--kayo-color-primary, #970103)'
                  : 'transparent',
                color: isActive
                  ? '#ffffff'
                  : isDisabled
                    ? '#a8a8aa'
                    : 'var(--kayo-color-foreground, #3b3d3f)',
                border: 'none',
                borderRight: i < tabs.length - 1
                  ? '2px solid var(--kayo-color-border, #3b3d3f)'
                  : 'none',
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                outline: 'none',
                userSelect: 'none',
                whiteSpace: 'nowrap',
                transition: 'background 80ms',
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span style={{
                  fontSize: Math.max(fontSize - 2, 10),
                  background: isActive ? 'rgba(255,255,255,0.25)' : '#3b3d3f',
                  color: '#fff',
                  borderRadius: '999px',
                  padding: '1px 6px',
                  fontWeight: 600,
                  lineHeight: '1.4',
                  minWidth: '18px',
                  textAlign: 'center',
                }}>
                  {tab.badge}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Tab content */}
      <div style={{
        paddingTop: '16px',
        fontSize: '14px',
        color: 'var(--kayo-color-foreground, #3b3d3f)',
        lineHeight: '1.6',
      }}>
        {tabs.find(t => t.value === active)?.content}
      </div>
    </div>
  )
}
