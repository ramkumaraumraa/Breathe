import { Avatar, AvatarFallback, AvatarImage, Progress, Separator, Skeleton, Text } from '@aumraa/breathe-native';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Section } from '../components/Section';

export function DisplaySection() {
  const [value, setValue] = useState(20);
  useEffect(() => {
    const id = setInterval(() => setValue((v) => (v >= 100 ? 10 : v + 30)), 1500);
    return () => clearInterval(id);
  }, []);

  return (
    <Section title="Separator · Skeleton · Progress · Avatar">
      <Text className="text-sm">Above</Text>
      <Separator />
      <View className="h-6 flex-row items-center gap-3">
        <Text className="text-sm">Left</Text>
        <Separator orientation="vertical" />
        <Text className="text-sm">Right</Text>
      </View>
      <View className="gap-2">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </View>
      <Progress value={value} />
      <Progress value={66} className="h-1" />
      <View className="flex-row gap-3">
        <Avatar alt="Ravi Kumar">
          <AvatarImage source={{ uri: 'https://i.pravatar.cc/80?img=12' }} />
          <AvatarFallback>RK</AvatarFallback>
        </Avatar>
        <Avatar alt="No photo">
          <AvatarFallback>SM</AvatarFallback>
        </Avatar>
      </View>
    </Section>
  );
}
