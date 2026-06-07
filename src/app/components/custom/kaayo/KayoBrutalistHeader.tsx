import { useState, useEffect, useRef, ReactNode } from 'react'
import { Bell, ChevronDown } from 'lucide-react'

export interface KayoBrutalistHeaderProps {
  logo?: ReactNode
  variant?: 'mobile' | 'tablet' | 'desktop'
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
}

const STYLE_ID = 'kayo-header-styles'

export function KayoBrutalistHeader({
  logo,
  variant = 'desktop',
  navItems = [],
  onBellPress,
  bellCount = 0,
  user,
  onUserPress,
  sticky = false,
  pageTitle,
}: KayoBrutalistHeaderProps) {
  const containerRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return
    const s = document.createElement('style')
    s.id = STYLE_ID
    s.textContent = `
      .kayo-header-nav-item {
        color: #3b3d3f;
        text-decoration: none;
        transition: color 120ms;
      }
      .kayo-header-nav-item:hover {
        color: #970103;
      }
      .kayo-header-bell {
        transition: background-color 120ms;
      }
      .kayo-header-bell:hover {
        background-color: #f4f4f4;
      }
      .kayo-header-user-chip {
        transition: background-color 120ms;
        border-radius: 6px;
      }
      .kayo-header-user-chip:hover {
        background-color: #f4f4f4;
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

  const logoNode = logo ?? (
    <span style={{
      fontFamily: "'DM Sans', system-ui, sans-serif",
      fontWeight: 700,
      fontSize: '18px',
      color: '#3b3d3f',
      letterSpacing: '-0.5px',
    }}>
      Kaayo
    </span>
  )

  const bellButton = (
    <button
      className="kayo-header-bell"
      onClick={onBellPress}
      style={{
        position: 'relative',
        width: '36px',
        height: '36px',
        border: '2px solid #3b3d3f',
        borderRadius: '6px',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: onBellPress ? 'pointer' : 'default',
        flexShrink: 0,
        padding: 0,
      }}
      aria-label={`Notifications${bellCount > 0 ? `, ${bellCount} unread` : ''}`}
    >
      <Bell size={18} color="#3b3d3f" strokeWidth={2} />
      {bellCount > 0 && (
        <span style={{
          position: 'absolute',
          top: '-6px',
          right: '-6px',
          minWidth: '18px',
          height: '18px',
          backgroundColor: '#970103',
          color: '#ffffff',
          fontSize: '10px',
          fontWeight: 700,
          borderRadius: '999px',
          border: '2px solid #ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 3px',
          fontFamily: "'DM Sans', system-ui, sans-serif",
          lineHeight: 1,
        }}>
          {badgeLabel}
        </span>
      )}
    </button>
  )

  const avatarCircle = (size: number) => user ? (
    <div style={{
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '999px',
      backgroundColor: '#970103',
      border: '2px solid #3b3d3f',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}>
      <span style={{
        fontFamily: "'DM Sans', system-ui, sans-serif",
        fontWeight: 700,
        fontSize: size === 34 ? '12px' : '13px',
        color: '#ffffff',
        lineHeight: 1,
      }}>
        {user.initials}
      </span>
    </div>
  ) : null

  const mobileRight = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {bellButton}
      {user && (
        <button
          onClick={onUserPress}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: onUserPress ? 'pointer' : 'default',
            display: 'flex',
            alignItems: 'center',
          }}
          aria-label={`User: ${user.name}`}
        >
          {avatarCircle(34)}
        </button>
      )}
    </div>
  )

  const tabletRight = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {bellButton}
      {user && (
        <button
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
          aria-label={`User: ${user.name}, ${user.role}`}
        >
          {avatarCircle(36)}
          <span style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: '13px',
            fontWeight: 600,
            color: '#3b3d3f',
          }}>
            {user.name}
          </span>
          <span style={{
            backgroundColor: '#fff0f0',
            border: '1px solid #fca5a5',
            color: '#970103',
            fontSize: '10px',
            borderRadius: '4px',
            paddingInline: '6px',
            paddingBlock: '2px',
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontWeight: 500,
            lineHeight: '16px',
            whiteSpace: 'nowrap',
          }}>
            {user.role}
          </span>
          <ChevronDown size={14} color="#3b3d3f" strokeWidth={2} />
        </button>
      )}
    </div>
  )

  const desktopNav = navItems.length > 0 ? (
    <nav style={{
      display: 'flex',
      gap: '8px',
      alignItems: 'center',
    }}>
      {navItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="kayo-header-nav-item"
          style={{
            padding: '8px 12px',
            border: '2px solid transparent',
            borderBottom: item.active ? '2px solid #970103' : '2px solid transparent',
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: '14px',
            fontWeight: item.active ? 600 : 400,
            color: item.active ? '#970103' : '#3b3d3f',
            textDecoration: 'none',
            borderRadius: '6px 6px 0 0',
            whiteSpace: 'nowrap',
          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  ) : null

  const desktopRight = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {bellButton}
      {user && (
        <button
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
          aria-label={`User: ${user.name}, ${user.role}`}
        >
          {avatarCircle(36)}
          <span style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: '13px',
            fontWeight: 600,
            color: '#3b3d3f',
          }}>
            {user.name}
          </span>
          <span style={{
            backgroundColor: '#fff0f0',
            border: '1px solid #fca5a5',
            color: '#970103',
            fontSize: '10px',
            borderRadius: '4px',
            paddingInline: '6px',
            paddingBlock: '2px',
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontWeight: 500,
            lineHeight: '16px',
            whiteSpace: 'nowrap',
          }}>
            {user.role}
          </span>
          <ChevronDown size={14} color="#3b3d3f" strokeWidth={2} />
        </button>
      )}
    </div>
  )

  const containerStyle: React.CSSProperties = {
    minHeight: '60px',
    borderBottom: '2px solid #3b3d3f',
    backgroundColor: '#ffffff',
    paddingInline: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: sticky ? 'sticky' : 'relative',
    top: sticky ? 0 : undefined,
    zIndex: sticky ? 100 : undefined,
    boxShadow: sticky && scrolled ? '2px 2px 0 #191b1f' : 'none',
    fontFamily: "'DM Sans', system-ui, sans-serif",
  }

  const logoSlot = (
    <div style={{
      height: '36px',
      display: 'flex',
      alignItems: 'center',
      flexShrink: 0,
    }}>
      {logoNode}
    </div>
  )

  if (variant === 'mobile') {
    return (
      <header ref={containerRef} className="kayo-header-container" style={containerStyle}>
        {logoSlot}
        {mobileRight}
      </header>
    )
  }

  if (variant === 'tablet') {
    return (
      <header ref={containerRef} className="kayo-header-container" style={containerStyle}>
        {logoSlot}
        {tabletRight}
      </header>
    )
  }

  // desktop
  return (
    <header ref={containerRef} className="kayo-header-container" style={{ ...containerStyle, position: sticky ? 'sticky' : 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flex: '1 1 0', minWidth: 0 }}>
        {logoSlot}
        {desktopNav}
      </div>

      {pageTitle && (
        <div style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontWeight: 600,
          fontSize: '14px',
          color: '#3b3d3f',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}>
          {pageTitle}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', flex: '1 1 0', justifyContent: 'flex-end', minWidth: 0 }}>
        {desktopRight}
      </div>
    </header>
  )
}
