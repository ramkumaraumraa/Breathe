/**
 * SetupShell — layout for the 4-step setup wizard.
 * Wider than AuthShell, custom layout with step progress dots.
 */

import React, { ReactNode } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  getKayoGridSpec,
  kayoSpace,
  kayoRadius,
  kayoBorder,
  kayoBreakpoint,
  kayoColors,
} from '../../foundations/tokens';
import { theme } from '../../foundations/theme';
import { typography } from '../../foundations/typography';
import { KaayoLogo } from '../atoms/KaayoLogo';

export interface SetupShellProps {
  children: ReactNode;
  step: 1 | 2 | 3 | 4;
  title: string;
  subtitle?: string;
  heroImage?: ReactNode;
}

const TOTAL_STEPS = 4;

export function SetupShell({ children, step, title, subtitle, heroImage }: SetupShellProps) {
  const { width } = useWindowDimensions();
  const isTablet = width >= kayoBreakpoint.tablet;
  const gridSpec = getKayoGridSpec(width);

  return (
    <SafeAreaView style={styles.root} testID="setup-shell">
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scroll,
            {
              paddingHorizontal: gridSpec.margin,
              paddingVertical: gridSpec.gutter,
            },
            isTablet && styles.scrollTablet,
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.content, isTablet && styles.contentTablet]}>
            {/* Brand row */}
            <View style={styles.brandRow}>
              <KaayoLogo variant="horizontal" width={140} />
            </View>

            {/* Step dots */}
            <View style={styles.dotsRow} accessibilityLabel={`Step ${step} of ${TOTAL_STEPS}`}>
              {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((s) => (
                <View
                  key={s}
                  style={[
                    styles.dot,
                    s === step && styles.dotActive,
                    s < step && styles.dotDone,
                  ]}
                />
              ))}
              <Text style={[typography.utility_badge_tiny, styles.stepLabel]}>
                {step} / {TOTAL_STEPS}
              </Text>
            </View>

            {heroImage ? <View style={styles.heroWrap}>{heroImage}</View> : null}

            <Text style={[typography.heading_h1, styles.title]}>{title}</Text>
            {subtitle ? (
              <Text style={[typography.body_base, styles.subtitle]}>{subtitle}</Text>
            ) : null}

            <View style={styles.body}>{children}</View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.surface.canvas },
  flex: { flex: 1 },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  scrollTablet: {
    alignItems: 'center',
  },
  content: {
    width: '100%',
  },
  contentTablet: {
    maxWidth: 560,
  },
  brandRow: {
    marginBottom: kayoSpace[5],
  },
  heroWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 140,
    overflow: 'hidden',
    marginBottom: kayoSpace[5],
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: kayoSpace[2],
    marginBottom: kayoSpace[5],
  },
  dot: {
    width: 28,
    height: 6,
    borderWidth: kayoBorder.width,
    borderColor: theme.border.strong,
    borderRadius: kayoRadius.sm,
    backgroundColor: theme.surface.sunken,
  },
  dotActive: {
    backgroundColor: theme.brand.primary,
    borderColor: theme.border.strong,
  },
  dotDone: {
    backgroundColor: kayoColors.positive[500],
    borderColor: kayoColors.positive[700],
  },
  stepLabel: {
    color: theme.text.secondary,
    marginLeft: kayoSpace[1],
  },
  title: {
    color: theme.text.primary,
    marginBottom: kayoSpace[2],
  },
  subtitle: {
    color: theme.text.secondary,
    marginBottom: kayoSpace[6],
  },
  body: {
    gap: kayoSpace[4],
    marginTop: kayoSpace[2],
  },
});
