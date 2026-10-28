/**
 * AuthShell — layout for unauthenticated screens (Sign-in, Reset Password,
 * Forgot Password). Tablet: centered card with max-width 480px on a canvas.
 * Mobile: full-bleed, padded.
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

import { getKayoGridSpec, kayoSpace, kayoBreakpoint } from '../../foundations/tokens';
import { theme } from '../../foundations/theme';
import { typography } from '../../foundations/typography';
import { KaayoLogo } from '../atoms/KaayoLogo';

export interface AuthShellProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthShell({ children, title, subtitle }: AuthShellProps) {
  const { width } = useWindowDimensions();
  const isTablet = width >= kayoBreakpoint.tablet;
  const gridSpec = getKayoGridSpec(width);

  return (
    <SafeAreaView style={styles.root} testID="auth-shell">
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
        >
          <View style={[styles.content, isTablet && styles.contentTablet]}>
            <View style={styles.brandRow}>
              <KaayoLogo variant="vertical" width={128} />
            </View>

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
  root: {
    flex: 1,
    backgroundColor: theme.surface.canvas,
  },
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
    maxWidth: 480,
  },
  brandRow: {
    marginBottom: kayoSpace[6],
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
  },
});
