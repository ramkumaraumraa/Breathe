import { useState } from 'react';
import { Text, View } from 'react-native';
import { Section } from '../components/Section';

// Full class strings, so Tailwind can see them
const SWATCHES = [
  ['bg-background border border-border', 'background'],
  ['bg-background-secondary', 'background-secondary'],
  ['bg-foreground', 'foreground'],
  ['bg-primary', 'primary'],
  ['bg-primary-500', 'primary-500'],
  ['bg-accent', 'accent'],
  ['bg-success', 'success'],
  ['bg-warning', 'warning'],
  ['bg-danger', 'danger'],
  ['bg-neutral-white-100', 'neutral-white-100'],
  ['bg-neutral-black-975', 'neutral-black-975'],
  ['bg-red-50 border border-red-200', 'red-50 (v3)'],
] as const;

const TYPE = [
  ['text-2xs', '2xs 10'], ['text-xs', 'xs 12'], ['text-sm', 'sm 14'], ['text-base', 'base 16'],
  ['text-lg', 'lg 18'], ['text-2xl', '2xl 24'], ['text-4xl', '4xl 36'],
] as const;

const WEIGHTS = [
  ['font-normal', '400'], ['font-medium', '500'], ['font-semibold', '600'], ['font-bold', '700'],
] as const;

export function FoundationsSection() {
  const [probe, setProbe] = useState(0);
  const [smHeight, setSmHeight] = useState(0);
  const [leadingHeight, setLeadingHeight] = useState(0);
  return (
    <Section title="Foundations">
      <View className="flex-row items-center gap-3">
        <View className="h-11 w-11 rounded-lg bg-primary shadow-sm" onLayout={(e) => setProbe(e.nativeEvent.layout.height)} />
        <Text className="font-sans text-sm text-foreground">h-11 measured: {probe}px (expect 44)</Text>
      </View>
      <Text
        className="font-sans text-sm text-foreground"
        onLayout={(e) => setSmHeight(e.nativeEvent.layout.height)}>
        text-sm measured: {smHeight}px (expect 20)
      </Text>
      <Text
        className="font-sans text-base leading-5 text-foreground"
        onLayout={(e) => setLeadingHeight(e.nativeEvent.layout.height)}>
        text-base leading-5 measured: {leadingHeight}px (expect 20)
      </Text>
      <View className="flex-row flex-wrap gap-2">
        {SWATCHES.map(([cls, name]) => (
          <View key={name} className="items-center gap-1">
            <View className={`h-10 w-16 rounded-md ${cls}`} />
            <Text className="font-sans text-2xs text-foreground-secondary">{name}</Text>
          </View>
        ))}
      </View>
      {TYPE.map(([cls, label]) => (
        <Text key={label} className={`font-sans text-foreground ${cls}`}>Leminiscate {label}</Text>
      ))}
      {WEIGHTS.map(([cls, label]) => (
        <Text key={label} className={`font-sans text-base text-foreground ${cls}`}>Inter {label}</Text>
      ))}
    </Section>
  );
}
