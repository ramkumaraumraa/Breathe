import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { kayoSpace, kayoRadius, kayoShadow } from '../../foundations/tokens';
import { theme } from '../../foundations/theme';
import { typography } from '../../foundations/typography';

export interface TabFilterOption<T extends string = string> {
  value: T;
  label: string;
}

export interface TabFilterProps<T extends string = string> {
  options: TabFilterOption<T>[];
  /** A single active value, or an array for multi-select. onChange always
   *  reports the tapped option's value — the caller owns the selection logic
   *  (toggle, replace, clear), same contract in both modes. */
  value: T | T[];
  onChange: (value: T) => void;
  /** Horizontally scrollable row that scrolls the active option back into view on change.
   *  Without it a row wider than the viewport is silently clipped, and the options past the
   *  edge can never be reached or seen selected. The track stays fixed to the viewport —
   *  only the options scroll inside it. */
  scrollable?: boolean;
  /** Track surface. 'segmented' (default) sits on the app canvas, so its track is `surface.sunken`.
   *  'card' is for screens whose page is `surface.card` (see AppShell's `surface` prop) — its track
   *  steps down to `surface.canvas` to keep the same one-step contrast. */
  variant?: 'segmented' | 'card';
  testID?: string;
}

/** 8-digit hex rather than 'transparent' — on Android a transparent stop fades through black. */
const FADE: Record<'segmented' | 'card', { out: [string, string]; in: [string, string] }> = {
  segmented: {
    out: [theme.surface.sunken, `${theme.surface.sunken}00`],
    in: [`${theme.surface.sunken}00`, theme.surface.sunken],
  },
  card: {
    out: [theme.surface.canvas, `${theme.surface.canvas}00`],
    in: [`${theme.surface.canvas}00`, theme.surface.canvas],
  },
};

export function TabFilter<T extends string>({
  options,
  value,
  onChange,
  scrollable = false,
  variant = 'segmented',
  testID,
}: TabFilterProps<T>) {
  const activeValue = Array.isArray(value) ? value[0] : value;
  const scrollRef = useRef<ScrollView>(null);
  const layouts = useRef<Record<string, { x: number; width: number }>>({});
  const viewport = useRef(0);
  const content = useRef(0);
  const [edges, setEdges] = useState({ left: false, right: false });

  /** Recomputed from layout and content size as well as scroll — otherwise a row that overflows
   *  on first render shows no fade until the user happens to scroll it. */
  const syncEdges = useCallback((offsetX = 0) => {
    const vw = viewport.current;
    const cw = content.current;
    if (!vw || !cw) return;
    const left = offsetX > 4;
    const right = offsetX + vw < cw - 4;
    setEdges((prev) => (prev.left === left && prev.right === right ? prev : { left, right }));
  }, []);

  useEffect(() => {
    if (!scrollable || !activeValue) return;
    const layout = layouts.current[activeValue];
    if (!layout || !viewport.current) return;
    // Centre the active option; ScrollView clamps at both ends for us.
    const x = Math.max(0, layout.x - (viewport.current - layout.width) / 2);
    scrollRef.current?.scrollTo({ x, animated: true });
  }, [activeValue, scrollable]);

  // syncEdges only flips state when an edge actually gains/loses overflow, so scrolling doesn't
  // re-render per frame.
  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent;
      viewport.current = layoutMeasurement.width;
      content.current = contentSize.width;
      syncEdges(contentOffset.x);
    },
    [syncEdges]
  );

  const chips = options.map((opt) => {
    const isActive = Array.isArray(value) ? value.includes(opt.value) : opt.value === value;
    return (
      <Pressable
        key={opt.value}
        onPress={() => onChange(opt.value)}
        onLayout={
          scrollable
            ? (e: LayoutChangeEvent) => {
                layouts.current[opt.value] = {
                  x: e.nativeEvent.layout.x,
                  width: e.nativeEvent.layout.width,
                };
              }
            : undefined
        }
        style={[styles.option, isActive && styles.optionActive]}
      >
        <Text style={[styles.label, isActive && styles.labelActive]}>{opt.label}</Text>
      </Pressable>
    );
  });

  const trackStyle = variant === 'segmented' ? styles.track : styles.trackCard;
  const padStyle = variant === 'segmented' ? styles.padSegmented : styles.padCard;

  if (!scrollable) {
    return (
      <View style={[trackStyle, padStyle, styles.row]} testID={testID}>
        {chips}
      </View>
    );
  }

  // Padding lives on the scroll content, not the track: a ScrollView clips at its content bounds,
  // so track padding alone would still crop the active chip's hard offset shadow.
  return (
    <View
      style={trackStyle}
      testID={testID}
      onLayout={(e) => {
        viewport.current = e.nativeEvent.layout.width;
        syncEdges();
      }}
    >
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onContentSizeChange={(w) => {
          content.current = w;
          syncEdges();
        }}
        scrollEventThrottle={16}
        contentContainerStyle={padStyle}
      >
        <View style={styles.row}>{chips}</View>
      </ScrollView>
      {edges.left ? (
        <LinearGradient
          pointerEvents="none"
          colors={FADE[variant].out}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.fade, styles.fadeLeft]}
        />
      ) : null}
      {edges.right ? (
        <LinearGradient
          pointerEvents="none"
          colors={FADE[variant].in}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.fade, styles.fadeRight]}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: kayoSpace[1],
  },
  track: {
    backgroundColor: theme.surface.sunken,
    borderRadius: kayoRadius.sm,
    // Keeps the full-bleed edge fades from painting square corners outside the rounded track.
    overflow: 'hidden',
  },
  trackCard: {
    backgroundColor: theme.surface.canvas,
    borderRadius: kayoRadius.sm,
    overflow: 'hidden',
  },
  padSegmented: { paddingVertical: 2, paddingHorizontal: 2 },
  // Roomier than 'segmented' so the active chip's hard shadow clears the track edge on all sides.
  padCard: { paddingVertical: kayoSpace[2], paddingHorizontal: kayoSpace[3] },
  option: {
    paddingHorizontal: kayoSpace[3],
    paddingVertical: 5,
    borderRadius: kayoRadius.sm,
  },
  optionActive: {
    backgroundColor: theme.brand.primary,
    ...kayoShadow.sm,
  },
  label: {
    ...typography.utility_badge,
    color: theme.text.secondary,
  },
  labelActive: {
    color: theme.text.onPrimary,
  },
  fade: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 24,
  },
  fadeLeft: { left: 0 },
  fadeRight: { right: 0 },
});
