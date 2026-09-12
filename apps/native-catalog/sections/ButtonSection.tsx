import { Button, Icon } from '@aumraa/breathe-native';
import { ArrowRight, Plus, Trash2 } from 'lucide-react-native';
import { View } from 'react-native';
import { Section } from '../components/Section';

const VARIANTS = ['default', 'gradient', 'destructive', 'outline', 'brandOutline', 'secondary', 'ghost', 'link', 'success', 'warning', 'danger', 'info', 'neutral'] as const;
const SIZES = ['xs', 'sm', 'default', 'lg', 'xl', 'xxl'] as const;

export function ButtonSection() {
  return (
    <Section title="Button">
      <View className="flex-row flex-wrap gap-2">
        {VARIANTS.map((v) => (
          <Button key={v} variant={v}>{v}</Button>
        ))}
      </View>
      <View className="flex-row flex-wrap gap-2">
        {VARIANTS.map((v) => (
          <Button key={v} variant={v} disabled>{v}</Button>
        ))}
      </View>
      <View className="flex-row flex-wrap items-center gap-2">
        {SIZES.map((s) => (
          <Button key={s} size={s}>{s}</Button>
        ))}
      </View>
      <View className="flex-row flex-wrap items-center gap-2">
        <Button leftIcon={<Icon as={Plus} />}>Add resident</Button>
        <Button variant="outline" rightIcon={<Icon as={ArrowRight} />}>Next</Button>
        <Button loading>Save</Button>
        <Button loading loadingText="Saving…" variant="gradient">Save</Button>
        <Button size="icon" leftIcon={<Icon as={Plus} />} accessibilityLabel="Add" />
        <Button size="icon-sm" variant="ghost" leftIcon={<Icon as={Trash2} />} accessibilityLabel="Delete" />
        <Button size="icon-xs" variant="neutral" leftIcon={<Icon as={Plus} />} accessibilityLabel="Add" />
      </View>
    </Section>
  );
}
