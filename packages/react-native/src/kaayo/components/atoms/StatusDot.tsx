/**
 * StatusDot (Figma 74705:28): one dot for every status. Size 8 in chips and legends, 6 on WeekStrip
 * days, 5 on MonthCalendarSheet days; Inverse on a selected (Primary/500) day. A dot always sits next
 * to a label or count. Drawn with SVG: Android draws 5-8dp rounded Views as squares.
 * `breathing` = the Payments opacity loop (1 <-> 0.5 every 2.4 s, static under reduce motion).
 */
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useReducedMotion, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';

import { statusDotPaint, type DotStatus } from './status-tones';

export type { DotStatus } from './status-tones';

export interface StatusDotProps {
  status: DotStatus;
  size?: 8 | 6 | 5;
  /** White dot / ring on a selected red day cell. */
  inverse?: boolean;
  breathing?: boolean;
  testID?: string;
}

// Memo: one per row in long lists (Students fee dots); all props are primitives.
export const StatusDot = React.memo(function StatusDot({ status, size = 8, inverse = false, breathing = false, testID }: StatusDotProps) {
  const { fill, ring, glow } = statusDotPaint(status, inverse);
  const r = size / 2;
  // Live: the halo spreads one dot-radius past the edge (Figma's 4px blur on an 8px dot), so the
  // SVG is twice the dot and hangs outside the size x size box without moving the layout.
  const canvas = glow ? size * 2 : size;
  const c = canvas / 2;
  const dot = (
    <View style={{ width: size, height: size, overflow: 'visible' }} testID={testID}>
      <Svg width={canvas} height={canvas} style={glow ? { position: 'absolute', left: -r, top: -r } : undefined}>
        {glow ? (
          <>
            <Defs>
              <RadialGradient id="status-dot-glow" cx="50%" cy="50%" r="50%">
                <Stop offset="0.5" stopColor={glow} stopOpacity={1} />
                <Stop offset="1" stopColor={glow} stopOpacity={0} />
              </RadialGradient>
            </Defs>
            <Circle cx={c} cy={c} r={c} fill="url(#status-dot-glow)" />
          </>
        ) : null}
        {fill ? <Circle cx={c} cy={c} r={r} fill={fill} /> : null}
        {ring ? <Circle cx={c} cy={c} r={r - 0.5} stroke={ring} strokeWidth={1} fill="none" /> : null}
      </Svg>
    </View>
  );
  return breathing ? <Breathing>{dot}</Breathing> : dot;
});

/** The screen's one loop - keep it to one breathing dot per screen (design-direction Motion). */
function Breathing({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();
  const opacity = useSharedValue(1);
  useEffect(() => {
    // Assigning 1 also stops a loop that started before reduce motion was switched on.
    opacity.value = reduceMotion ? 1 : withRepeat(withTiming(0.5, { duration: 1200 }), -1, true);
  }, [reduceMotion, opacity]);
  const style = useAnimatedStyle(() => ({ opacity: opacity.value }));
  return <Animated.View style={[styles.wrap, style]}>{children}</Animated.View>;
}

const styles = StyleSheet.create({ wrap: { overflow: 'visible' } });
