import { AumraaLoader, KaayoLoader, Loader } from '@aumraa/breathe-native';
import { View } from 'react-native';
import { Section } from '../components/Section';

export function LoaderSection() {
  return (
    <Section title="Loader">
      {/* Leminiscate brand loader */}
      <View className="flex-row items-end gap-6">
        <Loader size="sm" />
        <Loader size="md" />
        <Loader size="lg" />
      </View>
      <Loader label="Loading dashboard…" />

      {/* Aumraa brand loader */}
      <View className="flex-row items-end gap-6">
        <AumraaLoader size="sm" />
        <AumraaLoader size="md" />
        <AumraaLoader size="lg" />
      </View>
      <AumraaLoader label="Generating design tokens…" />

      {/* Kaayo brand loader */}
      <View className="flex-row items-end gap-6">
        <KaayoLoader size="sm" />
        <KaayoLoader size="md" />
        <KaayoLoader size="lg" />
      </View>
      <KaayoLoader label="Scheduling tutor…" />
    </Section>
  );
}
