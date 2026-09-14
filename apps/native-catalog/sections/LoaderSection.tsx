import { Loader } from '@aumraa/breathe-native';
import { View } from 'react-native';
import { Section } from '../components/Section';

export function LoaderSection() {
  return (
    <Section title="Loader">
      <View className="flex-row items-end gap-6">
        <Loader size="sm" />
        <Loader size="md" />
        <Loader size="lg" />
      </View>
      <Loader label="Loading dashboard…" />
      <View className="flex-row items-end gap-6">
        <Loader size="md" showRoof={false} />
        <Loader size="lg" showRoof={false} />
      </View>
    </Section>
  );
}
