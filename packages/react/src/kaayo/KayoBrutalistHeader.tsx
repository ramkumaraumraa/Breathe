import { useState, useEffect, ReactNode, CSSProperties } from 'react'
import { Bell, ChevronDown } from 'lucide-react'
import { KayoBrutalistKaayoLogo } from './KayoBrutalistKaayoLogo'

export type KayoHeaderVariant = 'branded' | 'mobile' | 'tablet' | 'desktop'

export interface KayoBrutalistHeaderProps {
  logo?: ReactNode
  variant?: KayoHeaderVariant
  title?: ReactNode
  actions?: ReactNode
  navItems?: { label: string; href: string; active?: boolean }[]
  onBellPress?: () => void
  bellCount?: number
  user?: {
    name: string
    role: string
    initials: string
  }
  onUserPress?: () => void
  sticky?: boolean
  pageTitle?: string
  className?: string
  style?: CSSProperties
}

const STYLE_ID = 'kayo-header-styles'

export function KayoBrutalistHeader({
  logo,
  variant = 'mobile',
  title,
  actions,
  navItems = [],
  onBellPress,
  bellCount = 0,
  user,
  onUserPress,
  sticky = false,
  pageTitle,
  className,
  style,
}: KayoBrutalistHeaderProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return
    const s = document.createElement('style')
    s.id = STYLE_ID
    s.textContent = `
      .kayo-header-nav-item {
        color: var(--kayo-color-neutral-800, #3A3B3F);
        text-decoration: none;
        transition: color 120ms;
      }
      .kayo-header-nav-item:hover {
        color: var(--kayo-color-primary, #970103);
      }
      .kayo-header-bell {
        transition: background-color 120ms, transform 80ms;
      }
      .kayo-header-bell:hover {
        background-color: var(--kayo-color-neutral-50, #F8F8F8);
      }
      .kayo-header-bell:active {
        transform: translate(1px, 1px);
      }
      .kayo-header-user-chip {
        transition: background-color 120ms;
        border-radius: 6px;
      }
      .kayo-header-user-chip:hover {
        background-color: var(--kayo-color-neutral-50, #F8F8F8);
      }
      .kayo-header-container {
        transition: box-shadow 150ms;
      }
    `
    document.head.appendChild(s)
  }, [])

  useEffect(() => {
    if (!sticky) return
    const handleScroll = () => setScrolled(window.scrollY > 0)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sticky])

  const badgeLabel = bellCount > 9 ? '9+' : String(bellCount)
  const isBranded = variant === 'branded'
  const displayTitle = title ?? pageTitle

  // Default logo is the official Kaayo symbol (white in branded mode, brand red in light mode)
  const logoNode = logo ?? (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <KayoBrutalistKaayoLogo
        variant="symbol"
        tone={isBranded ? 'white' : 'brand'}
        size={isBranded ? 28 : 32}
      />
    </div>
  )

  const bellButton = isBranded ? (
    <button
      type="button"
      className="kayo-header-bell"
      onClick={onBellPress}
      style={{
        position: 'relative',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-label={`Notifications${bellCount > 0 ? ` (${badgeLabel} unread)` : ''}`}
    >
      <Bell size={22} color="#ffffff" strokeWidth={2.2} />
      {bellCount > 0 && (
        <span
          style={{
            position: 'absolute',
            top: 2,
            right: 2,
            minWidth: '16px',
            height: '16px',
            backgroundColor: 'var(--kayo-color-alert, #F5590B)',
            color: '#ffffff',
            fontSize: '9px',
            fontWeight: 800,
            borderRadius: '999px',
            border: '2px solid #970103',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 3px',
            fontFamily: "'DM Sans', system-ui, sans-serif",
            lineHeight: 1,
          }}
        >
          {badgeLabel}
        </span>
      )}
    </button>
  ) : (
    <button
      type="button"
      className="kayo-header-bell"
      onClick={onBellPress}
      style={{
        position: 'relative',
        width: '36px',
        height: '36px',
        border: '2px solid var(--kayo-color-border-strong, #17191D)',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        padding: 0,
        boxShadow: '2px 2px 0 var(--kayo-color-neutral-950, #17191D)',
      }}
      aria-label={`Notifications${bellCount > 0 ? ` (${badgeLabel} unread)` : ''}`}
    >
      <Bell size={18} color="var(--kayo-color-neutral-950, #17191D)" strokeWidth={2.2} />
      {bellCount > 0 && (
        <span
          style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            minWidth: '16px',
            height: '16px',
            backgroundColor: 'var(--kayo-color-primary, #970103)',
            color: '#ffffff',
            fontSize: '9px',
            fontWeight: 700,
            borderRadius: '999px',
            border: '2px solid #ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 3px',
            fontFamily: "'DM Sans', system-ui, sans-serif",
            lineHeight: 1,
          }}
        >
          {badgeLabel}
        </span>
      )}
    </button>
  )

  const avatarCircle = (size: number) => user ? (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '999px',
        backgroundColor: 'var(--kayo-color-primary, #970103)',
        border: '2px solid var(--kayo-color-border-strong, #17191D)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontWeight: 700,
          fontSize: size === 34 ? '12px' : '13px',
          color: '#ffffff',
          lineHeight: 1,
        }}
      >
        {user.initials}
      </span>
    </div>
  ) : null

  function UserChip({ size, user: u }: { size: number; user: { name: string; role: string; initials: string } }) {
    return (
      <button
        type="button"
        className="kayo-header-user-chip"
        onClick={onUserPress}
        style={{
          background: 'none',
          border: 'none',
          padding: '4px 8px',
          cursor: onUserPress ? 'pointer' : 'default',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
        aria-label={`User: ${u.name}, ${u.role}`}
      >
        {avatarCircle(size)}
        <span
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: '13px',
            fontWeight: 700,
            color: 'var(--kayo-color-neutral-950, #17191D)',
          }}
        >
          {u.name}
        </span>
        <span
          style={{
            backgroundColor: 'var(--kayo-palette-primary-25, #FFF0F1)',
            border: '1px solid var(--kayo-palette-primary-100, #FFCDD0)',
            color: 'var(--kayo-color-primary, #970103)',
            fontSize: '10px',
            borderRadius: '4px',
            paddingInline: '6px',
            paddingBlock: '2px',
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontWeight: 600,
            lineHeight: '16px',
            whiteSpace: 'nowrap',
          }}
        >
          {u.role}
        </span>
        <ChevronDown size={14} color="var(--kayo-color-neutral-800, #3A3B3F)" strokeWidth={2} />
      </button>
    )
  }

  // 1. BRANDED HEADER BAR (Figma 74513:27 - Crimson fixed top bar)
  if (isBranded) {
    return (
      <header
        className={`kayo-header-container ${className ?? ''}`}
        style={{
          backgroundColor: 'var(--kayo-color-primary, #970103)',
          borderBottom: '2px solid var(--kayo-color-border-strong, #17191D)',
          paddingTop: '20px',
          paddingBottom: '10px',
          paddingInline: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: sticky ? 'sticky' : 'relative',
          top: sticky ? 0 : undefined,
          zIndex: 30,
          boxShadow: scrolled ? '0 4px 12px rgba(23, 25, 29, 0.2)' : 'none',
          boxSizing: 'border-box',
          ...style,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
          {logoNode}
          {displayTitle && (
            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {typeof displayTitle === 'string' ? (
                <span
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontWeight: 800,
                    fontSize: '18px',
                    color: '#ffffff',
                    lineHeight: 1.2,
                  }}
                >
                  {displayTitle}
                </span>
              ) : (
                displayTitle
              )}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          {actions}
          {bellButton}
        </div>
      </header>
    )
  }

  // 2. UNBRANDED APP HEADER (Mobile, Tablet, Desktop)
  const isMobile = variant === 'mobile'
  const isTablet = variant === 'tablet'

  return (
    <header
      className={`kayo-header-container ${className ?? ''}`}
      style={{
        minHeight: '56px',
        backgroundColor: '#ffffff',
        borderBottom: isMobile ? 'none' : '2px solid var(--kayo-color-border-strong, #17191D)',
        paddingInline: isMobile ? '16px' : '24px',
        paddingBlock: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: sticky ? 'sticky' : 'relative',
        top: sticky ? 0 : undefined,
        zIndex: 30,
        boxShadow: scrolled ? '0 3px 6px rgba(23, 25, 29, 0.1)' : 'none',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {logoNode}

        {/* Desktop Nav Items */}
        {!isMobile && !isTablet && navItems.length > 0 && (
          <nav style={{ display: 'flex', gap: '8px', alignItems: 'center', marginLeft: '12px' }}>
            {navItems.map((item, idx) => (
              <a
                key={`${item.label}-${idx}`}
                href={item.href}
                className="kayo-header-nav-item"
                style={{
                  padding: '8px 12px',
                  borderBottom: item.active ? '2px solid var(--kayo-color-primary, #970103)' : '2px solid transparent',
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: '14px',
                  fontWeight: item.active ? 700 : 500,
                  color: item.active ? 'var(--kayo-color-primary, #970103)' : 'var(--kayo-color-neutral-800, #3A3B3F)',
                  textDecoration: 'none',
                  borderRadius: '6px 6px 0 0',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </div>

      {/* Centered Page Title for mobile / tablet */}
      {displayTitle && (
        <div
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontWeight: 800,
            fontSize: '16px',
            color: 'var(--kayo-color-neutral-950, #17191D)',
            textAlign: 'center',
          }}
        >
          {displayTitle}
        </div>
      )}

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {actions}
        {bellButton}
        {!isMobile && user && <UserChip size={36} user={user} />}
      </div>
    </header>
  )
}

/** BrandedHeaderTitle: Heading/H1 white text, count form supported ("76 students") */
export function BrandedHeaderTitle({ title, value }: { title: string; value?: string | number }) {
  if (value != null) {
    return (
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
        <span style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', lineHeight: 1 }}>{value}</span>
        <span style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', opacity: 0.9 }}>{title}</span>
      </div>
    )
  }
  return (
    <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
      {title}
    </h1>
  )
}

/** BrandedHeaderBar: Pre-bound fixed crimson top bar matching Figma 74513:27 */
export function BrandedHeaderBar(props: Omit<KayoBrutalistHeaderProps, 'variant'>) {
  return <KayoBrutalistHeader variant="branded" {...props} />
}
