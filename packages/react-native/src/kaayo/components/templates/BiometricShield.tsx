/**
 * Biometric locks (Face ID / fingerprint), one lock card and one prompt lifecycle:
 * - `BiometricShield`: the app-wide lock (app/(main)/_layout.tsx) - logo, Unlock App + Sign Out.
 * - `PaymentsLock`: guards Payments surfaces (overview, collect, fee history, record payment,
 *   Notifications' FEES filter). Leaving Payments or backgrounding the app re-locks it
 *   (app/(main)/_layout.tsx -> resetPaymentsTabUnlock).
 * Both prompt only while the app is in the foreground: a prompt asked for while the app is going to
 * the background is never shown by Android and never answers, which used to leave the card spinning.
 */

import React, { useEffect, useRef, useState } from 'react';
import { AppState, View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from 'expo-router';
import { ShieldAlert, Fingerprint } from 'lucide-react-native';

import {
  getKayoGridSpec,
  kayoSpace,
  kayoRadius,
  kayoBorder,
  kayoBreakpoint,
  kayoShadow,
} from '../../foundations/tokens';
import { theme } from '../../foundations/theme';
import { typography } from '../../foundations/typography';
import { Button } from '../atoms/Button';
import { KaayoLogo } from '../atoms/KaayoLogo';
import { biometricGate } from './biometricGate';
import { useBiometricPrompt } from '../../hooks/useBiometricPrompt';

/**
 * Prompts whenever `active` and the app is in the foreground; drops an open prompt when the app
 * leaves. ('inactive' is not "left": iOS goes inactive while its own Face ID sheet is up.)
 */
function useForegroundUnlock(active: boolean, onUnlock: () => void, promptMessage: string, failureMessage: string) {
  const { authenticate, cancel, authenticating, error } = useBiometricPrompt({ promptMessage, failureMessage });
  // If the app leaves the foreground while our prompt is up, the prompt itself may be what sent it
  // there (Android pauses the activity for the device-PIN screen on API <= 29 and on some OEM
  // sheets, which RN reports as 'background'). Auto-prompting again on that return would loop
  // prompt -> background -> cancel -> return -> prompt, so the return waits for the Unlock button.
  const promptOpen = useRef(false);
  const leftMidPrompt = useRef(false);
  const unlock = async () => {
    promptOpen.current = true;
    const ok = await authenticate();
    promptOpen.current = false;
    if (ok) onUnlock();
  };

  const [foreground, setForeground] = useState(AppState.currentState !== 'background');
  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => setForeground(state !== 'background'));
    return () => sub.remove();
  }, []);
  useEffect(() => {
    if (foreground) return;
    if (promptOpen.current) leftMidPrompt.current = true;
    cancel();
  }, [foreground, cancel]);
  useEffect(() => {
    if (!active || !foreground) return;
    if (leftMidPrompt.current) {
      leftMidPrompt.current = false;
      return;
    }
    void unlock();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- unlock is a fresh closure each render; adding it would re-prompt on every render.
  }, [active, foreground]);

  return { unlock, authenticating, error };
}

export interface BiometricShieldProps {
  onUnlock?: () => void;
  onSignOut?: () => Promise<void> | void;
  title?: string;
  subtitle?: string;
}

export function BiometricShield({
  onUnlock,
  onSignOut,
  title = 'Security Lock',
  subtitle = 'Kaayo handles sensitive operational and billing data. Please authenticate using Face ID or Touch ID to gain access.',
}: BiometricShieldProps = {}) {
  const { width } = useWindowDimensions();
  const isTablet = width >= kayoBreakpoint.tablet;
  const gridSpec = getKayoGridSpec(width);

  const { unlock, authenticating, error } = useForegroundUnlock(
    true,
    () => onUnlock?.(),
    'Unlock Kaayo Academy Management',
    'Authentication failed. Try again or sign out.'
  );

  const handleSignOut = async () => {
    try {
      await onSignOut?.();
    } catch (e) {
      console.error('[BiometricShield] Sign out failed', e);
    }
  };

  return (
    <SafeAreaView style={styles.root} testID="biometric-shield">
      <View style={[styles.container, { paddingHorizontal: gridSpec.margin, paddingVertical: gridSpec.gutter }]}>
        <View style={[styles.content, isTablet && styles.contentTablet]}>
          <View style={styles.brandRow}>
            <KaayoLogo variant="vertical" width={128} />
          </View>
          <LockCard
            title={title}
            subtitle={subtitle}
            error={error}
            testIDPrefix="biometric"
          >
            <View style={styles.actions}>
              <Button
                testID="biometric-unlock-btn"
                label="Unlock App"
                variant="primary"
                size="lg"
                fullWidth
                loading={authenticating}
                onPress={unlock}
              />
              <Button
                testID="biometric-signout-btn"
                label="Sign Out"
                variant="secondary"
                size="md"
                fullWidth
                onPress={handleSignOut}
              />
            </View>
          </LockCard>
        </View>
      </View>
    </SafeAreaView>
  );
}

