import React, { ReactNode } from 'react'
import { Wifi, Battery, Signal } from 'lucide-react'

export interface AndroidFrameProps {
  children: ReactNode
  statusBarTheme?: 'light' | 'dark'
  screenBg?: string
  width?: string | number
  height?: string | number
  bleedStatusBar?: boolean
}

export function AndroidFrame({
  children,
  statusBarTheme = 'dark',
  screenBg = '#ffffff',
  width = 360,
  height = 740,
  bleedStatusBar = false,
}: AndroidFrameProps) {
  const isLightStatus = statusBarTheme === 'light'
  const statusColor = isLightStatus ? '#ffffff' : '#3b3d3f'

  return (
    <div
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius: '36px',
        border: '12px solid #1e293b', // slate-800 bezel
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 2px #0f172a',
        backgroundColor: '#1e293b',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* Speaker / Camera Notch */}
      <div
        style={{
          position: 'absolute',
          top: '6px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '72px',
          height: '14px',
          backgroundColor: '#0f172a',
          borderRadius: '7px',
          zIndex: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Camera lens highlight */}
        <div
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#1e293b',
            marginLeft: 'auto',
            marginRight: '8px',
          }}
        />
      </div>

      {/* Android Status Bar */}
      <div
        style={{
          height: '28px',
          paddingLeft: '16px',
          paddingRight: '16px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 30,
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: '11px',
          fontWeight: 600,
          color: statusColor,
          pointerEvents: 'none',
        }}
      >
        {/* Time */}
        <span style={{ marginBottom: '2px', letterSpacing: '0.2px' }}>18:30</span>

        {/* Status Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
          <Signal size={12} color={statusColor} strokeWidth={2.5} />
          <Wifi size={12} color={statusColor} strokeWidth={2.5} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            <span style={{ fontSize: '9px', fontWeight: 700, marginRight: '1px' }}>84%</span>
            <Battery size={13} color={statusColor} strokeWidth={2.5} />
          </div>
        </div>
      </div>

      {/* Screen Area */}
      <div
        style={{
          flex: 1,
          backgroundColor: screenBg,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          paddingTop: bleedStatusBar ? '0px' : '28px', // offset for status bar
          paddingBottom: '16px', // offset for gesture bar
        }}
      >
        {children}
      </div>

      {/* Android Bottom Navigation / Gesture Bar */}
      <div
        style={{
          height: '16px',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 30,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          pointerEvents: 'none',
        }}
      >
        {/* Gesture pill */}
        <div
          style={{
            width: '90px',
            height: '4px',
            borderRadius: '2px',
            backgroundColor: '#0f172a',
            opacity: 0.5,
          }}
        />
      </div>
    </div>
  )
}
