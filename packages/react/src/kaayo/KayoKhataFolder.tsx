import React, { type ReactNode } from 'react'

export interface KayoKhataFolderProps {
  /** Label for the notched folder tab */
  tab: string
  /** Sits beside the tab, above the body (e.g. at-a-glance chip) */
  aside?: ReactNode
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  bodyStyle?: React.CSSProperties
  testID?: string
}

export function KayoKhataFolder({
  tab,
  aside,
  children,
  className,
  style,
  bodyStyle,
  testID,
}: KayoKhataFolderProps) {
  const ink = 'var(--kayo-color-neutral-950, #17191D)'
  const border = 'var(--kayo-color-neutral-950, #17191D)'
  const bg = 'var(--kayo-color-neutral-25, #FFFFFF)'
  const shadow = 'var(--kayo-shadow-sm, 2px 2px 0 #17191D)'

  return (
    <div
      className={className}
      data-testid={testID}
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        width: '100%',
        ...style,
      }}
    >
      {/* Tab Row: overlaps the body's top border by 2px */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          marginBottom: '-2px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            padding: '10px 14px',
            backgroundColor: bg,
            border: `2px solid ${border}`,
            borderBottom: 'none',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
            boxSizing: 'border-box',
          }}
        >
          <span
            style={{
              fontFamily: "var(--kayo-font-family, 'DM Sans', system-ui, sans-serif)",
              fontSize: '12px',
              lineHeight: '16px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.6px',
              color: ink,
              userSelect: 'none',
            }}
          >
            {tab}
          </span>
        </div>
        {aside}
      </div>

      {/* Folder Body with top-left notch */}
      <div
        style={{
          backgroundColor: bg,
          border: `2px solid ${border}`,
          borderRadius: '10px',
          borderTopLeftRadius: 0,
          overflow: 'hidden',
          boxShadow: shadow,
          boxSizing: 'border-box',
          ...bodyStyle,
        }}
      >
        {children}
      </div>
    </div>
  )
}

// Alias matching React Native naming
export const KhataFolder = KayoKhataFolder

