import React, { useState, ReactNode } from 'react';
import { Plus, X, CreditCard, UserPlus, CalendarPlus, CalendarX } from 'lucide-react';

export interface KayoFabQuickAction {
  key: string;
  label: string;
  description: string;
  icon?: ReactNode;
  onClick?: () => void;
}

export interface KayoBrutalistFabProps {
  /** Single-action: direct click handler */
  onClick?: () => void;
  /** Multi-action: clicking the FAB opens this quick-actions popover menu */
  actions?: KayoFabQuickAction[];
  /** Custom icon when closed. Defaults to <Plus /> */
  icon?: ReactNode;
  /** Positioning style. Default is 'absolute' */
  position?: 'absolute' | 'fixed' | 'relative';
  bottom?: number | string;
  right?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const DEFAULT_KAAYO_DASHBOARD_ACTIONS: KayoFabQuickAction[] = [
  {
    key: 'add-payment',
    label: 'Add payment',
    description: 'Open fee collection',
    icon: <CreditCard size={18} />,
  },
  {
    key: 'add-student',
    label: 'Student',
    description: 'Create a student',
    icon: <UserPlus size={18} />,
  },
  {
    key: 'extra-class',
    label: 'Extra class',
    description: 'Schedule an ad-hoc batch',
    icon: <CalendarPlus size={18} />,
  },
  {
    key: 'cancel-class',
    label: 'Cancel class',
    description: 'Cancel the next upcoming batch',
    icon: <CalendarX size={18} />,
  },
];

export function KayoBrutalistFab({
  onClick,
  actions,
  icon,
  position = 'absolute',
  bottom = 16,
  right = 16,
  className,
  style,
}: KayoBrutalistFabProps) {
  const [open, setOpen] = useState(false);
  const isMultiAction = Boolean(actions && actions.length > 0);

  const handleFabClick = () => {
    if (isMultiAction) {
      setOpen((prev) => !prev);
    } else {
      onClick?.();
    }
  };

  const handleActionClick = (action: KayoFabQuickAction) => {
    setOpen(false);
    action.onClick?.();
  };

  return (
    <>
      {/* Scrim overlay when multi-action menu is open */}
      {isMultiAction && open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(15, 18, 32, 0.2)',
            zIndex: 45,
            cursor: 'pointer',
            transition: 'opacity 0.15s ease',
          }}
        />
      )}

      <div
        className={className}
        style={{
          position,
          bottom,
          right,
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          fontFamily: "'DM Sans', system-ui, sans-serif",
          ...style,
        }}
      >
        {/* Quick Actions Popover Menu */}
        {isMultiAction && open && (
          <div
            style={{
              width: '236px',
              backgroundColor: '#ffffff',
              border: '2px solid #3b3d3f',
              borderRadius: '8px',
              boxShadow: '4px 4px 0px #3b3d3f',
              padding: '8px',
              marginBottom: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              animation: 'kayoFabFadeIn 0.15s ease-out',
            }}
          >
            {actions!.map((action) => (
              <button
                key={action.key}
                type="button"
                onClick={() => handleActionClick(action)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                  transition: 'background-color 0.1s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fff0f0')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '6px',
                    border: '1.5px solid #3b3d3f',
                    backgroundColor: '#f8f9fa',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#3b3d3f',
                    flexShrink: 0,
                  }}
                >
                  {action.icon ?? <Plus size={18} />}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#3b3d3f', lineHeight: 1.2 }}>
                    {action.label}
                  </span>
                  <span style={{ fontSize: '10px', color: '#6b7280', marginTop: '2px', lineHeight: 1.2 }}>
                    {action.description}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Circular Floating Action Button */}
        <button
          type="button"
          onClick={handleFabClick}
          aria-expanded={open}
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '26px',
            backgroundColor: '#970103',
            border: '2px solid #3b3d3f',
            boxShadow: open ? '1px 1px 0px #3b3d3f' : '3px 3px 0px #3b3d3f',
            transform: open ? 'translate(2px, 2px)' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            cursor: 'pointer',
            transition: 'all 0.14s cubic-bezier(0.4, 0, 0.2, 1)',
            outline: 'none',
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translate(2px, 2px)';
            e.currentTarget.style.boxShadow = '1px 1px 0px #3b3d3f';
          }}
          onMouseUp={(e) => {
            if (!open) {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '3px 3px 0px #3b3d3f';
            }
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: open ? 'rotate(90deg)' : 'none',
              transition: 'transform 0.18s ease',
            }}
          >
            {open ? <X size={24} strokeWidth={2.5} /> : (icon ?? <Plus size={24} strokeWidth={2.5} />)}
          </div>
        </button>
      </div>
    </>
  );
}
