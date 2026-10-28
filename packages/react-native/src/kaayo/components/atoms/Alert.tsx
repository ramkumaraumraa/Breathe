import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { X } from 'lucide-react-native';
import { kayoBorder, kayoRadius, kayoSpace, kayoShadow } from '../../foundations/tokens';
import { notifier, type NotifierCategory } from '../../foundations/notifier';
import { typography } from '../../foundations/typography';

export type AlertVariant = NotifierCategory;

export interface AlertProps {
  variant: AlertVariant;
  title?: string;
  message: string;
  onDismiss?: () => void;
  testID?: string;
}

export function Alert({ variant, title, message, onDismiss, testID }: AlertProps) {
  const { bg, fg, border, Icon } = notifier[variant];
  return (
    <View style={kayoShadow.sm} testID={testID}>
      <View style={[styles.container, { backgroundColor: bg, borderColor: border }]}>
        <View style={[styles.accent, { backgroundColor: border }]} />
        <View style={styles.content}>
          <Icon size={16} color={fg} strokeWidth={2} />
          <View style={styles.textArea}>
            {title ? <Text style={[styles.title, { color: fg }]}>{title}</Text> : null}
            <Text style={[styles.message, { color: fg }]}>{message}</Text>
          </View>
          {onDismiss ? (
            <Pressable onPress={onDismiss} hitSlop={8}>
              <X size={16} color={fg} strokeWidth={2} />
            </Pressable>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: kayoBorder.width,
    borderRadius: kayoRadius.md,
    overflow: 'hidden',
  },
  accent: {
    width: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: kayoSpace[3],
    paddingVertical: kayoSpace[2],
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: kayoSpace[2],
  },
  textArea: {
    flex: 1,
    gap: kayoSpace[1],
  },
  title: {
    ...typography.label_sm,
  },
  message: {
    ...typography.body_sm,
  },
});
