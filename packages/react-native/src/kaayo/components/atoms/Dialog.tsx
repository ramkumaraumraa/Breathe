/**
 * Dialog — Neo-Brutalist atom.
 * Centered overlay with size variants (sm/md/lg/fullscreen).
 */

import React, { ReactNode } from 'react';
import {
  Modal as RNModal,
  View,
  Pressable,
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { X } from 'lucide-react-native';

import { kayoSpace, kayoRadius, kayoBorder, kayoShadow } from '../../foundations/tokens';
import { theme } from '../../foundations/theme';
import { typography } from '../../foundations/typography';

const SIZE_MAX_WIDTH: Record<'sm' | 'md' | 'lg', number> = {
  sm: 320,
  md: 480,
  lg: 640,
};

export interface DialogProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'fullscreen';
  closeOnBackdrop?: boolean;
  testID?: string;
}

export function Dialog({
  visible,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  closeOnBackdrop = true,
  testID,
}: DialogProps) {
  const isFullscreen = size === 'fullscreen';
  const maxWidth = isFullscreen ? undefined : SIZE_MAX_WIDTH[size as 'sm' | 'md' | 'lg'];
  const { height: windowHeight } = useWindowDimensions();

  return (
    <RNModal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Pressable
          style={styles.backdrop}
          onPress={closeOnBackdrop ? onClose : undefined}
          testID={testID}
        >
          <Pressable
            style={[
              styles.card,
              isFullscreen
                ? styles.cardFullscreen
                : { maxWidth, width: '100%', maxHeight: windowHeight * 0.8 },
            ]}
            onPress={() => { /* absorb touch — prevent backdrop close */ }}
          >
            <View style={styles.header}>
              <View style={{ flex: 1, gap: 2 }}>
                <Text style={[typography.heading_h3, { color: theme.text.primary }]}>
                  {title}
                </Text>
                {description ? (
                  <Text style={[typography.body_sm, { color: theme.text.secondary }]}>
                    {description}
                  </Text>
                ) : null}
              </View>
              <Pressable
                onPress={onClose}
                style={({ pressed }) => [
                  styles.closeButton,
                  pressed && styles.closeButtonPressed,
                ]}
                hitSlop={8}
                testID={testID ? `${testID}-close` : 'dialog-close'}
              >
                <X size={18} color={theme.text.primary} strokeWidth={2.5} />
              </Pressable>
            </View>

            {children ? (
              <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
                {children}
              </ScrollView>
            ) : null}
            {footer ? <View style={styles.footer}>{footer}</View> : null}
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: theme.overlay.scrim,
    alignItems: 'center',
    justifyContent: 'center',
    padding: kayoSpace[5],
  },
  card: {
    backgroundColor: theme.surface.card,
    borderWidth: kayoBorder.width,
    borderColor: theme.border.strong,
    borderRadius: kayoRadius.md,
    ...kayoShadow.lg,
  },
  cardFullscreen: {
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 0,
    borderWidth: 0,
    ...kayoShadow.none,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: kayoSpace[3],
    paddingHorizontal: kayoSpace[5],
    paddingVertical: kayoSpace[4],
    borderBottomWidth: kayoBorder.widthHairline,
    borderBottomColor: theme.border.subtle,
  },
  closeButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: kayoBorder.width,
    borderColor: theme.border.strong,
    borderRadius: kayoRadius.sm,
  },
  closeButtonPressed: {
    transform: [{ translateX: 1 }, { translateY: 1 }],
    ...kayoShadow.none,
    backgroundColor: theme.surface.sunken,
  },
  body: {
    flexGrow: 1,
    flexShrink: 1,
  },
  bodyContent: {
    padding: kayoSpace[5],
    gap: kayoSpace[3],
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: kayoSpace[3],
    paddingHorizontal: kayoSpace[5],
    paddingVertical: kayoSpace[4],
    borderTopWidth: kayoBorder.widthHairline,
    borderTopColor: theme.border.subtle,
  },
});
