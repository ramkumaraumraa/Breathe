import { Badge } from '@aumraa/breathe-native';
import { View } from 'react-native';
import { Section } from '../components/Section';

const VARIANTS = ['default', 'secondary', 'destructive', 'outline', 'success', 'warning', 'danger', 'info', 'gradient', 'super-admin', 'admin', 'viewer'] as const;

export function BadgeSection() {
  return (
    <Section title="Badge">
      <View className="flex-row flex-wrap gap-2">
        {VARIANTS.map((v) => (
          <Badge key={v} variant={v}>{v}</Badge>
        ))}
      </View>
    </Section>
  );
}
