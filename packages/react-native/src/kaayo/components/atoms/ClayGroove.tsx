/**
 * ClayGroove - the inset soft-clay track (Secondary/50, Kaayo/Clay/Inset SM, pill), in its three Figma
 * kinds: Track 74718:77 (Stepper connector, Student added countdown), Split 74718:78 (roll-call
 * present / absent / unmarked) and Toggle 74718:79 (RollItem ✓ / ✕).
 */
import React from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { Check, X } from 'lucide-react-native';

import { kayoClay, kayoColors as c, kayoRadius } from '../../foundations/tokens';
import { ClayKnob } from './ClayKnob';

const BAR_TONE = { primary: c.primary[500], positive: c.positive[500] } as const;

export interface ClayGrooveBar {
  tone: keyof typeof BAR_TONE;
  /** 0-1 of the groove width from the left edge (default 1 = full). */
  progress?: number;
  /** Extra / animated style, e.g. the countdown's scaleX (pair it with `transformOrigin: 'left'`). */
  style?: React.ComponentProps<typeof Animated.View>['style'];
}

/** 8-high groove; 4-high bars from the left edge, drawn in order (later bars sit on top). */
export function ClayGrooveTrack({ bars = [], style, testID }: { bars?: ClayGrooveBar[]; style?: StyleProp<ViewStyle>; testID?: string }) {
  return (
    <View style={[styles.groove, styles.track, style]} testID={testID}>
      {bars.map((b, i) => (
        <Animated.View
          key={i}
          style={[styles.trackBar, { width: `${Math.min(1, Math.max(0, b.progress ?? 1)) * 100}%`, backgroundColor: BAR_TONE[b.tone] }, b.style]}
        />
      ))}
    </View>
  );
}

/** Present (green) then absent (red), the rest unmarked; `thin` = the collapsed marking top bar. */
export function ClayGrooveSplit({
  present,
  absent,
  unmarked,
  thin = false,
  style,
  testID,
}: {
  present: number;
  absent: number;
  unmarked: number;
  thin?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}) {
  const h = thin ? 4 : 8;
  return (
    <View style={[styles.groove, styles.split, { padding: thin ? 2 : 3 }, style]} testID={testID}>
      {present > 0 ? <View style={[styles.splitBar, { flex: present, height: h, backgroundColor: c.positive[500] }]} /> : null}
      {absent > 0 ? <View style={[styles.splitBar, { flex: absent, height: h, backgroundColor: c.negative[500] }]} /> : null}
      {unmarked > 0 ? <View style={{ flex: unmarked, height: h }} /> : null}
    </View>
  );
}

type Mark = 'present' | 'absent';

/**
 * Two 40x32 slots: unlit = bare icon (Positive/600 ✓, Negative/600 ✕), lit = ClayKnob Positive / Negative
 * lit. Locked (future date) = Neutral/75 groove, Neutral/400 icons, not tappable. Slot testIDs are
 * `present-${testIDSuffix}` / `absent-${testIDSuffix}`; accessibility labels `${name} present|absent`.
 */
export function ClayGrooveToggle({
  mark,
  onToggle,
  name,
  locked = false,
  disabled = false,
  testIDSuffix,
}: {
  mark: Mark | undefined;
  onToggle: (mark: Mark) => void;
  name: string;
  locked?: boolean;
  disabled?: boolean;
  testIDSuffix?: string;
}) {
  return (
    <View style={[styles.groove, styles.toggle, locked && styles.locked]}>
      {(['present', 'absent'] as const).map((m) => {
        const lit = mark === m;
        const Icon = m === 'present' ? Check : X;
        const iconColor = locked ? c.neutral[400] : m === 'present' ? c.positive[600] : c.negative[600];
        return (
          <Pressable
            key={m}
            onPress={() => onToggle(m)}
            disabled={locked || disabled}
            hitSlop={{ top: 8, bottom: 8 }}
            style={styles.slot}
            accessibilityRole="radio"
            accessibilityState={{ checked: lit, disabled: locked || disabled }}
            accessibilityLabel={`${name} ${m}`}
            testID={testIDSuffix ? `${m}-${testIDSuffix}` : undefined}
          >
            {lit ? (
              <ClayKnob state={m === 'present' ? 'positiveLit' : 'negativeLit'} />
            ) : (
              <Icon size={18} color={iconColor} strokeWidth={m === 'present' ? 2 : 2.5} />
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  groove: { borderRadius: kayoRadius.pill, backgroundColor: c.secondary[50], ...kayoClay.inset('sm') },
  track: { height: 8, justifyContent: 'center', overflow: 'hidden' },
  trackBar: { position: 'absolute', left: 0, top: 2, height: 4, borderRadius: kayoRadius.pill },
  split: { flexDirection: 'row', alignSelf: 'stretch', overflow: 'hidden' },
  splitBar: { borderRadius: kayoRadius.pill },
  toggle: { flexDirection: 'row', alignItems: 'center', gap: 4, padding: 4 },
  locked: { backgroundColor: c.neutral[75] },
  slot: { width: 40, height: 32, alignItems: 'center', justifyContent: 'center' },
});
