/**
 * One tab's Warli band in the red canopy (Figma `Header / Canopy pattern`, Secondary/500): Home
 * zigzags, Students waves, Attendance triangles, Payments sprouts - drawn in code from tile specs.
 * Plays once when the tab first opens, then rests (static under reduce motion): the zigzag and wave
 * lines draw on left to right, triangles rise and sprouts grow from the ground one after another.
 */

import React, { useEffect, type ReactNode } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { kayoColors } from '../../foundations/tokens';
import { CANOPY_TILES, getCanopyTiles, type BackdropPatternVariant } from './BrandedScreenBackdrop.contract';

const INK = kayoColors.secondary[500];
const EASE = Easing.bezier(0.32, 0.72, 0, 1);
const DRAW_MS = 900;
const TILE_MS = 480;
const STAGGER_MS = 45;

/** Each motif in its own tile coordinates (period, height and spill are in CANOPY_TILES). */
const ART: Record<BackdropPatternVariant, ReactNode> = {
  // A tent with a dot inside and a dot in the cup before it; the line runs half a tent into each neighbour.
  dashboard: (
    <>
      <Path d="M-12.68 12L0 22.5L25.36 1.5L50.71 22.5L63.39 12" stroke={INK} strokeWidth={2.2} fill="none" />
      <Circle cx={25.36} cy={17.3} r={3.17} fill={INK} />
      <Circle cx={0} cy={7} r={3.17} fill={INK} />
    </>
  ),
  // A crest and a trough with a dot tucked into each; the curve runs a half-wave into each neighbour.
  students: (
    <>
      <Path
        d="M-130.91 68.73C-83.79 68.73 -47.12 3.27 0 3.27S83.79 68.73 130.91 68.73S214.7 3.27 261.82 3.27S345.61 68.73 392.73 68.73"
        stroke={INK}
        strokeWidth={6.55}
        fill="none"
      />
      <Circle cx={0} cy={45.82} r={9.82} fill={INK} />
      <Circle cx={130.91} cy={26.18} r={9.82} fill={INK} />
    </>
  ),
  attendance: (
    <>
      <Path fillRule="evenodd" d="M30 24H0L15 0L30 24ZM4.3 21.6H25.7L15 4.48L4.3 21.6Z" fill={INK} />
      <Circle cx={15} cy={15} r={1.5} fill={INK} />
    </>
  ),
  // Bud, two leaves, stem and a hollow mound.
  payments: (
    <>
      <Path d="M9 0.5C10.4 2 11 3.4 11 4.6C11 5.8 10.1 6.8 9 6.8C7.9 6.8 7 5.8 7 4.6C7 3.4 7.6 2 9 0.5Z" fill={INK} />
      <Path d="M2.4 7.4C5.9 7.6 8.4 10 8.6 13.4C5.1 13.2 2.6 10.9 2.4 7.4Z" fill={INK} />
      <Path d="M15.6 7.4C12.1 7.6 9.6 10 9.4 13.4C12.9 13.2 15.4 10.9 15.6 7.4Z" fill={INK} />
      <Path d="M9 6.8V15.6" stroke={INK} strokeWidth={1.4} strokeLinecap="round" />
      <Path d="M9 15.6L16.8 23.2H1.2L9 15.6Z" stroke={INK} strokeWidth={1.4} strokeLinejoin="round" fill="none" />
    </>
  ),
};

/** Sprouts grow from the foot of their stem (x 9 of the 34-wide tile), not the tile's centre. */
const SPROUT_ORIGIN = `${(9 / 34) * 100}% 100%`;

export function CanopyBand({ variant, width, height }: { variant: BackdropPatternVariant; width: number; height: number }) {
  const reduceMotion = useReducedMotion();
  const { period, h, padX } = CANOPY_TILES[variant];
  const continuous = padX > 0;
  const viewBox = `${-padX} 0 ${period + padX * 2} ${h}`;

  const tiles = getCanopyTiles(variant, width, height).map((t, i) => {
    const art = (
      <Svg width={t.width} height={height} viewBox={viewBox}>
        {ART[variant]}
      </Svg>
    );
    const box = { left: t.left, width: t.width, height };
    return continuous || reduceMotion ? (
      <View key={i} style={[styles.tile, box]}>{art}</View>
    ) : (
      <RisingTile key={i} index={i} grow={variant === 'payments'} style={box}>{art}</RisingTile>
    );
  });

  return (
    <View pointerEvents="none" style={{ width, height }}>
      {continuous ? <DrawOn width={width} still={reduceMotion}>{tiles}</DrawOn> : tiles}
    </View>
  );
}

/** Transform-only wipe: the clip slides in from the left while the art slides back by the same amount. */
function DrawOn({ width, still, children }: { width: number; still: boolean; children: ReactNode }) {
  const p = useSharedValue(still ? 1 : 0);
  useEffect(() => {
    if (!still) p.value = withTiming(1, { duration: DRAW_MS, easing: EASE });
  }, [p, still]);

  const clip = useAnimatedStyle(() => ({ transform: [{ translateX: -width * (1 - p.value) }] }));
  const art = useAnimatedStyle(() => ({ transform: [{ translateX: width * (1 - p.value) }] }));
  return (
    <Animated.View style={[StyleSheet.absoluteFill, styles.clip, clip]}>
      <Animated.View style={[StyleSheet.absoluteFill, art]}>{children}</Animated.View>
    </Animated.View>
  );
}

function RisingTile({ index, grow, style, children }: { index: number; grow: boolean; style: ViewStyle; children: ReactNode }) {
  const p = useSharedValue(0);
  useEffect(() => {
    p.value = withDelay(index * STAGGER_MS, withTiming(1, { duration: TILE_MS, easing: EASE }));
  }, [p, index]);

  const motion = useAnimatedStyle(() => ({
    opacity: interpolate(p.value, [0, 0.4], [0, 1], 'clamp'),
    transform: grow
      ? [{ scale: interpolate(p.value, [0, 1], [0.2, 1]) }]
      : [{ translateY: interpolate(p.value, [0, 1], [8, 0]) }],
  }));
  return (
    <Animated.View style={[styles.tile, style, grow && { transformOrigin: SPROUT_ORIGIN }, motion]}>
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  tile: { position: 'absolute', top: 0 },
  clip: { overflow: 'hidden' },
});
