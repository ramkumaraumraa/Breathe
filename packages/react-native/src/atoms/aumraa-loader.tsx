import * as React from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, { ClipPath, Defs, G, LinearGradient, Path, Stop } from 'react-native-svg';
import { cn } from '../lib/utils';
import { Text } from './text';

// Same geometry as the web loader (packages/react/src/aumraa/loader.tsx);
// Derived from official public/assets/logos/aumraa/aumraa_icon.svg (viewBox: 0 0 264 280).
const SPIRAL_BAND =
  'M120.31 40V65.12C158.08 67.75 191.04 89.29 197.14 129.26C208.51 203.79 112.44 246.65 73.78 187.01C49.66 149.8 76.27 103.44 121.23 108.66C161.4 113.32 165.09 168.86 123.25 170.9V195.81C192.39 195 198.82 98.77 130.84 85.38C48.82 69.22 8.11003 167.48 69.87 219.59C127.02 267.8 216.78 224.62 223.48 152.65C229.51 87.96 181.7 42.8 120.31 40Z';

const SPIRAL_CENTERLINE =
  'M120.31 52.56 C170 54 213 96 213 141 C213 216 150 248 71.8 203.3 C18 168 55 88 126 97 C178 100 182 178 121.8 183.35';

const LEAF_BASE =
  'M85.44 156.32L120.32 191.31V195.81C100.87 195.35 85.27 179.39 85.27 159.78C85.27 158.62 85.32 157.46 85.44 156.32Z';

const LEAF_LOWER_MID =
  'M92.33 138.301L120.32 166.381V188.751L85.73 154.051C86.65 148.221 88.96 142.851 92.33 138.311V138.301Z';

const LEAF_UPPER_MID =
  'M120.32 141.67V163.82L93.47 136.88C96.8 132.77 101.04 129.43 105.86 127.16L120.32 141.67Z';

const LEAF_APEX =
  'M120.32 139.101L107.64 126.351C111.57 124.731 115.84 123.811 120.32 123.711V139.091V139.101Z';

/** Measured arc length of SPIRAL_CENTERLINE in native units. */
const SPIRAL_LENGTH = 638.43;
const CYCLE_MS = 2500; // 2.5s rhythm matching web
const EASE_GROW = Easing.bezier(0.35, 0, 0.25, 1);
const EASE_BOUNCE = Easing.bezier(0.34, 1.4, 0.64, 1);

const widths = { sm: 40, md: 72, lg: 120 } as const;

const AnimatedPath = Animated.createAnimatedComponent(Path);

export type AumraaLoaderSize = keyof typeof widths;

export type AumraaLoaderProps = ViewProps & {
  className?: string;
  size?: AumraaLoaderSize;
  /** Caption shown under the loader; also used as the accessible name. */
  label?: string;
  /** Show subtle resting guide track underneath the growing spiral. Default true. */
  showTrack?: boolean;
};

/**
 * Aumraa brand animated loader for React Native:
 * The spiral grows clockwise along the Fibonacci path in authentic brand green
 * (#56A545 to #CFCF2A). As the spiral reaches the leaf base, the 4 leaf tiers sprout
 * sequentially from base to apex, uniting both into the complete, intact Aumraa mark.
 */
