import React from 'react';
import { Tabs, type Tab } from '../molecules/Tabs';

export interface BranchItem {
  id: string;
  name: string;
  active?: boolean;
}

/** Not a Firestore id shape, so it can't collide with a real branch. */
const ALL_KEY = '__all__';

export interface BranchTabsProps {
  branches?: BranchItem[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  /** Omit the "All" tab — for screens that require one specific branch selected. */
  hideAll?: boolean;
  /** Per-branch counts shown as tab badges (Students, while a class filter is on). */
  counts?: Record<string, number>;
  allCount?: number;
  testID?: string;
}

/** Branch filter drawn as Breathe's Kaayo Tabs (one bordered bar, dividers, active fills Primary),
 * not a row of separate buttons. Scrolls inside the bar when the branches overflow. */
export function BranchTabs({ branches = [], selectedId, onSelect, hideAll = false, counts, allCount, testID }: BranchTabsProps) {
  if (branches.length === 0) return null;

  const tabs: Tab[] = [
    ...(hideAll ? [] : [{ key: ALL_KEY, label: 'All', badge: counts ? allCount : undefined, testID: 'branch-tab-all' }]),
    ...branches.map((branch) => ({
      key: branch.id,
      label: branch.name,
      muted: !branch.active,
      badge: counts ? counts[branch.id] ?? 0 : undefined,
      testID: `branch-tab-${branch.id}`,
    })),
  ];

  return (
    <Tabs
      tabs={tabs}
      activeKey={selectedId ?? ALL_KEY}
      onChange={(key) => onSelect(key === ALL_KEY ? null : key)}
      testID={testID ?? 'branch-tabs'}
    />
  );
}
