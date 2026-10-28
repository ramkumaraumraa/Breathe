/**
 * NotificationBanner - Figma "Notification card / v3" (03 · Dashboard, approved 2026-10-03), the Home
 * carousel banner. Category colours come from foundations/notifier.ts.
 *
 * An ambient soft-clay card: category-tinted surface, two organic waves on the right, a sticker,
 * an inset date pill, and one brutalist element - the pill CTA (1.5px outline in the category 900
 * stop, 2px hard shadow in its 975 stop). See .claude/design-direction.md for the rules.
 *
 * Presentational only: the caller supplies copy, the sticker and the press handler.
 */
import React from 'react';
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useReducedMotion, useSharedValue, withTiming } from 'react-native-reanimated';
import { ArrowRight } from 'lucide-react-native';
import Svg, {
  Defs, FeComposite, FeFlood, FeGaussianBlur, FeMerge, FeMergeNode, FeOffset, Filter, Path,
} from 'react-native-svg';

import { notifier, type NotifierCategory, type NotifierRamp as Ramp } from '../../foundations/notifier';
import { kayoClay, kayoColors, kayoRadius } from '../../foundations/tokens';
import { typography } from '../../foundations/typography';
import { Chip } from '../atoms/Chip';

/** The two organic waves of "Notification card / v3" - shapes, offsets and blurs copied from Figma
 * (315 × 133 frame). Back wave in the category 50 stop, front in 75. */
const WAVES = [
  { key: 'back', fillStop: 50, d: 'M315 0H206C248 21 212 60.2 236 86.8C252 106.4 288 117.6 315 133V0Z',
    shadow: { dx: -6, dy: 6, blur: 8 } },
  { key: 'front', fillStop: 75, d: 'M315 0H252C280 19.6 244 54.6 268 81.2C282 98 300 105 315 112V0Z',
    shadow: { dx: -5, dy: 5, blur: 6 } },
] as const;
/** Generous on purpose: Android scales a userSpaceOnUse region by the viewBox's height factor, so
 * Figma's tight regions cut the waves short of the right edge. The card's own rounded clip
 * (overflow hidden) trims everything outside the frame. */
const FILTER_REGION = { x: 120, y: -60, width: 300, height: 260 };

/**
 * Drawn as react-native-svg components rather than imported .svg files: the SVG transformer (svgr)
 * deletes <filter> and every fe* element, so the imported waves rendered flat. Each wave gets the
 * Figma effect pair, rebuilt from primitives react-native-svg draws natively:
 *   drop shadow  - its own alpha, offset down-left and blurred, filled with the category 100 stop;
 *   inner light  - a 1px white rim on the top-left edge (alpha minus its own blurred 2,2 offset).
 */
function Waves({ ramp, idPrefix }: { ramp: Ramp; idPrefix: string }) {
  return (
    <Svg style={StyleSheet.absoluteFill} width="100%" height="100%" viewBox="0 0 315 133" preserveAspectRatio="none">
      <Defs>
        {WAVES.map((w) => (
          <Filter key={w.key} id={`${idPrefix}-${w.key}`} filterUnits="userSpaceOnUse" {...FILTER_REGION}>
            <FeOffset in="SourceAlpha" dx={w.shadow.dx} dy={w.shadow.dy} result="shadowOffset" />
            <FeGaussianBlur in="shadowOffset" stdDeviation={w.shadow.blur} result="shadowBlur" />
            <FeFlood floodColor={ramp[100]} floodOpacity={1} result="shadowColor" />
            <FeComposite in="shadowColor" in2="shadowBlur" operator="in" result="dropShadow" />
            <FeOffset in="SourceAlpha" dx={2} dy={2} result="lightOffset" />
            <FeGaussianBlur in="lightOffset" stdDeviation={1} result="lightBlur" />
            <FeComposite in="SourceAlpha" in2="lightBlur" operator="out" result="lightEdge" />
            <FeFlood floodColor={WHITE} floodOpacity={1} result="lightColor" />
            <FeComposite in="lightColor" in2="lightEdge" operator="in" result="innerLight" />
            <FeMerge>
              <FeMergeNode in="dropShadow" />
              <FeMergeNode in="SourceGraphic" />
              <FeMergeNode in="innerLight" />
            </FeMerge>
          </Filter>
        ))}
      </Defs>
      {WAVES.map((w) => (
        <Path key={w.key} d={w.d} fill={ramp[w.fillStop]} filter={`url(#${idPrefix}-${w.key})`} />
      ))}
    </Svg>
  );
}

const WHITE = kayoColors.neutral[25];
const PRESS_MS = 120;
const STICKER_PLATE = 64;
const SURFACE_PADDING_X = 8;
/** The message wraps before the waves instead of running over them: across the message's height
 * the back wave's edge sits at 227/315 of the card, and its drop shadow reaches ~12 units further
 * left - so text stops at 215/315 (68%) of the card's width. */
const MESSAGE_RIGHT_EDGE_SHARE = 215 / 315;
const MESSAGE_MAX_LINES = 3;

