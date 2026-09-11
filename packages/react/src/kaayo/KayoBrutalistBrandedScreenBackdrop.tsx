import React, { ReactNode } from 'react';
import { Bell } from 'lucide-react';
import { KayoBrutalistKaayoLogo } from './KayoBrutalistKaayoLogo';

export type BackdropPatternVariant = 'dashboard' | 'students' | 'attendance';

interface BrandedScreenBackdropProps {
  variant: BackdropPatternVariant;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  metricSlot?: ReactNode;
  actionSlot?: ReactNode;
  children?: ReactNode;
  onBellPress?: () => void;
  safeAreaTop?: boolean;
}

const PATTERN_CONFIG = {
  dashboard: { label: 'TODAY', code: 'OPS / 01', angle: -24 },
  students: { label: 'ROSTER', code: 'REG / 02', angle: -18 },
  attendance: { label: 'MARK', code: 'ATT / 03', angle: -28 },
};

export function KayoBrutalistBrandedHeaderBar({ onBellPress }: { onBellPress?: () => void }) {
  return (
    <div
      style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '12px',
        height: '44px',
      }}
    >
      <KayoBrutalistKaayoLogo width={104} height={38} tone="light" />
      <button
        type="button"
        onClick={onBellPress}
        style={{
          width: '38px',
          height: '38px',
          borderRadius: '4px',
          border: '1px solid rgba(255, 255, 255, 0.62)',
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: onBellPress ? 'pointer' : 'default',
          padding: 0,
        }}
        aria-label="Reminders"
      >
        <Bell size={20} color="#ffffff" strokeWidth={2.1} />
      </button>
    </div>
  );
}

export function KayoBrutalistBrandedScreenBackdrop({
  variant,
  eyebrow,
  title,
  subtitle,
  metricSlot,
  actionSlot,
  children,
  onBellPress,
  safeAreaTop = false,
}: BrandedScreenBackdropProps) {
  const config = PATTERN_CONFIG[variant];

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Red Canopy Section */}
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#970103', // primary red
          minHeight: '328px',
          paddingLeft: '16px',
          paddingRight: '16px',
          paddingTop: safeAreaTop ? '28px' : '0px',
          paddingBottom: '180px', // leave space for overlapping content
          borderBottomLeftRadius: '16px',
          borderBottomRightRadius: '16px',
          fontFamily: "'DM Sans', system-ui, sans-serif",
          boxSizing: 'border-box',
        }}
      >
        {/* Pattern Background Layer */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          {/* Angled Lines */}
          <div
            style={{
              position: 'absolute',
              width: '1px',
              height: '300px',
              backgroundColor: 'rgba(255, 255, 255, 0.32)',
              top: '-16px',
              right: '92px',
              transform: `rotate(${config.angle}deg)`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: '1px',
              height: '300px',
              backgroundColor: 'rgba(255, 255, 255, 0.32)',
              top: '34px',
              right: '12px',
              transform: `rotate(${config.angle + 10}deg)`,
            }}
          />

          {/* Concentric Rings */}
          <div
            style={{
              position: 'absolute',
              right: '-42px',
              top: '80px',
              width: '142px',
              height: '142px',
              border: '1px solid rgba(255, 255, 255, 0.24)',
              borderRadius: '24px',
              transform: 'rotate(45deg)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: '74px',
              top: '184px',
              width: '78px',
              height: '78px',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '16px',
              transform: 'rotate(18deg)',
            }}
          />

          {/* Barcode cluster */}
          <div
            style={{
              position: 'absolute',
              right: '24px',
              bottom: '26px',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-end',
              gap: '4px',
              opacity: 0.38,
            }}
          >
            {[10, 18, 8, 24, 14, 20].map((h, i) => (
              <div
                key={i}
                style={{
                  width: '3px',
                  height: `${h}px`,
                  backgroundColor: 'rgba(255, 255, 255, 0.34)',
                }}
              />
            ))}
          </div>

          {/* Watermark label */}
          <div
            style={{
              position: 'absolute',
              right: '-12px',
              top: '110px',
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: '56px',
              color: 'rgba(255, 255, 255, 0.08)',
              letterSpacing: '2px',
              lineHeight: 1,
            }}
          >
            {config.label}
          </div>

          {/* Pattern Code */}
          <div
            style={{
              position: 'absolute',
              left: '20px',
              bottom: '34px',
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontWeight: 600,
              fontSize: '11px',
              color: 'rgba(255, 255, 255, 0.22)',
              letterSpacing: '1px',
            }}
          >
            {config.code}
          </div>
        </div>

        {/* Integrated Canopy Header with Vector KaayoLogo */}
        <KayoBrutalistBrandedHeaderBar onBellPress={onBellPress} />

        {/* Hero Section inside canopy */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '16px',
            marginTop: '20px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, minWidth: 0 }}>
            {eyebrow && (
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  color: 'rgba(255, 255, 255, 0.85)',
                }}
              >
                {eyebrow}
              </span>
            )}
            <h1
              style={{
                margin: 0,
                fontSize: '28px',
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.25,
                whiteSpace: 'normal',
                wordBreak: 'break-word',
              }}
            >
              {title}
            </h1>
            {subtitle && (
              <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.85)', maxWidth: '320px' }}>
                {subtitle}
              </span>
            )}
          </div>

          {metricSlot && <div style={{ flexShrink: 0 }}>{metricSlot}</div>}
        </div>

        {actionSlot && (
          <div style={{ position: 'relative', zIndex: 2, marginTop: '16px' }}>{actionSlot}</div>
        )}
      </div>

      {/* Children overlapping the canopy */}
      {children && (
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            marginTop: '-164px', // negative margin overlap
            paddingLeft: '16px',
            paddingRight: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
