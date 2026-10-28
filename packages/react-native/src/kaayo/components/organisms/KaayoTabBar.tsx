/**
 * KaayoTabBar — bottom bar for the (main)/(tabs) navigator, passed as `<Tabs tabBar>`.
 *
 * Labels are always on (pilot tutors read words, not glyphs). The active tab's top rule slides
 * to the new tab and its icon pops once — short timings, no spring, per kayoMotion. With
 * reduce-motion on, both snap. A tap gives a light selection haptic; tapping the tab you are
 * already on emits `tabPress` only, which `useScrollToTop` in the screen turns into scroll-to-top.
 * The bar pads the bottom safe-area inset itself, so AppShell leaves that edge to it.
 */

import React, { ComponentProps, ReactNode, useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import type { Tabs } from 'expo-router';

import { kayoMotion, kayoSpace } from '../../foundations/tokens';
import { theme } from '../../foundations/theme';
import { typography } from '../../foundations/typography';

export interface KaayoTabBarRoute {
  key: string;
  name: string;
  params?: any;
}

export interface KaayoTabBarOptions {
  tabBarLabel?: string;
  title?: string;
  tabBarIcon?: (props: { focused: boolean; color: string; size: number }) => ReactNode;
}

export interface KaayoTabBarNavigation {
  emit: (event: { type: string; target: string; canPreventDefault: boolean }) => { defaultPrevented: boolean };
  navigate: (name: string, params?: any) => void;
}

export interface KaayoTabBarProps {
  state: {
    routes: KaayoTabBarRoute[];
    index: number;
  };
  descriptors: Record<string, { options: KaayoTabBarOptions }>;
  navigation: KaayoTabBarNavigation;
}

const INDICATOR_HEIGHT = 2;
const ICON_SIZE = 24;
const EASE_OUT = Easing.out(Easing.cubic);

export function KaayoTabBar({ state, descriptors, navigation }: KaayoTabBarProps) {
  const insets = useSafeAreaInsets();
  const reduceMotion = useReducedMotion();
  const [barWidth, setBarWidth] = useState(0);
  const tabWidth = barWidth / state.routes.length;
  const indicatorX = useSharedValue(0);

  useEffect(() => {
    const x = state.index * tabWidth;
    indicatorX.value = reduceMotion ? x : withTiming(x, { duration: kayoMotion.base, easing: EASE_OUT });
  }, [state.index, tabWidth, reduceMotion, indicatorX]);

  const indicatorStyle = useAnimatedStyle(() => ({ transform: [{ translateX: indicatorX.value }] }));

  return (
    <View
      style={[styles.bar, { paddingBottom: insets.bottom }]}
      onLayout={(e) => setBarWidth(e.nativeEvent.layout.width)}
      accessibilityRole="tablist"
      testID="bottom-nav"
    >
      {barWidth > 0 ? <Animated.View style={[styles.indicator, { width: tabWidth }, indicatorStyle]} /> : null}
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const focused = state.index === index;
        const label = typeof options.tabBarLabel === 'string' ? options.tabBarLabel : options.title ?? route.name;

        const onPress = () => {
          Haptics.selectionAsync().catch(() => {});
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!focused && !event.defaultPrevented) navigation.navigate(route.name, route.params);
        };

        return (
          <TabItem
            key={route.key}
            label={label}
            focused={focused}
            reduceMotion={reduceMotion}
            onPress={onPress}
            testID={`nav-${route.name}`}
            icon={options.tabBarIcon}
          />
        );
      })}
    </View>
  );
}

function TabItem({
  label,
  focused,
  reduceMotion,
  onPress,
  testID,
  icon,
}: {
  label: string;
  focused: boolean;
  reduceMotion: boolean;
  onPress: () => void;
  testID: string;
  icon: KaayoTabBarProps['descriptors'][string]['options']['tabBarIcon'];
}) {
  const scale = useSharedValue(1);
  const color = focused ? theme.brand.primary : theme.text.secondary;

  useEffect(() => {
    if (!focused || reduceMotion) return;
    scale.value = withSequence(
      withTiming(1.15, { duration: kayoMotion.fast / 2, easing: EASE_OUT }),
      withTiming(1, { duration: kayoMotion.fast, easing: EASE_OUT })
    );
  }, [focused, reduceMotion, scale]);

  const iconStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Pressable
      onPress={onPress}
      style={styles.item}
      accessibilityRole="tab"
      accessibilityState={{ selected: focused }}
      accessibilityLabel={label}
      testID={testID}
    >
      <Animated.View style={iconStyle}>{icon?.({ focused, color, size: ICON_SIZE })}</Animated.View>
      <Text style={[typography.label_sm, styles.label, { color }]} numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: theme.surface.card,
  },
  indicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: INDICATOR_HEIGHT,
    backgroundColor: theme.brand.primary,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 60,
    paddingTop: kayoSpace[2],
    paddingBottom: kayoSpace[1],
  },
  label: {
    marginTop: 3,
  },
});
