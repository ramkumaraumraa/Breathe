import * as React from 'react';
import { View, type ViewProps } from 'react-native';
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
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import { THEME } from '../lib/theme';
import { cn } from '../lib/utils';
import { Text } from './text';

// Same geometry as the web loader (packages/react/src/lemniscate/loader.tsx); test/atoms/loader.test.tsx keeps them equal.
// All paths live on the 736×400 artboard of Figma "Leminiscate / Logo / Symbol"; LOOP is the centre-line of the ~55-unit band.
const LOOP = "M368 259C421 214 471 146 541 146C603 146 653.5 197 653.5 259C653.5 321 603 372 541 372C471 372 421 304 368 259C315 214 265 146 195 146C133 146 83 197 83 259C83 321 133 372 195 372C265 372 315 304 368 259Z";
const ROOF = "M539.947 3.29509C531.671 -1.09836 521.764 -1.09836 513.474 3.29509L370.301 79.3678L227.128 3.29509C218.852 -1.09836 208.944 -1.09836 200.655 3.29509L0 109.894V174.143L213.891 60.5041L357.065 136.577C365.341 140.97 375.248 140.97 383.537 136.577L526.711 60.5041L736 171.698V107.448L539.947 3.29509Z";
const EAVE_LEFT = "M25.0819 96.5687L0 109.894V174.143L26.7364 159.938L25.0819 96.5687Z";
const EAVE_RIGHT = "M709.838 157.798L735.999 171.698V107.448L711.492 94.4291L709.838 157.798Z";

/** Measured length of LOOP. Web normalises with pathLength=100; react-native-svg needs real units. */
const LOOP_LENGTH = 1554.31;
const DASH = LOOP_LENGTH * 0.32;
const BAND = 55;
const ROOF_HEIGHT = 174.2; // roof + eaves bounding box on the 736-wide artboard
const LAP_MS = 1600; // web: 1.6s for one lap and one roof breath
const EASE_IN_OUT = Easing.bezier(0.42, 0, 0.58, 1); // CSS ease-in-out
const widths = { sm: 40, md: 72, lg: 120 } as const;

const AnimatedPath = Animated.createAnimatedComponent(Path);

type LoaderSize = keyof typeof widths;
type LoaderProps = ViewProps & {
  className?: string;
  size?: LoaderSize;
  /** Caption shown under the loader; also used as the accessible name. */
  label?: string;
  /** Keep the roof above the animated loop. */
  showRoof?: boolean;
};

/**
 * Leminiscate loader, native twin of the web one: a gradient dash laps the infinity loop
 * while only the roof breathes (104%) on the same beat. With reduce-motion on, both stop
 * and the full symbol shows.
 */
function Loader({ size = 'md', label, showRoof = true, className, ...props }: LoaderProps) {
  const reduceMotion = useReducedMotion();
  const offset = useSharedValue(0);
  const scale = useSharedValue(1);

  React.useEffect(() => {
    if (reduceMotion) return;
    offset.value = withRepeat(withTiming(-LOOP_LENGTH, { duration: LAP_MS, easing: Easing.linear }), -1, false);
    scale.value = withRepeat(
      withSequence(
        withTiming(1.04, { duration: LAP_MS / 2, easing: EASE_IN_OUT }),
        withTiming(1, { duration: LAP_MS / 2, easing: EASE_IN_OUT }),
      ),
      -1,
      false,
    );
  }, [reduceMotion, offset, scale]);

  const traceProps = useAnimatedProps(() => ({ strokeDashoffset: offset.value }));
  const roofStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const width = widths[size];
  const height = width * (showRoof ? 400 / 736 : 296 / 640);
  const loopStroke = {
    stroke: 'url(#lmns-loader-loop)',
    strokeWidth: BAND,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    fill: 'none',
  } as const;

  return (
    <View
      role="progressbar"
      accessible
      accessibilityLabel={label ?? 'Loading'}
      accessibilityState={{ busy: true }}
      className={cn('items-center gap-2', className)}
      {...props}
    >
      <View testID="loader-mark" style={{ width, height }}>
        {showRoof && (
          // The roof sits in its own view so it scales around its own centre; the loop never scales.
          <Animated.View
            testID="loader-roof"
            style={[{ position: 'absolute', top: 0, left: 0, width, height: (width * ROOF_HEIGHT) / 736 }, roofStyle]}
          >
            <Svg width="100%" height="100%" viewBox={`0 0 736 ${ROOF_HEIGHT}`}>
              <Defs>
                <LinearGradient id="lmns-loader-roof" x1="0" y1="175" x2="0" y2="0" gradientUnits="userSpaceOnUse">
                  <Stop offset="0" stopColor={THEME.light.secondary} />
                  <Stop offset="1" stopColor={THEME.light.primary} />
                </LinearGradient>
                <LinearGradient id="lmns-loader-eave" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor="#ED811C" />
                  <Stop offset="1" stopColor="#A9601D" />
                </LinearGradient>
              </Defs>
              <Path d={ROOF} fill="url(#lmns-loader-roof)" />
              <Path d={EAVE_LEFT} fill="url(#lmns-loader-eave)" />
              <Path d={EAVE_RIGHT} fill="url(#lmns-loader-eave)" />
            </Svg>
          </Animated.View>
        )}
        <Svg
          width={width}
          height={height}
          viewBox={showRoof ? '0 0 736 400' : '48 111 640 296'}
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          <Defs>
            <LinearGradient id="lmns-loader-loop" x1="63" y1="0" x2="675" y2="0" gradientUnits="userSpaceOnUse">
              <Stop offset="0" stopColor={THEME.light.secondary} />
              <Stop offset="1" stopColor={THEME.light.primary} />
            </LinearGradient>
          </Defs>
          <Path testID="loader-track" d={LOOP} {...loopStroke} strokeOpacity={0.15} />
          <AnimatedPath
            testID="loader-trace"
            d={LOOP}
            {...loopStroke}
            strokeDasharray={reduceMotion ? undefined : [DASH, LOOP_LENGTH - DASH]}
            animatedProps={traceProps}
          />
        </Svg>
      </View>
      {label ? <Text className="text-xs font-semibold text-muted-foreground">{label}</Text> : null}
    </View>
  );
}

export { Loader };
export type { LoaderProps, LoaderSize };
