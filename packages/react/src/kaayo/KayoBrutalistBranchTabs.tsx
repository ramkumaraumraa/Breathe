import React from 'react';

export interface BranchItem {
  id: string;
  name: string;
  active?: boolean;
}

export interface KayoBrutalistBranchTabsProps {
  branches: BranchItem[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  hideAll?: boolean;
  className?: string;
}

export function KayoBrutalistBranchTabs({
  branches = [],
  selectedId,
  onSelect,
  hideAll = false,
  className,
}: KayoBrutalistBranchTabsProps) {
  if (!branches || branches.length === 0) return null;

  const tabBaseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '8px 16px',
    borderRadius: 'var(--kayo-radius-sm, 4px)',
    border: '2px solid var(--kayo-color-border, #191b1f)',
    backgroundColor: '#ffffff',
    color: '#14161a',
    fontSize: '14px',
    fontWeight: 600,
    minHeight: '40px',
    maxWidth: '220px',
    boxShadow: 'var(--kayo-shadow-sm, 2px 2px 0 #191b1f)',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'all 0.14s ease',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const selectedTabStyle: React.CSSProperties = {
    ...tabBaseStyle,
    backgroundColor: 'var(--kayo-color-primary, #970103)',
    color: '#ffffff',
  };

  const inactiveTabStyle: React.CSSProperties = {
    ...tabBaseStyle,
    borderColor: 'var(--kayo-color-border-subtle, #d6d6d7)',
    backgroundColor: 'var(--kayo-surface-sunken, #f1f1f2)',
    color: '#747476',
  };

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '4px',
        paddingRight: '4px',
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      {!hideAll && (
        <button
          type="button"
          onClick={() => onSelect(null)}
          style={selectedId === null ? selectedTabStyle : tabBaseStyle}
        >
          All
        </button>
      )}

      {branches.map((branch) => {
        const isSelected = selectedId === branch.id;
        const isInactive = branch.active === false;

        let currentStyle = tabBaseStyle;
        if (isSelected) {
          currentStyle = selectedTabStyle;
        } else if (isInactive) {
          currentStyle = inactiveTabStyle;
        }

        return (
          <button
            key={branch.id}
            type="button"
            onClick={() => onSelect(branch.id)}
            style={currentStyle}
          >
            {branch.name}
          </button>
        );
      })}
    </div>
  );
}
