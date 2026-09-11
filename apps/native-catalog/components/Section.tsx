import type { ReactNode } from 'react';
import { Text, View } from 'react-native';

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View className="gap-3 border-b border-border px-4 py-6">
      <Text className="font-sans text-xs font-semibold uppercase text-foreground-tertiary">{title}</Text>
      {children}
    </View>
  );
}
