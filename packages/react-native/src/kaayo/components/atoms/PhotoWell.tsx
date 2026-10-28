/** Inset clay photo well: camera prompt, then initials once a name is typed, then the chosen photo. */
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Camera } from 'lucide-react-native';

import { StudentAvatar } from './StudentAvatar';
import { kayoClay, kayoColors, kayoSpace } from '../../foundations/tokens';
import { typography } from '../../foundations/typography';

export function PhotoWell({
  name,
  photoUri,
  onPress,
  testID,
}: {
  name: string;
  photoUri: string | null;
  /** Omit for a read-only well (Review). */
  onPress?: () => void;
  testID?: string;
}) {
  const showAvatar = Boolean(photoUri || name.trim());
  const hint = !onPress
    ? null
    : photoUri
      ? 'Tap to change or remove the photo'
      : 'Initials appear until a photo is uploaded.\nTap to take a pic or upload';

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : 'image'}
      accessibilityLabel={onPress ? 'Student photo. Tap to take or upload a photo' : 'Student photo'}
      style={({ pressed }) => [styles.well, pressed && styles.pressed]}
      testID={testID}
    >
      {showAvatar ? (
        <StudentAvatar name={name || '?'} photoUrl={photoUri} size={96} />
      ) : (
        <Camera size={56} color={kayoColors.neutral[800]} strokeWidth={1.75} />
      )}
      {hint ? <Text style={[typography.body_sm, styles.hint]}>{hint}</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  well: {
    alignItems: 'center',
    gap: kayoSpace[3],
    paddingVertical: kayoSpace[10],
    paddingHorizontal: kayoSpace[6],
    borderRadius: 24, // clay radius exception (design-direction "Add student v2"); no radius token above 12
    backgroundColor: kayoColors.secondary[25],
    ...kayoClay.inset('lg'),
  },
  pressed: { opacity: 0.8 },
  hint: { color: kayoColors.neutral[800], textAlign: 'center' },
});
