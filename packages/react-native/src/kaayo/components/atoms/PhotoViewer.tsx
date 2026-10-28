// frontend/design-system/components/atoms/PhotoViewer.tsx
import React from 'react';
import { Modal, View, Pressable, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { X } from 'lucide-react-native';
import { StudentAvatar } from './StudentAvatar';
import { theme } from '../../foundations/theme';
import { typography } from '../../foundations/typography';
import { kayoSpace, kayoBorder, kayoRadius } from '../../foundations/tokens';

interface PhotoViewerProps {
  visible: boolean;
  photoUrl?: string | null;
  name: string;
  onClose: () => void;
}

// Passport size ratio: 35mm × 45mm → 7:9
const PASSPORT_W = 240;
const PASSPORT_H = 308;

export function PhotoViewer({ visible, photoUrl, name, onClose }: PhotoViewerProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <View style={styles.container}>
          <Pressable style={styles.closeBtn} onPress={onClose} hitSlop={8}>
            <X size={20} color={theme.text.primary} strokeWidth={2.25} />
          </Pressable>
          {photoUrl ? (
            <Image
              source={{ uri: photoUrl }}
              style={styles.photo}
              contentFit="cover"
            />
          ) : (
            <View style={styles.fallback}>
              <StudentAvatar name={name} size={200} />
            </View>
          )}
          <Text style={[typography.body_sm, { color: theme.text.secondary, marginTop: kayoSpace[3] }]}>
            {name}
          </Text>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: theme.overlay.photo,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: theme.surface.card,
    borderWidth: kayoBorder.width,
    borderColor: theme.border.strong,
    borderRadius: kayoRadius.md,
    padding: kayoSpace[4],
    alignItems: 'center',
  },
  closeBtn: {
    alignSelf: 'flex-end',
    marginBottom: kayoSpace[2],
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: kayoBorder.width,
    borderColor: theme.border.strong,
    borderRadius: kayoRadius.sm,
    backgroundColor: theme.surface.canvas,
  },
  photo: {
    width: PASSPORT_W,
    height: PASSPORT_H,
    borderWidth: kayoBorder.width,
    borderColor: theme.border.strong,
    borderRadius: kayoRadius.sm,
  },
  fallback: {
    width: PASSPORT_W,
    height: PASSPORT_H,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.surface.sunken,
    borderWidth: kayoBorder.width,
    borderColor: theme.border.default,
    borderRadius: kayoRadius.sm,
  },
});
