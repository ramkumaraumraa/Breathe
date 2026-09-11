import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

export interface KayoBrutalistDateNavProps {
  mode?: 'day' | 'month';
  value?: string; // 'yyyy-MM-dd' or 'yyyy-MM'
  currentDateText?: string; // Fallback text if mode/value omitted
  label?: string;
  onChange?: (value: string) => void;
  onPrev?: () => void;
  onNext?: () => void;
  onOpenPicker?: () => void;
  className?: string;
}

const MONTH_ABBR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function KayoBrutalistDateNav({
  mode = 'day',
  value,
  currentDateText,
  label,
  onChange,
  onPrev,
  onNext,
  onOpenPicker,
  className,
}: KayoBrutalistDateNavProps) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [viewYear, setViewYear] = useState(() => {
    if (value && value.length >= 4) {
      return Number(value.slice(0, 4)) || new Date().getFullYear();
    }
    return new Date().getFullYear();
  });

  const displayLabel = label || (mode === 'day' ? 'DAY' : 'MONTH');
  const displayValueText = currentDateText || value || (mode === 'day' ? 'Today' : 'This Month');

  function handleOpen() {
    if (onOpenPicker) {
      onOpenPicker();
    } else {
      setPickerOpen(true);
    }
  }

  function handleMonthSelect(monthIndex: number) {
    if (onChange) {
      const monthStr = String(monthIndex + 1).padStart(2, '0');
      onChange(`${viewYear}-${monthStr}`);
    }
    setPickerOpen(false);
  }

  function handleDayChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (onChange && e.target.value) {
      onChange(e.target.value);
    }
    setPickerOpen(false);
  }

  const btnBase: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '44px',
    height: '44px',
    borderRadius: 'var(--kayo-radius-sm, 4px)',
    border: '2px solid var(--kayo-color-border, #191b1f)',
    backgroundColor: '#ffffff',
    color: '#14161a',
    boxShadow: 'var(--kayo-shadow-sm, 2px 2px 0 #191b1f)',
    cursor: 'pointer',
    userSelect: 'none',
  };

  const selectedYear = value && value.length >= 4 ? Number(value.slice(0, 4)) : new Date().getFullYear();
  const selectedMonthIndex = value && value.length >= 7 ? Number(value.slice(5, 7)) - 1 : new Date().getMonth();
  const now = new Date();

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        borderRadius: 'var(--kayo-radius-md, 8px)',
        border: '2px solid var(--kayo-color-border, #191b1f)',
        backgroundColor: '#ffffff',
        boxShadow: 'var(--kayo-shadow-sm, 2px 2px 0 #191b1f)',
        fontFamily: "'DM Sans', system-ui, sans-serif",
        position: 'relative',
      }}
    >
      <button type="button" onClick={onPrev} style={btnBase} aria-label="Previous">
        <ChevronLeft size={20} strokeWidth={2.25} color="#14161a" />
      </button>

      <button
        type="button"
        onClick={handleOpen}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px 12px',
        }}
      >
        <div
          style={{
            fontSize: '11px',
            fontWeight: 700,
            color: '#747476',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {displayLabel}
        </div>
        <div style={{ fontSize: '18px', fontWeight: 700, color: '#14161a' }}>{displayValueText}</div>
      </button>

      <button type="button" onClick={onNext} style={btnBase} aria-label="Next">
        <ChevronRight size={20} strokeWidth={2.25} color="#14161a" />
      </button>

      {/* Embedded Web Picker Modal */}
      {pickerOpen && !onOpenPicker && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 100,
            backgroundColor: '#ffffff',
            border: '2px solid var(--kayo-color-border, #191b1f)',
            borderRadius: 'var(--kayo-radius-md, 8px)',
            boxShadow: 'var(--kayo-shadow-md, 4px 4px 0 #191b1f)',
            padding: '16px',
            minWidth: '280px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px',
              fontWeight: 700,
              fontSize: '14px',
            }}
          >
            <span>{mode === 'day' ? 'Select Date' : 'Select Month'}</span>
            <button
              type="button"
              onClick={() => setPickerOpen(false)}
              style={{
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                fontWeight: 700,
                color: '#747476',
              }}
            >
              ✕
            </button>
          </div>

          {mode === 'day' ? (
            <input
              type="date"
              value={value || ''}
              onChange={handleDayChange}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '2px solid #191b1f',
                fontSize: '14px',
                fontFamily: 'inherit',
              }}
            />
          ) : (
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '12px',
                }}
              >
                <button
                  type="button"
                  onClick={() => setViewYear((y) => y - 1)}
                  style={{
                    border: '1px solid #191b1f',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    cursor: 'pointer',
                  }}
                >
                  <ChevronLeft size={16} />
                </button>
                <span style={{ fontWeight: 700 }}>{viewYear}</span>
                <button
                  type="button"
                  onClick={() => setViewYear((y) => y + 1)}
                  style={{
                    border: '1px solid #191b1f',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    cursor: 'pointer',
                  }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {MONTH_ABBR.map((abbr, index) => {
                  const isSelected = viewYear === selectedYear && index === selectedMonthIndex;
                  const isCurrent = viewYear === now.getFullYear() && index === now.getMonth();
                  return (
                    <button
                      key={abbr}
                      type="button"
                      onClick={() => handleMonthSelect(index)}
                      style={{
                        padding: '8px 4px',
                        border: '2px solid #191b1f',
                        borderRadius: '4px',
                        backgroundColor: isSelected ? 'var(--kayo-color-primary, #970103)' : '#ffffff',
                        color: isSelected ? '#ffffff' : '#14161a',
                        fontWeight: 600,
                        fontSize: '13px',
                        cursor: 'pointer',
                        position: 'relative',
                      }}
                    >
                      {abbr}
                      {isCurrent && !isSelected && (
                        <div
                          style={{
                            width: '4px',
                            height: '4px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--kayo-color-primary, #970103)',
                            position: 'absolute',
                            bottom: '2px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                          }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
