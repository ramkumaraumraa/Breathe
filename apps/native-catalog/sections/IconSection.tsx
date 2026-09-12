import { Gradient, Icon, Spinner, Text } from '@aumraa/breathe-native';
import { Bell, Check, Plus } from 'lucide-react-native';
import { View } from 'react-native';
import { Section } from '../components/Section';

export function IconSection() {
  return (
    <Section title="Icon · Gradient · Spinner">
      <View className="flex-row items-center gap-4">
        <Icon as={Plus} />
        <Icon as={Check} className="text-success" size={20} />
        <Icon as={Bell} className="size-6 text-primary" />
        <Spinner />
        <Spinner className="text-primary" size={20} />
      </View>
      <View className="h-11 overflow-hidden rounded-lg">
        <Gradient />
        <Text className="m-auto text-sm font-medium text-white">bg-gradient-brand</Text>
      </View>
    </Section>
  );
}
