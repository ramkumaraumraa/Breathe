/**
 * Stepper - Figma "Form components -> Stepper / Step". ClayKnobs on a ClayGrooveTrack; a primary
 * bar runs to the active knob and a positive bar over it covers the leading run of complete steps.
 * Columns are equal width, so knob centre i = (i + 0.5) / n of the row (percent positions, no measuring).
 */
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { kayoColors } from '../../foundations/tokens';
import { typography } from '../../foundations/typography';
import { ClayGrooveTrack } from '../atoms/ClayGroove';
import { ClayKnob } from '../atoms/ClayKnob';
import { type StepState, stepperProgress } from './stepper-progress';

export interface StepperProps {
  steps: { key: string; label: string }[];
  activeKey: string;
  completeKeys: string[];
  onStepPress?: (key: string) => void;
  testID?: string;
}

const KNOB = 32;
const GAP = 10;
const SPOKEN: Record<StepState, string> = { complete: 'completed', active: 'current', open: 'not started' };
const LABEL: Record<StepState, string> = {
  complete: kayoColors.positive[700],
  active: kayoColors.primary[600],
  open: kayoColors.neutral[700],
};

export function Stepper({ steps, activeKey, completeKeys, onStepPress, testID }: StepperProps) {
  const { states, activeIndex, completeRunEnd } = stepperProgress(steps, activeKey, completeKeys);
  const n = steps.length;
  const pct = (x: number) => `${(x * 100) / n}%` as const;

  return (
    <View style={styles.row} testID={testID}>
      {n > 1 ? (
        <ClayGrooveTrack
          style={[styles.groove, { left: pct(0.5), width: pct(n - 1) }]}
          bars={[
            { tone: 'primary', progress: activeIndex / (n - 1) },
            { tone: 'positive', progress: Math.max(0, completeRunEnd) / (n - 1) },
          ]}
        />
      ) : null}
      {steps.map((step, i) => {
        const state = states[i];
        return (
          <Pressable
            key={step.key}
            style={({ pressed }) => [styles.col, pressed && onStepPress ? styles.pressed : null]}
            onPress={onStepPress ? () => onStepPress(step.key) : undefined}
            accessible
            accessibilityRole={onStepPress ? 'button' : undefined}
            accessibilityLabel={`Step ${i + 1} of ${n}, ${step.label}, ${SPOKEN[state]}`}
            testID={testID ? `${testID}-${step.key}` : undefined}
          >
            <ClayKnob state={state} size={KNOB} number={i + 1} />
            <Text style={[state === 'open' ? typography.body_sm : typography.label_sm, styles.label, { color: LABEL[state] }]}>
              {step.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  col: { flex: 1, alignItems: 'center' },
  pressed: { opacity: 0.7 },
  label: { marginTop: GAP, textAlign: 'center' },
  groove: { position: 'absolute', top: KNOB / 2 - 4 },
});
