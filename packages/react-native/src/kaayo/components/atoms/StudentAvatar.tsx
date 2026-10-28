// frontend/design-system/components/atoms/StudentAvatar.tsx
import React from 'react';
import { Pressable } from 'react-native';
import { Avatar, AvatarSize } from './Avatar';

/** 200 = PhotoViewer's no-photo fallback, inside its 240 passport box. */
export type StudentAvatarSizePx = 32 | 48 | 96 | 200;

interface StudentAvatarProps {
  name: string;
  photoUrl?: string | null;
  size?: StudentAvatarSizePx;
  onPress?: () => void;
  testID?: string;
}

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/** 32 keeps Avatar's named 'sm'; 48 / 96 / 200 render at their own diameter (the old buckets drew 40 / 72 / 72). */
function toAvatarSize(px: StudentAvatarSizePx): AvatarSize | number {
  return px === 32 ? 'sm' : px;
}

export function StudentAvatar({ name, photoUrl, size = 48, onPress, testID }: StudentAvatarProps) {
  const avatarSize = toAvatarSize(size);
  const initials = getInitials(name || '?');

  const avatar = (
    <Avatar
      uri={photoUrl}
      initials={initials}
      size={avatarSize}
      testID={!onPress ? testID : undefined}
    />
  );

  if (!onPress) return avatar;

  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      testID={testID}
      style={({ pressed }) => pressed ? { opacity: 0.75 } : undefined}
    >
      {avatar}
    </Pressable>
  );
}