export interface NotificationBannerProps {
  category: NotifierCategory;
  title: string;
  message: string;
  /** Inset date pill, bottom-left - already formatted ("SAT 12 OCT 5:30 PM"). Omit for no pill. */
  dateLabel?: string;
  actionLabel?: string;
  /** 52 × 42 sticker art, floated on the waves. */
  sticker?: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export function NotificationBanner({
  category, title, message, dateLabel, actionLabel, sticker, onPress, style, testID,
}: NotificationBannerProps) {
  const { ramp, tint } = notifier[category];
  // Filter/clip ids must be unique per card - several cards render at once in the carousel.
  const idPrefix = `nc${React.useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const reduceMotion = useReducedMotion();
  const pressed = useSharedValue(0);
  const [surfaceWidth, setSurfaceWidth] = React.useState(0);
  const messageMaxWidth = surfaceWidth > 0 ? surfaceWidth * MESSAGE_RIGHT_EDGE_SHARE - SURFACE_PADDING_X : undefined;

  // Soft press: the card sinks (scale 0.98) while the brutalist CTA drops its hard shadow and
  // shifts by the offset - the two depth languages' own "pressed" states, driven together.
  const cardPress = useAnimatedStyle(() => ({ transform: [{ scale: 1 - pressed.value * 0.02 }] }));
  const ctaPress = useAnimatedStyle(() => ({
    transform: [{ translateX: pressed.value * 2 }, { translateY: pressed.value * 2 }],
  }));
  const setPressed = (to: 0 | 1) => {
    pressed.value = reduceMotion ? to : withTiming(to, { duration: PRESS_MS });
  };

  return (
    <Animated.View style={[styles.raised, cardPress, style]}>
      <Pressable
        onPress={onPress}
        onPressIn={() => setPressed(1)}
        onPressOut={() => setPressed(0)}
        accessibilityRole="button"
        accessibilityLabel={[title, message, actionLabel].filter(Boolean).join('. ')}
        style={styles.surface}
        onLayout={(e) => setSurfaceWidth(e.nativeEvent.layout.width)}
        testID={testID}
      >
        <View style={[StyleSheet.absoluteFill, { backgroundColor: tint, opacity: 0.6 }]} />
        {/* Unpadded wrapper: "100%" on an SVG directly inside the padded surface resolves against the
            content box, which left the waves 16dp short on the right and 18dp short at the bottom. */}
        <View pointerEvents="none" style={StyleSheet.absoluteFill}>
          <Waves ramp={ramp} idPrefix={idPrefix} />
        </View>

        <View style={styles.body}>
          <View style={styles.copy}>
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
            <Text style={[styles.message, { maxWidth: messageMaxWidth }]} numberOfLines={MESSAGE_MAX_LINES}>{message}</Text>
          </View>
          <View style={styles.stickerPlate}>{sticker}</View>
        </View>

        <View style={styles.actionRow}>
          {dateLabel ? <Chip label={dateLabel.toUpperCase()} tone={category} size="md" /> : null}
          <View style={styles.spacer} />
          {actionLabel ? (
            <View style={styles.ctaSlot}>
              {/* Hard shadow as its own layer (drawn first, so underneath) - pressing slides the pill onto it. */}
              <View style={[styles.ctaShadow, { backgroundColor: ramp[975] }]} />
              <Animated.View style={[styles.cta, { borderColor: ramp[900] }, ctaPress]}>
                <Text style={[styles.ctaLabel, { color: ramp[975] }]} numberOfLines={1}>{actionLabel}</Text>
                {/* One-off (kept local): the CTA knob's soft drop + inner light, tinted per category. */}
                <View style={[styles.knob, { backgroundColor: ramp[500], boxShadow: `1px 2px 4px 0px ${ramp[100]}, inset 1px 1px 2px 0px ${WHITE}` }]}>
                  <ArrowRight size={12} color={WHITE} strokeWidth={2.5} />
                </View>
              </Animated.View>
            </View>
          ) : null}
        </View>

        {/* 1px white top edge - light from the top-left catching the rim. */}
        <View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.rim]} />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  // Raised soft clay: warm Secondary/200 shadow bottom-right + white light top-left. Lives on the
  // outer view because the surface clips (overflow hidden) to keep the waves inside the corners.
  raised: { borderRadius: kayoRadius.lg, ...kayoClay.raised('lg') },
  surface: {
    flex: 1,
    // The carousel stretches every card to the tallest one; keep the action row on the bottom edge.
    justifyContent: 'space-between',
    gap: 8,
    paddingVertical: 9,
    paddingHorizontal: SURFACE_PADDING_X,
    borderRadius: kayoRadius.lg,
    backgroundColor: WHITE,
    overflow: 'hidden',
  },
  // One-off (kept local): 1px white top rim, no token.
  rim: { borderRadius: kayoRadius.lg, boxShadow: `inset 0px 1px 0px 0px ${WHITE}` },
  body: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  copy: { flex: 1, gap: 4 },
  title: { ...typography.label_lg, color: kayoColors.neutral[950] },
  message: { ...typography.body_sm, color: kayoColors.neutral[800] },
  stickerPlate: {
    width: STICKER_PLATE,
    height: STICKER_PLATE,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 8, paddingVertical: 3 },
  spacer: { flex: 1 },
  ctaSlot: { paddingRight: 2, paddingBottom: 2 },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingLeft: 10,
    paddingRight: 4,
    paddingVertical: 3,
    borderWidth: 1.5,
    borderRadius: kayoRadius.pill,
    backgroundColor: WHITE,
  },
  ctaShadow: {
    position: 'absolute',
    top: 2,
    left: 2,
    right: 0,
    bottom: 0,
    borderRadius: kayoRadius.pill,
  },
  // Utility/Badge in sentence case: the shared style's uppercase + tracking are for chips.
  ctaLabel: { ...typography.utility_badge, textTransform: 'none', letterSpacing: 0 },
  knob: {
    width: 24,
    height: 24,
    borderRadius: kayoRadius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
