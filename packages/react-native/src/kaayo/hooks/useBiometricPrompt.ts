import { useCallback, useRef, useState } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';

interface UseBiometricPromptOptions {
  promptMessage: string;
  fallbackLabel?: string;
  failureMessage?: string;
}

export function useBiometricPrompt({
  promptMessage,
  fallbackLabel = 'Enter passcode',
  failureMessage = 'Authentication failed. Try again.',
}: UseBiometricPromptOptions) {
  const [error, setError] = useState<string | null>(null);
  const [authenticating, setAuthenticating] = useState(false);
  // Each prompt gets an id; `cancel` bumps it, so a prompt Android never answers (asked for while
  // the app was going to the background) can't leave `authenticating` stuck on.
  const attempt = useRef(0);

  const authenticate = useCallback(async (): Promise<boolean> => {
    const id = ++attempt.current;
    setError(null);
    setAuthenticating(true);

    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage,
        fallbackLabel,
        disableDeviceFallback: false,
      });
      if (id !== attempt.current) return false;

      if (result.success) {
        return true;
      }

      if (result.error !== 'user_cancel' && result.error !== 'app_cancel' && result.error !== 'system_cancel') {
        setError(failureMessage);
      }
      return false;
    } catch (e) {
      if (id !== attempt.current) return false;
      setError('An error occurred during authentication.');
      console.warn('[useBiometricPrompt] Auth error', e);
      return false;
    } finally {
      if (id === attempt.current) setAuthenticating(false);
    }
  }, [failureMessage, fallbackLabel, promptMessage]);

  /** Drop the open prompt (if any) and free the button - e.g. when the app leaves the foreground. */
  const cancel = useCallback(() => {
    attempt.current += 1;
    setAuthenticating(false);
    LocalAuthentication.cancelAuthenticate().catch(() => {});
  }, []);

  return { authenticate, cancel, authenticating, error, setError };
}