export interface PaymentsLockProps {
  children: React.ReactNode;
  locked?: boolean;
  onUnlock?: () => void;
}

/** Renders `children` once Payments is unlocked (or biometrics are off); otherwise the lock card. */
export function PaymentsLock({ children, locked = false, onUnlock }: PaymentsLockProps) {
  const focused = useIsFocused();
  const { unlock, authenticating, error } = useForegroundUnlock(
    focused && locked,
    () => onUnlock?.(),
    'Unlock Payments',
    'Authentication failed. Try again to view payments.'
  );

  if (!locked) return <>{children}</>;

  return (
    <SafeAreaView style={styles.gateRoot} testID="payments-biometric-gate">
      <View style={styles.gateCard}>
        <LockCard
          compact
          title="Payments Locked"
          subtitle="Authenticate to view fees, ledgers, reminders, and payment actions."
          error={error}
          testIDPrefix="payments-biometric"
        >
          <Button
            testID="payments-biometric-unlock-btn"
            label="Unlock Payments"
            variant="primary"
            size="lg"
            fullWidth
            loading={authenticating}
            onPress={unlock}
          />
        </LockCard>
      </View>
    </SafeAreaView>
  );
}

/** Fingerprint badge, title, subtitle, error, then the caller's actions. `compact` = the in-screen Payments card. */
function LockCard({ compact = false, title, subtitle, error, testIDPrefix, children }: {
  compact?: boolean;
  title: string;
  subtitle: string;
  error: string | null;
  testIDPrefix: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <View style={compact ? styles.badgeCompact : styles.badge}>
        <Fingerprint size={compact ? 40 : 48} color={theme.brand.primary} strokeWidth={2} />
      </View>
      <Text style={[compact ? typography.heading_h2 : typography.heading_h1, styles.title]}>{title}</Text>
      <Text style={[typography.body_base, styles.subtitle, compact && styles.subtitleCompact]}>{subtitle}</Text>
      {error ? (
        <View style={styles.errorBox} testID={`${testIDPrefix}-error`}>
          <ShieldAlert size={20} color={theme.status.overdue.fg} />
          <Text style={[typography.body_sm, styles.errorText]}>{error}</Text>
        </View>
      ) : null}
      {children}
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.surface.canvas,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
  },
  contentTablet: {
    maxWidth: 480,
  },
  brandRow: {
    alignSelf: 'center',
    marginBottom: kayoSpace[6],
  },
  gateRoot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.surface.canvas,
    padding: kayoSpace[5],
  },
  gateCard: {
    width: '100%',
    maxWidth: 420,
    alignItems: 'center',
    backgroundColor: theme.surface.card,
    borderWidth: kayoBorder.width,
    borderColor: theme.border.strong,
    borderRadius: kayoRadius.md,
    padding: kayoSpace[6],
    ...kayoShadow.md,
  },
  badge: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginVertical: kayoSpace[6],
    borderWidth: kayoBorder.width,
    borderColor: theme.border.strong,
    borderRadius: kayoRadius.sm,
    backgroundColor: theme.surface.sunken,
    justifyContent: 'center',
    alignItems: 'center',
    ...kayoShadow.sm,
  },
  badgeCompact: {
    width: 72,
    height: 72,
    marginBottom: kayoSpace[5],
    borderWidth: kayoBorder.width,
    borderColor: theme.border.strong,
    borderRadius: kayoRadius.sm,
    backgroundColor: theme.surface.sunken,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    color: theme.text.primary,
    marginBottom: kayoSpace[2],
  },
  subtitle: {
    textAlign: 'center',
    color: theme.text.secondary,
    marginBottom: kayoSpace[6],
    paddingHorizontal: kayoSpace[2],
  },
  subtitleCompact: {
    marginBottom: kayoSpace[5],
    paddingHorizontal: 0,
  },
  errorBox: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.status.overdue.bg,
    borderColor: theme.status.overdue.border,
    borderWidth: kayoBorder.width,
    borderRadius: kayoRadius.sm,
    padding: kayoSpace[3],
    gap: kayoSpace[3],
    marginBottom: kayoSpace[4],
  },
  errorText: {
    color: theme.status.overdue.fg,
    flex: 1,
  },
  actions: {
    gap: kayoSpace[3],
  },
});
