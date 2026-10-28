/**
 * Notifier categories - the one place that decides how a feedback message is coloured, shared by
 * every surface that notifies: NotificationBanner (Home carousel), the inline Alert, Toast, the
 * tab banners and the bell-screen rows. Names follow Breathe's feedback family
 * (positive / negative / alert / supportive) plus neutral. Tertiary is a brand colour, not feedback,
 * so it is not a category.
 *
 * Push payloads from the backend keep their own wire enum (SUCCESS, WARNING, ...) - see pushRoutes.ts.
 */
import { AlertCircle, AlertTriangle, CheckCircle2, Info, Megaphone, type LucideIcon } from 'lucide-react-native';

import { kayoColors } from './tokens';

export type NotifierCategory = 'positive' | 'negative' | 'alert' | 'supportive' | 'neutral';

export type NotifierRamp = (typeof kayoColors)[NotifierCategory];

export interface NotifierStyle {
  ramp: NotifierRamp;
  /** NotificationBanner surface tint, laid over white at 60%. */
  tint: string;
  /** Soft surfaces (Alert, Toast): fill, text/icon, outline. */
  bg: string;
  fg: string;
  border: string;
  Icon: LucideIcon;
}

function style(ramp: NotifierRamp, tintStop: 25 | 50, Icon: LucideIcon): NotifierStyle {
  return { ramp, tint: ramp[tintStop], bg: ramp[50], fg: ramp[700], border: ramp[500], Icon };
}

// Supportive and neutral tint at 50: their 25 stops read as plain white on the card (decided
// 2026-10-03 for supportive, 2026-10-04 for neutral).
export const notifier: Record<NotifierCategory, NotifierStyle> = {
  positive: style(kayoColors.positive, 25, CheckCircle2),
  negative: style(kayoColors.negative, 25, AlertCircle),
  alert: style(kayoColors.alert, 25, AlertTriangle),
  supportive: style(kayoColors.supportive, 50, Info),
  neutral: style(kayoColors.neutral, 50, Megaphone),
};
