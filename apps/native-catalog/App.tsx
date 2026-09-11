import './global.css';
import { PortalHost } from '@rn-primitives/portal';
import { StatusBar } from 'expo-status-bar';
import { Appearance, Pressable, ScrollView, Text, useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { sections } from './sections';

export default function App() {
  const scheme = useColorScheme();
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-background">
        <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
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
        <PortalHost />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
