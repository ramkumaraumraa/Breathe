import React, { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions, type LayoutChangeEvent, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Bell } from 'lucide-react-native';

import { kayoColors, kayoSpace } from '../../foundations/tokens';
import { theme } from '../../foundations/theme';
import { typography } from '../../foundations/typography';

import {
  getBrandedHeaderBarHeight,
  getBrandedScreenBackdropSpec,
  type BackdropPatternVariant,
} from './BrandedScreenBackdrop.contract';
import { CanopyBand } from './CanopyBand';

/** Home's zigzags and Students' waves scale with the screen (24dp and 26dp tall at 390 wide). */
const ZIGZAG_ASPECT = 390 / 24;
const WAVES_ASPECT = 1080 / 72;
/** Attendance triangles and Payments sprouts sit in a fixed 24dp row, 12dp under the content above. */
const ROW_BAND_H = 24;
const ROW_BAND_GAP = 12;

interface BrandedScreenBackdropProps {
  variant: BackdropPatternVariant;
  eyebrow?: string;
  /** Omitted on Students, where the roster count sits in the fixed header bar instead. */
  title?: string;
  subtitle?: string;
  actionSlot?: ReactNode;
  metricSlot?: ReactNode;
  children?: ReactNode;
  style?: ViewStyle;
  testID?: string;
  /** The action slot's y within the scroll content - Students pins its search once it scrolls past. */
  onActionSlotLayout?: (e: LayoutChangeEvent) => void;
}

/** Fixed top row of every branded tab (Figma "Header / Branded bar", 74513:27), pinned above the
 * page by `AppShell`'s `headerOverlay` so it never scrolls away with the canopy beneath it. The
 * screen's title lives here, aligned with the bell - never repeated in the canopy. `actions` sit
 * left of the bell (Payments' eye). */
export function BrandedHeaderBar({ title, actions, testID }: { title?: ReactNode; actions?: ReactNode; testID?: string }) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const spec = getBrandedScreenBackdropSpec(width);
  const barHeight = getBrandedHeaderBarHeight(insets.top, width);

  return (
    <View
      testID={testID ?? 'branded-header-bar'}
      style={[
        styles.stickyHeaderBar,
        { height: barHeight, paddingTop: insets.top + kayoSpace[3], paddingHorizontal: spec.contentInset },
      ]}
    >
      <View style={styles.titleSlot}>{title}</View>
      <View style={styles.actions}>
        {actions}
        <Pressable
          onPress={() => router.push('/reminders')}
          style={styles.bellBtn}
          hitSlop={8}
          testID="branded-header-reminders"
        >
          <Bell size={24} color={theme.text.onPrimary} strokeWidth={2.1} />
        </Pressable>
      </View>
    </View>
  );
}

/** The one title style for `BrandedHeaderBar`: Heading/H1 white, one line. With `value`, renders the
 * count form - value in H1, `title` as the noun in H3 on the same baseline ("76 students"). */
export function BrandedHeaderTitle({ title, value }: { title: string; value?: string | number }) {
  if (value != null) {
    return (
      <View style={styles.countRow}>
        <Text style={styles.headerTitle}>{value}</Text>
        <Text style={styles.headerNoun} numberOfLines={1}>{title}</Text>
      </View>
    );
  }
  return <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>;
}

