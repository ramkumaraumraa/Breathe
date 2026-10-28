/**
 * WarliVeil - the one amount mask in the app (Figma "Payments v2 / Warli veil", 74473:1840).
 *
 * Veiled: "₹" + four Warli diamond-with-dot glyphs (amounts) or three (counts), each standing alone
 * like a hidden digit (glyph from Figma 74509:53190). The glyph count never changes with the value, so the width can't hint at it.
 * Revealed: the formatted value in the same text style. Toggling re-mounts the content with a
 * short rise (220 ms), or a 120 ms cross-fade under reduce motion.
 *
 * It renders a View, so place it where a <Text> would go - never inside another <Text>.
 */

import React from 'react';
import { StyleSheet, Text, View, type StyleProp, type TextStyle } from 'react-native';
import Animated, { FadeIn, FadeInDown, useReducedMotion } from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

import { theme } from '../../foundations/theme';
import { VEIL_MOTIFS, veilRevealText, type WarliVeilKind } from './warli-veil';

export interface WarliVeilProps {
  value: number | string;
  visible: boolean;
  kind?: WarliVeilKind;
  /** Typography + colour of the revealed value; the veil sizes and colours its motifs from it. */
  textStyle?: StyleProp<TextStyle>;
  testID?: string;
}

export function WarliVeil({ value, visible, kind = 'amount', textStyle, testID }: WarliVeilProps) {
  const reduceMotion = useReducedMotion();
  const flat = StyleSheet.flatten(textStyle) ?? {};
  const color = (flat.color as string | undefined) ?? theme.text.primary;
  const glyph = Math.round((flat.fontSize ?? 16) * 0.75);
  const entering = reduceMotion ? FadeIn.duration(120) : FadeInDown.duration(220);

  return (
    <Animated.View
      key={visible ? 'shown' : 'veiled'}
      entering={entering}
      style={styles.row}
      accessibilityLabel={visible ? veilRevealText(value, kind) : kind === 'amount' ? 'Amount hidden' : 'Count hidden'}
      testID={testID}
    >
      {visible ? (
        <Text style={textStyle} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.7}>
          {veilRevealText(value, kind)}
        </Text>
      ) : (
        <View style={[styles.row, { gap: Math.max(3, glyph * 0.3) }]}>
          {kind === 'amount' ? <Text style={textStyle}>₹</Text> : null}
          {Array.from({ length: VEIL_MOTIFS[kind] }, (_, i) => (
            <Svg key={i} width={glyph} height={glyph} viewBox="0 0 20 20">
              <Path d={DIAMOND} fill={color} />
            </Svg>
          ))}
        </View>
      )}
    </Animated.View>
  );
}

/** Rounded diamond outline with a centre dot (Figma 74509:53190, 20×20 viewBox). */
const DIAMOND =
  'M8.5791 0.585693C9.36009 -0.19519 10.6262 -0.195112 11.4072 0.585693L19.4014 8.57983C20.1823 9.36086 20.1823 10.6269 19.4014 11.408L11.4072 19.4021C10.6752 20.134 9.51691 20.18 8.73145 19.5398L8.5791 19.4021L0.584961 11.408C-0.146995 10.6758 -0.192216 9.51764 0.448242 8.73218L0.584961 8.57983L8.5791 0.585693ZM10.7002 1.29272C10.3097 0.902444 9.67659 0.902365 9.28613 1.29272L1.29199 9.28687C0.901742 9.67733 0.901755 10.3105 1.29199 10.7009L9.28613 18.6951C9.6766 19.0854 10.3097 19.0854 10.7002 18.6951L18.6943 10.7009C19.0847 10.3104 19.0847 9.67737 18.6943 9.28687L10.7002 1.29272ZM9.99219 8.91187C10.5899 8.91187 11.0742 9.39619 11.0742 9.9939C11.0742 10.5916 10.5899 11.0759 9.99219 11.0759C9.39461 11.0758 8.9102 10.5915 8.91016 9.9939C8.91016 9.39626 9.39458 8.91198 9.99219 8.91187Z';

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
});
