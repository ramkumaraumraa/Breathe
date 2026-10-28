/**
 * Amount veil button (Figma "Veil button", 74516:67) on a 36px square.
 * Hidden (default) = RAISED with a closed eye; shown = INSET with an open eye. Pressing turns
 * raised into inset and scales to 0.98. Same clay chip on the red header and on cards.
 */

import React from 'react';
import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';

import { kayoClay, kayoColors } from '../../foundations/tokens';

// Raised = a hard 2/2 neobrutal drop (Figma "Veil button", 74516:67) with the skeuomorphic lit edge:
// on red, a Primary/900 drop plus inner highlights; on cream, a Secondary/200 drop plus a 1px
// Primary/25 rim top-left. Shown/pressed sinks to the soft inset.
// One-off (kept local): the hard drop + lit rim pair has no token; it is kayoShadowTinted plus a 1px rim.
const RAISED = {
  cream: `2px 2px 0px ${kayoColors.secondary[200]}, -1px -1px 0px 1px ${kayoColors.primary[25]}`,
  red: `2px 2px 0px ${kayoColors.primary[900]}, inset -1px -1px 2px ${kayoColors.secondary[200]}, inset 1px 1px 2px ${kayoColors.neutral[25]}`,
};
const INSET = kayoClay.inset('sm').boxShadow;

interface AmountVisibilityToggleProps {
  visible: boolean;
  onToggle: () => void;
  /** The surface the button sits on - only changes the raised shadow. */
  surface?: keyof typeof RAISED;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export function AmountVisibilityToggle({ visible, onToggle, surface = 'cream', style, testID = 'amount-visibility-toggle' }: AmountVisibilityToggleProps) {
  return (
    <Pressable
      onPress={onToggle}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityState={{ selected: visible }}
      accessibilityLabel={visible ? 'Hide amounts' : 'Show amounts'}
      testID={testID}
      style={({ pressed }) => [styles.button, { boxShadow: visible || pressed ? INSET : RAISED[surface] }, pressed && styles.pressed, style]}
    >
      {visible ? (
        <Eye size={18} color={kayoColors.positive[700]} strokeWidth={2.25} />
      ) : (
        <EyeOff size={18} color={kayoColors.primary[700]} strokeWidth={2.25} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: kayoColors.secondary[25] },
  pressed: { transform: [{ scale: 0.98 }] },
});