export function AumraaLoader({
  size = 'md',
  label,
  showTrack = true,
  className,
  style,
  ...props
}: AumraaLoaderProps) {
  const reduceMotion = useReducedMotion();
  const offset = useSharedValue(SPIRAL_LENGTH);
  const spiralOpacity = useSharedValue(1);

  // Leaf opacities (0 -> 1 sequentially)
  const leaf1Opacity = useSharedValue(0);
  const leaf2Opacity = useSharedValue(0);
  const leaf3Opacity = useSharedValue(0);
  const leaf4Opacity = useSharedValue(0);

  const markScale = useSharedValue(1);

  React.useEffect(() => {
    if (reduceMotion) return;

    // 1. Clockwise Spiral Growth (offset from full to 0)
    offset.value = withRepeat(
      withSequence(
        withTiming(0, { duration: CYCLE_MS * 0.46, easing: EASE_GROW }),
        withTiming(0, { duration: CYCLE_MS * 0.40 }),
        withTiming(SPIRAL_LENGTH, { duration: CYCLE_MS * 0.14, easing: Easing.linear }),
      ),
      -1,
      false,
    );

    spiralOpacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: CYCLE_MS * 0.86 }),
        withTiming(0, { duration: CYCLE_MS * 0.10 }),
        withTiming(1, { duration: CYCLE_MS * 0.04 }),
      ),
      -1,
      false,
    );

    // 2. Sequential Leaf Sprouting
    leaf1Opacity.value = withRepeat(
      withSequence(
        withTiming(0, { duration: CYCLE_MS * 0.42 }),
        withTiming(1, { duration: CYCLE_MS * 0.08, easing: EASE_BOUNCE }),
        withTiming(1, { duration: CYCLE_MS * 0.36 }),
        withTiming(0, { duration: CYCLE_MS * 0.14 }),
      ),
      -1,
      false,
    );

    leaf2Opacity.value = withRepeat(
      withSequence(
        withTiming(0, { duration: CYCLE_MS * 0.48 }),
        withTiming(1, { duration: CYCLE_MS * 0.08, easing: EASE_BOUNCE }),
        withTiming(1, { duration: CYCLE_MS * 0.30 }),
        withTiming(0, { duration: CYCLE_MS * 0.14 }),
      ),
      -1,
      false,
    );

    leaf3Opacity.value = withRepeat(
      withSequence(
        withTiming(0, { duration: CYCLE_MS * 0.54 }),
        withTiming(1, { duration: CYCLE_MS * 0.08, easing: EASE_BOUNCE }),
        withTiming(1, { duration: CYCLE_MS * 0.24 }),
        withTiming(0, { duration: CYCLE_MS * 0.14 }),
      ),
      -1,
      false,
    );

    leaf4Opacity.value = withRepeat(
      withSequence(
        withTiming(0, { duration: CYCLE_MS * 0.60 }),
        withTiming(1, { duration: CYCLE_MS * 0.08, easing: EASE_BOUNCE }),
        withTiming(1, { duration: CYCLE_MS * 0.18 }),
        withTiming(0, { duration: CYCLE_MS * 0.14 }),
      ),
      -1,
      false,
    );

    // 3. Complete mark subtle resonance
    markScale.value = withRepeat(
      withSequence(
        withTiming(1, { duration: CYCLE_MS * 0.68 }),
        withTiming(1.025, { duration: CYCLE_MS * 0.10 }),
        withTiming(1, { duration: CYCLE_MS * 0.22 }),
      ),
      -1,
      false,
    );
  }, [
    reduceMotion,
    offset,
    spiralOpacity,
    leaf1Opacity,
    leaf2Opacity,
    leaf3Opacity,
    leaf4Opacity,
    markScale,
  ]);

  const traceProps = useAnimatedProps(() => ({
    strokeDashoffset: reduceMotion ? 0 : offset.value,
    opacity: reduceMotion ? 1 : spiralOpacity.value,
  }));

  const leaf1Props = useAnimatedProps(() => ({
    opacity: reduceMotion ? 1 : leaf1Opacity.value,
  }));

  const leaf2Props = useAnimatedProps(() => ({
    opacity: reduceMotion ? 1 : leaf2Opacity.value,
  }));

  const leaf3Props = useAnimatedProps(() => ({
    opacity: reduceMotion ? 1 : leaf3Opacity.value,
  }));

  const leaf4Props = useAnimatedProps(() => ({
    opacity: reduceMotion ? 1 : leaf4Opacity.value,
  }));

  const markAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: reduceMotion ? 1 : markScale.value }],
  }));

  const width = widths[size];
  const height = (width * 280) / 264;

  return (
    <View
      role="progressbar"
      accessible
      accessibilityLabel={label ?? 'Loading'}
      accessibilityState={{ busy: true }}
      className={cn('items-center gap-2', className)}
      style={style}
      {...props}
    >
      <Animated.View testID="aumraa-loader-mark" style={[{ width, height }, markAnimStyle]}>
        <Svg width={width} height={height} viewBox="0 0 264 280" style={StyleSheet.absoluteFill}>
          <Defs>
            <LinearGradient
              id="aumraa-rn-spiral-grad"
              x1="109"
              y1="181.51"
              x2="185.43"
              y2="88.65"
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="0" stopColor="#56A545" />
              <Stop offset="1" stopColor="#CFCF2A" />
            </LinearGradient>

            <ClipPath id="aumraa-rn-spiral-clip">
              <Path d={SPIRAL_BAND} />
            </ClipPath>
          </Defs>

          {/* 1. Subtle Resting Guide Track */}
          {showTrack && (
            <Path
              testID="aumraa-loader-track"
              d={SPIRAL_BAND}
              fill="url(#aumraa-rn-spiral-grad)"
              opacity={0.12}
            />
          )}

          {/* 2. Clockwise Growing Spiral (Authentic brand gradient #56A545 to #CFCF2A) */}
          <G clipPath="url(#aumraa-rn-spiral-clip)">
            <AnimatedPath
              testID="aumraa-loader-spiral"
              d={SPIRAL_CENTERLINE}
              stroke="url(#aumraa-rn-spiral-grad)"
              strokeWidth={42}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              strokeDasharray={[SPIRAL_LENGTH, SPIRAL_LENGTH]}
              animatedProps={traceProps}
            />
          </G>

          {/* 3. Central Leaf Tiers: 4 shades sprouting sequentially as spiral finishes */}
          <G testID="aumraa-loader-leaf-group">
            {/* Tier 1: Base - Forest Green #2F9E44 */}
            <AnimatedPath
              testID="aumraa-loader-leaf-base"
              d={LEAF_BASE}
              fill="#2F9E44"
              animatedProps={leaf1Props}
            />

            {/* Tier 2: Lower Mid - Fresh Green #81C341 */}
            <AnimatedPath
              testID="aumraa-loader-leaf-lowermid"
              d={LEAF_LOWER_MID}
              fill="#81C341"
              animatedProps={leaf2Props}
            />

            {/* Tier 3: Upper Mid - Bright Leaf Lime #ACD037 */}
            <AnimatedPath
              testID="aumraa-loader-leaf-uppermid"
              d={LEAF_UPPER_MID}
              fill="#ACD037"
              animatedProps={leaf3Props}
            />

            {/* Tier 4: Apex Tip - Energized Yellow-Green #D9E026 */}
            <AnimatedPath
              testID="aumraa-loader-leaf-apex"
              d={LEAF_APEX}
              fill="#D9E026"
              animatedProps={leaf4Props}
            />
          </G>
        </Svg>
      </Animated.View>
      {label ? <Text className="text-xs font-semibold text-muted-foreground">{label}</Text> : null}
    </View>
  );
}
