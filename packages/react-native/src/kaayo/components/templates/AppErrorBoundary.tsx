/**
 * AppErrorBoundary — catches uncaught render errors so a crash shows a recoverable
 * screen instead of a blank/frozen app. Wraps Sentry.ErrorBoundary (already the app's
 * crash reporter) purely for the fallback UI; Sentry.wrap() alone reports crashes but
 * renders nothing in their place.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Sentry from '@sentry/react-native';

import { Button } from '../atoms/Button';
import { theme } from '../../foundations/theme';
import { kayoSpace } from '../../foundations/tokens';
import { typography } from '../../foundations/typography';

export function AppErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <Sentry.ErrorBoundary
      fallback={({ resetError }) => (
        <View style={styles.root}>
          <Text style={[typography.heading_h1, styles.title]}>Something went wrong</Text>
          <Text style={[typography.body_base, styles.body]}>
            The app hit an unexpected error. You can try again, or close and reopen the app.
          </Text>
          <Button label="Try again" onPress={resetError} />
        </View>
      )}
    >
      {children}
    </Sentry.ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: kayoSpace[6],
    gap: kayoSpace[3],
    backgroundColor: theme.surface.canvas,
  },
  title: { color: theme.text.primary, textAlign: 'center' },
  body: { color: theme.text.secondary, textAlign: 'center' },
});
