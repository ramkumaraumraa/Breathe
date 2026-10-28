/**
 * EmptyState — Neo-Brutalist empty state for lists.
 */

import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { kayoSpace, kayoRadius, kayoBorder } from '../../foundations/tokens';
import { theme } from '../../foundations/theme';
import { typography } from '../../foundations/typography';

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  /** 'compact' = in-list all-clear block: tighter padding / gap, H4 title, small body. */
  size?: 'default' | 'compact';
  testID?: string;
}

/** The icon slot renders the node at its own size - pass the icon already sized. */
export function EmptyState({ icon, title, description, action, size = 'default', testID }: EmptyStateProps) {
  const compact = size === 'compact';
  return (
    <View style={[styles.root, compact && styles.compact]} testID={testID}>
      {icon ? <View style={styles.iconWrap}>{icon}</View> : null}
      <Text style={[compact ? typography.heading_h4 : typography.heading_h3, { color: theme.text.primary, textAlign: 'center' }]}>
        {title}
      </Text>
      {description ? (
        <Text
          style={[
            compact ? typography.body_sm : typography.body_base,
            { color: theme.text.secondary, textAlign: 'center', maxWidth: 420 },
          ]}
        >
          {description}
        </Text>
      ) : null}
      {action ? <View style={styles.actionWrap}>{action}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: kayoSpace[8],
    gap: kayoSpace[3],
    backgroundColor: theme.surface.card,
    borderWidth: kayoBorder.width,
    borderColor: theme.border.strong,
    borderStyle: 'dashed',
    borderRadius: kayoRadius.md,
  },
  compact: { padding: kayoSpace[4], gap: kayoSpace[2] },
  iconWrap: { marginBottom: kayoSpace[1] },
  actionWrap: { marginTop: kayoSpace[3] },
});
