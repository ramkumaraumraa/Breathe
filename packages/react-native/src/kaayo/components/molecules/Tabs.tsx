import React from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { kayoSpace, kayoBorder, kayoRadius, kayoShadow } from '../../foundations/tokens';
import { theme } from '../../foundations/theme';
import { typography } from '../../foundations/typography';
import { Badge } from '../atoms/Badge';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Tab {
  key: string;
  label: string;
  badge?: string | number;
  /** Greyed label while not selected - e.g. an inactive branch in BranchTabs. */
  muted?: boolean;
  testID?: string;
}

export interface TabsProps {
  tabs: Tab[];
  activeKey: string;
  onChange: (key: string) => void;
  /** When true (default), wraps tabs in a horizontal ScrollView */
  scrollable?: boolean;
  testID?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Tabs({ tabs, activeKey, onChange, scrollable = true, testID }: TabsProps) {
  const content = (
    <>
      {tabs.map((tab, idx) => {
        const isActive = tab.key === activeKey;
        const isLast = idx === tabs.length - 1;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onChange(tab.key)}
            style={[styles.tab, !isLast && styles.tabDivider, isActive && styles.tabActive]}
            testID={tab.testID ?? `tab-${tab.key}`}
          >
            <View style={styles.tabContent}>
              <Text style={[styles.label, tab.muted && styles.labelMuted, isActive && styles.labelActive]} numberOfLines={1}>
                {tab.label}
              </Text>
              {tab.badge != null && (
                <Badge variant={isActive ? 'neutral' : 'brand'} size="sm" label={String(tab.badge)} />
              )}
            </View>
          </Pressable>
        );
      })}
    </>
  );

  const inner = scrollable ? (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      testID={testID}
      contentContainerStyle={styles.row}
    >
      {content}
    </ScrollView>
  ) : (
    <View style={styles.row} testID={testID}>
      {content}
    </View>
  );

  return <View style={styles.container}>{inner}</View>;
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    borderWidth: kayoBorder.width,
    borderColor: theme.border.strong,
    borderRadius: kayoRadius.sm,
    backgroundColor: theme.surface.sunken,
    overflow: 'hidden',
    ...kayoShadow.sm,
  },
  row: {
    flexDirection: 'row',
  },
  tab: {
    paddingVertical: kayoSpace[2],
    paddingHorizontal: kayoSpace[4],
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabDivider: {
    borderRightWidth: kayoBorder.width,
    borderRightColor: theme.border.strong,
  },
  tabActive: {
    backgroundColor: theme.brand.primary,
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: kayoSpace[1],
  },
  label: {
    ...typography.label_sm,
    color: theme.text.secondary,
  },
  labelMuted: {
    color: theme.text.tertiary,
  },
  labelActive: {
    color: theme.text.onPrimary,
  },
});
