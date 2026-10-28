/**
 * What a biometric lock (app-wide shield or Payments lock) shows:
 * - 'pending': the saved biometric setting hasn't been read yet - render nothing behind the lock
 *   and don't prompt yet (treating "not loaded" as "off" flashed the app open at launch).
 * - 'locked': biometrics on and not unlocked - the lock card, prompting.
 * - 'open': biometrics off, or unlocked - the content.
 */
export type BiometricGate = 'pending' | 'locked' | 'open';

export function biometricGate({ loaded, enabled, unlocked }: {
  loaded: boolean;
  enabled: boolean;
  unlocked: boolean;
}): BiometricGate {
  if (!loaded) return 'pending';
  return enabled && !unlocked ? 'locked' : 'open';
}
