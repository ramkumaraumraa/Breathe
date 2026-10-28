/**
 * AppShell - main authenticated layout template.
 *
 * Layout policy:
 *   Mobile   (< 768px):          compact header + content.
 *   Expanded (>= 768px or web):  full header + content.
 *   Branded top screens:         content runs edge-to-edge and owns its red header.
 *
 * The bottom tab bar lives in the (tabs) navigator (KaayoTabBar), and page padding is applied
 * per screen through `useShellContentPadding` — the shell only frames the navigator. Its child
 * tree keeps the same shape whatever the props, so the navigator inside never remounts.
 */

import { ReactNode } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Pressable,
  Platform,
  ViewStyle,
} from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { Bell } from 'lucide-react-native';
import { router } from 'expo-router';
import { KaayoLogo } from '../atoms/KaayoLogo';

import {
  getKayoGridSpec,
  kayoColors,
  kayoSpace,
  kayoBorder,
  kayoBreakpoint,
} from '../../foundations/tokens';
import { theme } from '../../foundations/theme';
import { typography } from '../../foundations/typography';
const DEV_MODE = false;

export type NavKey =
  | 'dashboard'
  | 'students'
  | 'schedule'
  | 'attendance'
  | 'payments'
  | 'reminders'
  | 'notifications'
  | 'settings';

export interface AppShellProps {
  children: ReactNode;
  hideChrome?: boolean;
  hideHeader?: boolean;
  /** Branded top screens draw under the status bar, so the shell drops its top inset. */
  contentEdgeToEdge?: boolean;
  notificationBadgeCount?: number;
  /** Page background. 'canvas' (default) is the app-standard surface. 'card' is for screens that
   * need the canvas token free for their own sunken elements — Notifications puts its filter track
   * on NeutralWhite/50, which is the canvas colour, so its page has to sit one step lighter.
   * Set here rather than in the screen because the shell paints the full bleed, including the
   * safe-area and content padding a screen-level override could never reach.
   * 'warm' (Secondary/25) is the clay form page (Add student v2). */
  surface?: 'canvas' | 'card' | 'warm';
  /** Rendered as a fixed overlay pinned above the content, in place of the default AppHeader
   * (used by branded top screens whose own header row used to scroll away with the page). */
  headerOverlay?: ReactNode;
}

/** Page padding the shell used to put around every screen; navigators pass it as scene style. */
export function useShellContentPadding(): ViewStyle {
  const { width } = useWindowDimensions();
  const gridSpec = getKayoGridSpec(width);
  return { paddingHorizontal: gridSpec.margin, paddingVertical: gridSpec.gutter };
}

export function AppShell({
  children,
  hideChrome = false,
  hideHeader = false,
  contentEdgeToEdge = false,
  notificationBadgeCount = 0,
  surface = 'canvas',
  headerOverlay,
}: AppShellProps) {
  const { width } = useWindowDimensions();
  const isExpanded = width >= kayoBreakpoint.tablet || Platform.OS === 'web';
  // With chrome on, the tab bar pads the bottom inset itself so its card colour fills it.
  const edges: Edge[] = hideChrome
    ? ['top', 'left', 'right', 'bottom']
    : contentEdgeToEdge
    ? ['left', 'right']
    : ['top', 'left', 'right'];

  return (
    <SafeAreaView
      style={[styles.root, surface === 'card' && styles.rootCard, surface === 'warm' && styles.rootWarm]}
      edges={edges}
      testID={
        hideChrome
          ? 'app-shell-chromeless'
          : Platform.OS === 'web'
          ? 'app-shell-web'
          : isExpanded
          ? 'app-shell-tablet'
          : 'app-shell-mobile'
      }
    >
      {DEV_MODE && !hideChrome ? <DevBanner /> : null}
      {hideChrome || hideHeader ? null : (
        <AppHeader isExpanded={isExpanded} notificationBadgeCount={notificationBadgeCount} />
      )}
      <View style={styles.content}>{children}</View>
      {headerOverlay && !hideChrome ? (
        <View style={styles.headerOverlay} pointerEvents="box-none">
          {headerOverlay}
        </View>
      ) : null}
    </SafeAreaView>
  );
}

function DevBanner() {
  return (
    <View style={styles.devBanner} testID="dev-banner">
      <Text style={[typography.utility_badge, styles.devBannerText]}>
        DEV MODE - AUTH BYPASSED. LOCK DOWN BEFORE PILOT.
      </Text>
    </View>
  );
}

function AppHeader({ isExpanded, notificationBadgeCount }: { isExpanded: boolean; notificationBadgeCount: number }) {
  return (
    <View style={[styles.header, !isExpanded && { borderBottomWidth: 0 }]} testID="app-header">
      <KaayoLogo variant="symbol" tone="brand" width={56} />

      <View style={styles.headerRight}>
        <Pressable
          onPress={() => router.push('/notifications')}
          style={styles.bellBtn}
          hitSlop={8}
          testID="header-notifications"
        >
          <Bell size={22} color={theme.text.secondary} strokeWidth={2} />
          {notificationBadgeCount > 0 ? (
            <View style={styles.notificationBadge} testID="notification-badge">
              <Text style={styles.notificationBadgeText}>{notificationBadgeCount > 9 ? '9+' : notificationBadgeCount}</Text>
            </View>
          ) : null}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.surface.canvas,
  },
  rootCard: {
    backgroundColor: theme.surface.card,
  },
  rootWarm: {
    backgroundColor: kayoColors.secondary[25],
  },
  content: { flex: 1 },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: kayoSpace[4],
    paddingVertical: kayoSpace[3],
    backgroundColor: theme.surface.card,
    borderBottomWidth: kayoBorder.width,
    borderBottomColor: theme.border.strong,
    minHeight: 60,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: kayoSpace[3],
  },
  bellBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: kayoBorder.widthHairline,
    borderColor: theme.border.default,
    backgroundColor: theme.surface.sunken,
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    paddingHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.status.overdue.fg,
  },
  notificationBadgeText: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 9,
    color: kayoColors.neutral[25],
  },
  devBanner: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: kayoColors.alert[500],
    borderBottomWidth: kayoBorder.width,
    borderBottomColor: kayoColors.neutral[950],
    paddingHorizontal: kayoSpace[3],
  },
  devBannerText: {
    color: kayoColors.neutral[25],
    fontFamily: 'DMSans_600SemiBold',
  },
});
