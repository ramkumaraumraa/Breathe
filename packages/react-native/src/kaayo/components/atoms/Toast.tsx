/**
 * Toast — minimal global toast bus.
 * Usage: `useToast().show({ message, tone })` from anywhere; mount <ToastHost />
 * once near the root. `show` returns an id for `hideToast(id)`. A toast with an `action`
 * (e.g. Undo) takes touches and sits at the top, under the header bar.
 */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { kayoSpace, kayoRadius, kayoBorder, kayoShadow } from '../../foundations/tokens';
import { notifier, type NotifierCategory } from '../../foundations/notifier';
import { typography } from '../../foundations/typography';

export type ToastTone = NotifierCategory;

export interface ToastAction {
  label: string;
  onPress: () => void;
}

interface Toast {
  id: number;
  message: string;
  tone: ToastTone;
  durationMs: number;
  action?: ToastAction;
}

let listeners: ((t: Toast) => void)[] = [];
let hideListeners: ((id: number) => void)[] = [];
let nextId = 1;

/** Action toasts (Undo) sit at the top, just under the branded header bar (insets + 12 + 38 row).
 * At the bottom they covered the + FAB and the next row's Mark paid, so the tap meant for those
 * landed on Undo and silently dropped the payment (pilot, 1.7.6). */
const BELOW_HEADER_BAR = 12 + 38 + 8;

export function hideToast(id: number) {
  hideListeners.forEach((cb) => cb(id));
}

export function useToast() {
  return {
    show: (input: { message: string; tone?: ToastTone; durationMs?: number; action?: ToastAction }): number => {
      const t: Toast = {
        id: nextId++,
        message: input.message,
        tone: input.tone ?? 'supportive',
        durationMs: input.durationMs ?? 3200,
        action: input.action,
      };
      listeners.forEach((cb) => cb(t));
      return t.id;
    },
  };
}

export function ToastHost() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const remove = (id: number) => setToasts((cur) => cur.filter((x) => x.id !== id));
    const cb = (t: Toast) => {
      setToasts((cur) => [...cur, t]);
      setTimeout(() => remove(t.id), t.durationMs);
    };
    listeners.push(cb);
    hideListeners.push(remove);
    return () => {
      listeners = listeners.filter((l) => l !== cb);
      hideListeners = hideListeners.filter((l) => l !== remove);
    };
  }, []);

  const render = (t: Toast) => <ToastView key={t.id} toast={t} onAction={() => hideToast(t.id)} />;
  return (
    <>
      <View style={[styles.host, styles.top, { top: insets.top + BELOW_HEADER_BAR }]} pointerEvents="box-none">
        {toasts.filter((t) => t.action).map(render)}
      </View>
      <View style={styles.host} pointerEvents="box-none">
        {toasts.filter((t) => !t.action).map(render)}
      </View>
    </>
  );
}

function ToastView({ toast, onAction }: { toast: Toast; onAction: () => void }) {
  const palette = notifier[toast.tone];
  const Icon = palette.Icon;
  return (
    <View
      style={[
        styles.toast,
        { backgroundColor: palette.bg, borderColor: palette.border },
      ]}
      pointerEvents={toast.action ? 'box-none' : 'none'}
      testID={`toast-${toast.tone}`}
    >
      <Icon size={20} color={palette.fg} strokeWidth={2.25} />
      <Text style={[typography.label_lg, { color: palette.fg, flex: 1 }]} numberOfLines={3}>
        {toast.message}
      </Text>
      {toast.action ? (
        <Pressable
          onPress={() => {
            toast.action?.onPress();
            onAction();
          }}
          style={[styles.action, { borderColor: palette.fg }]}
          accessibilityRole="button"
          accessibilityLabel={toast.action.label}
          hitSlop={4}
          testID="toast-action"
        >
          <Text style={[typography.label_lg, { color: palette.fg }]}>{toast.action.label}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  host: {
    position: 'absolute',
    bottom: kayoSpace[6],
    left: 0,
    right: 0,
    alignItems: 'center',
    gap: kayoSpace[2],
    zIndex: 9999,
  },
  top: { bottom: undefined },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: kayoSpace[3],
    maxWidth: 440,
    marginHorizontal: kayoSpace[4],
    paddingHorizontal: kayoSpace[4],
    paddingVertical: kayoSpace[3],
    borderWidth: kayoBorder.width,
    borderRadius: kayoRadius.md,
    ...kayoShadow.md,
  },
  action: {
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: kayoSpace[3],
    borderWidth: 1.5,
    borderRadius: kayoRadius.pill,
  },
});
