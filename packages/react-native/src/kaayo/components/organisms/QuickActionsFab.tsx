/**
 * The floating "+" quick-actions FAB: tap to open a menu of actions over a light scrim, tap an action
 * (the menu closes, then `onSelect(key)`), the scrim or the "x" to close. Presentational: the app's
 * action set and what each action does live in features/home/components/AppQuickActionsFab.
 */
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  FadeOutDown,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { Plus, X, type LucideIcon } from 'lucide-react-native';

import { theme } from '../../foundations/theme';
import { typography } from '../../foundations/typography';
import { kayoBorder, kayoMotion, kayoRadius, kayoShadow, kayoSpace } from '../../foundations/tokens';

export interface QuickAction<K extends string = string> {
  key: K;
  label: string;
  description: string;
  icon: LucideIcon;
}

export interface QuickActionsFabProps<K extends string> {
  actions: readonly QuickAction<K>[];
  /** Runs after the menu closes. */
  onSelect: (key: K) => void;
  /** Rendered in the FAB layer, e.g. the dialogs an action opens. */
  children?: React.ReactNode;
}

/**
 * The "+" that rotates into an "×" instead of hard-swapping the glyph. Both icons are stacked and
 * cross-faded, so the rotation reads as one continuous motion.
 */
function QuickActionsFabIcon({ open }: { open: boolean }) {
  // useDerivedValue rather than assigning progress.value inline — mutating a shared value during
  // render is a side effect, and re-runs on every parent render rather than only on `open` changes.
  const progress = useDerivedValue(() => withTiming(open ? 1 : 0, { duration: kayoMotion.fast }), [open]);

  const plusStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
    transform: [{ rotate: `${progress.value * 90}deg` }],
  }));
  const closeStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ rotate: `${(progress.value - 1) * 90}deg` }],
  }));

  return (
    <View style={styles.fabIconStack}>
      <Animated.View style={[StyleSheet.absoluteFill, styles.fabIconCenter, plusStyle]}>
        <Plus size={24} color={theme.text.onPrimary} strokeWidth={2.5} />
      </Animated.View>
      <Animated.View style={[StyleSheet.absoluteFill, styles.fabIconCenter, closeStyle]}>
        <X size={24} color={theme.text.onPrimary} strokeWidth={2.5} />
      </Animated.View>
    </View>
  );
}

export function QuickActionsFab<K extends string>({ actions, onSelect, children }: QuickActionsFabProps<K>) {
  const [open, setOpen] = useState(false);

  return (
    <View pointerEvents="box-none" style={styles.layer} testID="dashboard-fab-layer">
      {open ? (
        <Animated.View entering={FadeIn.duration(kayoMotion.base)} exiting={FadeOut.duration(kayoMotion.fast)} style={styles.scrim}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setOpen(false)}
            accessibilityRole="button"
            accessibilityLabel="Close quick actions"
            testID="dashboard-fab-scrim"
          />
        </Animated.View>
      ) : null}
      {open ? (
        <Animated.View
          entering={FadeInDown.duration(kayoMotion.base)}
          exiting={FadeOutDown.duration(kayoMotion.fast)}
          style={styles.menu}
          testID="dashboard-fab-menu"
        >
          {actions.map(({ key, label, description, icon: Icon }) => (
            <Pressable
              key={key}
              onPress={() => {
                setOpen(false);
                onSelect(key);
              }}
              style={styles.actionRow}
              accessibilityRole="button"
              testID={`quick-action-${key}`}
            >
              <View style={styles.actionIconBox}>
                <Icon size={18} color={theme.text.primary} strokeWidth={2.25} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[typography.label_sm, { color: theme.text.primary }]}>{label}</Text>
                <Text style={[typography.body_sm, { color: theme.text.tertiary }]}>{description}</Text>
              </View>
            </Pressable>
          ))}
        </Animated.View>
      ) : null}

      <Pressable
        onPress={() => setOpen((value) => !value)}
        style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
        accessibilityRole="button"
        accessibilityLabel={open ? 'Close quick actions' : 'Quick actions'}
        accessibilityState={{ expanded: open }}
        testID="dashboard-fab-toggle"
      >
        <QuickActionsFabIcon open={open} />
      </Pressable>

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  layer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: kayoSpace[4],
    paddingBottom: kayoSpace[4],
  },
  scrim: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: theme.overlay.scrimLight,
  },
  menu: {
    width: 236,
    gap: kayoSpace[2],
    padding: kayoSpace[3],
    marginBottom: kayoSpace[3],
    borderWidth: kayoBorder.width,
    borderColor: theme.border.strong,
    borderRadius: kayoRadius.md,
    backgroundColor: theme.surface.card,
    ...kayoShadow.md,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: kayoSpace[3],
    padding: kayoSpace[2],
  },
  actionIconBox: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: kayoBorder.widthHairline,
    borderColor: theme.border.default,
    borderRadius: kayoRadius.md,
    backgroundColor: theme.surface.sunken,
  },
  fab: {
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: kayoBorder.width,
    borderColor: theme.border.strong,
    borderRadius: kayoRadius.pill,
    backgroundColor: theme.brand.primary,
    ...kayoShadow.sm,
  },
  fabPressed: {
    transform: [{ translateX: 2 }, { translateY: 2 }],
    ...kayoShadow.none,
  },
  fabIconStack: { width: 24, height: 24 },
  fabIconCenter: { alignItems: 'center', justifyContent: 'center' },
});
