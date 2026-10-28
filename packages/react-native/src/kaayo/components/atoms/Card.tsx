/**
 * Card — Neo-Brutalist surface primitive.
 * 2px solid border, hard offset shadow, no radius > md (outlinedClay variant: r24 exception).
 *
 * Subcomponents: CardHeader, CardBody, CardFooter for structured layouts.
 * Pass padding="none" to Card when using subcomponents.
 */

import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

import { kayoSpace, kayoRadius, kayoBorder, kayoShadow, kayoColors, kayoClay } from '../../foundations/tokens';
import { theme } from '../../foundations/theme';

export interface CardProps {
  children: ReactNode;
  /** 'outlinedClay': soft clay, 2px dark outline, 16 padding unless `padding` is passed; `elevation` ignored. */
  variant?: 'default' | 'outlinedClay';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  elevation?: 'none' | 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  testID?: string;
}

export function Card({
  children,
  variant = 'default',
  padding,
  elevation = 'sm',
  style,
  testID,
}: CardProps) {
  if (variant === 'outlinedClay') {
    return (
      <View testID={testID} style={[styles.clay, padding && paddingStyles[padding], style]}>
        {children}
      </View>
    );
  }
  return (
    <View
      testID={testID}
      style={[styles.base, paddingStyles[padding ?? 'md'], kayoShadow[elevation], style]}
    >
      {children}
    </View>
  );
}

export interface CardHeaderProps {
  children: ReactNode;
  style?: ViewStyle;
  testID?: string;
}

export function CardHeader({ children, style, testID }: CardHeaderProps) {
  return (
    <View style={[sectionStyles.header, style]} testID={testID}>
      {children}
    </View>
  );
}

export interface CardBodyProps {
  children: ReactNode;
  style?: ViewStyle;
  testID?: string;
}

export function CardBody({ children, style, testID }: CardBodyProps) {
  return (
    <View style={[sectionStyles.body, style]} testID={testID}>
      {children}
    </View>
  );
}

export interface CardFooterProps {
  children: ReactNode;
  style?: ViewStyle;
  testID?: string;
}

export function CardFooter({ children, style, testID }: CardFooterProps) {
  return (
    <View style={[sectionStyles.footer, style]} testID={testID}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: theme.surface.card,
    borderWidth: kayoBorder.width,
    borderColor: theme.border.strong,
    borderRadius: kayoRadius.md,
  },
  clay: {
    backgroundColor: kayoColors.neutral[25],
    borderWidth: kayoBorder.width,
    borderColor: kayoColors.secondary[975],
    borderRadius: 24,
    padding: kayoSpace[4],
    ...kayoClay.outlined,
  },
});

const paddingStyles = StyleSheet.create({
  none: { padding: 0 },
  sm:   { padding: kayoSpace[3] },
  md:   { padding: kayoSpace[5] },
  lg:   { padding: kayoSpace[6] },
});

const sectionStyles = StyleSheet.create({
  header: {
    paddingHorizontal: kayoSpace[5],
    paddingVertical:   kayoSpace[4],
    borderBottomWidth: kayoBorder.widthHairline,
    borderBottomColor: theme.border.subtle,
  },
  body: {
    padding: kayoSpace[5],
  },
  footer: {
    paddingHorizontal: kayoSpace[5],
    paddingVertical:   kayoSpace[4],
    borderTopWidth:    kayoBorder.widthHairline,
    borderTopColor:    theme.border.subtle,
    flexDirection:     'row',
    justifyContent:    'flex-end',
    gap:               kayoSpace[3],
  },
});
