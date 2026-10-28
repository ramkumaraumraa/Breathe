/**
 * ClayKnob (Figma 74710:72): round knob, content centred. Size follows the state - 32 for Open /
 * Complete / Active (Stepper) and Positive / Negative lit (RollItem), 40 for Nav (month sheet ‹ ›),
 * 96 + a 6px Positive/100 ring for Success (Student added) - `size` overrides it. `number` draws the
 * Stepper digit in the state's ink; lit knobs draw their ✓ / ✕ unless `children` replace it; Nav and
 * Success take their glyph as `children`. No pressed state and no motion here: wrap it in a
 * Pressable / Animated.View in the caller.
 */
import React from 'react';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Check, X } from 'lucide-react-native';

import { kayoClay, kayoColors as c, kayoRadius, kayoShadowTinted } from '../../foundations/tokens';
import { typography } from '../../foundations/typography';

export type ClayKnobState = 'open' | 'complete' | 'active' | 'positiveLit' | 'negativeLit' | 'nav' | 'success';

const KNOB: Record<ClayKnobState, { size: number; style: ViewStyle; ink: string }> = {
  open: {
    size: 32,
    ink: c.neutral[700],
    style: { backgroundColor: c.neutral[25], borderWidth: 1.5, borderColor: c.secondary[300], ...kayoClay.raised('sm') },
  },
  complete: {
    size: 32,
    ink: c.positive[700],
    style: { backgroundColor: c.positive[50], borderWidth: 1.5, borderColor: c.positive[300], ...kayoClay.raised('sm', c.positive[200]) },
  },
  active: {
    size: 32,
    ink: c.neutral[25],
    style: { backgroundColor: c.primary[500], borderWidth: 2, borderColor: c.primary[700], ...kayoShadowTinted(c.primary[900]) },
  },
  positiveLit: {
    size: 32,
    ink: c.neutral[25],
    style: { backgroundColor: c.positive[500], borderWidth: 1.5, borderColor: c.positive[700], ...kayoShadowTinted(c.positive[900]) },
  },
  negativeLit: {
    size: 32,
    ink: c.neutral[25],
    style: { backgroundColor: c.negative[500], borderWidth: 1.5, borderColor: c.negative[700], ...kayoShadowTinted(c.negative[900]) },
  },
  nav: {
    size: 40,
    ink: c.neutral[950],
    style: { backgroundColor: c.neutral[25], borderWidth: 1, borderColor: c.secondary[300], ...kayoClay.raised('sm', c.secondary[300]) },
  },
  success: { size: 96, ink: c.neutral[25], style: { backgroundColor: c.positive[500] } },
};

export interface ClayKnobProps {
  state: ClayKnobState;
  /** Knob diameter; defaults to the state's (Success: the inner knob, the ring adds 6 each side). */
  size?: number;
  /** Stepper digit, Label/SM in the state's ink. */
  number?: number | string;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export function ClayKnob({ state, size, number, children, style, testID }: ClayKnobProps) {
  const k = KNOB[state];
  const d = size ?? k.size;
  const content =
    children ??
    (number !== undefined ? (
      <Text maxFontSizeMultiplier={1.3} style={[typography.label_sm, { color: k.ink }]}>{number}</Text>
    ) : state === 'positiveLit' ? (
      <Check size={20} color={k.ink} strokeWidth={3} />
    ) : state === 'negativeLit' ? (
      <X size={18} color={k.ink} strokeWidth={3} />
    ) : null);
  const knob = (
    <View style={[styles.knob, { width: d, height: d }, k.style, state === 'success' ? null : style]} testID={state === 'success' ? undefined : testID}>
      {content}
    </View>
  );
  return state === 'success' ? (
    <View style={[styles.successRing, style]} testID={testID}>
      {knob}
    </View>
  ) : (
    knob
  );
}

const styles = StyleSheet.create({
  knob: { borderRadius: kayoRadius.pill, alignItems: 'center', justifyContent: 'center' },
  successRing: { padding: 6, borderRadius: kayoRadius.pill, backgroundColor: c.positive[100], ...kayoClay.raised('md', c.positive[200]) },
});
