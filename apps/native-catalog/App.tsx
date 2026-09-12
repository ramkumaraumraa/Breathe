import './global.css';
import { PortalHost } from '@rn-primitives/portal';
import { StatusBar } from 'expo-status-bar';
import { Appearance, Pressable, ScrollView, Text, useColorScheme, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { sections } from './sections';

export default function App() {
  const scheme = useColorScheme();
  return (
    <SafeAreaProvider>
      {/* SafeAreaView is not NativeWind-wrapped, so className is ignored on it: the View carries the styles */}
      <SafeAreaView style={{ flex: 1 }}>
        <View className="flex-1 bg-background">
          <StatusBar style="auto" />
          <Pressable
            className="m-4 self-start rounded-md border border-border px-3 py-2"
            onPress={() => Appearance.setColorScheme(scheme === 'dark' ? 'light' : 'dark')}>
            <Text className="font-sans text-sm text-foreground">Toggle {scheme === 'dark' ? 'light' : 'dark'}</Text>
          </Pressable>
          <ScrollView>
            {sections.map(({ key, Component }) => (
              <Component key={key} />
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
      <PortalHost />
    </SafeAreaProvider>
  );
}