export function BrandedScreenBackdrop({
  variant,
  eyebrow,
  title,
  subtitle,
  actionSlot,
  metricSlot,
  children,
  style,
  testID,
  onActionSlotLayout,
}: BrandedScreenBackdropProps) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const spec = getBrandedScreenBackdropSpec(width, variant);
  const headerBarHeight = getBrandedHeaderBarHeight(insets.top, width);
  // Dashboard and Students: a single pattern band in the gap above the overlapping card, laid out
  // in flow so it follows whatever sits above it (zigzags under the name, waves under the search).
  // Attendance's triangle band is in flow too, but keeps a gap to the card (see the contract).
  const zigzagBand = variant === 'dashboard' || variant === 'students';
  const zigzagHeight = width / (variant === 'students' ? WAVES_ASPECT : ZIGZAG_ASPECT);

  return (
    <View
      testID={testID ?? `branded-backdrop-${variant}`}
      style={[
        styles.root,
        {
          marginHorizontal: -spec.edgeBleed,
          marginTop: -spec.topPull,
          marginBottom: children ? spec.afterOverlapGap : kayoSpace[4],
          minHeight: children ? spec.minimumFlowHeight : undefined,
        },
        style,
      ]}
    >
      <View
        style={[
          styles.canopy,
          {
            minHeight: spec.canopyHeight,
            paddingHorizontal: spec.contentInset,
            // The dashboard's band itself is the title-to-card gap.
            paddingBottom: spec.contentOverlap + (zigzagBand ? 0 : spec.titleToContentGap),
            borderBottomLeftRadius: spec.canopyRadius,
            borderBottomRightRadius: spec.canopyRadius,
          },
        ]}
      >
        {/* Reserves the same height as the fixed BrandedHeaderBar overlay rendered by AppShell,
            so the canopy's own logo/bell space scrolls away cleanly with no seam or jump. */}
        <View style={{ height: headerBarHeight }} />
        {eyebrow || title || subtitle || metricSlot ? (
          <View style={[styles.hero, { minHeight: spec.heroMinHeight }, !title && styles.heroCentered]}>
            <View style={styles.copyCol}>
              {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
              {title ? <Text style={styles.title}>{title}</Text> : null}
              {subtitle ? <Text style={styles.subtitle} numberOfLines={3}>{subtitle}</Text> : null}
            </View>
            {metricSlot ? <View style={[styles.metricSlot, !title && styles.metricSlotCentered]}>{metricSlot}</View> : null}
          </View>
        ) : null}
        {actionSlot ? <View style={styles.actionSlot} onLayout={onActionSlotLayout}>{actionSlot}</View> : null}
        {zigzagBand ? (
          <View
            pointerEvents="none"
            style={[
              styles.zigzagBand,
              {
                // Tablets draw a taller zigzag than the 24dp gap - the band grows rather than overlap.
                height: Math.max(spec.titleToContentGap, zigzagHeight),
                marginHorizontal: -spec.contentInset,
              },
            ]}
          >
            <CanopyBand variant={variant} width={width} height={zigzagHeight} />
          </View>
        ) : (
          <View style={[styles.rowBand, { marginHorizontal: -spec.contentInset }]}>
            <CanopyBand variant={variant} width={width} height={ROW_BAND_H} />
          </View>
        )}
      </View>

      {children ? (
        <View style={[styles.overlap, { marginTop: -spec.contentOverlap, paddingHorizontal: spec.contentInset }]}> 
          {children}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'relative',
  },
  canopy: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: kayoColors.primary[500],
  },
  stickyHeaderBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: kayoColors.primary[500],
  },
  titleSlot: { flex: 1, minWidth: 0 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: kayoSpace[3] },
  countRow: { flexDirection: 'row', alignItems: 'baseline', gap: 6 },
  headerTitle: { ...typography.heading_h1, color: theme.text.onPrimary },
  headerNoun: { ...typography.heading_h3, color: theme.text.onPrimary, flexShrink: 1 },
  bellBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hero: {
    position: 'relative',
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: kayoSpace[4],
    paddingTop: kayoSpace[2],
  },
  copyCol: {
    flex: 1,
    gap: kayoSpace[1],
    minWidth: 0,
  },
  eyebrow: {
    ...typography.utility_badge,
    color: kayoColors.primary[50],
  },
  title: {
    ...typography.heading_h1,
    color: theme.text.onPrimary,
  },
  subtitle: {
    ...typography.body_sm,
    color: kayoColors.primary[50],
    maxWidth: 320,
  },
  heroCentered: {
    alignItems: 'center',
  },
  metricSlot: {
    alignSelf: 'flex-start',
  },
  metricSlotCentered: {
    alignSelf: 'center',
  },
  actionSlot: {
    position: 'relative',
    zIndex: 2,
    marginTop: kayoSpace[4],
  },
  overlap: {
    position: 'relative',
    zIndex: 3,
  },
  zigzagBand: {
    justifyContent: 'center',
  },
  rowBand: {
    height: ROW_BAND_H,
    marginTop: ROW_BAND_GAP,
  },
});